import type { NextPage } from "next";
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";

import styles from "./index.module.scss";

const Home: NextPage = () => {
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
            <span className={styles.attention}>for $9.90 month</span>
          </p>

          <SubscribeButton />
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  );
};

export default Home;
