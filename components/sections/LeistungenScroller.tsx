'use client'

import { Fragment, useEffect, useRef } from 'react'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * "Eine Strategie. Eine Handschrift. Ein System." als eigene Sektion, die
 * die vier Methodenstufen seitwaerts durchscrollt statt sie sofort zu zeigen
 * – derselbe gepinnte Horizontal-Scroller wie MethodeSection.tsx auf der
 * Startseite (Pin + Sticky + `translate3d`, gesteuert von `useVisibleRaf`),
 * hier aber in normaler Leserichtung (kein `row-reverse`) und ohne die
 * Frost-Ueberlagerung, die dort einen Videohintergrund abdunkelt – auf
 * /leistungen liegt nur die flache Navy-Flaeche darunter, `.ped-glass`
 * traegt die Lesbarkeit schon selbst.
 *
 * Reine Teaser-Ebene: die ausfuehrlichen Graphen je Stufe (Wurzel + Bausteine,
 * gemessene Verbindungslinien, siehe LeistungSystem.tsx) stehen weiter unten
 * auf derselben Seite unter #klarheit usw. – dahin fuehrt der Pfeil jeder Karte.
 *
 * Unter 620px Hoehe (Querformat-Handys) wird aus dem Querlauf eine normale
 * Spalte – `.ped-stack` in globals.css greift klassenbasiert, ohne dass hier
 * etwas Eigenes noetig ist (siehe STACK_QUERY, muss mit der Media-Query dort
 * uebereinstimmen). Bei `prefers-reduced-motion: reduce` bleibt die Seite
 * trotzdem normal scrollbar: `useVisibleRaf` schreibt nur `transform`, kein
 * Pin-Ersatz haengt an Bewegung, die Karten sind ohne sie sofort lesbar.
 */

const ARROW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const STUFEN = [
    {
        num: '01',
        title: 'Klarheit',
        quote: 'Wissen, wohin es gehen soll.',
        text: 'Positionierung, Zielgruppe, Botschaft und Markenstrategie schaffen die Richtung.',
        services: 'Positionierung · Zielgruppe · Botschaft · Markenstrategie',
        href: '#klarheit',
    },
    {
        num: '02',
        title: 'Charakter',
        quote: 'Eine Richtung bekommt eine Form.',
        text: 'Corporate Design, Typografie, Farbe und Bildwelt machen die Marke erkennbar.',
        services: 'Corporate Design · Logo · Typografie · Farbwelt · Bildwelt · Art Direction',
        href: '#charakter',
    },
    {
        num: '03',
        title: 'Präsenz',
        quote: 'Die Marke wird sichtbar.',
        text: 'Webdesign, Websites, Fotografie, Film, Video und 3D übersetzen die Marke in konkrete Erlebnisse.',
        services: 'Webdesign · Websites · Fotografie · Film · Video · 3D',
        href: '#praesenz',
    },
    {
        num: '04',
        title: 'Wirkung',
        quote: 'Sichtbarkeit wird zum Ergebnis.',
        text: 'SEO, Content, Marketing, Ads und Automatisierung sorgen dafür, dass die Marke gefunden wird und etwas bewegt.',
        services: 'SEO · Content · Marketing · Ads · Automatisierung',
        href: '#wirkung',
    },
]

/** Muss mit der `.ped-stack`-Media-Query in globals.css uebereinstimmen. */
const STACK_QUERY = '(max-height: 620px)'

/** Bogenfoermiges Verbindungsstueck zwischen zwei Karten – siehe Wegstueck in MethodeSection.tsx. */
function Wegstueck({ hoch }: { hoch?: boolean }) {
    return (
        <span className="ped-path" aria-hidden="true">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                    d={hoch ? 'M0,20 Q50,3 100,20' : 'M0,20 Q50,37 100,20'}
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    )
}

export default function LeistungenScroller() {
    const pinRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const distanceRef = useRef(0)
    const stackedRef = useRef(false)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return

        const layout = () => {
            stackedRef.current = window.matchMedia(STACK_QUERY).matches
            if (stackedRef.current) {
                pin.style.height = ''
                track.style.transform = ''
                return
            }
            distanceRef.current = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distanceRef.current}px`
        }

        layout()
        window.addEventListener('resize', layout)
        return () => window.removeEventListener('resize', layout)
    }, [])

    useVisibleRaf(pinRef, () => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track || stackedRef.current) return
        const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distanceRef.current)
        track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
    })

    return (
        <section className="ped ped-pinned ped-stack lps" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="ped-pin" ref={pinRef}>
                <div className="ped-sticky">
                    <div className="ped-track" ref={trackRef}>
                        <div className="ped-headcell">
                            <h2 className="ped-headline">
                                Eine Strategie.<br />Eine Handschrift.<br /><span>Ein System.</span>
                            </h2>
                            <p className="ped-hc-lead">Vom ersten Gedanken bis zum letzten Bild.</p>
                        </div>

                        {STUFEN.map((s, i) => (
                            <Fragment key={s.num}>
                                <Wegstueck hoch={i % 2 === 0} />
                                <article className="ped-panel ped-glass">
                                    <span className="ped-num">{s.num}</span>
                                    <h3 className="ped-title">{s.title}</h3>
                                    <p className="ped-quote">{s.quote}</p>
                                    <p className="ped-steptext">{s.text}</p>
                                    <p className="ped-services">{s.services}</p>
                                    <a className="ped-steplink" href={s.href}>
                                        <span>Leistungen ansehen</span>{ARROW}
                                    </a>
                                </article>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
