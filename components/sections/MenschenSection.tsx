'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

/**
 * Über uns – horizontale, scroll-gepinnte Glow-Reise (wie Methode/Leistungen).
 * Vertikales Scrollen schiebt den Track seitwärts; ein cyan Glow-Punkt wandert
 * die Schnur entlang und die Nodes leuchten auf.
 */
export default function MenschenSection() {
    const pinRef    = useRef<HTMLDivElement>(null)
    const trackRef  = useRef<HTMLDivElement>(null)
    const fillRef   = useRef<HTMLSpanElement>(null)
    const pointRef  = useRef<HTMLSpanElement>(null)
    const nodeRefs  = useRef<(HTMLSpanElement | null)[]>([])
    const rafRef    = useRef<number | null>(null)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        const fill = fillRef.current
        const point = pointRef.current
        if (!pin || !track || !fill || !point) return

        let distance = 0
        function layout() {
            if (!pin || !track) return
            distance = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distance}px`
        }
        function update() {
            rafRef.current = null
            if (!pin || !track || !fill || !point) return
            const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distance)
            track.style.transform = `translate3d(${-scrolled}px, 0, 0)`
            const edge = scrolled + window.innerWidth * 0.5
            fill.style.width = `${edge}px`
            point.style.left = `${edge}px`
            nodeRefs.current.forEach((n) => {
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
        <section id="ueber-uns" style={{ background: '#0f2d3a', fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="um-pin" ref={pinRef}>
                <div className="um-sticky">
                    <div className="um-head">
                        <p style={{ fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,107,53,0.85)', marginBottom: '1rem' }}>
                            | Hinter LinderMedia
                        </p>
                        <h2 style={{ fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', fontSize: 'clamp(1.9rem, 3.6vw, 4rem)' }}>
                            Die Menschen <strong style={{ fontWeight: 900 }}>hinter der Arbeit.</strong>
                        </h2>
                    </div>

                    <div className="um-viewport">
                        <div className="um-track" ref={trackRef}>
                            <div className="um-line" aria-hidden="true">
                                <span className="um-line-base" />
                                <span className="um-line-fill" ref={fillRef} />
                                <span className="um-point" ref={pointRef} />
                            </div>

                            {/* Beat 1 */}
                            <article className="um-panel">
                                <span className="um-node" ref={(el) => { nodeRefs.current[0] = el }} />
                                <p className="um-eye">01 · Zusammenarbeit</p>
                                <h3 className="um-h3">Kurze Wege.<br /><strong>Direkte Zusammenarbeit.</strong></h3>
                                <p className="um-p">
                                    LinderMedia ist kein Konzern mit Account-Managern, die zwischen Ihnen
                                    und der Arbeit stehen. Sie sprechen direkt mit der Person, die Ihre
                                    Website baut, Ihre Strategie entwickelt, Ihre Kampagnen schaltet.
                                </p>
                                <p className="um-p um-p-strong">
                                    Keine verlorene Zeit durch Briefings, die falsch weitergegeben werden.
                                    Klarheit von Anfang an – und eine Zusammenarbeit, bei der Sie jederzeit
                                    wissen, was passiert und warum.
                                </p>
                            </article>

                            {/* Beat 2 – Portrait */}
                            <article className="um-panel um-panel-portrait">
                                <span className="um-node" ref={(el) => { nodeRefs.current[1] = el }} />
                                {/* Showreel-Slot: <Image> später durch <video> ersetzen */}
                                <div className="um-portrait">
                                    <Image src="/images/portrait-andreas.svg" alt="Andreas Linder, Gründer LinderMedia" fill style={{ objectFit: 'cover' }} />
                                    <button type="button" className="um-play" aria-label="Showreel abspielen">
                                        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                                    </button>
                                    <span className="um-showreel">Showreel · 01:24</span>
                                </div>
                                <p className="um-name">Andreas Linder</p>
                                <p className="um-role">Gründer, LinderMedia</p>
                            </article>

                            {/* Beat 3 */}
                            <article className="um-panel">
                                <span className="um-node" ref={(el) => { nodeRefs.current[2] = el }} />
                                <p className="um-eye">02 · Warum wir das tun</p>
                                <h3 className="um-h3">Gute Unternehmen verdienen <strong>gute Sichtbarkeit.</strong></h3>
                                <p className="um-p">
                                    LinderMedia entstand aus einer Beobachtung: Viele Unternehmer, die
                                    wirklich gut sind in dem, was sie tun, werden nicht so wahrgenommen,
                                    wie sie es verdienen.
                                </p>
                                <p className="um-p um-p-strong">
                                    Nicht weil ihr Angebot schlecht ist. Sondern weil niemand ihnen geholfen
                                    hat, ihre Stärke nach außen zu übersetzen. Nicht mehr Lärm. Mehr Klarheit.
                                </p>
                            </article>

                            <span className="um-tail" aria-hidden="true" />
                        </div>
                    </div>

                    <p className="um-hint" aria-hidden="true">
                        <span>Scrollen</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M6 13l6 6 6-6" /></svg>
                    </p>
                </div>
            </div>
        </section>
    )
}
