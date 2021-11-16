import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";
import { stripe } from "../../services/stripe";
import { fauna as faunaClient } from "../../services/fauna";
import { query as q } from "faunadb";

type User = {
  ref: string;
  data: {
    name: string;
    email: string;
    stripe_customer_id: string;
  };
};

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

  const { name, email } = session.user;

  if (!email) {
    res.status(401).end("User e-mail not registered");
    return;
  }

  // Salva no Fauna o ID do usuário do Stripe, se não existir
  const user = await faunaClient
    .query<User>(q.Get(q.Match(q.Index("user_email"), q.Casefold(email))))
    .catch((error) => {
      console.error(error);
      res.status(400).end("Error accessing Fauna");
      return;
    });

  if (!user) {
    res.status(400).end("User not registered");
    return;
  }

  let stripeCustomerId = user.data.stripe_customer_id;

  // Cria o usuário no Stripe
  if (!stripeCustomerId) {
    try {
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
      console.error(error);
      res.status(400).end("Error creating customer on Stripe");
      return;
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
