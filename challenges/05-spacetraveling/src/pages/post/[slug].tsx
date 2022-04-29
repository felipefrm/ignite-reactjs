import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';

import { formatDate } from '../../utils/formatDate';
import { computeReadTime } from '../../utils/computeReadTime';

import PostInfo from '../../components/PostInfo';
import Header from '../../components/Header';
import PreviewExitButton from '../../components/PreviewExitButton';
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
  preview: boolean;
  navigation: {
    prevPost: {
      uid: string;
      data: {
        title: string;
      }
    },
    nextPost: {
      uid: string;
      data: {
        title: string;
      }
    }
  }
}

export default function Post({ post, preview, navigation }: PostProps) {
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
      <article className={styles.post}>
        <img className={styles.banner} src="https://images.prismic.io/spacetraveling-felipefrm/1b21ee0b-402c-4096-acd7-5d1af22adb76_Banner.png?auto=compress,format" alt="Post Banner" />
        <main>
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


        </main>
        <footer>
          <div className={styles.navigation}>
            {navigation.prevPost &&
              <Link href={`/post/${navigation.prevPost.uid}`}>
                <div className={styles.prev}>
                  <p>{navigation.prevPost.data.title}</p>
                  <p>Post anterior</p>
                </div>
              </Link>
            }
            {navigation.nextPost &&
              <Link href={`/post/${navigation.nextPost.uid}`}>
                <div className={styles.next}>
                  <p>{navigation.nextPost.data.title}</p>
                  <p>Próximo post</p>
                </div>
              </Link>
            }
          </div>
          <Comments />
          { preview && <PreviewExitButton /> }
        </footer>
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

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData
}) => {
  const prismic = getPrismicClient({});

  const { slug } = params

  const response = await prismic.getByUID('posts', String(slug), {
    ref: previewData?.ref ?? null,
  })

  const prevPost = await prismic.getByType('posts', {
    pageSize: 1,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'asc'
    },
  })

  const nextPost = await prismic.getByType('posts', {
    pageSize: 1,
    after: response.id,
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc'
    },
  })

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
      post,
      preview,
      navigation: {
        prevPost: prevPost.results[0] ? prevPost.results[0] : null,
        nextPost: nextPost.results[0] ? nextPost?.results[0] : null
      }
    }
  }
};
