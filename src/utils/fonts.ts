import localFont from 'next/font/local'

export const ffMono = localFont({
    src: [
        {
            path: '../../public/fonts/PPNeueMontreal-Book.woff2',
            weight: '400',
            style: 'normal'
        },
        {
            path: '../../public/fonts/PPFormula-CondensedBlack.woff2',
            weight: '700',
            style: 'normal'
        }
    ]
})
