import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Prismic from '@prismicio/client';
import { FiCalendar, FiUser } from 'react-icons/fi';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { useState } from 'react';
import { formatDate } from '../utils';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
  const [nextPage, setNextPage] = useState<string>(postsPagination.next_page);

  /**
   * Formata a data dos posts
   */
  const formattedPosts = postsPagination.results.map(post => {
    return {
      ...post,
      first_publication_date: formatDate(post?.first_publication_date || ''),
    };
  });
  const [posts, setPosts] = useState<Post[]>(formattedPosts);

  async function handleLoadMorePosts(): Promise<void> {
    /**
     * Busca mais posts no Prismic
     */
    const newPostsPagination = await fetch(nextPage).then(response => {
      return response.json();
    });

    const newFormattedPosts = formatPosts(newPostsPagination.results).map(
      post => {
        const postDate = new Date(post?.first_publication_date || '');
        return {
          ...post,
          first_publication_date: formatDate(
            post?.first_publication_date || ''
          ),
        };
      }
    );

    setNextPage(newPostsPagination.next_page);
    setPosts([...posts, ...newFormattedPosts]);
  }

  return (
    <>
      <Head>
        <title>Posts | spacetreveling</title>
      </Head>
      <main className={commonStyles.container}>
        {posts.map(post => {
          return (
            <div key={post.uid} className={styles.post}>
              <Link href={`/post/${post.uid}`}>
                <a>{post.data.title}</a>
              </Link>
              <p>{post.data.subtitle}</p>

              <div>
                <span>
                  <FiCalendar size={20} />
                  {post.first_publication_date}
                </span>
                <span>
                  <FiUser size={20} />
                  {post.data.author}
                </span>
              </div>
            </div>
          );
        })}

        {nextPage && (
          <button className={styles.nextPage} onClick={handleLoadMorePosts}>
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    {
      pageSize: 4,
      orderings: '[document.last_publication_date]',
    }
  );

  const posts = formatPosts(postsResponse.results);

  return {
    props: {
      postsPagination: {
        next_page: postsResponse.next_page,
        results: posts,
      },
    },
  };
};

function formatPosts(posts: any[]): Post[] {
  const formattedPosts = posts.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post?.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return formattedPosts;
}
