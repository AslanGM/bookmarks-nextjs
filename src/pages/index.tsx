import { BookmarkList, Footer, Header, SubmitForm } from '@/components'
import { ReactElement } from 'react'

export default function Home(): ReactElement {
    return (
        <>
            <Header />
            <SubmitForm />
            <BookmarkList />
            <Footer />
        </>
    )
}
