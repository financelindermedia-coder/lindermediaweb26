'use client'

import { useEffect, useRef } from 'react'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * Problem-Sektion als SCROLL-GEPINNTER Horizontal-Scroller: Beim Herunterscrollen
 * bleibt die Sektion stehen und der Block wandert horizontal nach links. Start am
 * Menü-Gutter (var(--px)) – so bleibt links/rechts immer Abstand zum Rand.
 * Reihenfolge: Headline-Zelle · Orange-Ursache (01) · Symptome (02–04).
 */

const ARROW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

const SYMPTOME = [
    { num: '02', title: 'Kein roter\nFaden',        quote: 'Marketing & Vertrieb ziehen nicht an einem Strang.' },
    { num: '03', title: 'Budget ohne\nRichtung',    quote: 'Werbung läuft – aber ohne klares Ziel.' },
    { num: '04', title: 'Sichtbar,\nkaum Anfragen', quote: 'Gute Website – aber es passiert nichts.' },
]

const splitTitle = (t: string) => t.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)

export default function ProblemSection() {
    const pinRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const distanceRef = useRef(0)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return

        const layout = () => {
            // Reststrecke = horizontale Überlänge des Tracks; Pin-Höhe = 1 Viewport + Strecke
            distanceRef.current = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distanceRef.current}px`
        }

        layout()
        window.addEventListener('resize', layout)
        return () => window.removeEventListener('resize', layout)
    }, [])

    // Läuft nur, solange die gepinnte Strecke in Reichweite ist – pro Bild
    // stehen hier ein Layout-Lesezugriff und ein transform-Schreibzugriff.
    useVisibleRaf(pinRef, () => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return
        const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distanceRef.current)
        track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
    })

    return (
        <section className="ped ped-pinned" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="ped-pin" ref={pinRef}>
                <div className="ped-sticky">
                    <div className="ped-sticky-bg" aria-hidden="true" />
                    <div className="ped-track" ref={trackRef}>
                        {/* Headline / Intro */}
                        <div className="ped-headcell">
                            <p className="ped-eye">| 01 — Das Problem</p>
                            <h2 className="ped-headline">
                                Einzelmaßnahmen<br /><span>scheitern.</span>
                            </h2>
                            <p className="ped-hc-lead">
                                Website, Werbung, SEO – jedes Teil für sich in Ordnung.
                                Doch sie greifen nicht ineinander.
                            </p>
                            <a className="ped-hc-link" href="#methode">
                                <span>Mehr erfahren</span>{ARROW}
                            </a>
                        </div>

                        {/* Orange Ursache-Panel (01) */}
                        <article className="ped-panel ped-accent">
                            <span className="ped-num">01</span>
                            <span className="ped-tag">Die Ursache</span>
                            <h3 className="ped-title">{splitTitle('Es fehlt die\nStrategie.')}</h3>
                            <p className="ped-desc">
                                Was fehlt, ist die gemeinsame Richtung darunter – das Fundament,
                                das jedes einzelne Teil überhaupt erst tragfähig macht.
                            </p>
                            <a className="ped-arrow" href="#methode" aria-label="So lösen wir das">{ARROW}</a>
                        </article>

                        {/* Symptom-Panels (02–04) */}
                        {SYMPTOME.map((s) => (
                            <article key={s.num} className="ped-panel ped-glass">
                                <span className="ped-num">{s.num}</span>
                                <span className="ped-tag">Symptom</span>
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
