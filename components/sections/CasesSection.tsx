'use client'

import { useRef, useState } from 'react'

/**
 * Projekte / Cases.
 *
 * Gezeigt werden die Key-Visuals der jeweiligen Marke (16:9), nicht Website-
 * Screenshots – deshalb ein neutraler Bildrahmen statt der früheren Browser-
 * Leiste mit URL. Die Browser-Chrome würde ein Key-Visual fälschlich als
 * Website des Kunden ausgeben (.bframe*-CSS liegt für den Fall bereit).
 *
 * Desktop: großes Bild links, klickbare Projektliste rechts – beim Wechsel
 * crossfadet das Bild (kein Reload, nur ein weicher Fade).
 * Mobile: automatisch ein nativer Swipe-Slider – je Projekt eine Slide mit
 * Bild, Name, Text und „Weiter"-Button; Punkte zeigen die Position.
 */

type Projekt = {
    nr: string
    name: string
    /** Disziplinen-Zeile, z. B. „Branding · Webdesign · Positionierung". */
    leistungen: string
    beschreibung: string
    accent: string
    /** Key-Visual bzw. Website-Screenshot, 16:9 bevorzugt. */
    visual?: string
    /** Screenshot oben ausrichten (Website), statt mittig (Key-Visual). */
    alignTop?: boolean
}

const PROJEKTE: Projekt[] = [
    {
        nr: '01',
        name: 'Solar Impact Yacht',
        leistungen: 'Branding · Webdesign · Positionierung',
        beschreibung:
            'Markenauftritt für ein Hightech-Startup, das innovative SWATH-Technologie und solarbetriebene Schifffahrt sichtbar macht.',
        accent: '#ff6b35',
        visual: '/images/case-solarimpact-desk.jpg',
        alignTop: true,
    },
    {
        nr: '02',
        name: 'Novodex',
        leistungen: 'Markenentwicklung · Visualisierung · Design',
        beschreibung:
            'Eine Premium-Marke für individuelle Yachtdecks – klar positioniert und visuell auf den Punkt gebracht.',
        accent: '#ff7d48',
        visual: '/images/Novodex.jpg',
    },
    {
        nr: '03',
        name: 'Wellenwind',
        leistungen: 'Markenstrategie · E-Commerce · Content',
        beschreibung:
            'Von der Idee zur eigenständigen Segelmarke – inklusive Shop, Content und visueller Identität.',
        accent: '#f26a2e',
        visual: '/images/wellenwind.jpg',
    },
    {
        // ENTWURF – Text von Andreas noch offen
        nr: '04',
        name: 'Marèvo',
        leistungen: 'Markenentwicklung · Design · Bildwelt',
        beschreibung:
            'Eine Premium-Marke im Yachting-Segment – zurückhaltend, hochwertig und vom ersten Moment an unverwechselbar.',
        accent: '#ff8f5c',
        visual: '/images/marevo.jpg',
    },
    {
        nr: '05',
        name: 'Rainer Engel – Ein spektakuläres Leben',
        leistungen: 'Strategie · Design · Social Media',
        beschreibung:
            'Konzeption und Gestaltung einer digitalen Präsenz zur authentischen Inszenierung einer außergewöhnlichen Lebensgeschichte – mit Fokus auf Storytelling und visuelle Kommunikation.',
        accent: '#c94a1e',
        visual: '/images/RE.jpg',
    },
    {
        // ENTWURF – Text von Andreas noch offen
        nr: '06',
        name: 'LubriCan',
        leistungen: 'Branding · Produktinszenierung · Content',
        beschreibung:
            'Ein technisches Produkt im Performance-Umfeld – inszeniert für einen Markt, der Leistung sehen will, bevor sie erklärt wird.',
        accent: '#e0561f',
        visual: '/images/lubrican.jpg',
    },
]

/** Key-Visual bzw. Screenshot (falls vorhanden), sonst der CSS-Mock. */
function Screen({ p, variant }: { p: Projekt; variant: 'desk' | 'mob' }) {
    if (p.visual) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={p.visual}
                alt={`${p.name} – Key-Visual`}
                className={`cm-img${p.alignTop ? '' : ' cm-img-center'}`}
                loading="lazy"
            />
        )
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

/** Neutraler 16:9-Bildrahmen – zeigt das Key-Visual ohne fremde Zutaten. */
function KeyVisualFrame({ className, children }: { className?: string; children: React.ReactNode }) {
    return (
        <div className={`kvframe${className ? ' ' + className : ''}`}>
            <div className="kvframe-screen">{children}</div>
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
                padding: 'clamp(7rem, 13vw, 13rem) 0 clamp(3.5rem, 6vw, 6rem)',
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
                    <KeyVisualFrame className="kvframe-lg">
                        {PROJEKTE.map((p, i) => (
                            <div
                                key={p.nr}
                                className={`cases-shot${i === active ? ' is-active' : ''}`}
                            >
                                <Screen p={p} variant="desk" />
                            </div>
                        ))}
                    </KeyVisualFrame>
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
                                        <span className="cases-branche">{p.leistungen}</span>
                                        <span className="cases-detail">
                                            <span className="cases-detail-inner">
                                                <span className="cases-desc">{p.beschreibung}</span>
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
                            <KeyVisualFrame className="cslide-frame">
                                <Screen p={p} variant="desk" />
                            </KeyVisualFrame>
                            <span className="cslide-nr">{p.nr} — Projekt</span>
                            <h3 className="cslide-name">{p.name}</h3>
                            <p className="cslide-branche">{p.leistungen}</p>
                            <p className="cslide-desc">{p.beschreibung}</p>
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

        </section>
    )
}
