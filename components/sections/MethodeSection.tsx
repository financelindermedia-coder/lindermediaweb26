'use client'

const SYSTEM_ITEMS = [
    { label: 'Markenstrategie & Positionierung', sub: 'Das Fundament' },
    { label: 'Corporate Design & Messaging', sub: 'Die Identität' },
    { label: 'Website & Onlinemarketing', sub: 'Die Präsenz' },
    { label: 'Google Ads & Social Ads', sub: 'Die Reichweite' },
    { label: 'Lead-Systeme & Automatisierung', sub: 'Die Maschine' },
]

const LEISTUNGEN = [
    { nr: '01', title: 'Web Design & Entwicklung', body: 'Websites, die nicht nur aussehen. Sondern konvertieren.' },
    { nr: '02', title: 'SEO & Sichtbarkeit', body: 'Gefunden werden von denen, die bereits suchen.' },
    { nr: '03', title: 'Content & Kommunikation', body: 'Sprache, die Ihre Positionierung trägt.' },
    { nr: '04', title: 'Google Ads', body: 'Budgets, die wirken, weil die Basis stimmt.' },
    { nr: '05', title: 'Automatisierung', body: 'Prozesse, die Vertrieb und Kommunikation verbinden.' },
    { nr: '06', title: 'Leadgenerierung', body: 'Systeme, die qualifizierte Anfragen erzeugen.' },
]

export default function MethodeSection() {
    return (
        <section
            id="methode"
            style={{
                background: 'rgba(2,8,24,0.98)',
                fontFamily: 'var(--font-barlow), sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            {/* System approach */}
            <div style={{ padding: '10rem var(--px) 7rem', maxWidth: '1200px', margin: '0 auto' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Unser Ansatz
                </p>

                <div className="methode-header-grid">
                    <div>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                            fontWeight: 300, lineHeight: 1.05,
                            letterSpacing: '-0.02em', textTransform: 'uppercase',
                            color: '#ffffff', marginBottom: '0.5rem',
                        }}>
                            Wir arbeiten
                        </h2>
                        <h2 style={{
                            fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                            fontWeight: 900, lineHeight: 1.05,
                            letterSpacing: '-0.02em', textTransform: 'uppercase',
                            color: '#ffffff',
                        }}>
                            unter der Oberfläche.
                        </h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1.4rem' }}>
                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.5)',
                        }}>
                            Strategie & Identität bilden das Fundament.
                            Sichtbarkeit ist die Konsequenz – nicht der Anfang.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.15rem, 1.5vw, 1.3rem)',
                            fontWeight: 600, lineHeight: 1.6,
                            color: 'rgba(255,255,255,0.85)',
                            letterSpacing: '0.01em',
                        }}>
                            Ein System statt Einzelmaßnahmen.
                        </p>
                    </div>
                </div>

                {/* System items */}
                <div style={{
                    marginTop: '5rem', paddingTop: '5rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                        {SYSTEM_ITEMS.map((item, i) => (
                            <div key={i} style={{
                                borderTop: '1px solid rgba(255,255,255,0.06)',
                                padding: '1.6rem 0',
                                display: 'flex', alignItems: 'center',
                                justifyContent: 'space-between', gap: '2rem',
                                borderBottom: i === SYSTEM_ITEMS.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
                                    <span style={{
                                        width: '6px', height: '6px', borderRadius: '50%',
                                        background: '#00d4b4', flexShrink: 0, display: 'block',
                                    }} />
                                    <span style={{
                                        fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)',
                                        fontWeight: 400, color: 'rgba(255,255,255,0.75)',
                                        letterSpacing: '0.02em',
                                    }}>
                                        {item.label}
                                    </span>
                                </div>
                                <span style={{
                                    fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                                    fontWeight: 400, letterSpacing: '0.22em',
                                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.45)',
                                    whiteSpace: 'nowrap', flexShrink: 0,
                                }}>
                                    {item.sub}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* Leistungen */}
            <div style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '7rem var(--px) 10rem',
                maxWidth: '1200px', margin: '0 auto',
            }}>
                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '4rem',
                }}>
                    | Was wir konkret umsetzen
                </p>
                <div className="leistungen-grid">
                    {LEISTUNGEN.map(l => (
                        <div key={l.nr} style={{ paddingTop: '1.8rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                            <p style={{
                                fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                                fontWeight: 400, letterSpacing: '0.2em',
                                textTransform: 'uppercase', color: 'rgba(0,212,180,0.5)',
                                marginBottom: '0.9rem',
                            }}>
                                {l.nr}
                            </p>
                            <h3 style={{
                                fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                                fontWeight: 700, letterSpacing: '0.04em',
                                textTransform: 'uppercase', color: '#ffffff',
                                marginBottom: '0.8rem',
                            }}>
                                {l.title}
                            </h3>
                            <p style={{
                                fontSize: 'clamp(0.95rem, 1.1vw, 1.05rem)',
                                fontWeight: 400, lineHeight: 1.7,
                                color: 'rgba(255,255,255,0.4)',
                            }}>
                                {l.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
