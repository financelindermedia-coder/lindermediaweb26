'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import LazyVideo from '@/components/LazyVideo'
import useReveal from '@/components/useReveal'
import './CasesSection.css'

/**
 * Projekte & Referenzen: ein grosses Projekt (Solar Impact Yacht) und darunter
 * ein Slider mit den weiteren Projekten – zwei sichtbar, Pfeile und Zaehler
 * zeigen, dass es mehr gibt. Jeder Teaser sagt, was die Ausgangslage war, und
 * fuehrt als Ganzes zur Fallstudie. Die komplette Liste steht auf /referenzen.
 *
 * Texte, Bilder und Videos sind die bestehenden Projektdaten; es kommt nichts
 * Neues hinzu. Der Slider ist ein nativer Scroll-Container (Swipe, Pfeiltasten
 * nach Fokus, Maus-/Touchpad-Scroll) – die Pfeile blaettern nur komfortabler.
 */

type Teaser = {
    nr: string
    name: string
    kicker: string
    text: string
    href: string
    cta: string
    visual: string
    visualAlt: string
    video?: string
}

const GROSS: Teaser = {
    nr: '01',
    name: 'Solar Impact Yacht',
    kicker: 'Positionierung · Technologie verständlich machen',
    text: 'Eine innovative SWATH-Technologie sollte nicht über technische Komplexität kommuniziert werden, sondern über die Veränderung, die sie für die Zukunft der Schifffahrt möglich macht.',
    href: '/projekte/solar-impact-yacht',
    cta: 'Fallstudie ansehen',
    visual: '/images/solarimpact.jpg',
    visualAlt: 'die dunkelgraue SWATH-Yacht in Fahrt vor einer Felsküste',
    video: '/video/case-solarimpact.mp4',
}

const SLIDER: Teaser[] = [
    {
        nr: '02',
        name: 'Wellenwind',
        kicker: 'Markenaufbau · Content-System · E-Commerce',
        text: 'Marke, Onlineshop und Content aus einer gemeinsamen strategischen Richtung – damit Produkt, Kampagne und Social Content dieselbe Geschichte erzählen.',
        href: '/projekte/wellenwind',
        cta: 'Fallstudie ansehen',
        visual: '/images/wellenwind.webp',
        visualAlt: 'drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke',
        video: '/video/case-wellenwind.mp4',
    },
    {
        nr: '03',
        name: 'Novodex',
        kicker: 'Premium-Positionierung · Prozess-Sicherheit',
        text: 'Statt über Material und Quadratmeterpreis zu konkurrieren, wurde der gesamte Refit-Prozess zum eigentlichen Produkt.',
        href: '/projekte/novodex',
        cta: 'Fallstudie ansehen',
        visual: '/images/Novodex.webp',
        visualAlt: 'die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch',
    },
    {
        nr: '04',
        name: 'Marèvo',
        kicker: 'Premium-Wahrnehmung · Differenzierung',
        text: 'Statt im üblichen Wettbewerb aus Länge, Tempo und Ausstattung mitzuspielen, wurde eine andere Frage zum Kern der Marke: Wie weit trägt Stimmigkeit?',
        href: '/projekte/marevo',
        cta: 'Fallstudie ansehen',
        visual: '/images/marevo.webp',
        visualAlt: 'eine Segelyacht mit dunklen Segeln in Fahrt, darüber der Schriftzug MARÈVO',
    },
    {
        nr: '05',
        name: 'LubriCan',
        kicker: 'Produktverständnis · E-Commerce',
        text: 'Marke, Produktinszenierung und Onlineshop wurden zu einem System verbunden, das Orientierung schafft, ohne technische Tiefe zu verlieren.',
        href: '/projekte/lubrican',
        cta: 'Fallstudie ansehen',
        visual: '/images/lubrican.webp',
        visualAlt: 'zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, oben die Wortmarke',
        video: '/video/case-lubrican.mp4',
    },
    {
        nr: '06',
        name: 'Schaaf Tender',
        kicker: 'Differenzierung · Premium-Wahrnehmung',
        text: 'Statt über Größe und Ausstattung zu konkurrieren, bekommt jedes Detail den Raum, in dem seine Qualität sichtbar werden kann.',
        href: '/projekte/schaaf-tender',
        cta: 'Fallstudie ansehen',
        visual: '/images/case-schaaf-hero-2.webp',
        visualAlt: 'der weiße Schaaf-Tender in Fahrt auf offener See vor einer flachen Küstenlinie',
    },
    {
        nr: '07',
        name: 'Rainer Engel – Ein spektakuläres Leben',
        kicker: 'Storytelling · Reichweite · Community',
        text: 'Eine visuelle und digitale Präsenz, die nicht nur Informationen vermittelt, sondern Persönlichkeit, Geschichte und Charakter in den Mittelpunkt stellt.',
        // Noch keine eigene Fallstudie: fuehrt auf die Referenzuebersicht.
        href: '/referenzen',
        cta: 'Zu den Referenzen',
        visual: '/images/RE.webp',
        visualAlt: 'das aufgeschlagene Buch „A Spectacular Life" wird in die Kamera gehalten, daneben Titelzeile und Bezugsquellen',
        video: '/video/case-rainer-engel.mp4',
    },
]

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

