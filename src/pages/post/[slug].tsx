import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';

interface Post {
  estimatedTime: string;
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Carregando, aguarde...</div>;
  }

  return (
    <>
      <Head>
        <title>Post | spacetreveling</title>
      </Head>

      <main>
        <div className={styles.banner}>
          <Image
            src={post.data.banner.url}
            alt={post.data.title}
            layout="fill"
            objectFit="cover"
          />
        </div>

        <article className={`${commonStyles.container} ${styles.post}`}>
          <h1>{post.data.title}</h1>

          <div className={styles.info}>
            <span>
              <FiCalendar size={20} />
              {post.first_publication_date}
            </span>
            <span>
              <FiUser size={20} />
              {post.data.author}
            </span>
            <span>
              <FiClock size={20} />
              {post.estimatedTime}
            </span>
          </div>

          <div className={styles.postContent}>
            {post.data.content.map((content, idx) => {
              return (
                <div key={`c${idx}`}>
                  {content.heading && <h2>{content.heading}</h2>}
                  {content.body.map((body, idx) => (
                    <div
                      key={`b${idx}`}
                      dangerouslySetInnerHTML={{ __html: body.text }}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </article>
      </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();

  // Busca os 10 posts mais recentes
  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    { pageSize: 10, page: 1, orderings: '[document.last_publication_date]' }
  );

  return {
    //posts para serem gerados na build
    paths: posts.results.map(post => {
      return {
        params: {
          slug: post.uid,
        },
      };
    }),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const slug = context?.params?.slug as string;

  if (!slug) {
    return { props: { post: {} as PostProps } };
  }

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', slug, {});

  const postDate = new Date(response?.first_publication_date || '');

  const totalWords = response.data.content.reduce((acc: number, cur: any) => {
    if (!acc) acc = 0;

    acc += cur.heading?.match(/\S+/g)?.length || 0;

    const body = RichText.asText(cur.body);
    acc += body?.match(/\S+/g)?.length || 0;

    return acc;
  }, 0);

  const post: Post = {
    estimatedTime: `${Math.ceil(totalWords / 200)} min`,
    first_publication_date: format(postDate, 'dd MMM yyyy', {
      locale: ptBR,
    }),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map((item: any) => {
        return {
          heading: item.heading,
          body: [{ text: RichText.asHtml(item.body) }],
        };
      }),
    },
  };

  return { props: { post } };
};
