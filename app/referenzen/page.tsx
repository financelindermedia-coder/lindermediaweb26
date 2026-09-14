import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Referenzen from '@/components/sections/Referenzen'
import { FALLSTUDIEN } from '@/lib/cases'
import { BUSINESS, SITE_URL } from '@/lib/site'

/**
 * Referenzen als eigenes, reduziertes Portfolio – getrennt von /leistungen
 * (siehe Plan "Leistungen als ein System, Referenzen als eigenes Portfolio").
 * Leistungen zeigt die Methode, diese Seite zeigt die Arbeit; die
 * ausfuehrliche Geschichte je Projekt steht unveraendert auf
 * /projekte/[slug].
 */
export const metadata: Metadata = {
    title: { absolute: 'Referenzen | LinderMedia' },
    description:
        'Aus Strategie, Design und digitaler Umsetzung entstehen echte Projekte – die Referenzen von LinderMedia.',
    alternates: { canonical: '/referenzen' },
    openGraph: {
        title: 'Referenzen | LinderMedia',
        description: 'Aus Strategie, Design und digitaler Umsetzung entstehen echte Projekte.',
        url: `${SITE_URL}/referenzen`,
        type: 'website',
        images: [`${SITE_URL}/images/og-lindermedia.jpg`],
    },
}

export default function ReferenzenPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'ItemList',
                '@id': `${SITE_URL}/referenzen#projekte`,
                itemListElement: FALLSTUDIEN.map((f, i) => ({
                    '@type': 'ListItem',
                    position: i + 1,
                    name: f.name,
                    url: `${SITE_URL}${f.fallstudie}`,
                })),
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${SITE_URL}/referenzen/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Referenzen', item: `${SITE_URL}/referenzen` },
                ],
            },
        ],
    }

    return (
        <main className="csx-page lst-page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <div className="csx-topbar lst-topbar">
                <Link href="/" className="csx-back">← Startseite</Link>
            </div>

            <Referenzen projekte={FALLSTUDIEN} />

            <Footer />
        </main>
    )
}
