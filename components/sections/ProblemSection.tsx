'use client'

const PROBLEME = [
    {
        nr: '01',
        text: '„Wir haben eine gute Website – aber kaum Anfragen."',
    },
    {
        nr: '02',
        text: '„Werbung läuft – aber ohne klares Ziel oder messbares Ergebnis."',
    },
    {
        nr: '03',
        text: '„Marketing und Vertrieb ziehen nicht an einem Strang."',
    },
]

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

                <div className="problem-grid">
                    <div>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                            fontWeight: 300, lineHeight: 1.05,
                            letterSpacing: '-0.02em', textTransform: 'uppercase',
                            color: '#ffffff', marginBottom: '0.5rem',
                        }}>
                            Einzelmaßnahmen
                        </h2>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                            fontWeight: 900, lineHeight: 1.05,
                            letterSpacing: '-0.02em', textTransform: 'uppercase',
                            color: '#ffffff', marginBottom: '2.5rem',
                        }}>
                            scheitern.
                        </h2>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.45)',
                            maxWidth: '38ch',
                        }}>
                            Viele Unternehmen investieren in Werbung, Websites oder SEO –
                            doch sie bleiben Stückwerk, wenn Strategie fehlt.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {PROBLEME.map((p, i) => (
                            <div key={p.nr} style={{
                                borderTop: '1px solid rgba(255,255,255,0.07)',
                                padding: '2.2rem 0',
                                borderBottom: i === PROBLEME.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                display: 'flex', gap: '2rem', alignItems: 'flex-start',
                            }}>
                                <span style={{
                                    fontSize: 'clamp(0.62rem, 0.72vw, 0.68rem)',
                                    fontWeight: 400, letterSpacing: '0.22em',
                                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.5)',
                                    paddingTop: '0.3rem', flexShrink: 0,
                                }}>
                                    {p.nr}
                                </span>
                                <p style={{
                                    fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
                                    fontWeight: 400, lineHeight: 1.65,
                                    color: 'rgba(255,255,255,0.7)',
                                    fontStyle: 'italic',
                                }}>
                                    {p.text}
                                </p>
                            </div>
                        ))}

                        <p style={{
                            marginTop: '2.5rem',
                            fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                            fontWeight: 400, lineHeight: 1.75,
                            color: 'rgba(255,255,255,0.85)',
                        }}>
                            Das ist kein Zeichen schlechter Qualität.
                            Es fehlt die gemeinsame Richtung.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    )
}
