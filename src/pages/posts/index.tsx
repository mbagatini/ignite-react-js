import { GetStaticProps } from "next";
import Head from "next/head";
import Link from "next/link";
import Prismic from "@prismicio/client";
import { RichText } from "prismic-dom";
import { RichTextBlock } from "prismic-reactjs";

import { Client } from "../../services/prismic";

import styles from "./styles.module.scss";

interface Post {
  updatedAt: string;
  slug: string;
  title: string;
  content: string;
}

interface PostsProps {
  posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`} key={post.slug}>
              <a href="#">
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.content}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await Client().query(
    Prismic.predicates.at("document.type", "post")
  );

  const posts = response.results.map((post) => {
    const date = new Date(post.last_publication_date || "");

    return {
      slug: post.uid,
      title: RichText.asText(post.data.title),
      content:
        post.data.content.find(
          (content: RichTextBlock) => content.type === "paragraph"
        )?.text ?? "",
      updatedAt: new Intl.DateTimeFormat("pt-BR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date),
    };
  });

  return {
    props: {
      posts,
    },
  };
};
