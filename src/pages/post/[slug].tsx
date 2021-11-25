import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { FiCalendar, FiUser, FiClock } from 'react-icons/fi';

import { getPrismicClient } from '../../services/prismic';
import { Loader } from '../../components/Loader';
import ExitPreview from '../../components/ExitPreview';
import Custom404 from '../404';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { formatDate } from '../../utils';

interface Post {
  uid: string;
  first_publication_date: string | null;
  last_publication_date: string | null;
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
  preview: boolean;
  post: Post;
  nextPost: Post;
  prevPost: Post;
}

export default function Post({ post, preview, nextPost, prevPost }: PostProps) {
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
  const firstPublicationDate = formatDate(
    post.first_publication_date || '',
    'dd MMM yyyy'
  );
  const lastPublicationDate = post.last_publication_date
    ? formatDate(post.last_publication_date, "dd MMM yyyy, 'às' k:mm")
    : '';

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
            <div>
              <span>
                <FiCalendar size={20} />
                {firstPublicationDate}
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

            {post.last_publication_date && (
              <p>{`* editado em ${lastPublicationDate}`}</p>
            )}
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

      <footer className={`${commonStyles.container} ${styles.postFooter}`}>
        {(nextPost || prevPost) && (
          <div className={styles.postPagination}>
            <hr />
            <div className={styles.postLinks}>
              <div>
                {nextPost && (
                  <>
                    <p>{nextPost.data.title}</p>
                    <Link href={`/post/${nextPost.uid}`}>
                      <a>Post anterior</a>
                    </Link>
                  </>
                )}
              </div>

              <div>
                {prevPost && (
                  <>
                    <p>{prevPost.data.title}</p>
                    <Link href={`/post/${prevPost.uid}`}>
                      <a>Próximo post</a>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {preview && <ExitPreview />}
      </footer>
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
  preview = false,
  previewData,
}) => {
  const slug = params?.slug as string;

  if (!slug) {
    return { props: { post: {} as PostProps } };
  }

  const prismic = getPrismicClient();
  const response = await prismic.getByUID('post', slug, {
    ref: previewData?.ref ?? null,
  });

  // Próximo post
  const nextResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date desc]',
    }
  );

  // Post anterior
  const prevResponse = await prismic.query(
    Prismic.Predicates.at('document.type', 'post'),
    {
      pageSize: 1,
      after: response.id,
      orderings: '[document.first_publication_date]',
    }
  );

  const nextPost = nextResponse?.results[0] ?? null;
  const prevPost = prevResponse?.results[0] ?? null;

  const post: Post = {
    uid: response.uid || '',
    first_publication_date: response?.first_publication_date,
    last_publication_date: response?.last_publication_date,
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
      preview,
      post,
      nextPost,
      prevPost,
    },
  };
};
