'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const LEISTUNGEN = [
    { title: 'Website',         tagline: 'Websites, die nicht nur gut aussehen. Sondern verkaufen.', description: 'Klare Architektur, spürbare Conversion und Inhalte, die sofort verständlich machen, warum Sie besser sind.', bild: '/images/leistung-website.svg' },
    { title: 'SEO',             tagline: 'Sichtbar werden, wenn es wirklich zählt.',                 description: 'Technik, Inhalte und Struktur arbeiten zusammen, damit Sie nicht nur gefunden werden, sondern in Erinnerung bleiben.', bild: '/images/leistung-seo.svg' },
    { title: 'Content',         tagline: 'Relevanz schaffen statt Reichweite bügeln.',               description: 'Texte und Botschaften, die Ihre Zielgruppe verstehen und als Lösung wahrnehmen.', bild: '/images/leistung-content.svg' },
    { title: 'Google Ads',      tagline: 'Kampagnen, die auf konkrete Entscheidungen zielen.',        description: 'Jede Anzeige ist Teil einer markenkohärenten Reise – nicht eines schnellen Klicks.', bild: '/images/leistung-google-ads.svg' },
    { title: 'Automatisierung', tagline: 'Wiederholung wird zur Maschine.',                          description: 'Leadprozesse, die sauber arbeiten, ohne den manuellen Aufwand zu erhöhen.', bild: '/images/leistung-automatisierung.svg' },
    { title: 'Leadgenerierung', tagline: 'Aus Aufmerksamkeit wird echtes Interesse.',                description: 'Klar strukturierte Wege, die potenzielle Kunden mit Vertrauen an Bord holen.', bild: '/images/leistung-leadgenerierung.svg' },
]

export default function LeistungenSection() {
    const pinRef    = useRef<HTMLDivElement>(null)
    const trackRef  = useRef<HTMLDivElement>(null)
    const fillRef   = useRef<HTMLSpanElement>(null)
    const pearlRefs = useRef<(HTMLSpanElement | null)[]>([])
    const rafRef    = useRef<number | null>(null)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        const fill = fillRef.current
        if (!pin || !track || !fill) return

        let distance = 0
        function layout() {
            if (!pin || !track) return
            distance = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distance}px`
        }
        function update() {
            rafRef.current = null
            if (!pin || !track || !fill) return
            const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distance)
            track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
            const edge = scrolled + window.innerWidth * 0.55
            fill.style.width = `${edge}px`
            pearlRefs.current.forEach((n) => {
                if (!n) return
                const panel = n.parentElement as HTMLElement | null
                const x = (panel ? panel.offsetLeft : 0) + n.offsetLeft + 8
                const on = x <= edge
                if (on !== n.classList.contains('lit')) n.classList.toggle('lit', on)
            })
        }
        function onScroll() { if (rafRef.current === null) rafRef.current = requestAnimationFrame(update) }
        function onResize() { layout(); update() }

        layout()
        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        // Bilder können die Track-Breite ändern → nach Load neu vermessen
        const imgs = track.querySelectorAll('img')
        imgs.forEach((im) => im.addEventListener('load', onResize))
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            imgs.forEach((im) => im.removeEventListener('load', onResize))
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <section id="leistungen" style={{ background: '#0f2d3a', color: '#f8fafc', fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="lst-pin" ref={pinRef}>
                <div className="lst-sticky">
                    <div className="lst-head">
                        <p style={{ fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)', marginBottom: '1rem' }}>
                            | Leistungen
                        </p>
                        <h2 style={{ fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff' }}>
                            Sechs Bausteine, <strong style={{ fontWeight: 900 }}>ein durchgehender Faden.</strong>
                        </h2>
                    </div>

                    <div className="lst-viewport">
                        <div className="lst-track" ref={trackRef}>
                            <div className="lst-line" aria-hidden="true">
                                <span className="lst-line-base" />
                                <span className="lst-line-fill" ref={fillRef} />
                            </div>

                            {LEISTUNGEN.map((item, i) => (
                                <article key={item.title} className="lst-panel">
                                    <span className="lst-pearl" ref={(el) => { pearlRefs.current[i] = el }} />
                                    <p className="lst-eye"><b>{String(i + 1).padStart(2, '0')}</b> {item.title}</p>
                                    <h3 className="lst-headline">{item.tagline}</h3>
                                    <p className="lst-desc">{item.description}</p>
                                    <div className="lst-img">
                                        <Image src={item.bild} alt={`Bildwelt für ${item.title}`} fill style={{ objectFit: 'cover' }} />
                                    </div>
                                </article>
                            ))}
                            <span className="lst-track-tail" aria-hidden="true" />
                        </div>
                    </div>

                    <p className="lst-hint" aria-hidden="true">
                        <span>Scrollen</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
                    </p>
                </div>
            </div>
        </section>
    )
}
