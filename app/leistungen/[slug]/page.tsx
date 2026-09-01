import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Footer from '@/components/Footer'
import {
    LeistungHero,
    LeistungLeitgedanke,
    LeistungOutro,
    LeistungUmfang,
    LeistungVerweise,
} from '@/components/sections/LeistungBausteine'
import { FALLSTUDIEN } from '@/lib/cases'
import { LEISTUNGEN, andereLeistungen, findeLeistung } from '@/lib/leistungen'
import { BUSINESS, SITE_URL } from '@/lib/site'

/**
 * Die Leistungsseiten unter /leistungen/….
 *
 * Eine Route für alle neun Disziplinen: Der Aufbau ist auf jeder Seite gleich,
 * nur der Inhalt kommt aus lib/leistungen. Neun einzelne Dateien wären neunmal
 * dieselbe Struktur zum Auseinanderlaufen.
 *
 * Server-Component: Metadaten, Structured Data und die Seiten selbst entstehen
 * beim Build. Nur die Abschnitte sind Client-Components – allein wegen des
 * Einblendens beim Scrollen.
 */

/**
 * Weiche Trennzeichen aus einem Label entfernen.
 *
 * Die Namen im Leistungsumfang tragen U+00AD an den Wortfugen, damit die
 * Kacheln richtig umbrechen (siehe lib/leistungen). Im Structured Data haben
 * die unsichtbaren Zeichen nichts zu suchen: Google liest den Namen dann mit
 * einem Steuerzeichen mitten im Wort.
 */
const ohneTrennung = (s: string) => s.replace(/[\u00ad\u200b]/g, '')

export function generateStaticParams() {
    return LEISTUNGEN.map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const leistung = findeLeistung(params.slug)
    if (!leistung) return {}

    const url = `${SITE_URL}/leistungen/${leistung.slug}`
    return {
        // `absolute`, weil das Layout sonst „ — LinderMedia" anhängt und der
        // Titel damit zweimal die Marke trüge.
        title: { absolute: leistung.seoTitle },
        description: leistung.seoDescription,
        alternates: { canonical: `/leistungen/${leistung.slug}` },
        openGraph: {
            title: leistung.seoTitle,
            description: leistung.seoDescription,
            url,
            type: 'website',
            images: [`${SITE_URL}/images/og-lindermedia.jpg`],
        },
    }
}

export default function LeistungPage({ params }: { params: { slug: string } }) {
    const leistung = findeLeistung(params.slug)
    if (!leistung) notFound()

    const cases = leistung.cases
        .map((slug) => FALLSTUDIEN.find((f) => f.slug === slug))
        .filter((f): f is (typeof FALLSTUDIEN)[number] => Boolean(f))

    /*
     * Structured Data: der Dienst selbst und der Weg dorthin.
     *
     * `Service` verweist auf dieselbe Organisation wie der Graph im Layout,
     * damit Google die Leistung der bekannten Entität zuordnet und nicht einem
     * zweiten, namenlosen Anbieter. Ausgezeichnet wird nur, was auf der Seite
     * auch sichtbar steht – der Leistungsumfang ist genau die Liste darunter.
     */
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `${SITE_URL}/leistungen/${leistung.slug}/#service`,
                name: leistung.name,
                description: leistung.seoDescription,
                serviceType: leistung.name,
                provider: { '@id': `${SITE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Deutschland' },
                url: `${SITE_URL}/leistungen/${leistung.slug}`,
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: leistung.umfangTitel,
                    itemListElement: leistung.umfang.map((p) => ({
                        '@type': 'Offer',
                        itemOffered: {
                            '@type': 'Service',
                            name: ohneTrennung(p.name),
                            ...(p.text ? { description: p.text } : {}),
                        },
                    })),
                },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${SITE_URL}/leistungen/${leistung.slug}/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: SITE_URL },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Leistungen',
                        item: `${SITE_URL}/#leistungen`,
                    },
                    {
                        '@type': 'ListItem',
                        position: 3,
                        name: leistung.name,
                        item: `${SITE_URL}/leistungen/${leistung.slug}`,
                    },
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

            <LeistungHero
                eyebrow={`Leistung · ${leistung.name}`}
                h1={leistung.h1}
                intro={leistung.intro}
                text={leistung.text}
            />

            <LeistungUmfang index="01" titel={leistung.umfangTitel} punkte={leistung.umfang} />

            {leistung.leitgedanke && (
                <LeistungLeitgedanke
                    headline={leistung.leitgedanke.headline}
                    text={leistung.leitgedanke.text}
                />
            )}

            <LeistungVerweise
                index="02"
                cases={cases}
                andere={andereLeistungen(leistung.slug)}
            />

            <LeistungOutro frage={leistung.ctaFrage} label={leistung.ctaLabel} />

            <Footer />
        </main>
    )
}
