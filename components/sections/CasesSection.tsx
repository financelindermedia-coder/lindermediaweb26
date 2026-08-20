'use client'

import { useEffect, useRef, useState } from 'react'
import useVideoSource from '@/components/useVideoSource'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'

/**
 * Projekte / Cases.
 *
 * Gezeigt werden die Key-Visuals der jeweiligen Marke (16:9), nicht Website-
 * Screenshots – deshalb ein neutraler Bildrahmen statt der früheren Browser-
 * Leiste mit URL. Die Browser-Chrome würde ein Key-Visual fälschlich als
 * Website des Kunden ausgeben (.bframe*-CSS liegt für den Fall bereit).
 *
 * Desktop: großes Bild links, Projektliste rechts – mit Maus, Tastatur
 * (Pfeiltasten, Pos1/Ende) und sichtbarer Aktiv-Markierung bedienbar. Beim
 * Wechsel crossfadet das Medium im Rahmen, ohne Layout-Sprung: der Rahmen hat
 * ein festes 16:9-Verhältnis, alle Motive liegen deckungsgleich darin.
 * Mobile: nativer Swipe-Slider – je Projekt eine Slide.
 *
 * Bewusst NICHT enthalten: Ergebnis-Kennzahlen, Kundenzitate und leere
 * Platzhalter wie „Fallstudie folgt". Eine Fallstudien-CTA kommt erst, wenn es
 * eine Fallstudie gibt.
 */

type Projekt = {
    nr: string
    name: string
    /** Disziplinen-Zeile, z. B. „Branding · Webdesign · Positionierung". */
    leistungen: string
    beschreibung: string
    accent: string
    /** Key-Visual der Marke, 16:9. */
    visual?: string
    /** Was auf dem Key-Visual zu sehen ist – Grundlage des Alternativtexts. */
    visualAlt?: string
    /** Bewegtes Key-Visual; läuft nur für das aktive Projekt. */
    video?: string
    /**
     * Der Film hat eine Tonspur. Abgespielt wird trotzdem stumm – Ton gibt es
     * erst auf Klick, sonst blockt der Browser die Wiedergabe ohnehin.
     */
    audio?: boolean
}

const PROJEKTE: Projekt[] = [
    {
        nr: '01',
        name: 'Solar Impact Yacht',
        leistungen: 'Branding · Webdesign · Positionierung',
        beschreibung:
            'Markenauftritt für ein Hightech-Startup, das innovative SWATH-Technologie und solarbetriebene Schifffahrt sichtbar macht.',
        accent: '#ff6b35',
        // Bleibt JPG: das Original ist bereits stark komprimiert, WebP kam bei
        // jeder Qualitaetsstufe groesser heraus (142K JPG vs. 231K bei q62).
        visual: '/images/solarimpact.jpg',
        visualAlt: 'die dunkelgraue SWATH-Yacht in Fahrt vor einer Felsküste',
        // Web-Fassungen aus dem Master N_swath.mp4, erzeugt mit
        // scripts/encode-web-videos.ps1.
        video: '/video/case-solarimpact.mp4',
        audio: true,
    },
    {
        nr: '02',
        name: 'Novodex',
        leistungen: 'Markenentwicklung · Visualisierung · Design',
        beschreibung:
            'Eine Premium-Marke für individuelle Yachtdecks – klar positioniert und visuell auf den Punkt gebracht.',
        accent: '#ff7d48',
        visual: '/images/Novodex.webp',
        visualAlt: 'die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch',
    },
    {
        nr: '03',
        name: 'Wellenwind',
        leistungen: 'Markenstrategie · Onlineshop · Content',
        beschreibung:
            'Von der Idee zur eigenständigen Segelmarke – inklusive Shop, Content und visueller Identität.',
        accent: '#f26a2e',
        visual: '/images/wellenwind.webp',
        visualAlt: 'drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke',
        // Web-Fassungen aus ww_promo.mp4, erzeugt mit scripts/encode-web-videos.ps1.
        // Kein `audio`: die Tonspur des Masters ist durchgehend still.
        video: '/video/case-wellenwind.mp4',
    },
    {
        // ENTWURF – Text von Andreas noch offen
        nr: '04',
        name: 'Marèvo',
        leistungen: 'Markenentwicklung · Design · Bildwelt',
        beschreibung:
            'Eine Premium-Marke im Yachting-Segment – zurückhaltend, hochwertig und vom ersten Moment an unverwechselbar.',
        accent: '#ff8f5c',
        visual: '/images/marevo.webp',
        visualAlt: 'eine Segelyacht mit dunklen Segeln in Fahrt, darüber der Schriftzug MARÈVO',
    },
    {
        nr: '05',
        name: 'Rainer Engel – Ein spektakuläres Leben',
        leistungen: 'Strategie · Design · Onlineshop · Social Media',
        beschreibung:
            'Konzeption und Gestaltung einer digitalen Präsenz zur authentischen Inszenierung einer außergewöhnlichen Lebensgeschichte – mit Fokus auf Storytelling und visuelle Kommunikation.',
        accent: '#c94a1e',
        visual: '/images/RE.webp',
        visualAlt: 'das aufgeschlagene Buch „A Spectacular Life" wird in die Kamera gehalten, daneben Titelzeile und Bezugsquellen',
        // Web-Fassungen aus re.mp4, erzeugt mit scripts/encode-web-videos.ps1.
        video: '/video/case-rainer-engel.mp4',
        audio: true,
    },
    {
        // ENTWURF – Text von Andreas noch offen
        nr: '06',
        name: 'LubriCan',
        leistungen: 'Branding · Produktinszenierung · Onlineshop · Content',
        beschreibung:
            'Ein technisches Produkt im Performance-Umfeld – inszeniert für einen Markt, der Leistung sehen will, bevor sie erklärt wird.',
        accent: '#e0561f',
        visual: '/images/lubrican.webp',
        visualAlt: 'zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, oben die Wortmarke',
        // Web-Fassungen aus lc_promo.mp4, erzeugt mit scripts/encode-web-videos.ps1.
        video: '/video/case-lubrican.mp4',
        audio: true,
    },
]

