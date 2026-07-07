'use client'

import { useEffect, useRef } from 'react'

type Icon = 'strategie' | 'design' | 'web' | 'ads' | 'auto'

const STEPS: {
    num: string; sub: string; title: string; desc: string; icon: Icon; accent: string
}[] = [
    {
        num: '01', sub: 'Das Fundament', title: 'Markenstrategie & Positionierung',
        desc: 'Bevor irgendetwas sichtbar wird, klären wir Positionierung, Zielgruppe und Botschaft — das Fundament, auf dem alles aufbaut.',
        icon: 'strategie', accent: '#00d4b4',
    },
    {
        num: '02', sub: 'Die Identität', title: 'Corporate Design & Messaging',
        desc: 'Aus der Strategie wird ein Gesicht: Logo, Designsystem und eine Sprache, die auf allen Kanälen wiedererkennbar bleibt.',
        icon: 'design', accent: '#22c8c0',
    },
    {
        num: '03', sub: 'Die Präsenz', title: 'Website & Onlinemarketing',
        desc: 'Website und Kanäle, die die Botschaft tragen — schnell, klar und konsequent auf Wirkung gebaut.',
        icon: 'web', accent: '#2fbdd0',
    },
    {
        num: '04', sub: 'Die Reichweite', title: 'Google Ads & Social Ads',
        desc: 'Gezielte Kampagnen bringen die richtige Botschaft vor die richtigen Menschen. Reichweite mit System statt Streuverlust.',
        icon: 'ads', accent: '#3ab0dd',
    },
    {
        num: '05', sub: 'Die Maschine', title: 'Lead-Systeme & Automatisierung',
        desc: 'Automatisierte Prozesse verwandeln Aufmerksamkeit in planbare Anfragen — Sichtbarkeit, die messbar arbeitet.',
        icon: 'auto', accent: '#4aa6e6',
    },
]

const ICONS: Record<Icon, JSX.Element> = {
    strategie: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>,
    design: <><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></>,
    web: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 9h18M8 21h8M12 18v3" /></>,
    ads: <><path d="M3 11l18-5v12L3 14v-3z" /><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" /></>,
    auto: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
}

/** Cooler „Screen"-Mock je Schritt — Glasoptik im Stil der Projekte-Sektion. */
function StepVisual({ step }: { step: (typeof STEPS)[number] }) {
    return (
        <div className="mth-visual" style={{ ['--acc' as string]: step.accent } as React.CSSProperties}>
            <div className="mth-screen">
                <div className="mth-scr-top">
                    <span /><span /><span />
                    <span className="mth-scr-badge">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{ICONS[step.icon]}</svg>
                    </span>
                </div>
                <div className="mth-scr-body">
                    <span className="mth-bar mth-bar-eye" />
                    <span className="mth-bar mth-bar-hl" />
                    <span className="mth-bar mth-bar-hl short" />
                    <div className="mth-scr-cards"><span /><span /><span /></div>
                </div>
                <span className="mth-scr-num">{step.num}</span>
            </div>
            <span className="mth-glowpad" />
        </div>
    )
}

