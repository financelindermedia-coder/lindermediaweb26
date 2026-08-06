import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import './globals.css'
import { AREA_SERVED, BUSINESS, SERVICES, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'

const barlow = Barlow({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800', '900'],
    variable: '--font-barlow',
    display: 'swap',
})

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: {
        default: SITE_TITLE,
        template: '%s — LinderMedia',
    },
    description: SITE_DESCRIPTION,
    applicationName: 'LinderMedia',
    keywords: [
        'Markenstrategie',
        'Markenentwicklung',
        'Corporate Design',
        'Werbeagentur Westerwald',
        'Werbeagentur Montabaur',
        'Webdesign Westerwald',
        'SEO Agentur',
        'Filmproduktion',
        'CGI 3D Visualisierung',
        'Positionierung',
        'LinderMedia',
        'Andreas Linder',
    ],
    authors: [{ name: BUSINESS.founder }],
    creator: BUSINESS.name,
    publisher: BUSINESS.name,
    alternates: { canonical: '/' },
    robots: {
        index: true,
        follow: true,
        googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
    },
    openGraph: {
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        type: 'website',
        locale: 'de_DE',
        siteName: BUSINESS.name,
        images: [{ url: '/images/og-lindermedia.jpg', width: 1200, height: 630, alt: 'LinderMedia — Markenstrategie, Design und Sichtbarkeit aus einer Hand' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: ['/images/og-lindermedia.jpg'],
    },
    category: 'Marketing',
    formatDetection: { telephone: false },
}

/**
 * Structured Data als @graph: eine Entität „LinderMedia" (ProfessionalService
 * mit vollständigen NAP-Daten für die lokale Suche), die Person Andreas Linder
 * und die Website. Google und KI-Systeme lesen daraus ab, wer wir sind, wo wir
 * sitzen und was wir anbieten – ohne es aus dem Fließtext raten zu müssen.
 */
const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': ['ProfessionalService', 'Organization'],
            '@id': `${SITE_URL}/#organization`,
            name: BUSINESS.name,
            legalName: BUSINESS.legalName,
            alternateName: 'Linder Media',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo/logo_LM_white_box.svg` },
            image: `${SITE_URL}/images/og-lindermedia.jpg`,
            description: SITE_DESCRIPTION,
            slogan: 'Starke Marken entstehen nicht an der Oberfläche.',
            email: BUSINESS.email,
            address: {
                '@type': 'PostalAddress',
                streetAddress: BUSINESS.street,
                postalCode: BUSINESS.postalCode,
                addressLocality: BUSINESS.city,
                addressRegion: BUSINESS.region,
                addressCountry: BUSINESS.country,
            },
            geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.latitude, longitude: BUSINESS.longitude },
            areaServed: AREA_SERVED.map((name) => ({ '@type': 'AdministrativeArea', name })),
            founder: { '@id': `${SITE_URL}/#andreas-linder` },
            knowsLanguage: ['de', 'en'],
            priceRange: '€€',
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Leistungen',
                itemListElement: SERVICES.map((s) => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: s.name, description: s.description, provider: { '@id': `${SITE_URL}/#organization` } },
                })),
            },
        },
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#andreas-linder`,
            name: BUSINESS.founder,
            jobTitle: 'Inhaber & Markenstratege',
            worksFor: { '@id': `${SITE_URL}/#organization` },
            url: SITE_URL,
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: BUSINESS.name,
            description: SITE_DESCRIPTION,
            inLanguage: 'de-DE',
            publisher: { '@id': `${SITE_URL}/#organization` },
        },
    ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className={barlow.variable}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
