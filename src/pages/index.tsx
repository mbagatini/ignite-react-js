import type { GetStaticProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./index.module.scss";

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  };
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>
            News about the <span className={styles.attention}>React</span> world
          </h1>
          <p>
            Get acess to all the publications{" "}
            <span className={styles.attention}>for {product.amount} month</span>
          </p>

          <SubscribeButton priceId={product.priceId} />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Busca o produto da API
  const price = await stripe.prices.retrieve("price_1JublPDJkjQsgFuZ2SYNF1nF");

  // Dados do produto
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount || 0) / 100), // Valor em centavos
  };

  return {
    props: {
      product,
    },
    /**
     * revalidate: false
     * An optional amount in seconds after which a page re-generation can occur. Defaults to false.
     * When revalidate is false it means that there is no revalidation, so the page will be cached as
     * built until your next build. More on Incremental Static Regeneration
     */
  };
};
