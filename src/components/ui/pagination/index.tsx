import { Icon } from '@components'
import { ReactElement } from 'react'
import styles from './pagination.module.scss'

interface PaginationProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps): ReactElement {
    return (
        <div className={styles.pagination}>
            <button
                className={styles.pagination__prev}
                onClick={(): void => onPageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
            >
                <Icon name="arrow-left" />
                Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    onClick={(): void => onPageChange(index + 1)}
                    disabled={currentPage === index + 1}
                >
                    {index + 1}
                </button>
            ))}

            <button
                className={styles.pagination__next}
                onClick={(): void => onPageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
            >
                Next
                <Icon name="arrow-right" />
            </button>
        </div>
    )
}

export default Pagination
