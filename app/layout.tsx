import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import './globals.css'
import { AREA_SERVED, BUSINESS, CORE_SERVICES, NOINDEX, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'

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
    /*
     * Auf der Vorschau-Instanz zusaetzlich zur gesperrten robots.txt ein
     * `noindex` im Head. Das ist keine Doppelung ohne Zweck: an die robots.txt
     * halten sich die grossen Suchmaschinen, etliche KI-Crawler aber nicht –
     * die lesen dann wenigstens das Meta-Tag.
     */
    robots: NOINDEX
        ? { index: false, follow: false, googleBot: { index: false, follow: false } }
        : {
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
        images: [{ url: '/images/og-lindermedia.jpg', width: 1200, height: 630, alt: 'LinderMedia — Markenstrategie, Corporate Design und digitale Umsetzung' }],
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
 *
 * Grundregel: ausgezeichnet wird nur, was auf der Seite auch sichtbar steht
 * und belegbar ist. Deshalb hier bewusst KEINE Preisspanne, keine Bewertungen,
 * kein `sameAs` auf Profile ohne eindeutige Zuordnung und im OfferCatalog nur
 * die drei Hauptbereiche aus dem sichtbaren Leistungsteaser – nicht die
 * Einzeldisziplinen aus der System-Grafik.
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
            telephone: BUSINESS.telephone,
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
            knowsLanguage: ['de'],
            hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Leistungen',
                itemListElement: CORE_SERVICES.map((s) => ({
                    '@type': 'Offer',
                    itemOffered: { '@type': 'Service', name: s.name, description: s.description, provider: { '@id': `${SITE_URL}/#organization` } },
                })),
            },
        },
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#andreas-linder`,
            name: BUSINESS.founder,
            // Genau die Rolle, die im Abschnitt „Über LinderMedia" steht.
            jobTitle: 'Gründer',
            image: `${SITE_URL}/images/andi.webp`,
            worksFor: { '@id': `${SITE_URL}/#organization` },
            url: `${SITE_URL}/#ueber-uns`,
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
