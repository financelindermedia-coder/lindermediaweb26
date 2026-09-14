import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { LeistungHero, LeistungLeitgedanke, LeistungOutro } from '@/components/sections/LeistungBausteine'
import LeistungenScroller from '@/components/sections/LeistungenScroller'
import LeistungSystem, { LeistungDock, type SystemKante, type SystemKnoten } from '@/components/sections/LeistungSystem'
import { LEISTUNGEN } from '@/lib/leistungen'
import { BUSINESS, SITE_URL } from '@/lib/site'

/**
 * Die Leistungen als ein zusammenhaengendes System statt neun Einzelseiten
 * oder vier Einzelseiten (siehe Plan "Leistungen als ein System, Referenzen
 * als eigenes Portfolio" – dritte Fassung dieses Umbaus in dieser Sitzung).
 *
 * Vier Graphen (`LeistungSystem`, aus dem Webdesign-Prototyp unveraendert
 * wiederverwendet), je Stufe: die Stufe selbst als Wurzel, ihre Bausteine als
 * Aeste. Bausteinnamen sind bewusst vereinfachte Sammelbegriffe aus der
 * Anweisung, nicht die granularen `umfang`-Listen aus lib/leistungen.ts – auf
 * dieser Flughoehe geht es um das Zusammenspiel, nicht um jede Einzelleistung.
 *
 * KEINE Case-/Projekt-Bezuege auf dieser Seite (siehe Auftrag) – die stehen
 * jetzt auf /referenzen.
 */

const KLARHEIT: { reihen: SystemKnoten[][]; kanten: SystemKante[] } = {
    reihen: [
        [{ id: 'klarheit', label: 'Klarheit' }],
        [
            { id: 'positionierung', label: 'Positionierung' },
            { id: 'zielgruppe', label: 'Zielgruppe' },
            { id: 'botschaft', label: 'Botschaft' },
            { id: 'markenstrategie', label: 'Markenstrategie' },
        ],
    ],
    kanten: [
        { from: 'klarheit', to: 'positionierung' },
        { from: 'klarheit', to: 'zielgruppe' },
        { from: 'klarheit', to: 'botschaft' },
        { from: 'klarheit', to: 'markenstrategie' },
    ],
}

const CHARAKTER: { reihen: SystemKnoten[][]; kanten: SystemKante[] } = {
    reihen: [
        [{ id: 'charakter', label: 'Charakter' }],
        [
            { id: 'corporate-design', label: 'Corporate Design' },
            { id: 'logo', label: 'Logo' },
            { id: 'typografie', label: 'Typografie' },
            { id: 'farbwelt', label: 'Farbwelt' },
            { id: 'bildwelt', label: 'Bildwelt' },
            { id: 'art-direction', label: 'Art Direction' },
        ],
    ],
    kanten: [
        { from: 'charakter', to: 'corporate-design' },
        { from: 'charakter', to: 'logo' },
        { from: 'charakter', to: 'typografie' },
        { from: 'charakter', to: 'farbwelt' },
        { from: 'charakter', to: 'bildwelt' },
        { from: 'charakter', to: 'art-direction' },
    ],
}

const PRAESENZ: { reihen: SystemKnoten[][]; kanten: SystemKante[] } = {
    reihen: [
        [{ id: 'praesenz', label: 'Präsenz' }],
        [
            { id: 'webdesign', label: 'Webdesign' },
            { id: 'websites', label: 'Websites' },
            { id: 'fotografie', label: 'Fotografie' },
            { id: 'film', label: 'Film' },
            { id: 'video', label: 'Video' },
            { id: '3d', label: '3D' },
        ],
    ],
    kanten: [
        { from: 'praesenz', to: 'webdesign' },
        { from: 'praesenz', to: 'websites' },
        { from: 'praesenz', to: 'fotografie' },
        { from: 'praesenz', to: 'film' },
        { from: 'praesenz', to: 'video' },
        { from: 'praesenz', to: '3d' },
    ],
}

const WIRKUNG: { reihen: SystemKnoten[][]; kanten: SystemKante[] } = {
    reihen: [
        [{ id: 'wirkung', label: 'Wirkung' }],
        [
            { id: 'seo', label: 'SEO' },
            { id: 'content', label: 'Content' },
            { id: 'marketing', label: 'Marketing' },
            { id: 'ads', label: 'Ads' },
            { id: 'automatisierung', label: 'Automatisierung' },
        ],
    ],
    kanten: [
        { from: 'wirkung', to: 'seo' },
        { from: 'wirkung', to: 'content' },
        { from: 'wirkung', to: 'marketing' },
        { from: 'wirkung', to: 'ads' },
        { from: 'wirkung', to: 'automatisierung' },
    ],
}

