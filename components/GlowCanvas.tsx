'use client'

import { useEffect, useRef } from 'react'

/**
 * Akt 2 – statischer Eisberg-Hintergrund.
 *
 * KEIN Video / keine Kamerafahrt mehr: Als Hintergrund dient das feste Bild
 * `public/images/Hintergrund.jpg`. Es bleibt während der gesamten
 * Scroll-Sequenz unbewegt (kein Zoom, kein Parallax) und dient nur als
 * ruhiger visueller Anker.
 *
 * Für die Lesbarkeit des Glow-Pfads (GlowLayer) und der Glaskarten wird das
 * Bild dezent bearbeitet: leichte Entsättigung + weicher Blur, dunkles
 * Teal-Overlay mit Verlauf (unten kräftiger). Am Ende ein sanfter White-Fade,
 * der in die Apple-artige Typo-Sequenz überleitet.
 *
 * Nur die Overlays (Crossfade-In, White-Fade) reagieren auf das Scrollen –
 * das Bild selbst nicht.
 */
const BG_SRC = '/images/Hintergrund.jpg'

export default function GlowCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef    = useRef<HTMLImageElement | null>(null)
    const rafRef    = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        function setSize() {
            if (!canvas) return
            canvas.width  = window.innerWidth
            canvas.height = window.innerHeight
        }
        setSize()

        const img = new Image()
        img.src = BG_SRC
        img.onload = () => { imgRef.current = img }

        function paint() {
            const frame = imgRef.current
            if (!ctx || !canvas) return

            ctx.clearRect(0, 0, canvas.width, canvas.height)

            // ── Static cover-draw, dezent entsättigt + weichgezeichnet ──
            if (frame) {
                const scale = Math.max(canvas.width / 1920, canvas.height / 1080)
                const dw = 1920 * scale
                const dh = 1080 * scale
                const dx = (canvas.width - dw) / 2
                const dy = (canvas.height - dh) / 2
                // Scharf – nur dezente Entsättigung/Abdunklung, kein Blur.
                ctx.filter = 'saturate(0.85) brightness(0.9)'
                ctx.drawImage(frame, dx, dy, dw, dh)
                ctx.filter = 'none'
            }

            // ── Dunkles Teal-Overlay mit Verlauf: unten kräftiger, damit der
            //    Glow-Pfad + die Karten klar lesen. Bewusst konstant (ruhig). ──
            const grade = ctx.createLinearGradient(0, 0, 0, canvas.height)
            grade.addColorStop(0,   'rgba(6, 22, 34, 0.42)')
            grade.addColorStop(0.5, 'rgba(5, 18, 30, 0.52)')
            grade.addColorStop(1,   'rgba(3, 12, 22, 0.72)')
            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = grade
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // ── Sanfte Vignette, hält den Fokus in der Bildmitte ──
            const vig = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, canvas.height * 0.25,
                canvas.width / 2, canvas.height / 2, canvas.height * 0.85,
            )
            vig.addColorStop(0, 'rgba(0,0,0,0)')
            vig.addColorStop(1, 'rgba(2, 10, 18, 0.45)')
            ctx.fillStyle = vig
            ctx.fillRect(0, 0, canvas.width, canvas.height)
        }

        function glowProgress(): number {
            const el = document.getElementById('glow-scroll')
            if (!el) return -1
            return (window.scrollY - el.offsetTop) / el.offsetHeight
        }

        let lastProgress = -999

        function render() {
            if (!canvas) return
            const progress = glowProgress()

            // Skip redundant work when the scroll position hasn't changed.
            if (Math.abs(progress - lastProgress) < 0.0004) return
            lastProgress = progress

            // Außerhalb von Akt 2 → ausgeblendet lassen, damit Akt 1 / statische
            // Sektionen sichtbar bleiben.
            if (progress < 0 || progress > 1.04) {
                if (canvas.style.opacity !== '0') canvas.style.opacity = '0'
                return
            }

            // Weicher Crossfade aus dem dunklen Unterwasser-Ende von Akt 1
            const fadeIn = Math.min(Math.max(progress / 0.10, 0), 1)
            canvas.style.opacity = String(fadeIn)

            // Bild + Grade sind statisch — nur einmal neu zeichnen reicht,
            // aber wir zeichnen bei Scrollbewegung neu, um den White-Fade sauber
            // darüberzulegen.
            paint()

            // ── White-Fade am Ende → Überleitung in die Typo-Sequenz ──
            if (progress > 0.86) {
                const t = Math.min((progress - 0.86) / 0.14, 1)
                ctx.fillStyle = `rgba(255, 255, 255, ${t})`
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
        }

        // Continuous rAF loop — robust gegen Lenis / programmatisches Scrollen,
        // das nicht zuverlässig native 'scroll'-Events feuert.
        function loop() {
            render()
            rafRef.current = requestAnimationFrame(loop)
        }

        function onResize() {
            setSize()
            lastProgress = -999
        }

        window.addEventListener('resize', onResize)
        loop()

        return () => {
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                position: 'fixed', inset: 0,
                width: '100vw', height: '100vh',
                zIndex: 6, display: 'block',
                opacity: 0,
                pointerEvents: 'none',
            }}
        />
    )
}
