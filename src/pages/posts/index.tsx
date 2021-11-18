import Head from "next/head";

import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março</time>
            <strong>Titulo</strong>
            <p>conteudo do post</p>
          </a>
          <a href="#">
            <time>12 de março</time>
            <strong>Titulo</strong>
            <p>conteudo do post</p>
          </a>
          <a href="#">
            <time>12 de março</time>
            <strong>Titulo</strong>
            <p>conteudo do post</p>
          </a>
        </div>
      </main>
    </>
  );
}
