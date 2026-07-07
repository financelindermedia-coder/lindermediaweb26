'use client'

const STIMMEN = [
    {
        zitat: 'Wir haben vorher viel Geld für Werbung ausgegeben und nicht verstanden, warum es nicht funktioniert. LinderMedia hat uns nicht einfach eine neue Website gebaut, sondern zuerst geholfen zu verstehen, wen wir eigentlich ansprechen wollen.',
        name: 'Geschäftsführer',
        kontext: 'Baugewerbe, Bayern',
    },
    {
        zitat: 'Andreas stellt Fragen, die ich mir selbst noch nicht gestellt hatte. Nicht nur über Marketing, sondern über mein Unternehmen. Diese Klarheit hat geholfen – nicht nur bei der Website.',
        name: 'Gründerin',
        kontext: 'Unternehmensberatung, NRW',
    },
    {
        zitat: 'Ich war skeptisch gegenüber Agenturen – zu viel Gerede, zu wenig Substanz. Hier war es anders. Kurze Wege, direkte Aussagen, keine leeren Versprechen. Und die Ergebnisse sprechen für sich.',
        name: 'Inhaber',
        kontext: 'Handwerk & Gebäudetechnik',
    },
]

function PersonIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="3.4" />
            <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
        </svg>
    )
}

export default function StimmenSection() {
    return (
        <section style={{
            background: '#020810',
            padding: '10rem var(--px)',
            fontFamily: 'var(--font-barlow), sans-serif',
            borderTop: '1px solid rgba(255,255,255,0.06)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* dezenter Akzent-Glow im Hintergrund */}
            <div aria-hidden="true" style={{
                position: 'absolute', top: '18%', left: '50%', transform: 'translateX(-50%)',
                width: 'min(70vw, 800px)', height: '380px',
                background: 'radial-gradient(ellipse at center, rgba(0,212,180,0.10), transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Kundenstimmen
                </p>

                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 300, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '1.2rem',
                }}>
                    Was bleibt,
                </h2>
                <h2 style={{
                    fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                    fontWeight: 900, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '5rem',
                }}>
                    wenn Werbung aufhört.
                </h2>

                <div className="stimmen-grid">
                    {STIMMEN.map((s, i) => (
                        <article key={i} className="stimme-card">
                            <span className="stimme-quote-mark" aria-hidden="true">&ldquo;</span>
                            <p className="stimme-text">{s.zitat}</p>
                            <div className="stimme-foot">
                                <span className="stimme-avatar"><PersonIcon /></span>
                                <span>
                                    <span className="stimme-name" style={{ display: 'block' }}>{s.name}</span>
                                    <span className="stimme-ctx" style={{ display: 'block' }}>{s.kontext}</span>
                                </span>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    )
}
