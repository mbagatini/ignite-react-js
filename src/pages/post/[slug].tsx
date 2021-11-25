import { GetStaticPaths, GetStaticProps } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { useUpdatePreview } from '../../hooks/useUpdatePreviewRef';
import { getPrismicClient } from '../../services/prismic';
import { Loader } from '../../components/Loader';
import Custom404 from '../404';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../utils';
import { QueryOptions } from '@prismicio/client/types/ResolvedApi';

interface Post {
  uid: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
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
  previewRef?: unknown;
}

export default function Post({ post, previewRef }: PostProps) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  // if (router.isFallback) {
  //   return <div>Carregando...</div>;
  // }

  if (router.isFallback) {
    return <Loader />;
  }

  if (!post.uid) {
    return <Custom404 />;
  }

  const totalWords = post.data.content.reduce((acc: number, cur: any) => {
    if (!acc) acc = 0;

    acc += cur.heading?.match(/\S+/g)?.length || 0;

    const body = RichText.asText(cur.body);
    acc += body?.match(/\S+/g)?.length || 0;

    return acc;
  }, 0);

  const estimatedTime = Math.ceil(totalWords / 200);

  useUpdatePreview(previewRef, post.uid);

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
              {formatDate(post.first_publication_date || '')}
            </span>
            <span>
              <FiUser size={20} />
              {post.data.author}
            </span>
            <span>
              <FiClock size={20} />
              {`${estimatedTime} min`}
            </span>
          </div>

          <div className={styles.postContent}>
            {post.data.content.map((content, idx) => {
              return (
                <section key={idx}>
                  {content.heading && <h2>{content.heading}</h2>}
                  <div
                    dangerouslySetInnerHTML={{
                      __html: RichText.asHtml(content.body),
                    }}
                  />
                </section>
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

  const posts = await prismic.query(
    Prismic.Predicates.at('document.type', 'post')
  );

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      },
    };
  });

  return {
    //posts para serem gerados na build
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  previewData,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { props: { post: {} as PostProps } };
  }

  const previewRef = previewData ? previewData?.ref : null;
  const refOption = previewRef ? { ref: previewRef } : ({} as QueryOptions);

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', slug, refOption);

  const post: Post = {
    uid: response.uid || '',
    first_publication_date: response?.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map((item: any) => {
        return {
          heading: item.heading,
          body: item.body,
        };
      }),
    },
  };

  return {
    props: {
      post,
      previewRef,
    },
  };
};