export default function MethodeSection() {
    const trackWrapRef = useRef<HTMLDivElement>(null)
    const fillRef      = useRef<HTMLSpanElement>(null)
    const nodeRefs     = useRef<(HTMLSpanElement | null)[]>([])
    const rafRef       = useRef<number | null>(null)

    useEffect(() => {
        const wrap = trackWrapRef.current
        const fill = fillRef.current
        if (!wrap || !fill) return

        function update() {
            rafRef.current = null
            if (!wrap || !fill) return
            // Fortschrittskante: bis zur Mitte des Viewports „aufgeladen"
            const edge = wrap.scrollLeft + wrap.clientWidth * 0.55
            fill.style.width = `${edge}px`
            nodeRefs.current.forEach((n) => {
                if (!n) return
                const panel = n.parentElement as HTMLElement | null
                const nodeX = (panel ? panel.offsetLeft : 0) + n.offsetLeft + 7 // Node-Mitte in Track-Koordinaten
                const on = nodeX <= edge
                if (on !== n.classList.contains('lit')) n.classList.toggle('lit', on)
            })
        }
        function onScroll() {
            if (rafRef.current === null) rafRef.current = requestAnimationFrame(update)
        }

        // Mausrad → horizontal (Desktop). Gibt an den Rändern frei, damit die
        // Seite normal weiterscrollt (kein Scroll-Trap). Touch/Trackpad unberührt.
        function onWheel(e: WheelEvent) {
            if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return // horizontale Geste nativ lassen
            const atStart = wrap.scrollLeft <= 0
            const atEnd = wrap.scrollLeft >= wrap.scrollWidth - wrap.clientWidth - 1
            if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return
            e.preventDefault()
            wrap.scrollLeft += e.deltaY
        }

        // Ziehen mit der Maus (Drag-to-scroll). Nur Maus – Touch nutzt nativ.
        let down = false, startX = 0, startL = 0
        function pd(e: PointerEvent) {
            if (e.pointerType !== 'mouse') return
            down = true; startX = e.clientX; startL = wrap.scrollLeft
            wrap.classList.add('dragging')
        }
        function pm(e: PointerEvent) {
            if (!down) return
            wrap.scrollLeft = startL - (e.clientX - startX)
        }
        function pu() {
            if (!down) return
            down = false; wrap.classList.remove('dragging')
        }

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
            id="methode"
            style={{
                background: '#0f2d3a',
                fontFamily: 'var(--font-barlow), sans-serif',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden',
            }}
        >
            <div style={{ padding: '10rem 0 3rem' }}>
                <div style={{ padding: '0 var(--px)' }}>
                    <p style={{
                        fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                        fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                        marginBottom: '2.5rem',
                    }}>
                        | Unser Ansatz
                    </p>

                    <div className="methode-header-grid">
                        <div>
                            <h2 style={{
                                fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                                fontWeight: 300, lineHeight: 1.05,
                                letterSpacing: '-0.02em', textTransform: 'uppercase',
                                color: '#ffffff', marginBottom: '0.5rem',
                            }}>
                                Wir arbeiten
                            </h2>
                            <h2 style={{
                                fontSize: 'clamp(2.2rem, 4.5vw, 5.5rem)',
                                fontWeight: 900, lineHeight: 1.05,
                                letterSpacing: '-0.02em', textTransform: 'uppercase',
                                color: '#ffffff',
                            }}>
                                unter der Oberfläche.
                            </h2>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: '1.4rem' }}>
                            <p style={{
                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                fontWeight: 400, lineHeight: 1.8,
                                color: 'rgba(255,255,255,0.5)',
                            }}>
                                Strategie & Identität bilden das Fundament.
                                Sichtbarkeit ist die Konsequenz – nicht der Anfang.
                            </p>
                            <p style={{
                                fontSize: 'clamp(1.15rem, 1.5vw, 1.3rem)',
                                fontWeight: 600, lineHeight: 1.6,
                                color: 'rgba(255,255,255,0.85)',
                                letterSpacing: '0.01em',
                            }}>
                                Ein System statt Einzelmaßnahmen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Horizontaler Scroller mit dynamischer Glow-Linie */}
                <div className="mth-track-wrap" ref={trackWrapRef}>
                    <div className="mth-track">
                        <div className="mth-line" aria-hidden="true">
                            <span className="mth-line-base" />
                            <span className="mth-line-fill" ref={fillRef} />
                        </div>

                        {STEPS.map((step, i) => (
                            <article key={step.num} className="mth-panel">
                                <span
                                    className="mth-node"
                                    ref={(el) => { nodeRefs.current[i] = el }}
                                    style={{ ['--acc' as string]: step.accent } as React.CSSProperties}
                                />
                                <StepVisual step={step} />
                                <div className="mth-meta">
                                    <span className="mth-sub" style={{ color: step.accent }}>{step.sub}</span>
                                    <h3 className="mth-title">{step.title}</h3>
                                    <p className="mth-desc">{step.desc}</p>
                                </div>
                            </article>
                        ))}

                        {/* Abschluss-Node am Ende der Linie */}
                        <span className="mth-track-tail" aria-hidden="true" />
                    </div>
                </div>

                <p className="mth-hint" aria-hidden="true">
                    <span>Ziehen / Wischen</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </p>
            </div>
        </section>
    )
}
