import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import { formatDate } from '../../utils/formatDate';
import { computeReadTime } from '../../utils/computeReadTime';

import PostInfo from '../../components/PostInfo';
import Header from '../../components/Header';
import { Comments } from '../../components/Comments';

import styles from './post.module.scss';

interface Post {
  uid: string,
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
  post: Post;
}

export default function Post({ post }: PostProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <h1>Carregando...</h1>
  }

  return (
    <>
      <Head>
        <title>{post.data.title} | spacetraveling</title>
      </Head>
      <Header />
      <article>
        <img className={styles.banner} src="https://images.prismic.io/spacetraveling-felipefrm/1b21ee0b-402c-4096-acd7-5d1af22adb76_Banner.png?auto=compress,format" alt="Post Banner" />
        <main className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <PostInfo
              date={formatDate(post.first_publication_date, "date")}
              author={post.data.author}
              readTime={computeReadTime(post.data.content)}
            />
            {post.last_publication_date &&
              <p className={styles.updatedAt}>
                * editado em {formatDate(post.last_publication_date, "datetime")}
              </p>
            }
          </div>

          {post.data.content.map(content => (
            <section key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body)
                }}
              />
            </section>
          ))}

          <Comments />

        </main>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  const paths = posts.results.map(post => ({
    params: {
      slug: post.uid
    }
  }))

  return {
    paths: paths,
    fallback: true
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const { slug } = params

  const response = await prismic.getByUID('posts', String(slug))

  const post: Post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    last_publication_date: response.last_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url
      },
      content: response.data.content
    }
  }

  return {
    props: {
      post
    }
  }
};