/** Alternativtext aus Projektname und konkretem Bildinhalt. */
function altFor(p: Projekt) {
    return p.visualAlt
        ? `${p.name} — Key-Visual: ${p.visualAlt}.`
        : `${p.name} — Key-Visual des Markenauftritts.`
}

/**
 * Bewegtes Key-Visual. Laeuft nur fuer das aktive Projekt und laedt auch nur
 * dann – die uebrigen fuenf Projekte stehen weiter als Standbild im Rahmen.
 *
 * Die Promo-Filme bringen eine Tonspur mit, starten aber stumm: Autoplay mit
 * Ton lassen die Browser nicht zu, und ungefragt losplaerren soll die Seite
 * ohnehin nicht. Der Lautsprecher-Schalter macht den Ton auf; die Entscheidung
 * gilt dann fuer alle weiteren Projekte, die man anklickt.
 */
function CaseVideo({ p, sound, onSound }: { p: Projekt; sound: boolean; onSound: (on: boolean) => void }) {
    const ref = useRef<HTMLVideoElement>(null)
    const src = useVideoSource(p.video as string)
    const [paused, setPaused] = useState(false)
    const withSound = Boolean(p.audio) && sound

    /*
     * `muted` steht als Attribut immer auf true – sonst startet die Wiedergabe
     * gar nicht erst. Erst wenn das Element steht, wird der Ton aufgemacht.
     * Weist der Browser das ab (z. B. ohne vorherige Interaktion), faellt der
     * Schalter zurueck auf stumm, statt ein stehendes Bild zu hinterlassen.
     */
    useEffect(() => {
        const v = ref.current
        if (!v || !src) return
        v.muted = !withSound
        if (withSound && v.paused) {
            v.play().catch(() => {
                v.muted = true
                onSound(false)
            })
        }
    }, [withSound, src, onSound])

    const togglePlay = () => {
        const v = ref.current
        if (!v) return
        if (v.paused) { v.play().catch(() => {}); setPaused(false) }
        else { v.pause(); setPaused(true) }
    }

    return (
        <>
            <video
                ref={ref}
                className="cm-video"
                src={src ?? undefined}
                poster={p.visual}
                aria-label={altFor(p)}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
            />
            <div className="kvframe-controls">
                {p.audio && (
                    <button
                        type="button"
                        className="media-pause kvframe-ctrl"
                        onClick={() => onSound(!sound)}
                        aria-pressed={withSound}
                        aria-label={`Ton zu ${p.name} ${withSound ? 'ausschalten' : 'einschalten'}`}
                    >
                        {withSound ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                                <path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                                <path d="M19 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                <path d="M4 9v6h4l5 4V5L8 9H4z" />
                                <path d="M16.5 9.5l5 5M21.5 9.5l-5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                            </svg>
                        )}
                    </button>
                )}
                <button
                    type="button"
                    className="media-pause kvframe-ctrl"
                    onClick={togglePlay}
                    aria-label={`Video zu ${p.name} ${paused ? 'abspielen' : 'pausieren'}`}
                >
                    {paused ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                    )}
                </button>
            </div>
        </>
    )
}

