import { ReactElement } from 'react'
import styles from './header.module.scss'

function Header(): ReactElement {
    return (
        <header className={styles.header}>
            <h1>Your Favourite Bookmarks</h1>
        </header>
    )
}

export default Header
