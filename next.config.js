/** @type {import('next').NextConfig} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withTM = require( 'next-transpile-modules' )( [ 'gsap' ] )
const nextConfig = withTM( {
    reactStrictMode: true,
} )

module.exports = nextConfig
