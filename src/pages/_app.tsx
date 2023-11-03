import { ffMono } from '@/utils'
import preloadedLinks from '@data/preloaded-links'
import '@styles/_general.scss'
import { useBookmarkStore } from '@utils'
import type { AppProps } from 'next/app'
import { ReactElement, useEffect } from 'react'

export default function App({ Component, pageProps }: AppProps): ReactElement {
    const initializeBookmarks = useBookmarkStore(state => state.initialize)

    useEffect(() => {
        initializeBookmarks(preloadedLinks)
    }, [initializeBookmarks])

    return (
        <div className={`o-container ${ffMono.className}`}>
            <main>
                <Component {...pageProps} />
            </main>
        </div>
    )
}
