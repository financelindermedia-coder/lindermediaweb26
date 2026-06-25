'use client'

const STIMMEN = [
    {
        zitat: 'Wir haben vorher viel Geld für Werbung ausgegeben und nicht verstanden, warum es nicht funktioniert. LinderMedia hat uns nicht einfach eine neue Website gebaut, sondern uns zuerst geholfen zu verstehen, wen wir eigentlich ansprechen wollen. Das klingt banal – war es aber nicht.',
        name: 'Geschäftsführer',
        kontext: 'Mittelständisches Unternehmen, Baugewerbe, Bayern',
    },
    {
        zitat: 'Was mich überrascht hat: Andreas stellt Fragen, die ich mir selbst noch nicht gestellt hatte. Nicht nur über Marketing, sondern über mein Unternehmen. Warum tun wir, was wir tun? Was macht uns wirklich anders? Diese Klarheit hat geholfen – nicht nur bei der Website.',
        name: 'Gründerin',
        kontext: 'Unternehmensberatung, Nordrhein-Westfalen',
    },
    {
        zitat: 'Ich war skeptisch gegenüber Agenturen, weil ich viele Mal erlebt habe, wie viel Gerede und wie wenig Substanz dahintersteckt. Hier war es anders. Kurze Wege, direkte Aussagen, keine leeren Versprechen. Und die Ergebnisse sprechen für sich.',
        name: 'Inhaber',
        kontext: 'Fachbetrieb, Handwerk & Gebäudetechnik',
    },
]

export default function StimmenSection() {
    return (
        <section style={{
            background: 'rgba(2,8,24,0.98)',
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
                    color: '#ffffff', marginBottom: '7rem',
                }}>
                    wenn Werbung aufhört.
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {STIMMEN.map((s, i) => (
                        <div key={i} style={{
                            borderTop: '1px solid rgba(255,255,255,0.06)',
                            padding: '4.5rem 0',
                            borderBottom: i === STIMMEN.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                        }}>
                            <div className="stimme-grid">
                                <p style={{
                                    fontSize: 'clamp(1.15rem, 1.7vw, 1.55rem)',
                                    fontWeight: 300, lineHeight: 1.7,
                                    color: 'rgba(255,255,255,0.75)',
                                    fontStyle: 'italic',
                                }}>
                                    &ldquo;{s.zitat}&rdquo;
                                </p>
                                <div style={{
                                    display: 'flex', flexDirection: 'column',
                                    justifyContent: 'flex-end', gap: '0.3rem',
                                }}>
                                    <p style={{
                                        fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                                        fontWeight: 600, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', color: '#ffffff',
                                    }}>
                                        {s.name}
                                    </p>
                                    <p style={{
                                        fontSize: 'clamp(0.72rem, 0.82vw, 0.78rem)',
                                        fontWeight: 400, letterSpacing: '0.08em',
                                        color: 'rgba(255,255,255,0.3)',
                                    }}>
                                        {s.kontext}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}
