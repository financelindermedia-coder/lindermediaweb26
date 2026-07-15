'use client'

import { useRef, useState } from 'react'

/**
 * Projekte / Cases.
 *
 * Desktop: großes Bild links, klickbare Projektliste rechts – beim Wechsel
 * crossfadet das Bild (kein Reload, nur ein weicher Fade).
 * Mobile: automatisch ein nativer Swipe-Slider – je Projekt eine Slide mit
 * Bild, Name, Text und „Weiter"-Button; Punkte zeigen die Position.
 */

type Projekt = {
    nr: string
    name: string
    url: string
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
        url: 'solarimpact.com',
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
        url: 'ruebsamen.de',
        branche: 'Handel & Lifestyle',
        beschreibung:
            'Etabliertes Sortiment, aber ein unscharfer digitaler Auftritt. Neue Struktur, klare Markensprache und konsistente Kampagnen über alle Kanäle.',
        ergebnis: 'Höhere Wiedererkennung und messbar mehr Online-Reichweite.',
        accent: '#ff8f5c',
    },
    {
        nr: '03',
        name: 'Wellenwind',
        url: 'wellenwind.de',
        branche: 'Freizeit & Erlebnis',
        beschreibung:
            'Ein Erlebnisanbieter, der Emotion verkauft, aber nüchtern kommunizierte. Wir haben die Marke visuell und sprachlich aufgeladen.',
        ergebnis: 'Buchungsanfragen spürbar gestiegen.',
        accent: '#f26a2e',
    },
    {
        nr: '04',
        name: 'Novodeck',
        url: 'novodeck.de',
        branche: 'Bauelemente & Außenbereich',
        beschreibung:
            'Ein hochwertiges, erklärungsbedürftiges Produkt. Fokus auf Nutzen statt Technik, klare Landingpages für konkrete Entscheidungssituationen.',
        ergebnis: 'Der Vertrieb startet mit vorqualifizierten Anfragen.',
        accent: '#ff7d48',
    },
    {
        nr: '05',
        name: 'Energiebalance',
        url: 'energiebalance.de',
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

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

/** Randloser Browser-Frame (Chrome-Bar + URL) statt Geräte-Mockup. */
function BrowserFrame({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) {
    return (
        <div className={`bframe${className ? ' ' + className : ''}`}>
            <div className="bframe-bar">
                <span className="bframe-dots"><i /><i /><i /></span>
                <span className="bframe-url">{url}</span>
            </div>
            <div className="bframe-screen">{children}</div>
        </div>
    )
}

export default function CasesSection() {
    const [active, setActive] = useState(0)
    const [slide, setSlide] = useState(0)
    const trackRef = useRef<HTMLDivElement>(null)

    const goTo = (i: number) => {
        const track = trackRef.current
        if (!track) return
        const idx = ((i % PROJEKTE.length) + PROJEKTE.length) % PROJEKTE.length
        const el = track.children[idx] as HTMLElement | undefined
        if (el) track.scrollTo({ left: el.offsetLeft, behavior: 'smooth' })
    }
    const onScroll = () => {
        const track = trackRef.current
        if (!track) return
        const i = Math.round(track.scrollLeft / track.clientWidth)
        setSlide(Math.max(0, Math.min(PROJEKTE.length - 1, i)))
    }

    return (
        <section
            id="projekte"
            style={{
                background: '#08192a',
                padding: 'clamp(7rem, 13vw, 13rem) 0',
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

            {/* ── Desktop: großzügiger Browser-Frame links, Liste rechts (weicher Fade) ── */}
            <div className="cases-layout">
                <div className="cases-stage">
                    <BrowserFrame url={PROJEKTE[active].url} className="bframe-lg">
                        {PROJEKTE.map((p, i) => (
                            <div
                                key={p.nr}
                                className={`cases-shot${i === active ? ' is-active' : ''}`}
                            >
                                <Screen p={p} variant="desk" />
                            </div>
                        ))}
                    </BrowserFrame>
                </div>

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

            {/* ── Mobile: nativer Swipe-Slider ── */}
            <div className="cases-slider" ref={trackRef} onScroll={onScroll}>
                {PROJEKTE.map((p, i) => {
                    const last = i === PROJEKTE.length - 1
                    return (
                        <article
                            key={p.nr}
                            className="cslide"
                            style={{ ['--acc' as string]: p.accent } as React.CSSProperties}
                        >
                            <BrowserFrame url={p.url} className="cslide-frame">
                                <Screen p={p} variant="desk" />
                            </BrowserFrame>
                            <span className="cslide-nr">{p.nr} — Projekt</span>
                            <h3 className="cslide-name">{p.name}</h3>
                            <p className="cslide-branche">{p.branche}</p>
                            <p className="cslide-desc">{p.beschreibung}</p>
                            <p className="cslide-erg">{p.ergebnis}</p>
                            {last ? (
                                <a className="cslide-btn" href="#contact">
                                    <span>Gespräch anfragen</span><Arrow />
                                </a>
                            ) : (
                                <button type="button" className="cslide-btn" onClick={() => goTo(i + 1)}>
                                    <span>Weiter</span><Arrow />
                                </button>
                            )}
                        </article>
                    )
                })}
            </div>
            <div className="cslide-dots">
                {PROJEKTE.map((p, i) => (
                    <button
                        key={p.nr}
                        type="button"
                        className={`cslide-dot${i === slide ? ' is-on' : ''}`}
                        onClick={() => goTo(i)}
                        aria-label={`Projekt ${p.nr} anzeigen`}
                    />
                ))}
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
