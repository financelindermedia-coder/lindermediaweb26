'use client'

import { useEffect, useRef } from 'react'

/**
 * Kundenstimmen als gepinnter Horizontal-Scroller (wie Problem/Methode):
 * Headline-Zelle + drei Zitat-Karten, die beim Herunterscrollen horizontal
 * durchlaufen. Das Zitatzeichen als weißes Detail.
 */

const STIMMEN = [
    {
        zitat: 'Wir haben vorher viel Geld für Werbung ausgegeben und nicht verstanden, warum es nicht funktioniert. LinderMedia hat uns nicht einfach eine neue Website gebaut, sondern zuerst geholfen zu verstehen, wen wir eigentlich ansprechen wollen.',
        name: 'Geschäftsführer', kontext: 'Baugewerbe, Bayern',
    },
    {
        zitat: 'Andreas stellt Fragen, die ich mir selbst noch nicht gestellt hatte. Nicht nur über Marketing, sondern über mein Unternehmen. Diese Klarheit hat geholfen – nicht nur bei der Website.',
        name: 'Gründerin', kontext: 'Unternehmensberatung, NRW',
    },
    {
        zitat: 'Ich war skeptisch gegenüber Agenturen – zu viel Gerede, zu wenig Substanz. Hier war es anders. Kurze Wege, direkte Aussagen, keine leeren Versprechen. Und die Ergebnisse sprechen für sich.',
        name: 'Inhaber', kontext: 'Handwerk & Gebäudetechnik',
    },
]

export default function StimmenSection() {
    const pinRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return

        let distance = 0
        let raf = 0
        const layout = () => {
            distance = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distance}px`
        }
        const frame = () => {
            const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distance)
            track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
            raf = requestAnimationFrame(frame)
        }
        layout()
        window.addEventListener('resize', layout)
        raf = requestAnimationFrame(frame)
        return () => {
            window.removeEventListener('resize', layout)
            cancelAnimationFrame(raf)
        }
    }, [])

    return (
        <section id="stimmen" className="ped ped-pinned ped-frost" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="ped-pin" ref={pinRef}>
                <div className="ped-sticky">
                    <div className="ped-track" ref={trackRef}>
                        <div className="ped-headcell">
                            <p className="ped-eye">| Kundenstimmen</p>
                            <h2 className="ped-headline">
                                Was bleibt,<br /><span>wenn Werbung aufhört.</span>
                            </h2>
                        </div>

                        {STIMMEN.map((s, i) => (
                            <article key={i} className="ped-panel ped-glass stx-card2">
                                <span className="stx-cq" aria-hidden="true">&ldquo;</span>
                                <p className="stx-ct">{s.zitat}</p>
                                <div className="stx-cauthor">
                                    <span className="stx-cname">{s.name}</span>
                                    <span className="stx-cctx">{s.kontext}</span>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