export const metadata: Metadata = {
    title: { absolute: 'Leistungen: Klarheit, Charakter, Präsenz, Wirkung | LinderMedia' },
    description:
        'Markenstrategie, Corporate Design, Webdesign und Sichtbarkeit greifen bei LinderMedia als ein zusammenhängendes System ineinander – nicht als Einzelleistungen.',
    alternates: { canonical: '/leistungen' },
    openGraph: {
        title: 'Leistungen: Klarheit, Charakter, Präsenz, Wirkung | LinderMedia',
        description:
            'Markenstrategie, Corporate Design, Webdesign und Sichtbarkeit greifen bei LinderMedia als ein zusammenhängendes System ineinander.',
        url: `${SITE_URL}/leistungen`,
        type: 'website',
        images: [`${SITE_URL}/images/og-lindermedia.jpg`],
    },
}

/** Welcher Stufen-Anker eine Disziplin heute traegt – fuer die Redirects der frueheren Einzelseiten und die Service-URLs im JSON-LD. */
const STUFE_ANKER: Record<string, string> = {
    markenstrategie: 'klarheit',
    'corporate-design': 'charakter',
    webdesign: 'praesenz',
    fotografie: 'praesenz',
    filmproduktion: 'praesenz',
    '3d-visualisierung': 'praesenz',
    seo: 'wirkung',
    marketing: 'wirkung',
    automatisierung: 'wirkung',
}

export default function LeistungenPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            ...LEISTUNGEN.map((l) => ({
                '@type': 'Service',
                '@id': `${SITE_URL}/leistungen#${l.slug}-service`,
                name: l.name,
                description: l.seoDescription,
                serviceType: l.name,
                provider: { '@id': `${SITE_URL}/#organization` },
                areaServed: { '@type': 'Country', name: 'Deutschland' },
                url: `${SITE_URL}/leistungen#${STUFE_ANKER[l.slug]}`,
            })),
            {
                '@type': 'BreadcrumbList',
                '@id': `${SITE_URL}/leistungen/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Leistungen', item: `${SITE_URL}/leistungen` },
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
                eyebrow="Wie wir arbeiten"
                h1={['Alles greift', 'ineinander.']}
                intro="Eine starke Marke entsteht nicht aus einer einzelnen Leistung."
                text={['Sondern aus Bausteinen, die zusammen funktionieren.']}
            />

            <LeistungenScroller />

            {/* Ein gemeinsamer Wrapper fuer alle vier Stufen – traegt die
                durchgehende Linie aus `.lsy-system::before` in globals.css,
                die die Zusammengehoerigkeit der vier Graphen sichtbar macht. */}
            <div className="lsy-system">
                <LeistungSystem
                    id="klarheit"
                    index="01"
                    titel="Wissen, wohin es gehen soll."
                    lead="Positionierung, Zielgruppe, Botschaft und Markenstrategie schaffen die Richtung."
                    reihen={KLARHEIT.reihen}
                    kanten={KLARHEIT.kanten}
                />
                <LeistungDock />
                <LeistungSystem
                    id="charakter"
                    index="02"
                    titel="Eine Richtung bekommt eine Form."
                    lead="Corporate Design, Typografie, Farbe und Bildwelt machen die Marke erkennbar."
                    reihen={CHARAKTER.reihen}
                    kanten={CHARAKTER.kanten}
                />
                <LeistungDock />
                <LeistungSystem
                    id="praesenz"
                    index="03"
                    titel="Die Marke wird sichtbar."
                    lead="Webdesign, Websites, Fotografie, Film, Video und 3D übersetzen die Marke in konkrete Erlebnisse."
                    reihen={PRAESENZ.reihen}
                    kanten={PRAESENZ.kanten}
                />
                <LeistungDock />
                <LeistungSystem
                    id="wirkung"
                    index="04"
                    titel="Sichtbarkeit wird zum Ergebnis."
                    lead="SEO, Content, Marketing, Ads und Automatisierung sorgen dafür, dass die Marke gefunden wird und etwas bewegt."
                    reihen={WIRKUNG.reihen}
                    kanten={WIRKUNG.kanten}
                />
            </div>

            <LeistungLeitgedanke
                label="Klarheit. Charakter. Präsenz. Wirkung."
                headline="Das Ganze ist mehr als die Einzelteile."
                text="Wenn Strategie, Identität, Präsenz und Sichtbarkeit zusammenspielen, entsteht eine Marke, die nicht nur gut aussieht, sondern funktioniert."
            />

            <LeistungOutro frage="Vier Bereiche. Ein System." label="Projekt besprechen" />

            <Footer />
        </main>
    )
}
