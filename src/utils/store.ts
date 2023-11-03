import create from 'zustand'
import { persist } from 'zustand/middleware'

export type BookmarkType = {
    id: number
    title: string
    url: string
}

type BookmarkStore = {
    bookmarks: BookmarkType[]
    addBookmark: (bookmark: BookmarkType) => void
    removeBookmark: (id: number) => void
    editBookmark: (id: number, updatedBookmark: Omit<BookmarkType, 'id'>) => void
    initialize: (bookmark: BookmarkType[]) => void
}

export const useBookmarkStore = create<BookmarkStore>()(
    persist(
        set => ({
            bookmarks: [],
            addBookmark: (bookmark: BookmarkType): void =>
                set(state => {
                    const updatedBookmarks = [...state.bookmarks, bookmark]
                    return { bookmarks: updatedBookmarks }
                }),
            removeBookmark: (id: number): void =>
                set(state => {
                    const updatedBookmarks = state.bookmarks.filter(bookmark => bookmark.id !== id)
                    return { bookmarks: updatedBookmarks }
                }),
            editBookmark: (id: number, updatedBookmark: Omit<BookmarkType, 'id'>): void =>
                set(state => {
                    const updatedBookmarks = state.bookmarks.map(bookmark =>
                        bookmark.id === id ? { ...bookmark, ...updatedBookmark } : bookmark
                    )
                    return { bookmarks: updatedBookmarks }
                }),
            initialize: (preloadedLinks: BookmarkType[]): void =>
                set(state => {
                    if (state.bookmarks.length === 0) {
                        return { bookmarks: preloadedLinks }
                    }
                    return state // Return the current state if bookmarks is not empty
                })
        }),
        {
            name: 'bookmark-storage' // unique name
        }
    )
)
