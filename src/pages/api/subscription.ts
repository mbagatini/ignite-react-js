import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";
import { fauna as faunaClient } from "../../services/fauna";
import { query as q } from "faunadb";
import { User } from "../../types/user";

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).setHeader("Allow", "POST").end("Method not allowed");
  }

  // Pegar os dados do usuário da sessão
  const session = await getSession({ req });

  if (!session?.user) {
    return res.status(401).end("User not authenticated");
  }

  const { name, email } = session.user;

  if (!email) {
    return res.status(401).end("User e-mail not registered");
  }

  // Busca o usuário no Fauna
  const user = await faunaClient
    .query<User>(q.Get(q.Match(q.Index("user_email"), q.Casefold(email))))
    .catch((error) => {
      return res.status(400).send(`Error accessing Fauna: ${error}`);
    });

  if (!user) {
    return res.status(400).end("User not registered");
  }

  let stripeCustomerId = user.data.stripe_customer_id;

  // Salva no Fauna o ID do usuário do Stripe, se não existir
  if (!stripeCustomerId) {
    try {
      // Cria o usuário no Stripe
      const stripeCustomer = await stripe.customers.create({
        email: email || "",
        name: name || "",
      });

      stripeCustomerId = stripeCustomer.id;

      await faunaClient
        .query(
          q.Update(user.ref, {
            data: { stripe_customer_id: stripeCustomer.id },
          })
        )
        .then((ret) => console.log(ret));
    } catch (error) {
      return res.status(400).end(`Error creating customer: ${error}`);
    }
  }

  // Cria o plano no Stripe
  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
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
