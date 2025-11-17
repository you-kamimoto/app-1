// src/components/header/index.tsx
import { Link, NavLink } from 'react-router-dom'
import styles from './index.module.css'

export type Props = {
    layout?: 'home' | 'default'
}

export default function Header({ layout = 'default' }: Props) {
    return (
        <header className={styles.header} data-layout={layout}>
            <div>
                <div>
                    <Link to="/">
                        <img
                            src={`https://github.com/identicons/${import.meta.env.VITE_GIT_NAME}.png`}
                            alt={`${import.meta.env.VITE_GIT_NAME}`}
                            width={420}
                            height={420}
                            loading='eager'
                            fetchPriority='high'
                        />
                    </Link>
                    <p>{import.meta.env.VITE_GIT_NAME}</p>
                </div>
                <nav>
                    <NavLink prefetch="viewport" end to="/posts">Posts</NavLink>
                    <NavLink prefetch="viewport" end to="/about">About</NavLink>
                </nav>
            </div>
        </header>
    )
}