import type { Metadata } from 'next'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { BUSINESS, SITE_URL } from '@/lib/site'
import './methode.css'

/**
 * Methode / Eisberg-Modell: die ruhige Vertiefung zum animierten Hero der
 * Startseite. Dort wird das Modell erlebt, hier erklaert – ohne die Animation
 * zu wiederholen. Die vier Ebenen entsprechen Wort fuer Wort denen im Hero
 * (components/HeroIceberg.tsx) und der Leistungsseite.
 *
 * Das Eisberg-Bild ist der letzte Frame des Hero-Clips (Konzeptvisualisierung,
 * KI-generiert) – es wird als solche gekennzeichnet.
 */

const TITLE = 'Die Methode: das Eisberg-Modell | LinderMedia'
const DESCRIPTION =
    'Strategie, Charakter, Markenpräsenz und Wirkung: Wie LinderMedia aus Komplexität eine klare Marke macht – das Eisberg-Modell im Überblick.'

export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/methode' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/methode`,
        type: 'website',
        images: [`${SITE_URL}/images/og-lindermedia.jpg`],
    },
}

const EBENEN = [
    {
        nr: '01',
        name: 'Strategie',
        rolle: 'gibt Richtung.',
        arbeit: 'Positionierung, Zielgruppe, Botschaft und Markenarchitektur.',
        nutzen: 'Es wird klar, wofür die Marke steht, wen sie erreichen soll und warum sie relevant ist.',
    },
    {
        nr: '02',
        name: 'Charakter',
        rolle: 'gibt Form.',
        arbeit: 'Corporate Design, Sprache, Art Direction und Bildwelt.',
        nutzen: 'Die strategische Richtung erhält eine eigene, wiedererkennbare Ausdrucksform.',
    },
    {
        nr: '03',
        name: 'Markenpräsenz',
        rolle: 'macht sichtbar.',
        arbeit: 'Website, Fotografie, Film und Video, 3D und Content.',
        nutzen: 'Die Marke wird an ihren wichtigen Kontaktpunkten erlebbar.',
    },
    {
        nr: '04',
        name: 'Wirkung',
        rolle: 'bringt Ergebnisse.',
        arbeit: 'SEO, Marketing, Ads, Automatisierung und Weiterentwicklung.',
        nutzen: 'Die Marke kann die richtigen Menschen erreichen und aus ihren Maßnahmen lernen.',
    },
]

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export default function MethodePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'WebPage',
                '@id': `${SITE_URL}/methode#webpage`,
                url: `${SITE_URL}/methode`,
                name: TITLE,
                description: DESCRIPTION,
                inLanguage: 'de-DE',
                isPartOf: { '@id': `${SITE_URL}/#website` },
                about: { '@id': `${SITE_URL}/#organization` },
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${SITE_URL}/methode#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: SITE_URL },
                    { '@type': 'ListItem', position: 2, name: 'Methode', item: `${SITE_URL}/methode` },
                ],
            },
        ],
    }

    return (
        <main className="mp">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

            <div className="mp-top">
                <Link href="/" className="csx-back">← Startseite</Link>
            </div>

            {/* 1 · Einstieg */}
            <header className="mp-hero">
                <p className="mp-eye">Die LinderMedia-Methode</p>
                <h1 className="mp-h1">
                    Was eine Marke sichtbar macht, <strong>beginnt unter der Oberfläche.</strong>
                </h1>
                <p className="mp-lead">
                    Ein starker Auftritt entsteht nicht durch einzelne Maßnahmen. Er entsteht, wenn
                    Strategie, Charakter, Markenpräsenz und Wirkung zusammenarbeiten.
                </p>
                <Link className="mp-btn" href="/#contact">Projekt besprechen <Arrow /></Link>
            </header>

            {/* 2 · Das Modell auf einen Blick */}
            <section className="mp-modell" aria-labelledby="mp-modell-h">
                <figure className="mp-figure">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/frames-hero/f_193.webp"
                        alt="Ein Eisberg im Querschnitt: über der Wasserlinie die sichtbare Spitze, darunter vier getrennte, durch orange Linien verbundene Schichten – Strategie, Charakter, Markenpräsenz und Wirkung."
                        width={1280}
                        height={720}
                        loading="eager"
                        decoding="async"
                        data-ai-generated="true"
                    />
                    <figcaption>Konzeptvisualisierung · KI-generiert</figcaption>
                </figure>
                <div className="mp-modell-text">
                    <h2 id="mp-modell-h" className="mp-h2">
                        Das Modell <strong>auf einen Blick.</strong>
                    </h2>
                    <p className="mp-p">
                        Oben wird eine Marke gesehen. Darunter entsteht, warum sie relevant und unterscheidbar ist.
                    </p>
                    <ol className="mp-kurz">
                        {EBENEN.map((e) => (
                            <li key={e.nr}><span>{e.nr}</span> {e.name} <em>{e.rolle}</em></li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* 3 · Vier Ebenen */}
            <section className="mp-ebenen" aria-labelledby="mp-ebenen-h">
                <h2 id="mp-ebenen-h" className="mp-h2">
                    Vier Ebenen, <strong>eine Marke.</strong>
                </h2>
                <div className="mp-grid">
                    {EBENEN.map((e) => (
                        <article key={e.nr} className="mp-card">
                            <p className="mp-card-nr">{e.nr}</p>
                            <h3 className="mp-card-h">{e.name} <strong>{e.rolle}</strong></h3>
                            <dl>
                                <dt>Arbeit</dt>
                                <dd>{e.arbeit}</dd>
                                <dt>Nutzen</dt>
                                <dd>{e.nutzen}</dd>
                            </dl>
                        </article>
                    ))}
                </div>
            </section>

            {/* 4 · Warum das Zusammenspiel zählt */}
            <section className="mp-warum" aria-labelledby="mp-warum-h">
                <h2 id="mp-warum-h" className="mp-h2">
                    Warum das Zusammenspiel <strong>zählt.</strong>
                </h2>
                <p className="mp-p mp-p--gross">
                    Eine hochwertige Website kann ins Leere laufen, wenn Zielgruppe und Botschaft unklar sind.
                    Eine gute Strategie bleibt unsichtbar, wenn sie nicht in Gestaltung, Inhalte und digitale
                    Kontaktpunkte übersetzt wird. Deshalb betrachten wir nicht nur einzelne Maßnahmen, sondern
                    die Verbindung zwischen ihnen.
                </p>
            </section>

            {/* 5 · Anwendungsbeispiel */}
            <section className="mp-beispiel" aria-labelledby="mp-beispiel-h">
                <div className="mp-beispiel-bild">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/case-solarimpact-hero-2.webp"
                        alt="Die Solar Impact Yacht liegt in der Dämmerung ruhig auf offener See, dahinter eine flache Bergkette."
                        width={1920}
                        height={1080}
                        loading="lazy"
                        decoding="async"
                    />
                </div>
                <div className="mp-beispiel-text">
                    <p className="mp-eye">Anwendungsbeispiel</p>
                    <h2 id="mp-beispiel-h" className="mp-h2">
                        Solar <strong>Impact Yacht.</strong>
                    </h2>
                    <p className="mp-p">
                        Wie wird aus einer komplexen Technologie eine verständliche Markenposition? Bei Solar
                        Impact Yacht begann die Antwort nicht mit einem Datenblatt, sondern mit der Veränderung,
                        die die Technologie für die Schifffahrt möglich machen sollte.
                    </p>
                    <Link className="mp-link" href="/projekte/solar-impact-yacht">Fallstudie ansehen <Arrow /></Link>
                </div>
            </section>

            {/* 6 · Projektbeginn */}
            <section className="mp-cta" aria-labelledby="mp-cta-h">
                <h2 id="mp-cta-h" className="mp-h2">
                    Wo liegt <strong>die eigentliche Aufgabe?</strong>
                </h2>
                <p className="mp-p mp-p--mitte">
                    Nicht jedes Projekt braucht alle vier Ebenen neu. Im ersten Gespräch klären wir, wo die
                    eigentliche Aufgabe liegt und was der nächste sinnvolle Schritt ist.
                </p>
                <Link className="mp-btn" href="/#contact">Projekt besprechen <Arrow /></Link>
            </section>

            <Footer />
        </main>
    )
}
