import { useState } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';
import { formatDate } from '../utils/formatDate';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';
import { FiCalendar, FiUser } from 'react-icons/fi';

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

  const [posts, setPosts] = useState(postsPagination)

  async function handleLoadPosts() {
    fetch(postsPagination.next_page)
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


  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        {posts.results.map(post => (
          <div key={post.uid} className={styles.posts}>
            <a href="#">
              <strong>{post.data.title}</strong>
              <p>{post.data.subtitle}</p>
              <div className={styles.info}>
                <span>
                  <FiCalendar />
                  <time>{post.first_publication_date}</time>
                </span>
                <span>
                  <FiUser />
                  <p>{post.data.author}</p>
                </span>
              </div>
            </a>
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
    first_publication_date: formatDate(post.first_publication_date),
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
