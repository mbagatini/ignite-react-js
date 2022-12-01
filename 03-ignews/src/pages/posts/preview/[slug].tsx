import React, { useEffect } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Client } from "../../../services/prismic";
import { RichText } from "prismic-dom";

import styles from "../post.module.scss";
import Link from "next/link";
import { useSession } from "next-auth/client";
import router from "next/dist/client/router";

interface PostPreviewProps {
  post: {
    updatedAt: string;
    slug: string;
    title: string;
    content: string;
  };
}

export default function PostPreview({ post }: PostPreviewProps) {
  const [session] = useSession();

  useEffect(() => {
    if (session?.activeSubscription) {
      router.push(`/posts/${post.slug}`);
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className={`${styles.postContent} ${styles.previewContent}`}
          />

          <div className={styles.continueReading}>
            <span>Wanna continue reading? </span>
            <Link href="/">
              <a>Subscribe now 🤗</a>
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}

/**
 *  Conteúdo estático da página (consumido pelos crawlers e usuários não assinantes)
 */

export const getStaticPaths = () => {
  return {
    paths: [], //posts para serem gerados na build
    fallback: "blocking", // carrega os posts em SSR antes de carregar a página
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const response = await Client().getByUID("post", slug, {});

  const date = new Date(response.last_publication_date || "");
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content.splice(0, 3)),
    updatedAt: new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date),
  };

  return {
    props: {
      post,
    },
  };
};
