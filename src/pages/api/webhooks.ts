import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";
import Stripe from "stripe";
import { stripe } from "../../services/stripe";
import { saveSubscription } from "./_lib/manageSubscription";

async function buffer(readable: Readable) {
  const chunks: Buffer[] = [];

  for await (const chunk of readable) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }

  return Buffer.concat(chunks);
}

/**
 * Configuração para ler uma requisição que não é JSON
 * https://nextjs.org/docs/api-routes/api-middlewares#custom-config
 */
export const config = {
  api: {
    bodyParser: false,
  },
};

/**
 * Eventos que devem ser escutados
 */
const relevantEvents = new Set(["checkout.session.completed"]);

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").end("Method not allowed");
  }

  /**
   * Converte os dados da requisição para algo legível por nós, pois
   * a requisição chega como uma strem (readable) e não um JSON
   */
  const buff = await buffer(req);
  const secret = req.headers["stripe-signature"];

  if (!secret) {
    return res.status(400).end("Stripe signature header is missing");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buff,
      secret,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );
  } catch (error) {
    return res.status(400).send(`Webhook error: ${error}`);
  }

  const eventType = event.type;

  if (!relevantEvents.has(eventType)) {
    return res.send(`Webhook received event: ${eventType}`);
  }

  switch (eventType) {
    case "checkout.session.completed":
      const checkoutSession = event.data.object as Stripe.Checkout.Session;

      await saveSubscription(
        String(checkoutSession.subscription || ""),
        String(checkoutSession.customer || "")
      );

      break;

    default:
      return res.json({ error: "Webhook handler failed" });
  }

  return res.status(200).end();
}
