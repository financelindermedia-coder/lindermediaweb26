'use client'

export default function ProblemSection() {
    return (
        <section style={{
            background: '#020810',
            padding: '10rem var(--px)',
            fontFamily: 'var(--font-barlow), sans-serif',
            borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Das eigentliche Problem
                </p>

                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 300, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '6rem',
                    maxWidth: '18ch',
                }}>
                    Viele Unternehmen<br />
                    investieren in Sichtbarkeit.<br />
                    <strong style={{ fontWeight: 900 }}>Nicht in Richtung.</strong>
                </h2>

                <div className="problem-grid">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Websites. Werbung. SEO. Social Media. Google Ads.
                            All diese Maßnahmen können Aufmerksamkeit erzeugen.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Doch sie bleiben Stückwerk, wenn Strategie, Positionierung,
                            Kommunikation und Vertrieb nicht dieselbe Richtung verfolgen.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Das Ergebnis: Budgets werden investiert, Aktivität entsteht –
                            aber keine Wirkung.
                        </p>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Das eigentliche Problem ist selten fehlende Sichtbarkeit.
                            Es ist fehlende Kohärenz.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Wenn Entscheider zu uns kommen, sind sie selten unbekannt.
                            Aber oft missverstanden. Ihre Stärke kommt nach außen nicht
                            so an, wie sie intern gelebt wird.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.2rem, 1.6vw, 1.45rem)',
                            fontWeight: 400, lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.85)',
                        }}>
                            Genau dort beginnt unsere Arbeit.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
