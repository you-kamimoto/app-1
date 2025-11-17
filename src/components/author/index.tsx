import type { Author } from '../../libs/cms'
import styles from './index.module.css'
import { clsx } from 'clsx'

type Props = {
  author: Author
  className?: string
}

export default function Author({ author, className }: Props) {
  return (
    <div className={clsx(styles.author, className)}>
      <div aria-hidden="true" className={styles.avatar} style={{ '--avatar': `${author?.avatar}` } as React.CSSProperties}></div>
      <p className={styles.name}>{author.name}</p>
    </div>
  )
}
 