/** Key-Visual: bewegt fuer das aktive Projekt (sofern vorhanden), sonst still. */
function Screen({ p, active, variant, sound, onSound }: {
    p: Projekt
    active: boolean
    variant: 'desk' | 'mob'
    sound: boolean
    onSound: (on: boolean) => void
}) {
    const reduced = usePrefersReducedMotion()

    // Bei „weniger Bewegung" bleibt es beim Standbild – das Video ist hier
    // Illustration, kein Inhalt, der sonst fehlen wuerde.
    if (p.video && active && !reduced) {
        return <CaseVideo p={p} sound={sound} onSound={onSound} />
    }

    if (p.visual) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={p.visual}
                alt={altFor(p)}
                className="cm-img"
                width={1920}
                height={1080}
                loading="lazy"
                decoding="async"
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

/**
 * Welches der beiden Layouts gerade sichtbar ist. Beide stehen im DOM und nur
 * eines wird per CSS eingeblendet – ohne diese Abfrage liefe im ausgeblendeten
 * Layout ein zweites Video mit: unsichtbar, aber geladen und mit Ton.
 *
 * `null` bis gemessen wurde, damit Server- und erster Client-Render
 * uebereinstimmen. Solange steht ueberall das Standbild.
 */
function useMobileLayout(): boolean | null {
    const [mobile, setMobile] = useState<boolean | null>(null)

    useEffect(() => {
        // Deckt sich mit der Umschaltbreite von .cases-layout in globals.css.
        const query = window.matchMedia('(max-width: 768px)')
        const sync = () => setMobile(query.matches)

        sync()
        query.addEventListener('change', sync)
        return () => query.removeEventListener('change', sync)
    }, [])

    return mobile
}

export default function CasesSection() {
    const [active, setActive] = useState(0)
    const [slide, setSlide] = useState(0)
    const [sound, setSound] = useState(false)
    const mobile = useMobileLayout()
    const trackRef = useRef<HTMLDivElement>(null)
    const listRef = useRef<HTMLUListElement>(null)

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

    /**
     * Pfeiltasten wechseln das Projekt und nehmen den Fokus mit. Ohne das muss
     * man sich mit Tab durch die Liste arbeiten und jeden Eintrag einzeln
     * bestaetigen, um zu sehen, welches Bild dazugehoert.
     */
    const onListKeyDown = (event: React.KeyboardEvent<HTMLUListElement>) => {
        const last = PROJEKTE.length - 1
        let next: number | null = null

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = active === last ? 0 : active + 1
        else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = active === 0 ? last : active - 1
        else if (event.key === 'Home') next = 0
        else if (event.key === 'End') next = last
        if (next === null) return

        event.preventDefault()
        setActive(next)
        listRef.current?.querySelectorAll<HTMLButtonElement>('.cases-item')[next]?.focus()
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

            {/* ── Desktop: großzügiger Bildrahmen links, Liste rechts (weicher Fade) ── */}
            <div className="cases-layout">
                <div className="cases-stage">
                    <KeyVisualFrame className="kvframe-lg">
                        {PROJEKTE.map((p, i) => (
                            <div
                                key={p.nr}
                                className={`cases-shot${i === active ? ' is-active' : ''}`}
                                // Die inaktiven Motive liegen deckungsgleich
                                // darunter – ohne dies laufen sie mit in den
                                // Vorlesefluss.
                                aria-hidden={i !== active}
                            >
                                <Screen
                                    p={p}
                                    active={i === active && mobile === false}
                                    variant="desk"
                                    sound={sound}
                                    onSound={setSound}
                                />
                            </div>
                        ))}
                    </KeyVisualFrame>
                </div>

                <ul className="cases-list" ref={listRef} onKeyDown={onListKeyDown}>
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
                                <Screen
                                    p={p}
                                    active={i === slide && mobile === true}
                                    variant="desk"
                                    sound={sound}
                                    onSound={setSound}
                                />
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
                        aria-label={`Projekt ${p.nr}: ${p.name}`}
                        aria-current={i === slide ? 'true' : undefined}
                    />
                ))}
            </div>

        </section>
    )
}
