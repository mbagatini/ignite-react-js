import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).setHeader("Allow", "POST").end("Method not allowed");
    return;
  }

  // Pegar os dados do usuário da sessão
  const session = await getSession({ req });

  if (!session?.user) {
    res.status(401).end("User not authenticated");
    return;
  }

  // Cria o usuário no Stripe
  const stripeCustomer = await stripe.customers.create({
    email: session.user.email || "",
    name: session.user.name || "",
  });

  // Cria o plano no Stripe
  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomer.id,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [{ price: req.body.priceId, quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL || "",
    cancel_url: process.env.STRIPE_CANCEL_URL || "",
  });

  return res.status(200).json({ sessionId: stripeCheckoutSession.id });
}
