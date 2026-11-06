'use client'

import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'

/**
 * Startseite, Teil D – die Lösung: Was macht LinderMedia anders?
 *
 * Kein Leistungskatalog, sondern die Verbindung der Disziplinen. Die sechs Felder
 * bleiben knapp: Kurztext, Bild, klare Gestaltung. Die ausführlichen Leistungen
 * stehen auf den Leistungsseiten (lib/leistungen.ts).
 */
const FELDER = [
    { nr: '01', name: 'Brand & Strategy',   text: 'Markenidentität, Positionierung und visuelle Markenentwicklung.',              bild: '/images/kompetenz-01-brand-strategy-novodex-teakdeck.webp', alt: 'Die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch' },
    { nr: '02', name: 'Photography',        text: 'Produkt-, Image- und Unternehmensfotografie mit Charakter.',                   bild: '/images/kompetenz-02-photography-schaaf-tender-cockpit.webp', alt: 'Cockpit eines Schaaf-Tenders mit schwarzem Lenkrad und Display vor tiefschwarzem Hintergrund' },
    { nr: '03', name: 'Film & Motion',      text: 'Imagefilme, Produktfilme, Storytelling und visuelle Kommunikation.',            bild: '/images/kompetenz-03-film-motion-audi-r8-werkstatt.webp', alt: 'Roter Audi R8 in einer dunklen Werkstatthalle, daneben ein ausgebauter Motorblock' },
    { nr: '04', name: '3D & Visualization', text: 'Fotorealistische Produktvisualisierungen und digitale Inszenierungen.',         bild: '/images/kompetenz-04-3d-visualization-ravenol-rennwagen.webp', alt: 'Blau-gelber Ravenol-Rennwagen mit goldener Leoparden-Folierung in der Seitenansicht' },
    { nr: '05', name: 'Digital Experience', text: 'Webdesign, digitale Plattformen und durchdachte Nutzererlebnisse.',             bild: '/images/kompetenz-05-digital-experience-skipper-app.webp', alt: 'Laptop mit der Startseite der Skipper-App auf dunklem Felsgestein' },
    { nr: '06', name: 'AI & Marketing',     text: 'KI-gestützte Content-Produktion, Marketing und intelligente Automatisierung.',  bild: '/images/kompetenz-06-ai-marketing-wellenwind-hoodies.webp', alt: 'Drei Wellenwind-Hoodies in Hellblau, Weiß und Türkis an Haken vor dunklem Grund' },
]

/* Schlichte Linien-Icons, 24er-Raster – eines je Feld. */
const ICONS: JSX.Element[] = [
    <><path d="M12 3l9 9-9 9-9-9z" /><circle cx="12" cy="12" r="2.2" /></>,
    <><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.6" /><path d="M8.5 7l1.4-2.5h4.2L15.5 7" /></>,
    <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9.2v5.6l5-2.8z" /></>,
    <><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" /><path d="M12 12l8-4.5M12 12L4 7.5M12 12v9" /></>,
    <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><circle cx="6" cy="6.5" r=".6" /><circle cx="8.6" cy="6.5" r=".6" /></>,
    <><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" /></>,
]

/* Lage der sechs Knoten auf dem Ring (viewBox 600 × 600, Mitte 300/300). */
const R = 240
/* Textfeld je Knoten (Name + Kurztext direkt daneben): rechts, links, oben, unten. */
const FO: { x: number; y: number; w: number; h: number; pos: 'top' | 'right' | 'bottom' | 'left' }[] = [
    { x: -150, y: -190, w: 300, h: 130, pos: 'top' },
    { x: 58,   y: -34,  w: 290, h: 130, pos: 'right' },
    { x: 58,   y: -34,  w: 290, h: 130, pos: 'right' },
    { x: -150, y: 56,   w: 300, h: 130, pos: 'bottom' },
    { x: -348, y: -34,  w: 290, h: 130, pos: 'left' },
    { x: -348, y: -34,  w: 290, h: 130, pos: 'left' },
]
const POS = FELDER_POS()
function FELDER_POS() {
    return [0, 1, 2, 3, 4, 5].map((i) => {
        const a = ((-90 + i * 60) * Math.PI) / 180
        return { x: 300 + R * Math.cos(a), y: 300 + R * Math.sin(a) }
    })
}

