import Link from 'next/link'
import styles from './previewExit.module.scss'

export default function PreviewExitButton() {
  return (
    <aside className={styles.preview}>
      <Link href="/api/exit-preview">
        <a>Sair do modo Preview</a>
      </Link>
    </aside>
  )
}
