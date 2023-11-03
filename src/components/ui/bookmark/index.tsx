import { Button } from '@components'
import { BookmarkType, ensureProtocol, isValidUrl, useBookmarkStore } from '@utils'
import { ReactElement, useState } from 'react'
import styles from './bookmark.module.scss'

function Bookmark({ id, title: initialTitle, url: initialUrl }: BookmarkType): ReactElement {
    const [isEditing, setIsEditing] = useState(false)
    const [tempTitle, setTempTitle] = useState(initialTitle)
    const [tempUrl, setTempUrl] = useState(initialUrl)
    const [error, setError] = useState('')
    const editBookmark = useBookmarkStore(state => state.editBookmark)
    const removeBookmark = useBookmarkStore(state => state.removeBookmark)

    const handleEdit = (): void => {
        setIsEditing(true)
    }

    const handleUpdate = (): void => {
        if (!tempUrl) {
            setError('The URL field cannot be empty.')
            return
        }

        if (!isValidUrl(tempUrl)) {
            setError('Please enter a valid URL.')
            return
        }

        editBookmark(id, { title: tempTitle, url: ensureProtocol(tempUrl) })
        setIsEditing(false)
        setError('')
    }

    const handleRemove = (): void => {
        removeBookmark(id)
    }

    return (
        <div className={styles.bookmark}>
            {isEditing ? (
                <>
                    <div className={styles.bookmark__input}>
                        <input
                            type="text"
                            value={tempTitle}
                            onChange={(e): void => setTempTitle(e.target.value)}
                            placeholder="Bookmark Title"
                        />
                    </div>
                    <div className={styles.bookmark__input}>
                        <input
                            className={error ? 'has-error' : ''}
                            type="text"
                            value={tempUrl}
                            onChange={(e): void => setTempUrl(e.target.value)}
                            placeholder="Bookmark URL"
                        />
                        {error && <div className="error">{error}</div>}
                    </div>
                </>
            ) : (
                <>
                    <h3 className={styles.bookmark__title}>
                        <a
                            href={initialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {initialTitle || 'No Title'}
                        </a>
                    </h3>
                    <a
                        className={styles.bookmark__url}
                        href={initialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {initialUrl}
                    </a>
                </>
            )}
            <div className={styles.bookmark__btns}>
                {isEditing ? (
                    <>
                        <Button
                            onClick={handleUpdate}
                            icon="check-mark"
                            color="brown"
                        >
                            Update
                        </Button>
                        <Button
                            onClick={(): void => {
                                setIsEditing(false)
                                setTempTitle(initialTitle)
                                setTempUrl(initialUrl)
                            }}
                            icon="x-mark"
                            color="red"
                        >
                            Cancel
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={handleEdit}
                            icon="pencil"
                            color="brown"
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={handleRemove}
                            icon="trash"
                            color="red"
                        >
                            Remove
                        </Button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Bookmark
