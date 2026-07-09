'use client'

import { useState } from 'react'

/**
 * Projekte / Cases – interaktiver Switcher.
 *
 * Links ein Device-Mockup (Laptop + Phone), dessen "Screenshot" beim
 * Wechsel crossfadet. Rechts eine nummerierte Projektliste; das aktive
 * Projekt klappt Beschreibung + Ergebnis auf. Die Screenshots sind
 * markenkonforme CSS-Mockups (kein externes Bildmaterial), die je Projekt
 * den Namen tragen – so wird der Wechsel unmittelbar sichtbar.
 */

type Projekt = {
    nr: string
    name: string
    branche: string
    beschreibung: string
    ergebnis: string
    accent: string
    shotDesk?: string
    shotMob?: string
}

const PROJEKTE: Projekt[] = [
    {
        nr: '01',
        name: 'SolarImpact Yacht',
        branche: 'Solaryachten & Maritime E-Mobilität',
        beschreibung:
            'Ein Pionier solarbetriebener Luxusyachten mit SWATH-Technologie – technisch herausragend, aber online kaum als Innovationsführer sichtbar. Wir haben Positionierung, Website und Botschaft auf ein klares Premium-Profil ausgerichtet.',
        ergebnis: 'Ein Auftritt, der die Innovationsführerschaft im Premium-Segment sichtbar macht.',
        accent: '#ff6b35',
        shotDesk: '/images/case-solarimpact-desk.jpg',
        shotMob: '/images/case-solarimpact-mob.jpg',
    },
    {
        nr: '02',
        name: 'Rübsamen',
        branche: 'Handel & Lifestyle',
        beschreibung:
            'Etabliertes Sortiment, aber ein unscharfer digitaler Auftritt. Neue Struktur, klare Markensprache und konsistente Kampagnen über alle Kanäle.',
        ergebnis: 'Höhere Wiedererkennung und messbar mehr Online-Reichweite.',
        accent: '#ff8f5c',
    },
    {
        nr: '03',
        name: 'Wellenwind',
        branche: 'Freizeit & Erlebnis',
        beschreibung:
            'Ein Erlebnisanbieter, der Emotion verkauft, aber nüchtern kommunizierte. Wir haben die Marke visuell und sprachlich aufgeladen.',
        ergebnis: 'Buchungsanfragen spürbar gestiegen.',
        accent: '#f26a2e',
    },
    {
        nr: '04',
        name: 'Novodeck',
        branche: 'Bauelemente & Außenbereich',
        beschreibung:
            'Ein hochwertiges, erklärungsbedürftiges Produkt. Fokus auf Nutzen statt Technik, klare Landingpages für konkrete Entscheidungssituationen.',
        ergebnis: 'Der Vertrieb startet mit vorqualifizierten Anfragen.',
        accent: '#ff7d48',
    },
    {
        nr: '05',
        name: 'Energiebalance',
        branche: 'Gesundheit & Coaching',
        beschreibung:
            'Persönliche Expertise, die online nicht ankam. Positionierung, Website und Content konsequent auf die Zielgruppe zugeschnitten.',
        ergebnis: 'Erste organische Anfragen innerhalb weniger Wochen.',
        accent: '#e0561f',
    },
]

/** Echter Website-Screenshot (falls vorhanden), sonst der CSS-Mock. */
function Screen({ p, variant }: { p: Projekt; variant: 'desk' | 'mob' }) {
    const shot = variant === 'desk' ? p.shotDesk : p.shotMob
    if (shot) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={shot} alt={`Website-Vorschau ${p.name}`} className="cm-img" loading="lazy" />
    }
    return <MockScreen p={p} variant={variant} />
}

function MockScreen({ p, variant }: { p: Projekt; variant: 'desk' | 'mob' }) {
    return (
        <div className="cm" style={{ ['--acc' as string]: p.accent } as React.CSSProperties}>
            <div className="cm-nav">
                <span className="cm-logo">{p.name}</span>
                {variant === 'desk' && (
                    <span className="cm-links"><i /><i /><i /></span>
                )}
                <span className="cm-navcta" />
            </div>
            <div className="cm-hero">
                <span className="cm-eyebrow" />
                <span className="cm-h1" />
                <span className="cm-h1 cm-short" />
                <span className="cm-btn" />
            </div>
            <div className="cm-cards">
                <span /><span />{variant === 'desk' && <span />}
            </div>
        </div>
    )
}

export default function CasesSection() {
    const [active, setActive] = useState(0)

    return (
        <section
            id="projekte"
            style={{
                background: '#08192a',
                padding: '10rem 0',
                fontFamily: 'var(--font-barlow), sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
        >
            <p style={{
                fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                fontWeight: 400, letterSpacing: '0.2em',
                textTransform: 'uppercase', color: 'rgba(255,107,53,0.85)',
                marginBottom: '2.5rem', padding: '0 var(--px)',
            }}>
                | Projekte & Referenzen
            </p>

            <div style={{ padding: '0 var(--px)', marginBottom: '4.5rem' }}>
                <h2 style={{
                    fontSize: 'var(--h2)',
                    fontWeight: 300, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', marginBottom: '0.2rem',
                }}>
                    Was aus der Arbeit
                </h2>
                <h2 style={{
                    fontSize: 'var(--h2)',
                    fontWeight: 900, lineHeight: 1.05,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff',
                }}>
                    wirklich wird.
                </h2>
            </div>

            <div className="cases-layout">
                {/* ── Device-Mockup (Laptop + Phone) ── */}
                <div className="cases-stage">
                    <div className="cases-laptop">
                        <div className="cases-laptop-screen">
                            {PROJEKTE.map((p, i) => (
                                <div
                                    key={p.nr}
                                    className={`cases-shot${i === active ? ' is-active' : ''}`}
                                >
                                    <Screen p={p} variant="desk" />
                                </div>
                            ))}
                        </div>
                        <div className="cases-laptop-base"><span /></div>
                    </div>

                    <div className="cases-phone">
                        {PROJEKTE.map((p, i) => (
                            <div
                                key={p.nr}
                                className={`cases-shot${i === active ? ' is-active' : ''}`}
                            >
                                <Screen p={p} variant="mob" />
                            </div>
                        ))}
                        <span className="cases-phone-notch" />
                    </div>
                </div>

                {/* ── Nummerierte Projektliste ── */}
                <ul className="cases-list">
                    {PROJEKTE.map((p, i) => {
                        const on = i === active
                        return (
                            <li key={p.nr}>
                                <button
                                    type="button"
                                    className={`cases-item${on ? ' is-active' : ''}`}
                                    style={{ ['--acc' as string]: p.accent } as React.CSSProperties}
                                    onClick={() => setActive(i)}
                                    aria-expanded={on}
                                >
                                    <span className="cases-num">{p.nr}</span>
                                    <span className="cases-item-main">
                                        <span className="cases-name">{p.name}</span>
                                        <span className="cases-branche">{p.branche}</span>
                                        <span className="cases-detail">
                                            <span className="cases-detail-inner">
                                                <span className="cases-desc">{p.beschreibung}</span>
                                                <span className="cases-ergebnis">{p.ergebnis}</span>
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div style={{ padding: '0 var(--px)', marginTop: '4.5rem' }}>
                <p style={{
                    fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
                    fontWeight: 400, lineHeight: 1.75,
                    color: 'rgba(255,255,255,0.25)',
                }}>
                    Ausgewählte Projekte aus realer Zusammenarbeit. Die Vorschauen sind stilisierte Darstellungen der jeweiligen Auftritte.
                </p>
            </div>
        </section>
    )
}
