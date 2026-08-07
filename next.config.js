/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    compress: true,
    // Die Version im Response-Header verraet nur unnoetig etwas ueber den Stack.
    poweredByHeader: false,
    images: {
        formats: ['image/avif', 'image/webp'],
    },
    async headers() {
        return [
            {
                /*
                 * Statische Medien sind inhaltsadressiert genug: Bilder und
                 * Videos werden bei Aenderungen unter neuem Namen abgelegt
                 * (bzw. bewusst ersetzt). Ein Jahr immutable spart bei jedem
                 * zweiten Besuch den kompletten Medien-Download.
                 */
                source: '/:all*(webp|avif|jpg|jpeg|png|svg|mp4|webm|woff2)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                // Die 303 Eisberg-Frames aendern sich nur mit dem Quellvideo.
                source: '/frames/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig
