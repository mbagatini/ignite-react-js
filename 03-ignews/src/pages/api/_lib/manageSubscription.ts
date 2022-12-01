import { query as q } from "faunadb";
import { fauna as faunaClient } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  isCreateAction: boolean
) {
  // Busca o usuário no Fauna pelo customerId
  const userRef = await faunaClient
    .query(
      q.Select(
        ["ref"],
        q.Get(q.Match(q.Index("user_stripe_customer_id"), customerId))
      )
    )
    .catch((error) => {
      console.error(`Error on Fauna: ${error}`);
      return;
    });

  // Buscar todos dados da subscription no Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    user_id: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  // Salva os dados da subscription no Fauna
  let faunaQuery = null;

  if (isCreateAction) {
    faunaQuery = q.Create(q.Collection("subscriptions"), {
      data: subscriptionData,
    });
  } else {
    faunaQuery = q.Replace(
      q.Select(
        ["ref"],
        q.Get(q.Match(q.Index("subscription_id"), subscription.id))
      ),
      {
        data: subscriptionData,
      }
    );
  }

  await faunaClient
    .query(faunaQuery)
    .then((ret) => console.log(ret))
    .catch((error) => {
      console.error(`Error on Fauna: ${error}`);
      return;
    });
}