export default function KompetenzSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.12 })
    const [aktiv, setAktiv] = useState(0)
    /** Schmale Viewports: Texte stehen darunter, also kann der Kreis fast die ganze Breite nutzen. */
    const [schmal, setSchmal] = useState(false)
    useEffect(() => {
        const mq = window.matchMedia('(max-width: 900px)')
        const sync = () => setSchmal(mq.matches)
        sync()
        mq.addEventListener('change', sync)
        return () => mq.removeEventListener('change', sync)
    }, [])
    /** Bis wann der Automatik-Wechsel ruht (Zeitstempel; Infinity = solange die Maus darüber steht). */
    const pauseBis = useRef(0)
    const sichtbar = useRef(false)
    const hoverTimer = useRef<ReturnType<typeof setTimeout>>()

    /** Wechselt nur, solange der Abschnitt im Bild ist, niemand ihn bedient und Bewegung erlaubt ist. */
    useEffect(() => {
        const el = ref.current
        if (!el) return
        const io = new IntersectionObserver(([e]) => { sichtbar.current = e.isIntersecting }, { threshold: 0.3 })
        io.observe(el)
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
        const t = reduce ? undefined : setInterval(() => {
            if (sichtbar.current && Date.now() >= pauseBis.current) setAktiv((a) => (a + 1) % FELDER.length)
        }, 5500)
        return () => { io.disconnect(); if (t) clearInterval(t); clearTimeout(hoverTimer.current) }
    }, [ref])

    /** Tippen/Klicken wählt sofort und lässt dem Besucher danach Ruhe zum Lesen. */
    const waehle = (i: number) => {
        clearTimeout(hoverTimer.current)
        setAktiv(i)
        pauseBis.current = Date.now() + 12000
    }
    /** Mit der Maus erst nach kurzem Verweilen – ein Darüberfahren soll nichts auslösen. */
    const verweile = (i: number) => (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        clearTimeout(hoverTimer.current)
        hoverTimer.current = setTimeout(() => setAktiv(i), 220)
    }
    const verlasse = (e: React.PointerEvent) => {
        if (e.pointerType !== 'mouse') return
        clearTimeout(hoverTimer.current)
    }

    return (
        <section id="zusammenspiel" className="kmp" ref={ref}>
            <div className="kmp-inner">
                <p className="kmp-eye reveal" data-reveal>| Was uns besonders macht</p>
                <h2 className="kmp-h2 reveal" data-reveal>
                    Eine Idee. Viele Möglichkeiten.<br /><strong>Ein klarer Auftritt.</strong>
                </h2>
                <div className="kmp-lead reveal" data-reveal>
                    <p>
                        Gute Marken entstehen nicht durch einzelne Maßnahmen, sondern durch das
                        Zusammenspiel vieler Details.
                    </p>
                    <p>
                        LinderMedia verbindet strategisches Denken mit kreativer Gestaltung und moderner
                        Technologie. Wir entwickeln Marken, inszenieren Produkte, erzählen Geschichten in
                        Film und Fotografie und schaffen digitale Erlebnisse, die Menschen erreichen.
                    </p>
                    <p>
                        Dabei betrachten wir nicht nur einzelne Projekte oder Medien, sondern das große
                        Ganze: Wie wird aus einer Idee eine unverwechselbare Marke? Wie werden komplexe
                        Produkte verständlich? Und wie lässt sich Kommunikation so gestalten, dass sie
                        nachhaltig Wirkung entfaltet?
                    </p>
                    <p>
                        Von der Markenentwicklung über Fotografie, Film und 3D-Visualisierung bis hin zu
                        Webdesign, KI und intelligenten Marketingprozessen entsteht ein durchgängiges
                        Konzept – individuell auf das Unternehmen und seine Ziele abgestimmt.
                    </p>
                    <p className="kmp-strong">
                        Strategie trifft Kreativität. Gestaltung trifft Technologie. Und aus einzelnen
                        Möglichkeiten wird ein stimmiges Ganzes.
                    </p>
                </div>

                <div
                    className="kmp-stage-wrap"
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') pauseBis.current = Infinity }}
                    onPointerLeave={(e) => { if (e.pointerType === 'mouse') pauseBis.current = Date.now() + 3000 }}
                >
                    <div className="kmp-stage reveal" data-reveal>
                        <svg className={schmal ? 'kmp-narrow' : undefined} viewBox={schmal ? '-20 -20 640 640' : '-350 -200 1300 940'} role="img" aria-label="Sechs Felder um eine gemeinsame Idee">
                            <defs>
                                <clipPath id="kmp-clip"><circle cx="300" cy="300" r="150" /></clipPath>
                            </defs>
                            <circle className="kmp-ring kmp-ring-a" cx="300" cy="300" r="240" />
                            <circle className="kmp-ring kmp-ring-b" cx="300" cy="300" r="190" />
                            <circle className="kmp-ring kmp-ring-c" cx="300" cy="300" r="276" />

                            {POS.map((p, i) => (
                                <line
                                    key={i}
                                    className={`kmp-spoke${i === aktiv ? ' is-on' : ''}`}
                                    x1="300" y1="300" x2={p.x} y2={p.y}
                                />
                            ))}

                            <g clipPath="url(#kmp-clip)">
                                {FELDER.map((f, i) => (
                                    <image
                                        key={f.nr}
                                        className={`kmp-core-img${i === aktiv ? ' is-on' : ''}`}
                                        href={f.bild}
                                        x="150" y="150" width="300" height="300"
                                        preserveAspectRatio="xMidYMid slice"
                                    />
                                ))}
                                <circle cx="300" cy="300" r="150" className="kmp-core-tint" />
                            </g>
                            <circle className="kmp-core-edge" cx="300" cy="300" r="150" />

                            <text className="kmp-core-label" x="300" y="296" textAnchor="middle">EINE</text>
                            <text className="kmp-core-label kmp-core-label-b" x="300" y="326" textAnchor="middle">IDEE</text>

                            {POS.map((p, i) => (
                                <g
                                    key={i}
                                    className={`kmp-node${i === aktiv ? ' is-on' : ''}`}
                                    transform={`translate(${p.x} ${p.y})`}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={FELDER[i].name}
                                    onPointerEnter={verweile(i)}
                                    onPointerLeave={verlasse}
                                    onFocus={() => waehle(i)}
                                    onClick={() => waehle(i)}
                                >
                                    <circle className="kmp-node-halo" r="46" />
                                    <circle className="kmp-node-disc" r="34" />
                                    <g transform="translate(-14 -14) scale(1.1667)" className="kmp-node-ic">{ICONS[i]}</g>
                                    <foreignObject x={FO[i].x} y={FO[i].y} width={FO[i].w} height={FO[i].h}>
                                        <div className={`kmp-fo kmp-fo-${FO[i].pos}`}>
                                            <span className="kmp-fo-name">{FELDER[i].name}</span>
                                            <span className="kmp-fo-text">{FELDER[i].text}</span>
                                        </div>
                                    </foreignObject>
                                </g>
                            ))}
                        </svg>
                    </div>

                    {/* Bildbeschreibungen für Screenreader (die Motive liegen im SVG-Kreis) */}
                    <ul className="sr-only">
                        {FELDER.map((f) => <li key={f.nr}>{f.name}: {f.alt}</li>)}
                    </ul>
                    <div className="kmp-caps" aria-live="polite">
                        {FELDER.map((f, i) => (
                            <p key={f.nr} className={`kmp-cap${i === aktiv ? ' is-on' : ''}`}>
                                <span className="kmp-cap-nr">{f.nr}</span>
                                <strong>{f.name}</strong>
                                {f.text}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
