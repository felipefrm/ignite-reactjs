import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/formatDate';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

import PostInfo from '../components/PostInfo';

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
  const formattedPosts = postsPagination.results.map(post => ({
    ...post,
    first_publication_date: formatDate(post.first_publication_date)
  }))

  const [posts, setPosts] = useState<PostPagination>({
    next_page: postsPagination.next_page,
    results: formattedPosts
  })

  async function handleLoadPosts() {
    if (posts.next_page !== null) {
      fetch(posts.next_page)
        .then(response => response.json())
        .then(data => {
          const newPostsData = data.results.map((post: Post) => ({
            uid: post.uid,
            first_publication_date: formatDate(post.first_publication_date),
            data: {
              title: post.data.title,
              subtitle: post.data.subtitle,
              author: post.data.author,
            }
          }
          ))

          const updatedPosts: PostPagination = {
            next_page: data.next_page,
            results: [...posts.results, ...newPostsData]
          }

          setPosts(updatedPosts)
        })
    }
  }


  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <header className={styles.headerContainer}>
        <div className={styles.headerContent}>
          <img src="/images/Logo.svg" alt="logo" />
        </div>
      </header>

      <main className={styles.container}>
        {posts.results.map(post => (
          <div key={post.uid} className={styles.posts}>
            <Link href={`/post/${post.uid}`}>
              <a>
                <strong>{post.data.title}</strong>
                <p>{post.data.subtitle}</p>
                <PostInfo
                  date={post.first_publication_date}
                  author={post.data.author}
                />
              </a>
            </Link>
          </div>
        ))}

        {posts.next_page &&
          <button
            type='button'
            onClick={handleLoadPosts}
          >
            Carregar mais posts
          </button>
        }

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient({});
  const postsResponse = await prismic.getByType('posts', { pageSize: 1 });

  const postsData = postsResponse.results.map(post => ({
    uid: post.uid,
    first_publication_date: post.first_publication_date,
    data: {
      title: post.data.title,
      subtitle: post.data.subtitle,
      author: post.data.author,
    }
  }))

  const postsPagination: PostPagination = {
    next_page: postsResponse.next_page,
    results: postsData
  }

  return {
    props: {
      postsPagination
    }
  }
};
