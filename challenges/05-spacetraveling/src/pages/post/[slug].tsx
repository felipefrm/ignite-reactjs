import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { RichText } from 'prismic-dom';
import { formatDate } from '../../utils/formatDate';

import PostInfo from '../../components/PostInfo';
import Header from '../../components/Header';
import { computeReadTime } from '../../utils/computeReadTime';


interface Post {
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
  return (
    <>
      <Header />
      <article>
        <img className={styles.banner} src="https://images.prismic.io/spacetraveling-felipefrm/1b21ee0b-402c-4096-acd7-5d1af22adb76_Banner.png?auto=compress,format" alt="Post Banner" />
        <main className={styles.content}>
          <h1>{post.data.title}</h1>
          <div className={styles.info}>
            <PostInfo
              date={post.first_publication_date}
              author={post.data.author}
              readTime={computeReadTime(post.data.content)}
            />
          </div>

          {post.data.content.map(content => (
            <section key={content.heading}>
              <h2>{content.heading}</h2>
              {content.body.map(paragraph => (
                <p key={Math.random()}>{paragraph.text}</p>
              ))}
            </section>
          ))}

        </main>
      </article>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient({});
  const posts = await prismic.getByType('posts');

  return {
    paths: [],
    fallback: 'blocking'
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const prismic = getPrismicClient({});

  const { slug } = params

  const response = await prismic.getByUID('posts', String(slug), {})

  const contentArray = response.data.content.map(content => ({
    heading: content.heading,
    body: content.body
  }))

  const post: Post = {
    first_publication_date: formatDate(response.first_publication_date),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url
      },
      author: response.data.author,
      content: contentArray
    }
  }

  return {
    props: {
      post
    }
  }
};
