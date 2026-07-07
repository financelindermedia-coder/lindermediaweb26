'use client'

type Icon = 'web' | 'ads' | 'sales'

const PROBLEME: { label: string; quote: string; icon: Icon }[] = [
    { label: 'Website',  quote: 'Gute Website – aber kaum Anfragen.',            icon: 'web'   },
    { label: 'Werbung',  quote: 'Werbung läuft – ohne klares Ziel.',            icon: 'ads'   },
    { label: 'Vertrieb', quote: 'Marketing & Vertrieb ohne roten Faden.',       icon: 'sales' },
]

const ICONS: Record<Icon, JSX.Element> = {
    web:   <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M9 21h6" /></>,
    ads:   <><path d="M3 11l16-6v14L3 13v-2z" /><path d="M11.5 16.5a3 3 0 0 1-5.5-1.7" /></>,
    sales: <><circle cx="8" cy="9" r="2.6" /><circle cx="16" cy="9" r="2.6" /><path d="M3 19a5 5 0 0 1 10 0M13 19a5 5 0 0 1 8-3.5" /></>,
}

export default function ProblemSection() {
    return (
        <section style={{
            background: '#122f3d',
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
                    color: '#ffffff', marginBottom: '0.4rem',
                }}>
                    Einzelmaßnahmen
                </h2>
                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 900, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '1.8rem',
                }}>
                    scheitern.
                </h2>
                <p style={{
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                    fontWeight: 400, lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.5)',
                    maxWidth: '46ch',
                }}>
                    Viele Unternehmen investieren in Werbung, Websites oder SEO –
                    doch die Teile greifen nicht ineinander. Die Verbindung reißt genau dort,
                    wo die Strategie fehlt.
                </p>

                {/* Kette aus 3 Maßnahmen – durch gebrochene rote Linien „verbunden" */}
                <div className="prob-chain">
                    {PROBLEME.map((p, i) => (
                        <div key={p.label} style={{ display: 'contents' }}>
                            <article className="prob-card">
                                <span className="prob-card-ico">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[p.icon]}</svg>
                                </span>
                                <span className="prob-card-label">{p.label}</span>
                                <p className="prob-card-quote">„{p.quote}"</p>
                            </article>
                            {i < PROBLEME.length - 1 && <span className="prob-link" aria-hidden="true"><i /></span>}
                        </div>
                    ))}
                </div>

                <p className="prob-conclusion">
                    Das ist kein Zeichen schlechter Qualität.<br />
                    <strong>Es fehlt die gemeinsame Richtung.</strong>
                </p>

            </div>
        </section>
    )
}
