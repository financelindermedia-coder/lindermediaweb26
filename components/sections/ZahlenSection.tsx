'use client'

const ZAHLEN = [
    { zahl: '3×',       label: 'Mehr qualifizierte Anfragen',          sub: 'im Schnitt nach 90 Tagen' },
    { zahl: '40 %',     label: 'Weniger Aufwand im Erstkontakt',       sub: 'durch klare Positionierung' },
    { zahl: '8 Wo.',    label: 'Bis erste messbare Ergebnisse',        sub: 'bei konsequenter Umsetzung' },
    { zahl: '1:1',      label: 'Direkte Zusammenarbeit',               sub: 'ohne Mittelsmänner' },
]

export default function ZahlenSection() {
    return (
        <section style={{
            background: 'rgba(0,212,180,0.04)',
            borderTop: '1px solid rgba(0,212,180,0.12)',
            borderBottom: '1px solid rgba(0,212,180,0.12)',
            padding: '6rem var(--px)',
            fontFamily: 'var(--font-barlow), sans-serif',
        }}>
            <div className="zahlen-grid" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {ZAHLEN.map((z, i) => (
                    <div key={i} style={{
                        textAlign: 'center',
                        padding: '1rem 0',
                    }}>
                        <p style={{
                            fontSize: 'clamp(2.8rem, 5vw, 5rem)',
                            fontWeight: 900, lineHeight: 1,
                            letterSpacing: '-0.03em',
                            color: '#ffffff',
                            marginBottom: '0.6rem',
                        }}>
                            {z.zahl}
                        </p>
                        <p style={{
                            fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                            fontWeight: 600, letterSpacing: '0.06em',
                            textTransform: 'uppercase',
                            color: 'rgba(255,255,255,0.7)',
                            marginBottom: '0.3rem',
                        }}>
                            {z.label}
                        </p>
                        <p style={{
                            fontSize: 'clamp(0.7rem, 0.8vw, 0.75rem)',
                            fontWeight: 400, letterSpacing: '0.1em',
                            color: 'rgba(0,212,180,0.6)',
                        }}>
                            {z.sub}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    )
}
