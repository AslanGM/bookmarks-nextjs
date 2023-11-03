import { ReactElement } from 'react'
import styles from './footer.module.scss'

function Footer(): ReactElement {
    return (
        <footer className={styles.footer}>
            Created by{' '}
            <a
                href="https://aslangm.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Aslan
            </a>
        </footer>
    )
}

export default Footer
