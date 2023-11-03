import { Bookmark, Pagination } from '@components'
import { useHydratedPersistantStore } from '@hooks'
import { useBookmarkStore } from '@utils'
import gsap from 'gsap'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ReactElement, useState } from 'react'

gsap.registerPlugin(ScrollToPlugin)

const itemsPerPage = 20

function BookmarkList(): ReactElement {
    const isHydrated = useHydratedPersistantStore()
    const bookmarks = useBookmarkStore(state => state.bookmarks)
    const reversedBookmarks = [...bookmarks].reverse()
    const [currentPage, setCurrentPage] = useState(1)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = reversedBookmarks.slice(indexOfFirstItem, indexOfLastItem)
    const totalPages = Math.ceil(bookmarks.length / itemsPerPage)

    const handlePageChange = (page: number): void => {
        setCurrentPage(page)
        gsap.to(window, { duration: 1, scrollTo: 0, ease: 'expo.inOut' })
    }

    if (!isHydrated) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div>
                {currentItems.map(bookmark => (
                    <Bookmark
                        key={bookmark.id}
                        id={bookmark.id}
                        title={bookmark.title}
                        url={bookmark.url}
                    />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </>
    )
}

export default BookmarkList
