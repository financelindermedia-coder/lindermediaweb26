'use client'

import { useEffect, useRef } from 'react'

/**
 * Akt 2 – Overlay über der Glow-Landschaft (GlowCanvas).
 *
 * - Ein türkiser Glow-Pfad, der sich beim Scrollen von unten nach oben
 *   (zum Gipfel) aufbaut – Energie, die sich ihren Weg sucht.
 * - 6 Stepstones als glasige Karten (Icon + Label + Subtitle + Nummer),
 *   die beim Erreichen aufleuchten. Mit jeder Station wächst das Licht.
 * - Links begleitend der Textblock "Der Weg zur Wirkung".
 * - Am Gipfel: White-Fade (aus GlowCanvas) → langsame Apple-artige
 *   Typo-Sequenz, die in "Das Problem" überleitet.
 *
 * Gesteuert über den #glow-scroll-Driver.
 */

// Zentrale Glow-Farbe — einmal ändern, um Cyan ↔ Amber zu tauschen.
const GLOW = {
    core:  '#4fe6d0',        // heller Kern
    mid:   '#00d4b4',        // Markenfarbe
    deep:  '#0a9d88',        // tiefer Ton
    soft:  'rgba(0,212,180,0.28)',
}

type Icon = 'web' | 'content' | 'ads' | 'auto' | 'leads' | 'impact'

const STEPSTONES: {
    num: string; label: string; sub: string; icon: Icon
    x: number; y: number; side: 'left' | 'right'; at: number
}[] = [
    { num: '01', label: 'Webdesign',      sub: 'Vertrauen schaffen.',   icon: 'web',     x: 22, y: 86, side: 'right', at: 0.12 },
    { num: '02', label: 'Content',        sub: 'Relevanz erzeugen.',    icon: 'content', x: 40, y: 70, side: 'right', at: 0.28 },
    { num: '03', label: 'Google Ads',     sub: 'Sichtbarkeit steigern.',icon: 'ads',     x: 26, y: 54, side: 'right', at: 0.44 },
    { num: '04', label: 'Automatisierung',sub: 'Prozesse skalieren.',   icon: 'auto',    x: 48, y: 40, side: 'right', at: 0.60 },
    { num: '05', label: 'Leads',          sub: 'Anfragen generieren.',  icon: 'leads',   x: 32, y: 26, side: 'right', at: 0.76 },
    { num: '06', label: 'Wirkung',        sub: 'Nachhaltig wachsen.',   icon: 'impact',  x: 56, y: 12, side: 'left',  at: 0.92 },
]

// Pfad durch die Stepstone-Knoten (viewBox 1000×1000, y nach unten)
const PATH_D =
    'M 220 970 ' +
    'L 220 860 ' +
    'C 220 780 400 780 400 700 ' +
    'C 400 620 260 620 260 540 ' +
    'C 260 460 480 480 480 400 ' +
    'C 480 320 320 340 320 260 ' +
    'C 320 180 560 200 560 120 ' +
    'L 560 30'

const ICONS: Record<Icon, JSX.Element> = {
    web: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M9 21h6M12 17v4" /></>,
    content: <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5M8 13h8M8 17h8" /></>,
    ads: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>,
    auto: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></>,
    leads: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M18 8v6M15 11h6" /></>,
    impact: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
}

function win(p: number, start: number, end: number, fade = 0.04): number {
    if (p <= start - fade || p >= end + fade) return 0
    if (p < start) return (p - (start - fade)) / fade
    if (p > end)   return ((end + fade) - p) / fade
    return 1
}

