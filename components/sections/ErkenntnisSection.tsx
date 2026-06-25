'use client'

import { useEffect, useRef } from 'react'

const DRONE_FRAMES = 150

const CARDS = [
    {
        type: 'intro' as const,
        eyebrow: '| 08',
        thin: 'Wie aus Sichtbarkeit',
        bold: 'Wirkung wird.',
        body: [
            'Während die Kamera den Eisberg umrundet, erkennt man nach und nach seine tatsächliche Größe.',
            'Mit Marken verhält es sich ähnlich. Was Menschen sehen, ist meist nur die sichtbare Spitze.',
            'Die eigentliche Wirkung entsteht darunter – durch Entscheidungen, die über Jahre hinweg dieselbe Richtung verfolgen.',
        ],
    },
    {
        type: 'slide' as const,
        eyebrow: '01',
        thin: 'Nicht fehlende Leistung',
        bold: 'ist das Problem.',
        body: [
            'Viele Unternehmen leisten hervorragende Arbeit. Sie verfügen über Erfahrung, Fachwissen und engagierte Mitarbeiter.',
            'Trotzdem fällt es potenziellen Kunden oft schwer zu erkennen, warum genau dieses Unternehmen die richtige Wahl sein soll.',
            'Nicht weil die Leistung fehlt. Sondern weil die Unterschiede nicht klar genug sichtbar werden.',
        ],
    },
    {
        type: 'slide' as const,
        eyebrow: '02',
        thin: 'Klarheit verändert',
        bold: 'Entscheidungen.',
        body: [
            'Wenn Menschen schnell verstehen, wofür ein Unternehmen steht, fällt Orientierung leichter.',
            'Kunden vergleichen weniger. Mitarbeiter identifizieren sich stärker. Entscheidungen werden einfacher.',
            'Klarheit reduziert Komplexität – nach innen und nach außen.',
        ],
    },
    {
        type: 'slide' as const,
        eyebrow: '03',
        thin: 'Vertrauen entsteht',
        bold: 'nicht auf Knopfdruck.',
        body: [
            'Vertrauen wächst über viele Berührungspunkte hinweg. Durch eine Website. Ein Gespräch. Eine Präsentation. Eine Empfehlung.',
            'Je konsistenter diese Erfahrungen sind, desto stärker wird das Vertrauen in die Marke.',
        ],
    },
    {
        type: 'slide' as const,
        eyebrow: '04',
        thin: 'Sichtbarkeit verstärkt',
        bold: 'das Vorhandene.',
        body: [
            'Suchmaschinenoptimierung. Werbung. Social Media. Content. All diese Maßnahmen können Aufmerksamkeit erzeugen.',
            'Ihre Wirkung hängt davon ab, was Menschen anschließend erleben.',
            'Marketing macht sichtbar. Die Marke entscheidet, was sichtbar wird.',
        ],
    },
    {
        type: 'slide' as const,
        eyebrow: '05',
        thin: 'Nachhaltiges Wachstum',
        bold: 'beginnt früher.',
        body: [
            'Bevor Menschen kaufen, müssen sie verstehen. Bevor Vertrauen entsteht, muss Orientierung entstehen.',
            'Und bevor Sichtbarkeit Wirkung entfalten kann, braucht sie ein Fundament.',
            'Genau deshalb beginnen starke Marken nicht mit Marketing. Sie beginnen mit Klarheit.',
        ],
    },
    {
        type: 'closing' as const,
        lines: [
            { text: 'Sichtbarkeit folgt', highlight: false },
            { text: 'Konsistenz.',        highlight: true  },
            { text: 'Konsistenz folgt',   highlight: false },
            { text: 'Klarheit.',          highlight: true  },
        ],
        sub: 'Was das in der Praxis bedeutet – und wie wir arbeiten – zeigen wir im Folgenden.',
    },
]

const N = CARDS.length // 8

