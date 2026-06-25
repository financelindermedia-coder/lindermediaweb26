'use client'

import Image from 'next/image'

export default function MenschenSection() {
    return (
        <section id="ueber-uns" style={{
            background: '#020810',
            fontFamily: 'var(--font-barlow), sans-serif',
            borderTop: '1px solid rgba(255,255,255,0.06)',
        }}>
            {/* Wer steckt dahinter */}
            <div style={{ padding: '10rem var(--px) 0', maxWidth: '1200px', margin: '0 auto' }}>

                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                    fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                    marginBottom: '2.5rem',
                }}>
                    | Hinter LinderMedia
                </p>

                <div className="menschen-grid">
                    {/* Portrait */}
                    <div>
                        <div style={{
                            position: 'relative',
                            width: '100%', aspectRatio: '3 / 4',
                            borderRadius: '2px', overflow: 'hidden',
                        }}>
                            <Image
                                src="/images/portrait-andreas.svg"
                                alt="Andreas Linder, Gründer LinderMedia"
                                fill
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                        <div style={{ marginTop: '1.5rem' }}>
                            <p style={{
                                fontSize: 'clamp(1rem, 1.3vw, 1.15rem)',
                                fontWeight: 600, letterSpacing: '0.08em',
                                textTransform: 'uppercase', color: '#ffffff',
                                marginBottom: '0.3rem',
                            }}>
                                Andreas Linder
                            </p>
                            <p style={{
                                fontSize: 'clamp(0.82rem, 0.95vw, 0.9rem)',
                                fontWeight: 400, color: 'rgba(255,255,255,0.35)',
                                letterSpacing: '0.04em',
                            }}>
                                Gründer, LinderMedia
                            </p>
                        </div>
                    </div>

                    {/* Text */}
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '2.5rem' }}>
                        <h2 style={{
                            fontSize: 'clamp(2rem, 3.5vw, 4.2rem)',
                            fontWeight: 300, lineHeight: 1.1,
                            letterSpacing: '-0.015em', textTransform: 'uppercase',
                            color: '#ffffff',
                        }}>
                            Kurze Wege.<br />
                            <strong style={{ fontWeight: 900 }}>Direkte Zusammenarbeit.</strong>
                        </h2>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            LinderMedia ist kein Konzern mit Account-Managern und
                            Projektleitern, die zwischen Ihnen und der Arbeit stehen.
                            Sie sprechen direkt mit der Person, die Ihre Website baut,
                            Ihre Strategie entwickelt, Ihre Kampagnen schaltet.
                        </p>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.55)',
                        }}>
                            Das bedeutet: Keine verlorene Zeit durch Briefings, die
                            falsch weitergegeben werden. Keine Qualitätseinbußen durch
                            Abstraktionsschichten. Keine Überraschungen, die erst beim
                            Abnahmeprotokoll auftauchen.
                        </p>

                        <p style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                            fontWeight: 400, lineHeight: 1.8,
                            color: 'rgba(255,255,255,0.75)',
                        }}>
                            Stattdessen: Klarheit von Anfang an. Ehrlichkeit, auch wenn
                            sie unbequem ist. Und eine Zusammenarbeit, bei der Sie
                            jederzeit wissen, was passiert – und warum.
                        </p>
                    </div>
                </div>
            </div>

            {/* Warum LinderMedia */}
            <div style={{
                padding: '8rem var(--px) 10rem',
                maxWidth: '1200px', margin: '0 auto',
            }}>
                <div style={{
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                    paddingTop: '7rem',
                }}>
                    <p style={{
                        fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                        fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                        marginBottom: '2.5rem',
                    }}>
                        | Warum wir das tun
                    </p>
                    <div className="geschichte-grid">
                        <h2 style={{
                            fontSize: 'clamp(2rem, 3.5vw, 4.2rem)',
                            fontWeight: 300, lineHeight: 1.1,
                            letterSpacing: '-0.015em', textTransform: 'uppercase',
                            color: '#ffffff',
                        }}>
                            Gute Unternehmen<br />
                            verdienen<br />
                            <strong style={{ fontWeight: 900 }}>gute Sichtbarkeit.</strong>
                        </h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', justifyContent: 'center' }}>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                fontWeight: 400, lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.55)',
                            }}>
                                LinderMedia entstand aus einer konkreten Beobachtung:
                                Viele Unternehmer, die wirklich gut sind in dem, was sie
                                tun, werden nicht so wahrgenommen, wie sie es verdienen.
                            </p>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                fontWeight: 400, lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.55)',
                            }}>
                                Nicht weil ihr Angebot schlecht ist. Sondern weil niemand
                                ihnen geholfen hat, ihre Stärke nach außen zu übersetzen.
                                In Sprache. In Design. In Systeme, die Vertrauen aufbauen.
                            </p>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                fontWeight: 400, lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.75)',
                            }}>
                                Das ist der Grund, warum wir arbeiten, wie wir arbeiten.
                                Nicht mehr Lärm. Mehr Klarheit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