export default function GlowLayer() {
    const rootRef   = useRef<HTMLDivElement>(null)
    const pathRef   = useRef<SVGPathElement>(null)
    const underRef  = useRef<SVGPathElement>(null)
    const stoneRefs = useRef<(HTMLDivElement | null)[]>([])
    const activeRef = useRef<boolean[]>(new Array(STEPSTONES.length).fill(false))
    const introRef  = useRef<HTMLDivElement | null>(null)
    const finaleRef = useRef<(HTMLDivElement | null)[]>([])
    const rafRef    = useRef<number | null>(null)
    const lenRef    = useRef(0)

    useEffect(() => {
        if (pathRef.current) {
            lenRef.current = pathRef.current.getTotalLength()
            for (const el of [pathRef.current, underRef.current]) {
                if (!el) continue
                el.style.strokeDasharray  = String(lenRef.current)
                el.style.strokeDashoffset = String(lenRef.current)
            }
        }

        function progressOf(): number {
            const el = document.getElementById('glow-scroll')
            if (!el) return -1
            return (window.scrollY - el.offsetTop) / el.offsetHeight
        }

        let lastP = -999

        function update() {
            const root = rootRef.current
            if (!root) return
            const p = progressOf()

            // Skip redundant work when the scroll position hasn't changed
            if (Math.abs(p - lastP) < 0.0004) return
            lastP = p

            if (p < 0 || p > 1.06) {
                if (root.style.opacity !== '0') root.style.opacity = '0'
                return
            }
            root.style.opacity = String(Math.min(p / 0.10, 1))

            // Path reveal (bottom → summit) over the first 86%
            const reveal = Math.min(Math.max(p / 0.86, 0), 1)
            if (lenRef.current) {
                const off = String(lenRef.current * (1 - reveal))
                if (pathRef.current)  pathRef.current.style.strokeDashoffset  = off
                if (underRef.current) underRef.current.style.strokeDashoffset = off
            }

            // Everything glow-related fades out during the white summit fade
            const glowVis = 1 - Math.min(Math.max((p - 0.86) / 0.1, 0), 1)
            const svgWrap = root.querySelector<HTMLElement>('[data-glow-svg]')
            if (svgWrap) svgWrap.style.opacity = String(Math.max(glowVis, 0))

            // Stepstone activation
            STEPSTONES.forEach((s, i) => {
                const el = stoneRefs.current[i]
                if (!el) return
                const shouldActive = reveal >= s.at
                if (shouldActive !== activeRef.current[i]) {
                    activeRef.current[i] = shouldActive
                    el.classList.toggle('gl-active', shouldActive)
                    if (shouldActive) {
                        el.classList.remove('gl-pulse')
                        void el.offsetWidth
                        el.classList.add('gl-pulse')
                    }
                }
                el.style.opacity = String(Math.max(glowVis, 0))
            })

            // Left intro copy — present during the climb, gone at the summit
            // Rechte Seite (freie Eisfläche) – kollidiert nicht mit dem Pfad/den
            // Karten links, bleibt daher über den Aufstieg sichtbar.
            if (introRef.current) {
                introRef.current.style.opacity = String(win(p, 0.05, 0.68, 0.05) * glowVis)
            }

            // Apple-artige Typo-Sequenz auf dem White-Fade
            const finaleWindows = [
                win(p, 0.89, 0.955, 0.03),
                win(p, 0.955, 1.02, 0.03),
            ]
            finaleWindows.forEach((o, i) => {
                const el = finaleRef.current[i]
                if (el) el.style.opacity = String(o)
            })
        }

        // Continuous rAF loop — robust against Lenis / programmatic scroll,
        // which don't reliably emit native 'scroll' events.
        function loop() {
            update()
            rafRef.current = requestAnimationFrame(loop)
        }
        function onResize() {
            if (pathRef.current) lenRef.current = pathRef.current.getTotalLength()
            lastP = -999
        }

        window.addEventListener('resize', onResize)
        loop()

        return () => {
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <div
            ref={rootRef}
            aria-hidden="true"
            style={{
                position: 'fixed', inset: 0, zIndex: 12,
                pointerEvents: 'none', opacity: 0,
                fontFamily: 'var(--font-barlow), sans-serif',
                transition: 'opacity 0.4s ease',
            }}
        >
            {/* ── Left intro copy: "Der Weg zur Wirkung" ── */}
            <div
                ref={introRef}
                className="gl-intro"
                style={{
                    position: 'absolute',
                    right: 'var(--px)', top: '30%',
                    maxWidth: 'min(82vw, 360px)', opacity: 0,
                    textShadow: '0 2px 30px rgba(0,0,0,0.7)',
                }}
            >
                <p style={{
                    fontSize: '0.78rem', fontWeight: 400, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: GLOW.mid, marginBottom: '1.4rem',
                }}>05 — Der Weg</p>
                <h2 style={{
                    fontSize: 'clamp(2rem, 3.6vw, 3.6rem)', fontWeight: 300,
                    lineHeight: 1.05, letterSpacing: '-0.02em',
                    textTransform: 'uppercase', color: '#fff', marginBottom: '1.6rem',
                }}>
                    Der Weg zur<br />
                    <span style={{ color: GLOW.core }}>Wirkung.</span>
                </h2>
                <p style={{
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', fontWeight: 400,
                    lineHeight: 1.7, color: 'rgba(255,255,255,0.72)', marginBottom: '1.2rem',
                }}>
                    Unter der Oberfläche entsteht Klarheit.<br />
                    Durch sie entsteht Richtung.<br />
                    Und genau dieser Weg führt nach oben.
                </p>
                <p style={{
                    fontSize: 'clamp(1rem, 1.3vw, 1.2rem)', fontWeight: 600,
                    lineHeight: 1.6, color: '#fff',
                }}>
                    Schritt für Schritt.<br />
                    Bis aus Sichtbarkeit Wirkung wird.
                </p>
            </div>

            {/* ── Serpentine glow path + stepstone cards ── */}
            <div data-glow-svg style={{ position: 'absolute', inset: 0 }}>
                <svg
                    viewBox="0 0 1000 1000"
                    preserveAspectRatio="none"
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                >
                    <defs>
                        <linearGradient id="glGrad" x1="0" y1="1" x2="0" y2="0">
                            <stop offset="0%"   stopColor={GLOW.deep} />
                            <stop offset="55%"  stopColor={GLOW.mid} />
                            <stop offset="100%" stopColor={GLOW.core} />
                        </linearGradient>
                        <filter id="glBlur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="7" result="b" />
                            <feMerge>
                                <feMergeNode in="b" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <path
                        ref={underRef}
                        d={PATH_D}
                        fill="none"
                        stroke={GLOW.soft}
                        strokeWidth="16"
                        strokeLinecap="round"
                        style={{ filter: 'url(#glBlur)' }}
                    />
                    <path
                        ref={pathRef}
                        d={PATH_D}
                        fill="none"
                        stroke="url(#glGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        style={{ filter: 'url(#glBlur)' }}
                    />
                </svg>

                {STEPSTONES.map((s, i) => (
                    <div
                        key={s.label}
                        ref={el => { stoneRefs.current[i] = el }}
                        className={`gl-stone gl-${s.side}`}
                        style={{ position: 'absolute', left: `${s.x}%`, top: `${s.y}%` }}
                    >
                        <span className="gl-node" />
                        <div className="gl-card">
                            <span className="gl-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                                    {ICONS[s.icon]}
                                </svg>
                            </span>
                            <span className="gl-text">
                                <span className="gl-label">{s.label}</span>
                                <span className="gl-sub">{s.sub}</span>
                            </span>
                            <span className="gl-num">{s.num}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Apple-artige Typo-Sequenz (auf White-Fade) ── */}
            {['Sichtbarkeit folgt Konsistenz.', 'Konsistenz folgt Klarheit.'].map((t, i) => (
                <div
                    key={i}
                    ref={el => { finaleRef.current[i] = el }}
                    style={{
                        position: 'absolute', left: '50%', top: '50%',
                        transform: 'translate(-50%, -50%)', textAlign: 'center', opacity: 0,
                        width: 'min(90vw, 1000px)',
                        fontFamily: 'var(--font-barlow), sans-serif',
                        fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 400,
                        lineHeight: 1.1, letterSpacing: '-0.02em', color: '#0c3d66',
                    }}
                >
                    {t}
                </div>
            ))}
        </div>
    )
}