function Karte({ t, gross }: { t: Teaser; gross?: boolean }) {
    return (
        <article className={`pj-card${gross ? ' pj-card--gross' : ' pj-card--slide'}`}>
            <div className="pj-media">
                {t.video ? (
                    <LazyVideo
                        className="pj-visual"
                        src={t.video}
                        poster={t.visual}
                        pauseControl
                        pauseControlClassName="pj-pause"
                        pauseControlLabel={`Video zu ${t.name}`}
                    />
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        className="pj-visual"
                        src={t.visual}
                        alt={`${t.name} — Key-Visual: ${t.visualAlt}.`}
                        width={1920}
                        height={1080}
                        loading="lazy"
                        decoding="async"
                    />
                )}
                <div className="pj-scrim" aria-hidden="true" />
            </div>
            <div className="pj-body">
                <p className="pj-kicker"><i>{t.nr}</i> / {t.kicker}</p>
                <h3 className="pj-name">
                    {/* Der Link spannt ueber die ganze Karte (::after); der
                        Pause-Schalter liegt davor und bleibt klickbar. */}
                    <Link href={t.href} className="pj-link">{t.name}</Link>
                </h3>
                <p className="pj-text">{t.text}</p>
                <span className="pj-cta" aria-hidden="true">{t.cta}<Arrow /></span>
            </div>
        </article>
    )
}

export default function CasesSection() {
    const ref = useReveal<HTMLElement>()
    const trackRef = useRef<HTMLDivElement>(null)
    const [first, setFirst] = useState(0)
    const [perView, setPerView] = useState(2)
    const [atEnd, setAtEnd] = useState(false)

    /** Position aus dem Scrollstand ableiten – gilt fuer Pfeile wie fuer Swipe. */
    const sync = useCallback(() => {
        const track = trackRef.current
        if (!track) return
        const card = track.children[0] as HTMLElement | undefined
        if (!card) return
        const step = card.offsetWidth + parseFloat(getComputedStyle(track).columnGap || '0')
        setFirst(Math.round(track.scrollLeft / Math.max(step, 1)))
        setPerView(Math.max(1, Math.round((track.clientWidth + 1) / Math.max(step, 1))))
        setAtEnd(track.scrollLeft + track.clientWidth >= track.scrollWidth - 4)
    }, [])

    useEffect(() => {
        sync()
        window.addEventListener('resize', sync)
        return () => window.removeEventListener('resize', sync)
    }, [sync])

    const go = (dir: 1 | -1) => {
        const track = trackRef.current
        const card = track?.children[0] as HTMLElement | undefined
        if (!track || !card) return
        const gap = parseFloat(getComputedStyle(track).columnGap || '0')
        track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: 'smooth' })
    }

    const last = Math.min(first + perView, SLIDER.length)

    return (
        <section id="projekte" ref={ref} className="pj">
            <div className="pj-head">
                <div>
                    <p className="pj-eye reveal" data-reveal>| Projekte &amp; Referenzen</p>
                    <h2 className="pj-h2 reveal" data-reveal>
                        Was aus der Arbeit<br /><strong>wirklich wird.</strong>
                    </h2>
                </div>
                <p className="pj-intro reveal" data-reveal>
                    Beispiele für unterschiedliche Ausgangslagen – und eine
                    gemeinsame Frage: Was muss sichtbar werden?
                </p>
            </div>

            <Karte t={GROSS} gross />

            <div className="pj-slider-bar">
                <p className="pj-slider-count" aria-live="polite">
                    Weitere Projekte <span>{first + 1}{last > first + 1 ? `–${last}` : ''} / {SLIDER.length}</span>
                </p>
                <div className="pj-arrows">
                    <button type="button" className="pj-arrow pj-arrow--prev" onClick={() => go(-1)} disabled={first <= 0} aria-label="Vorheriges Projekt">
                        <Arrow />
                    </button>
                    <button type="button" className="pj-arrow" onClick={() => go(1)} disabled={atEnd} aria-label="Nächstes Projekt">
                        <Arrow />
                    </button>
                </div>
            </div>

            <div
                className="pj-track"
                ref={trackRef}
                onScroll={sync}
                role="group"
                aria-roledescription="Slider"
                aria-label="Weitere Projekte"
            >
                {SLIDER.map((t) => <Karte key={t.nr} t={t} />)}
            </div>

            <div className="pj-more">
                <Link className="pj-all" href="/referenzen">
                    <span>Alle Projekte ansehen</span><Arrow />
                </Link>
            </div>
        </section>
    )
}
