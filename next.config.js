/*
 * Vorschau-Sperre – dieselbe Variable wie NOINDEX in lib/site.ts, hier noch
 * einmal roh gelesen, weil next.config.js nicht aus dem TypeScript-Code
 * importieren kann. Der Header greift im Gegensatz zum Meta-Tag auch fuer
 * Videos, Bilder und die Framesequenz, die sonst ueber die Bildersuche
 * auffindbar blieben.
 */
const NOINDEX = ['1', 'true'].includes((process.env.NEXT_PUBLIC_NOINDEX ?? '').trim().toLowerCase())

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
            ...(NOINDEX
                ? [{
                      source: '/:path*',
                      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
                  }]
                : []),
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
