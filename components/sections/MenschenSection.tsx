'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Über uns – Scrollytelling entlang eines fließenden Pfads (GSAP + ScrollTrigger).
 * Eine gestrichelte Serpentine zeichnet sich beim Scrollen; ein leuchtender
 * Marker wandert den Pfad entlang (getPointAtLength, scroll-getrieben) und
 * verbindet die Story-Beats. Die Beats blenden auf, wenn der Marker sie erreicht.
 */

// Serpentine im viewBox 0..100 (x) / 0..1000 (y), preserveAspectRatio none.
const PATH_D = 'M 50 8 C 50 90 84 120 84 200 C 84 285 16 300 16 390 C 16 480 84 500 84 590 C 84 685 22 700 30 800 C 38 890 50 900 50 992'

export default function MenschenSection() {
    const rootRef   = useRef<HTMLDivElement>(null)
    const pathRef   = useRef<SVGPathElement>(null)
    const svgRef    = useRef<SVGSVGElement>(null)
    const markerRef = useRef<HTMLSpanElement>(null)
    const beatRefs  = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const path = pathRef.current
        const svg = svgRef.current
        const marker = markerRef.current
        const root = rootRef.current
        if (!path || !svg || !marker || !root) return

        const len = path.getTotalLength()
        path.style.strokeDasharray = String(len)
        path.style.strokeDashoffset = String(len)

        function place(progress: number) {
            if (!path || !svg || !marker) return
            path!.style.strokeDashoffset = String(len * (1 - progress))
            const pt = path!.getPointAtLength(len * progress)
            const rect = svg!.getBoundingClientRect()
            const x = (pt.x / 100) * rect.width
            const y = (pt.y / 1000) * rect.height
            marker!.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
        }
        place(0)

        const st = ScrollTrigger.create({
            trigger: root,
            start: 'top 78%',
            end: 'bottom 65%',
            scrub: 0.4,
            onUpdate: (self) => place(self.progress),
        })

        // Beats blenden per eigenem Trigger auf
        const reveals = beatRefs.current.filter(Boolean).map((el) =>
            gsap.fromTo(el, { opacity: 0, y: 40 }, {
                opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
                scrollTrigger: { trigger: el as Element, start: 'top 82%' },
            })
        )

        const onResize = () => place(st.progress)
        window.addEventListener('resize', onResize)
        return () => {
            window.removeEventListener('resize', onResize)
            st.kill()
            reveals.forEach((t) => t.scrollTrigger?.kill())
        }
    }, [])

    return (
        <section id="ueber-uns" className="uu-section">
            <div className="uu-wrap" ref={rootRef}>
                {/* Fließender Pfad + Marker */}
                <div className="uu-rail" aria-hidden="true">
                    <svg ref={svgRef} className="uu-svg" viewBox="0 0 100 1000" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="uuGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0a9d88" />
                                <stop offset="100%" stopColor="#4fe6d0" />
                            </linearGradient>
                        </defs>
                        <path d={PATH_D} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" />
                        <path ref={pathRef} d={PATH_D} fill="none" stroke="url(#uuGrad)" strokeWidth="2" strokeLinecap="round" strokeDasharray="6 9" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <span className="uu-marker" ref={markerRef} />
                </div>

                {/* Story-Beats */}
                <div className="uu-content">
                    <div className="uu-beat" ref={(el) => { beatRefs.current[0] = el }}>
                        <p className="uu-eye">| Hinter LinderMedia</p>
                        <h2 className="uu-h2">Kurze Wege.<br /><strong>Direkte Zusammenarbeit.</strong></h2>
                        <p className="uu-p">
                            LinderMedia ist kein Konzern mit Account-Managern, die zwischen Ihnen
                            und der Arbeit stehen. Sie sprechen direkt mit der Person, die Ihre
                            Website baut, Ihre Strategie entwickelt, Ihre Kampagnen schaltet.
                        </p>
                        <p className="uu-p uu-p-strong">
                            Keine verlorene Zeit durch Briefings, die falsch weitergegeben werden.
                            Klarheit von Anfang an – und eine Zusammenarbeit, bei der Sie jederzeit
                            wissen, was passiert und warum.
                        </p>
                    </div>

                    <div className="uu-beat uu-portrait-beat" ref={(el) => { beatRefs.current[1] = el }}>
                        <div className="uu-portrait">
                            <Image src="/images/portrait-andreas.svg" alt="Andreas Linder, Gründer LinderMedia" fill style={{ objectFit: 'cover' }} />
                        </div>
                        <div>
                            <p className="uu-name">Andreas Linder</p>
                            <p className="uu-role">Gründer, LinderMedia</p>
                        </div>
                    </div>

                    <div className="uu-beat" ref={(el) => { beatRefs.current[2] = el }}>
                        <p className="uu-eye">| Warum wir das tun</p>
                        <h2 className="uu-h2">Gute Unternehmen<br />verdienen<br /><strong>gute Sichtbarkeit.</strong></h2>
                        <p className="uu-p">
                            LinderMedia entstand aus einer Beobachtung: Viele Unternehmer, die
                            wirklich gut sind in dem, was sie tun, werden nicht so wahrgenommen,
                            wie sie es verdienen.
                        </p>
                        <p className="uu-p">
                            Nicht weil ihr Angebot schlecht ist. Sondern weil niemand ihnen geholfen
                            hat, ihre Stärke nach außen zu übersetzen – in Sprache, Design und Systeme,
                            die Vertrauen aufbauen.
                        </p>
                        <p className="uu-p uu-p-strong">
                            Das ist der Grund, warum wir arbeiten, wie wir arbeiten.
                            Nicht mehr Lärm. Mehr Klarheit.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
