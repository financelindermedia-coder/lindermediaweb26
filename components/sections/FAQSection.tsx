'use client'

import { useState } from 'react'

const ITEMS = [
    {
        q: 'Woran erkenne ich, dass meine Marke ein Klarheitsproblem hat?',
        a: 'Viele Unternehmen bemerken es zunächst nicht. Die Symptome zeigen sich an anderer Stelle: Angebote werden hauptsächlich über den Preis verglichen. Kunden verstehen die Unterschiede zum Wettbewerb nicht. Marketingmaßnahmen erzeugen Aufmerksamkeit, aber keine nachhaltige Wirkung. Oft ist nicht die Leistung das Problem. Sondern die Wahrnehmung.',
    },
    {
        q: 'Was kostet fehlende Klarheit?',
        a: 'Die eigentliche Frage lautet oft nicht, was Markenentwicklung kostet. Die interessantere Frage ist, was fehlende Klarheit kostet. Wenn Kunden Unterschiede nicht erkennen. Wenn Marketing ständig neu ansetzen muss. Dann entstehen Kosten, die selten auf einer Rechnung stehen. Die Auswirkungen sind dennoch täglich spürbar.',
    },
    {
        q: 'Ist meine Marke wirklich das Problem?',
        a: 'Vielleicht. Vielleicht auch nicht. Deshalb beginnen wir nicht mit Lösungen, sondern mit Fragen. Manchmal liegt die Ursache in der Positionierung. Manchmal in der Kommunikation. Manchmal in der Sichtbarkeit. Erst wenn klar ist, wo die eigentliche Herausforderung liegt, wird über Maßnahmen gesprochen.',
    },
    {
        q: 'Was passiert, wenn wir nichts verändern?',
        a: 'Vielleicht zunächst gar nichts. Das ist oft das Tückische. Unternehmen funktionieren häufig über Jahre hinweg auch ohne klare Markenarchitektur. Die Frage ist nicht, ob es funktioniert. Die Frage ist, wie viel Potenzial dabei ungenutzt bleibt.',
    },
]

export default function FAQSection() {
    const [open, setOpen] = useState<number | null>(null)

    return (
        <section
            id="faq"
            style={{
                background: '#020810',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '9rem var(--px)',
                fontFamily: 'var(--font-barlow), sans-serif',
                transition: 'background-color 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
        >
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '1rem',
                }}>
                    | FAQ
                </p>
                <h2 style={{
                    fontSize: 'clamp(2rem, 3.5vw, 4.2rem)', fontWeight: 300,
                    lineHeight: 1.05, letterSpacing: '-0.012em',
                    color: '#ffffff', marginBottom: '1.4rem',
                    textTransform: 'uppercase',
                }}>
                    Noch<br />
                    <strong style={{ fontWeight: 900 }}>Fragen?</strong>
                </h2>
                <p style={{
                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                    lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                    marginBottom: '3rem', maxWidth: '48ch',
                }}>
                    Jede Marke ist anders. Viele Fragen tauchen jedoch immer wieder auf.
                    Hier finden Sie die Antworten auf die Themen, die Unternehmen vor einer
                    Zusammenarbeit am häufigsten beschäftigen.
                </p>

                <div>
                    {ITEMS.map((item, i) => (
                        <div
                            key={i}
                            style={{ borderTop: '1.5px solid rgba(255,255,255,0.14)' }}
                        >
                            <button
                                onClick={() => setOpen(open === i ? null : i)}
                                style={{
                                    width: '100%', display: 'flex', justifyContent: 'space-between',
                                    alignItems: 'flex-start', gap: '1.5rem',
                                    padding: '1.8rem 0', background: 'none', border: 'none',
                                    cursor: 'pointer', textAlign: 'left',
                                    fontFamily: 'inherit',
                                }}
                            >
                                <span style={{
                                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 600,
                                    lineHeight: 1.5, color: '#ffffff',
                                }}>
                                    {item.q}
                                </span>
                                <span style={{
                                    fontSize: '1.7rem', color: '#ffffff',
                                    flexShrink: 0, marginTop: '0.1rem',
                                    transform: open === i ? 'rotate(45deg)' : 'rotate(0)',
                                    transition: 'transform 0.25s ease',
                                    display: 'inline-block',
                                }}>
                                    +
                                </span>
                            </button>
                            <div style={{
                                overflow: 'hidden',
                                maxHeight: open === i ? '400px' : '0',
                                transition: 'max-height 0.35s ease',
                            }}>
                                <p style={{
                                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                                    lineHeight: 1.75, color: 'rgba(255,255,255,0.65)',
                                    paddingBottom: '1.6rem',
                                }}>
                                    {item.a}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
            </div>
        </section>
    )
}