export default function ErkenntnisSection() {
    const outerRef    = useRef<HTMLDivElement>(null)
    const canvasRef   = useRef<HTMLCanvasElement>(null)
    const stripRef    = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)
    const counterRef  = useRef<HTMLSpanElement>(null)
    const rafRef      = useRef<number | null>(null)
    const targetX     = useRef(0)
    const currentX    = useRef(0)
    const frames      = useRef<HTMLImageElement[]>([])
    const currentFrame = useRef(-1)

    // ── Preload frames ──
    useEffect(() => {
        let loaded = 0
        frames.current = Array.from({ length: DRONE_FRAMES }, (_, i) => {
            const img = new Image()
            img.src = `/drone-frames/frame_${String(i + 1).padStart(4, '0')}.webp`
            img.onload = () => {
                loaded++
                if (loaded === 1) drawFrame(0) // draw first frame immediately
            }
            return img
        })
    }, [])

    function drawFrame(idx: number) {
        const canvas = canvasRef.current
        if (!canvas) return
        const img = frames.current[idx]
        if (!img || !img.complete || !img.naturalWidth) return
        if (currentFrame.current === idx) return
        currentFrame.current = idx

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        // Fill canvas maintaining cover crop
        const cw = canvas.width, ch = canvas.height
        const iw = img.naturalWidth, ih = img.naturalHeight
        const scale = Math.max(cw / iw, ch / ih)
        const sw = iw * scale, sh = ih * scale
        const sx = (cw - sw) / 2, sy = (ch - sh) / 2
        ctx.drawImage(img, sx, sy, sw, sh)
    }

    // ── Resize canvas ──
    useEffect(() => {
        function resize() {
            const canvas = canvasRef.current
            if (!canvas) return
            canvas.width  = window.innerWidth
            canvas.height = window.innerHeight
            if (currentFrame.current >= 0) drawFrame(currentFrame.current)
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    // ── Scroll logic ──
    useEffect(() => {
        function computeTarget() {
            const outer = outerRef.current
            if (!outer) return
            const rect      = outer.getBoundingClientRect()
            const scrolled  = -rect.top
            const maxScroll = outer.offsetHeight - window.innerHeight
            if (maxScroll <= 0) return
            const progress = Math.max(0, Math.min(1, scrolled / maxScroll))

            // Horizontal strip
            targetX.current = progress * (N - 1) * 100

            // Frame index
            const frameIdx = Math.min(DRONE_FRAMES - 1, Math.floor(progress * DRONE_FRAMES))
            drawFrame(frameIdx)

            // Progress bar
            if (progressRef.current) progressRef.current.style.width = `${progress * 100}%`

            // Slide counter (only on slide cards)
            if (counterRef.current) {
                const slideCards = CARDS.filter(c => c.type === 'slide')
                const cardIdx = Math.round(progress * (N - 1))
                const card = CARDS[cardIdx]
                if (card?.type === 'slide') {
                    const sIdx = slideCards.indexOf(card as typeof slideCards[0])
                    counterRef.current.textContent = `${String(sIdx + 1).padStart(2, '0')} / ${String(slideCards.length).padStart(2, '0')}`
                } else {
                    counterRef.current.textContent = ''
                }
            }
        }

        function animate() {
            rafRef.current = null
            computeTarget()
            currentX.current += (targetX.current - currentX.current) * 0.1
            if (Math.abs(targetX.current - currentX.current) < 0.01) currentX.current = targetX.current
            if (stripRef.current) stripRef.current.style.transform = `translateX(-${currentX.current}vw)`
            if (Math.abs(targetX.current - currentX.current) > 0.01) {
                rafRef.current = requestAnimationFrame(animate)
            }
        }

        function onScroll() {
            if (rafRef.current === null) rafRef.current = requestAnimationFrame(animate)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        animate()
        return () => {
            window.removeEventListener('scroll', onScroll)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <div ref={outerRef} style={{ height: `${N * 100}vh`, position: 'relative' }}>
            <div style={{
                position: 'sticky', top: 0, height: '100vh',
                overflow: 'hidden',
                fontFamily: 'var(--font-barlow), sans-serif',
            }}>

                {/* ── Canvas background ── */}
                <canvas
                    ref={canvasRef}
                    style={{
                        position: 'absolute', inset: 0,
                        width: '100%', height: '100%',
                        zIndex: 0,
                    }}
                />

                {/* ── Dark overlay ── */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to right, rgba(2,8,24,0.82) 0%, rgba(2,8,24,0.55) 60%, rgba(2,8,24,0.72) 100%)',
                    zIndex: 1,
                }} />

                {/* ── Counter ── */}
                <div style={{
                    position: 'absolute', top: '2.8rem', right: 'var(--px)', zIndex: 3,
                    fontSize: 'clamp(0.75rem, 0.9vw, 0.85rem)', fontWeight: 300,
                    letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)',
                }}>
                    <span ref={counterRef} />
                </div>

                {/* ── Card strip ── */}
                <div
                    ref={stripRef}
                    style={{
                        position: 'relative', zIndex: 2,
                        display: 'flex', width: `${N * 100}vw`, height: '100%',
                        willChange: 'transform',
                    }}
                >
                    {CARDS.map((card, i) => {
                        if (card.type === 'intro') {
                            return (
                                <div key={i} className="erkenntnis-intro-grid" style={{ width: '100vw', height: '100%', flexShrink: 0 }}>
                                    <div>
                                        <p style={{
                                            fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                                            fontWeight: 400, letterSpacing: '0.2em',
                                            textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                                            marginBottom: '1rem',
                                        }}>
                                            {card.eyebrow}
                                        </p>
                                        <h2 style={{
                                            fontSize: 'clamp(2rem, 3.5vw, 4.2rem)',
                                            fontWeight: 300, lineHeight: 1.1,
                                            letterSpacing: '-0.012em', textTransform: 'uppercase',
                                            color: '#ffffff', whiteSpace: 'pre-line',
                                        }}>
                                            {card.thin}<br />
                                            <strong style={{ fontWeight: 900, color: '#00d4b4' }}>{card.bold}</strong>
                                        </h2>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                        {card.body.map((p, j) => (
                                            <p key={j} style={{
                                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                                fontWeight: 400, lineHeight: 1.75,
                                                color: 'rgba(255,255,255,0.65)',
                                            }}>{p}</p>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        if (card.type === 'slide') {
                            return (
                                <div key={i} className="erkenntnis-slide-grid" style={{ width: '100vw', height: '100%', flexShrink: 0 }}>
                                    <div>
                                        <p style={{
                                            fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
                                            fontWeight: 400, letterSpacing: '0.2em',
                                            textTransform: 'uppercase', color: '#00d4b4',
                                            marginBottom: '1rem',
                                        }}>
                                            {card.eyebrow}
                                        </p>
                                        <h3 style={{
                                            fontSize: 'clamp(2rem, 3.5vw, 4.2rem)',
                                            fontWeight: 300, lineHeight: 1.1,
                                            letterSpacing: '-0.012em', textTransform: 'uppercase',
                                            color: '#ffffff',
                                        }}>
                                            {card.thin}<br />
                                            <strong style={{ fontWeight: 900 }}>{card.bold}</strong>
                                        </h3>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                                        {card.body.map((p, j) => (
                                            <p key={j} style={{
                                                fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                                fontWeight: 400, lineHeight: 1.75,
                                                color: 'rgba(255,255,255,0.62)',
                                            }}>{p}</p>
                                        ))}
                                    </div>
                                </div>
                            )
                        }

                        // closing
                        return (
                            <div key={i} style={{
                                width: '100vw', height: '100%', flexShrink: 0,
                                display: 'flex', flexDirection: 'column',
                                alignItems: 'center', justifyContent: 'center',
                                textAlign: 'center',
                                padding: '0 16vw',
                            }}>
                                {card.lines.map((line, j) => (
                                    <p key={j} style={{
                                        fontSize: 'clamp(2.4rem, 6vw, 8rem)',
                                        fontWeight: 900, lineHeight: 1.05,
                                        letterSpacing: '-0.025em', textTransform: 'uppercase',
                                        color: line.highlight ? '#00d4b4' : '#ffffff',
                                        marginBottom: j === 1 ? '0.8rem' : '0.05em',
                                    }}>
                                        {line.text}
                                    </p>
                                ))}
                                <div style={{ width: '1px', height: '3rem', background: 'rgba(0,212,180,0.35)', margin: '3rem 0 2rem' }} />
                                <p style={{
                                    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
                                    fontWeight: 400, lineHeight: 1.75,
                                    color: 'rgba(255,255,255,0.4)', maxWidth: '46ch',
                                }}>
                                    {card.sub}
                                </p>
                            </div>
                        )
                    })}
                </div>

                {/* ── Progress bar ── */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
                    background: 'rgba(255,255,255,0.06)', zIndex: 3,
                }}>
                    <div ref={progressRef} style={{
                        height: '100%', width: '0%',
                        background: '#00d4b4',
                        transition: 'width 0.1s linear',
                    }} />
                </div>
            </div>
        </div>
    )
}
