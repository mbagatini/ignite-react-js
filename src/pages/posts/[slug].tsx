import React from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/client";
import Head from "next/head";
import { Client } from "../../services/prismic";
import { RichText } from "prismic-dom";

import styles from "./post.module.scss";

interface PostProps {
  post: {
    updatedAt: string;
    slug: string;
    title: string;
    content: string;
  };
}

export default function Post({ post }: PostProps) {
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
            className={styles.postContent}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const slug = params?.slug as string;
  const session = await getSession({ req });

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const response = await Client().getByUID("post", slug, {});

  const date = new Date(response.last_publication_date || "");
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
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
