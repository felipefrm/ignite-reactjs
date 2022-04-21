import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

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

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | spacetraveling</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <strong>Lorem ipsum dolor sit amet.</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            <div className={styles.info}>
              <span>
                <FiCalendar />
                <time>15 Mar 2021</time>
              </span>
              <span>
                <FiUser />
                <p>Felipe Melo</p>
              </span>
            </div>
          </a>
        </div>

        <div className={styles.posts}>
          <a href="#">
            <strong>Lorem ipsum dolor sit amet.</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            <div className={styles.info}>
              <span>
                <FiCalendar />
                <time>15 Mar 2021</time>
              </span>
              <span>
                <FiUser />
                <p>Felipe Melo</p>
              </span>
            </div>
          </a>
        </div>

        <div className={styles.posts}>
          <a href="#">
            <strong>Lorem ipsum dolor sit amet.</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            <div className={styles.info}>
              <span>
                <FiCalendar />
                <time>15 Mar 2021</time>
              </span>
              <span>
                <FiUser />
                <p>Felipe Melo</p>
              </span>
            </div>
          </a>
        </div>

        <div className={styles.posts}>
          <a href="#">
            <strong>Lorem ipsum dolor sit amet.</strong>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
            <div className={styles.info}>
              <span>
                <FiCalendar />
                <time>15 Mar 2021</time>
              </span>
              <span>
                <FiUser />
                <p>Felipe Melo</p>
              </span>
            </div>
          </a>
        </div>

        <button type='button'>Carregar mais posts</button>

      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient({});
//   // const postsResponse = await prismic.getByType(TODO);

//   // TODO
// };
