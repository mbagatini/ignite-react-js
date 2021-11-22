import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";

import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const [session] = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    if (!session) {
      signIn("github");
      return;
    }

    if (session.activeSubscription) {
      router.push("/posts");
      return;
    }

    // Envia o requeset para criar a subscrição no Stripe
    try {
      const response = await api.post("/subscription", { priceId });
      const { sessionId } = response.data;
      const stripe = await getStripeJs();

      if (!stripe) {
        throw new Error("Stripe.js not loaded");
      }

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
