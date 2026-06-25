'use client'

import Image from 'next/image'

const PROJEKTE = [
    {
        nr: '01',
        branche: 'Handwerk & Baugewerbe',
        titel: 'Spezialist wird Marke',
        bild: '/images/projekt-01.svg',
        ausgangslage: 'Ein regionaler Fachbetrieb mit 22 Jahren Erfahrung — aber kaum Präsenz im Netz. Anfragen kamen ausschließlich über Empfehlung.',
        strategie: 'Positionierung als klarer Spezialist für ein spezifisches Segment. Keine Generalisierung. Klare Sprache für eine klar definierte Zielgruppe.',
        umsetzung: 'Website-Relaunch, lokale SEO-Strategie, Google-Ads-Kampagne mit spezifischen Suchintentionen. Alle Maßnahmen auf dieselbe Botschaft ausgerichtet.',
        ergebnis: '3× mehr qualifizierte Anfragen im ersten Quartal. Buchungsvorlauf von 4 auf 10 Wochen gewachsen.',
    },
    {
        nr: '02',
        branche: 'B2B Software & Technologie',
        titel: 'Komplexes Produkt, klare Botschaft',
        bild: '/images/projekt-02.svg',
        ausgangslage: 'Technisch überlegenes Produkt — aber die Website erklärte Feature statt Wirkung. Vertrieb musste Aufklärungsarbeit leisten, die die Website hätte übernehmen können.',
        strategie: 'Kommunikationsstrategie: Weg von technischen Spezifikationen, hin zur Entscheiderperspektive. Was ändert sich, wenn man dieses Produkt einsetzt?',
        umsetzung: 'Website-Relaunch mit Fokus auf Outcome. Landingpages für spezifische Entscheidersituationen. Begleitung durch Content-Aufbau.',
        ergebnis: 'Erstkontakte mit konkreter Anfrage stiegen um 40 %. Vertriebsgespräche starteten vorbereitet.',
    },
    {
        nr: '03',
        branche: 'Dienstleistung & Beratung',
        titel: 'Expertise sichtbar machen',
        bild: '/images/projekt-03.svg',
        ausgangslage: 'Eine Beraterin mit nachgewiesener Expertise — aber eine Website, die nichts davon transportierte. Kunden kamen über Netzwerk, nicht über Suche.',
        strategie: 'Persönliche Positionierung. Klares Fachgebiet. Sprache, die zeigt, dass hier jemand wirklich versteht, was auf dem Spiel steht.',
        umsetzung: 'Neues Website-Konzept, strategischer Content-Aufbau, Google-Präsenz für relevante Suchbegriffe.',
        ergebnis: 'Erste organische Anfragen nach 8 Wochen. Netzwerk-Empfehlungen durch klare Positionierung deutlich einfacher geworden.',
    },
]

export default function ReferenzenSection() {
    return (
        <section
            id="projekte"
            style={{
                background: '#020810',
                padding: '10rem var(--px)',
                fontFamily: 'var(--font-barlow), sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Projekte & Referenzen
                </p>

                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 300, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '1.2rem',
                }}>
                    Was aus der Arbeit
                </h2>
                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 900, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '7rem',
                }}>
                    wirklich wird.
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem' }}>
                    {PROJEKTE.map((p) => (
                        <div key={p.nr}>
                            {/* Project image */}
                            <div style={{
                                position: 'relative', width: '100%',
                                aspectRatio: '16 / 9',
                                borderRadius: '2px', overflow: 'hidden',
                                marginBottom: '3rem',
                                border: '1px solid rgba(255,255,255,0.06)',
                            }}>
                                <Image
                                    src={p.bild}
                                    alt={`Projekt ${p.nr} – ${p.titel}`}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Project details */}
                            <div className="referenz-grid">
                                {/* Left */}
                                <div>
                                    <p style={{
                                        fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                                        fontWeight: 400, letterSpacing: '0.2em',
                                        textTransform: 'uppercase', color: 'rgba(0,212,180,0.5)',
                                        marginBottom: '0.6rem',
                                    }}>
                                        {p.nr} — {p.branche}
                                    </p>
                                    <h3 style={{
                                        fontSize: 'clamp(1.4rem, 2vw, 2.2rem)',
                                        fontWeight: 700, textTransform: 'uppercase',
                                        letterSpacing: '-0.01em', color: '#ffffff',
                                        lineHeight: 1.15,
                                    }}>
                                        {p.titel}
                                    </h3>
                                </div>

                                {/* Right */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                                    {[
                                        { label: 'Ausgangslage', text: p.ausgangslage },
                                        { label: 'Strategie', text: p.strategie },
                                        { label: 'Umsetzung', text: p.umsetzung },
                                        { label: 'Ergebnis', text: p.ergebnis, accent: true },
                                    ].map(row => (
                                        <div key={row.label}>
                                            <p style={{
                                                fontSize: 'clamp(0.62rem, 0.72vw, 0.68rem)',
                                                fontWeight: 400, letterSpacing: '0.22em',
                                                textTransform: 'uppercase',
                                                color: row.accent ? 'rgba(0,212,180,0.6)' : 'rgba(255,255,255,0.25)',
                                                marginBottom: '0.4rem',
                                            }}>
                                                {row.label}
                                            </p>
                                            <p style={{
                                                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                                                fontWeight: 400, lineHeight: 1.75,
                                                color: row.accent ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.5)',
                                            }}>
                                                {row.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '5rem', paddingTop: '3rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{
                        fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                        fontWeight: 400, lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.25)',
                    }}>
                        Alle Zahlen basieren auf realen Projekten. Namen und Branchen wurden auf Wunsch der Kunden anonymisiert.
                    </p>
                </div>

            </div>
        </section>
    )
}
