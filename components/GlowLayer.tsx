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

// Zentrale Glow-Farbe — einmal ändern, um die Pfad-Farbe zu tauschen.
const GLOW = {
    core:  '#ffb27f',        // heller Kern (warmes Orange)
    mid:   '#ff6b35',        // Markenakzent Orange
    deep:  '#c94a1e',        // tiefer Ton
    soft:  'rgba(255,107,53,0.30)',
}

type Icon = 'web' | 'content' | 'ads' | 'auto' | 'leads' | 'impact'

const STEPSTONES: {
    num: string; label: string; sub: string; icon: Icon
    x: number; y: number; side: 'left' | 'right'; at: number
}[] = [
    { num: '01', label: 'Webdesign',      sub: 'Vertrauen schaffen.',   icon: 'web',     x: 59, y: 84, side: 'right', at: 0.12 },
    { num: '02', label: 'Content',        sub: 'Relevanz erzeugen.',    icon: 'content', x: 45, y: 76, side: 'left',  at: 0.28 },
    { num: '03', label: 'Google Ads',     sub: 'Sichtbarkeit steigern.',icon: 'ads',     x: 58, y: 68, side: 'right', at: 0.44 },
    { num: '04', label: 'Automatisierung',sub: 'Prozesse skalieren.',   icon: 'auto',    x: 45, y: 60, side: 'left',  at: 0.60 },
    { num: '05', label: 'Leads',          sub: 'Anfragen generieren.',  icon: 'leads',   x: 57, y: 53, side: 'right', at: 0.76 },
    { num: '06', label: 'Wirkung',        sub: 'Nachhaltig wachsen.',   icon: 'impact',  x: 51, y: 44, side: 'right', at: 0.92 },
]

// Pfad, der dem sichtbaren Grat folgt: von der Wasserlinie (unten) den Grat
// hoch bis GENAU auf die Spitze (letzter Knoten = Gipfel). Knoten sitzen auf
// den Stepstone-Punkten (x·10 / y·10), viewBox 1000×1000,
// preserveAspectRatio="none" → 1000-Einheit = 1 % Viewport.
const PATH_D =
    'M 620 950 ' +
    'C 605 900 600 885 590 840 ' +   // → 01 Webdesign (59,84)
    'C 575 780 460 775 450 760 ' +   // → 02 Content   (45,76)
    'C 445 720 590 700 580 680 ' +   // → 03 Google Ads(58,68)
    'C 570 645 455 640 450 600 ' +   // → 04 Automat.  (45,60)
    'C 448 560 580 565 570 530 ' +   // → 05 Leads     (57,53)
    'C 562 490 515 480 510 440 ' +   // → 06 Wirkung   (51,44) = Gipfel
    'L 508 420'

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
            // Der GANZE Layer (Pfad + Stationen + Intro) baut sich auf, hält kurz und
            // blendet dann wieder aus — komplett weg bei p≈0.88, BEVOR die Problem-
            // Sektion (nach dem 900vh-Driver, ab p≈0.89) ins Bild scrollt.
            const endFade = 1 - Math.min(Math.max((p - 0.80) / 0.08, 0), 1)
            root.style.opacity = String(Math.min(p / 0.10, 1) * endFade)

            // Path reveal (Wasserlinie → Gipfel), fertig bei p≈0.70, dann Halten
            const reveal = Math.min(Math.max(p / 0.70, 0), 1)
            if (lenRef.current) {
                const off = String(lenRef.current * (1 - reveal))
                if (pathRef.current)  pathRef.current.style.strokeDashoffset  = off
                if (underRef.current) underRef.current.style.strokeDashoffset = off
            }

            const glowVis = endFade
            const svgWrap = root.querySelector<HTMLElement>('[data-glow-svg]')
            if (svgWrap) svgWrap.style.opacity = String(Math.max(glowVis, 0))

            // Stepstone: erst einblenden, wenn der Pfad ihren Punkt erreicht
            // (progressive Reveal — Station taucht erst bei Ankunft auf).
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
                // 0 bis kurz vor dem Knoten, dann sanft auf 1 (× End-Ausblendung)
                const appear = Math.min(Math.max((reveal - (s.at - 0.05)) / 0.05, 0), 1)
                el.style.opacity = String(Math.max(appear * glowVis, 0))
            })

            // Left intro copy — present during the climb, gone at the summit
            // Rechte Seite (freie Eisfläche) – kollidiert nicht mit dem Pfad/den
            // Karten links, bleibt daher über den Aufstieg sichtbar.
            if (introRef.current) {
                introRef.current.style.opacity = String(win(p, 0.04, 0.40, 0.05) * glowVis)
            }
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
                className="gl-intro tl-glass tl-glass--light"
                style={{
                    position: 'absolute',
                    left: 'var(--px)', top: '50%',
                    transform: 'translateY(-50%)',
                    maxWidth: 'clamp(320px, 38vw, 560px)', opacity: 0,
                }}
            >
                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#ff6b35', marginBottom: '0.9rem',
                }}>| 05 — Der Weg</p>
                <h2 style={{
                    fontSize: 'var(--h2)', fontWeight: 300,
                    lineHeight: 1.05, letterSpacing: '-0.02em',
                    textTransform: 'uppercase', color: '#12242e', marginBottom: '1.4rem',
                }}>
                    Der Weg zur<br />
                    <span style={{ fontWeight: 900, color: '#ff6b35' }}>Wirkung.</span>
                </h2>
                <p style={{
                    fontSize: 'clamp(1.05rem, 1.4vw, 1.25rem)', fontWeight: 400,
                    lineHeight: 1.7, color: 'rgba(18,36,46,0.85)', maxWidth: '40ch',
                }}>
                    Schritt für Schritt. Bis aus Sichtbarkeit Wirkung wird.
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
                            <feGaussianBlur stdDeviation="2.2" result="b" />
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
                        strokeWidth="5"
                        strokeLinecap="round"
                        style={{ filter: 'url(#glBlur)', opacity: 0.5 }}
                    />
                    <path
                        ref={pathRef}
                        d={PATH_D}
                        fill="none"
                        stroke="url(#glGrad)"
                        strokeWidth="1.4"
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
        </div>
    )
}
