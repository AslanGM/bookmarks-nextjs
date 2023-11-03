import { Button, Icon } from '@/components'
import { ensureProtocol, isValidUrl, useBookmarkStore } from '@utils'
import gsap from 'gsap'
import { ReactElement, useEffect, useRef, useState } from 'react'
import styles from './submit-form.module.scss'

function SubmitForm(): ReactElement {
    const bookmarks = useBookmarkStore(state => state.bookmarks)
    const addBookmark = useBookmarkStore(state => state.addBookmark)
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [error, setError] = useState('')
    const formWrapperRef = useRef<HTMLDivElement>(null)
    const formHolderRef = useRef<HTMLDivElement>(null)
    const formSuccessRef = useRef<HTMLDivElement>(null)
    const addBtnRef = useRef<HTMLDivElement>(null)

    const handleOpenModal = (): void => {
        gsap.to(formWrapperRef.current, { autoAlpha: 1, duration: 0.3 })
    }

    const handleCloseModal = (): void => {
        gsap.to(formWrapperRef.current, { autoAlpha: 0, duration: 0.3 })
        gsap.set(formSuccessRef.current, { autoAlpha: 0, delay: 0.3 })
        gsap.set(formHolderRef.current, { autoAlpha: 1, delay: 0.3 })
        gsap.delayedCall(0.3, () => {
            setTitle('')
            setUrl('')
        })
    }

    useEffect(() => {
        const tween = gsap.fromTo(
            addBtnRef.current,
            {
                autoAlpha: 0,
                xPercent: -50
            },
            { autoAlpha: 1, xPercent: 0, duration: 1 }
        )

        return () => {
            tween.kill()
        }
    }, [])

    const handleSubmit = (e: React.FormEvent): void => {
        e.preventDefault()

        if (!url) {
            setError('The URL field cannot be empty.')
            return
        }

        if (!isValidUrl(url)) {
            setError('Please enter a valid URL.')
            return
        }

        const newBookmark = {
            id: bookmarks.length + 1,
            title,
            url: ensureProtocol(url)
        }

        addBookmark(newBookmark)
        setError('')

        gsap.to(formSuccessRef.current, { autoAlpha: 1, duration: 0.3 })
        gsap.to(formHolderRef.current, { autoAlpha: 0, duration: 0.3 })
    }

    return (
        <div className={styles.sform}>
            <div
                ref={addBtnRef}
                className={styles['sform__btn-holder']}
            >
                <Button
                    className={styles.sform__btn}
                    onClick={handleOpenModal}
                    icon="plus"
                    type="submit"
                    color="green"
                >
                    Add New Bookmark
                </Button>
            </div>
            <div
                ref={formWrapperRef}
                className={styles.sform__wrapper}
            >
                <div
                    className={styles.sform__overlay}
                    onClick={handleCloseModal}
                />
                <div
                    ref={formHolderRef}
                    className={styles.sform__holder}
                >
                    <button
                        className={styles.sform__close}
                        onClick={handleCloseModal}
                    >
                        <Icon name="x-mark" />
                    </button>
                    <h3>Add New Bookmark</h3>
                    <form
                        className={styles.sform__form}
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.sform__input}>
                            <input
                                type="text"
                                placeholder="Bookmark Title"
                                value={title}
                                onChange={(e): void => setTitle(e.target.value)}
                            />
                        </div>
                        <div className={styles.sform__input}>
                            <input
                                type="text"
                                placeholder="Bookmark URL"
                                value={url}
                                onChange={(e): void => setUrl(e.target.value)}
                                className={error ? 'has-error' : ''}
                            />
                            {error && <div className="error">{error}</div>}
                        </div>
                        <Button
                            className={styles['sform__form-btn']}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
                <div
                    ref={formSuccessRef}
                    className={styles.sform__success}
                >
                    <button
                        className={styles.sform__close}
                        onClick={handleCloseModal}
                    >
                        <Icon name="x-mark" />
                    </button>
                    <h3>
                        Thank you!
                        <br />
                        Your new Bookmark{' '}
                        {title && (
                            <a
                                href={ensureProtocol(url)}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                &apos;{title}&apos;
                            </a>
                        )}{' '}
                        is Added!
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default SubmitForm
