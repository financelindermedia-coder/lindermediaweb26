'use client'

const ABOVE = ['Website', 'Logo', 'Social Media', 'Werbung', 'Google Ads']
const BELOW = ['Markenstrategie', 'Positionierung', 'Kommunikation', 'Vertrauen', 'Systeme & Prozesse', 'Automatisierung', 'Vertrieb']

const LEISTUNGEN = [
    { nr: '01', title: 'Web Design & Entwicklung', body: 'Websites, die nicht nur aussehen. Sondern konvertieren.' },
    { nr: '02', title: 'SEO & Sichtbarkeit', body: 'Gefunden werden von denen, die bereits suchen.' },
    { nr: '03', title: 'Content & Kommunikation', body: 'Sprache, die Ihre Positionierung trägt.' },
    { nr: '04', title: 'Google Ads', body: 'Budgets, die Wirkung entfalten, weil die Basis stimmt.' },
    { nr: '05', title: 'Automatisierung', body: 'Prozesse, die Vertrieb und Kommunikation verbinden.' },
    { nr: '06', title: 'Leadgenerierung', body: 'Systeme, die qualifizierte Anfragen erzeugen.' },
]

export default function MethodeSection() {
    return (
        <section
            id="methode"
            style={{
                background: 'rgba(2,8,24,0.95)',
                fontFamily: 'var(--font-barlow), sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            {/* Iceberg model */}
            <div style={{ padding: '10rem var(--px) 7rem', maxWidth: '1200px', margin: '0 auto' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Das Modell
                </p>

                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 300, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '1.2rem',
                }}>
                    Was Menschen sehen,
                </h2>
                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 900, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '5rem',
                }}>
                    ist nur die Spitze.
                </h2>

                {/* Above waterline */}
                <div style={{ marginBottom: '1rem' }}>
                    <p style={{
                        fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                        fontWeight: 400, letterSpacing: '0.25em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                        marginBottom: '1.5rem',
                    }}>
                        Sichtbar — Die Oberfläche
                    </p>
                    <div className="methode-tags">
                        {ABOVE.map(item => (
                            <span key={item} style={{
                                display: 'inline-block',
                                padding: '0.55rem 1.4rem',
                                border: '1px solid rgba(255,255,255,0.15)',
                                borderRadius: '2px',
                                fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                                fontWeight: 400, letterSpacing: '0.08em',
                                color: 'rgba(255,255,255,0.55)',
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Waterline */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', margin: '2.5rem 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(0,212,180,0.4)' }} />
                    <span style={{
                        fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                        fontWeight: 400, letterSpacing: '0.25em',
                        textTransform: 'uppercase', color: 'rgba(0,212,180,0.6)',
                        whiteSpace: 'nowrap',
                    }}>
                        Wasserlinie
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(0,212,180,0.4)' }} />
                </div>

                {/* Below waterline */}
                <div>
                    <p style={{
                        fontSize: 'clamp(0.65rem, 0.75vw, 0.72rem)',
                        fontWeight: 400, letterSpacing: '0.25em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                        marginBottom: '1.5rem',
                    }}>
                        Das Fundament — 90 % der Wirkung
                    </p>
                    <div className="methode-tags">
                        {BELOW.map(item => (
                            <span key={item} style={{
                                display: 'inline-block',
                                padding: '0.55rem 1.4rem',
                                border: '1px solid rgba(0,212,180,0.3)',
                                borderRadius: '2px',
                                fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                                fontWeight: 400, letterSpacing: '0.08em',
                                color: 'rgba(0,212,180,0.8)',
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Consequence */}
                <div style={{
                    marginTop: '6rem', paddingTop: '6rem',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                }}>
                    <div style={{ maxWidth: '65ch' }}>
                        <p style={{
                            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                            fontWeight: 300, lineHeight: 1.55,
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '0.6rem',
                        }}>
                            Aus Strategie entsteht eine Marke.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                            fontWeight: 300, lineHeight: 1.55,
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '0.6rem',
                        }}>
                            Aus einer Marke entsteht eine Website.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                            fontWeight: 300, lineHeight: 1.55,
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '0.6rem',
                        }}>
                            Aus einer Website entstehen Anfragen.
                        </p>
                        <p style={{
                            fontSize: 'clamp(1.4rem, 2.2vw, 2rem)',
                            fontWeight: 900, lineHeight: 1.55,
                            color: '#ffffff',
                        }}>
                            Aus Anfragen entsteht Wachstum.
                        </p>
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
                                color: 'rgba(255,255,255,0.45)',
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
