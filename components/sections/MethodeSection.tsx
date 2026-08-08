'use client'

import { useEffect, useRef } from 'react'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * „So arbeiten wir" – gepinnter Horizontal-Scroller wie die Problem-Sektion,
 * nur in die ANDERE Richtung: der Track startet rechts (Headline + Orange-
 * Ansatz) und wandert beim Herunterscrollen nach rechts, sodass die Schritte
 * von links hereinkommen (row-reverse + umgekehrte Translation).
 */

const ARROW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const STEPS = [
    { num: '01', tag: 'Das Fundament', title: 'Marken-\nstrategie', quote: 'Positionierung, Zielgruppe und Botschaft — das Fundament, auf dem alles aufbaut.' },
    { num: '02', tag: 'Die Identität', title: 'Corporate\nDesign',   quote: 'Logo, Designsystem und eine Sprache, die auf allen Kanälen wiedererkennbar bleibt.' },
    { num: '03', tag: 'Die Präsenz',   title: 'Website &\nMarketing', quote: 'Kanäle, die die Botschaft tragen — schnell, klar und konsequent auf Wirkung gebaut.' },
    { num: '04', tag: 'Die Reichweite',title: 'Ads &\nReichweite',  quote: 'Die richtige Botschaft vor die richtigen Menschen. Reichweite mit System statt Streuverlust.' },
    { num: '05', tag: 'Die Maschine',  title: 'Auto-\nmatisierung', quote: 'Aufmerksamkeit wird zu planbaren Anfragen — Sichtbarkeit, die messbar arbeitet.' },
]

const splitTitle = (t: string) => t.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)

export default function MethodeSection() {
    const pinRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const distanceRef = useRef(0)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return

        const layout = () => {
            distanceRef.current = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distanceRef.current}px`
        }

        layout()
        window.addEventListener('resize', layout)
        return () => window.removeEventListener('resize', layout)
    }, [])

    // Nur laufen lassen, solange die Strecke in Reichweite ist (siehe ProblemSection).
    useVisibleRaf(pinRef, () => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return
        const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distanceRef.current)
        // Gegenrichtung: Start bei -distance (rechtes Ende), wandert nach 0
        track.style.transform = `translate3d(${scrolled - distanceRef.current}px, 0, 0)`
    })

    return (
        <section id="methode" className="ped ped-pinned" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="ped-pin" ref={pinRef}>
                <div className="ped-sticky">
                    <div className="ped-track ped-track-rev" ref={trackRef}>
                        {/* Headline / Intro (rechts, da row-reverse) */}
                        <div className="ped-headcell ped-headcell-right">
                            <p className="ped-eye">| So arbeiten wir</p>
                            <h2 className="ped-headline">
                                Wir arbeiten<br /><span>unter der Oberfläche.</span>
                            </h2>
                            <p className="ped-hc-lead">
                                Fünf Schritte, die aufeinander aufbauen –
                                vom Kern der Marke bis zur messbaren Anfrage.
                            </p>
                            <a className="ped-hc-link" href="#leistungen">
                                <span>Die Lösung</span>{ARROW}
                            </a>
                        </div>

                        {/* Orange Ansatz-Panel */}
                        <article className="ped-panel ped-accent">
                            <span className="ped-tag">Der Ansatz</span>
                            <h3 className="ped-title">{splitTitle('Ein System,\nkein Zufall.')}</h3>
                            <p className="ped-desc">
                                Strategie und Identität bilden das Fundament. Sichtbarkeit ist
                                die Konsequenz — nicht der Anfang.
                            </p>
                            <a className="ped-arrow" href="#leistungen" aria-label="Die Lösung">{ARROW}</a>
                        </article>

                        {/* Schritte 01–05 */}
                        {STEPS.map((s) => (
                            <article key={s.num} className="ped-panel ped-glass">
                                <span className="ped-num">{s.num}</span>
                                <span className="ped-tag">{s.tag}</span>
                                <h3 className="ped-title">{splitTitle(s.title)}</h3>
                                <p className="ped-quote">{s.quote}</p>
                                <span className="ped-arrow" aria-hidden="true">{ARROW}</span>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
