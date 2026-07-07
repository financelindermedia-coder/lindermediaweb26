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
    const wrapRef  = useRef<HTMLDivElement>(null)
    const fillRef  = useRef<HTMLSpanElement>(null)
    const pearlRefs = useRef<(HTMLSpanElement | null)[]>([])
    const rafRef   = useRef<number | null>(null)

    useEffect(() => {
        const wrap = wrapRef.current
        const fill = fillRef.current
        if (!wrap || !fill) return

        function update() {
            rafRef.current = null
            if (!wrap || !fill) return
            const edge = wrap.scrollLeft + wrap.clientWidth * 0.55
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

        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
            const atStart = wrap.scrollLeft <= 0
            const atEnd = wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 1
            if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
            e.preventDefault()
            wrap.scrollLeft += e.deltaY
        }
        let down = false, startX = 0, startL = 0
        function pd(e: PointerEvent) { if (e.pointerType !== 'mouse') return; down = true; startX = e.clientX; startL = wrap.scrollLeft; wrap.classList.add('dragging') }
        function pm(e: PointerEvent) { if (!down) return; wrap.scrollLeft = startL - (e.clientX - startX) }
        function pu() { if (!down) return; down = false; wrap.classList.remove('dragging') }

        update()
        wrap.addEventListener('scroll', onScroll, { passive: true })
        wrap.addEventListener('wheel', onWheel, { passive: false })
        wrap.addEventListener('pointerdown', pd)
        window.addEventListener('pointermove', pm)
        window.addEventListener('pointerup', pu)
        window.addEventListener('resize', onScroll)
        return () => {
            wrap.removeEventListener('scroll', onScroll)
            wrap.removeEventListener('wheel', onWheel)
            wrap.removeEventListener('pointerdown', pd)
            window.removeEventListener('pointermove', pm)
            window.removeEventListener('pointerup', pu)
            window.removeEventListener('resize', onScroll)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <section
            id="leistungen"
            style={{ background: '#020810', color: '#f8fafc', fontFamily: 'var(--font-barlow), sans-serif', padding: '10rem 0', overflow: 'hidden' }}
        >
            <div style={{ padding: '0 var(--px)' }}>
                <p style={{ fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)', marginBottom: '2.5rem' }}>
                    | Leistungen
                </p>
                <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '0.3rem' }}>
                    Sechs Bausteine,
                </h2>
                <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff' }}>
                    ein durchgehender Faden.
                </h2>
            </div>

            <div className="lst-track-wrap" ref={wrapRef}>
                <div className="lst-track">
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
                <span>Ziehen / Wischen</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </p>
        </section>
    )
}
