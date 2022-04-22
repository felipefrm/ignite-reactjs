import { FiCalendar, FiClock, FiUser } from "react-icons/fi";

import styles from './postinfo.module.scss'

export default function PostInfo({ date, author, readTime = null }) {
  return (
    <div className={styles.info}>
      <span>
        <FiCalendar />
        <time>{date}</time>
      </span>
      <span>
        <FiUser />
        <p>{author}</p>
      </span>
      {readTime &&
        <span>
          <FiClock />
          <p>{readTime} min</p>
        </span>
      }
    </div>
  )
}