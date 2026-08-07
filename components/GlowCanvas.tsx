'use client'

import { useEffect, useRef } from 'react'

/**
 * Akt 2 – statischer Eisberg-Hintergrund.
 *
 * KEIN Video / keine Kamerafahrt mehr: Als Hintergrund dient das feste Bild
 * aus `BG_SRC` (siehe unten). Es bleibt während der gesamten Scroll-Sequenz
 * unbewegt (kein Zoom, kein Parallax) und dient nur als ruhiger visueller
 * Anker.
 *
 * Für die Lesbarkeit des Glow-Pfads (GlowLayer) und der Glaskarten wird das
 * Bild dezent bearbeitet: leichte Entsättigung + weicher Blur, dunkles
 * Teal-Overlay mit Verlauf (unten kräftiger). Am Ende ein sanfter White-Fade,
 * der in die Apple-artige Typo-Sequenz überleitet.
 *
 * Nur die Overlays (Crossfade-In, White-Fade) reagieren auf das Scrollen –
 * das Bild selbst nicht.
 */
const BG_SRC = '/images/IB__S3.webp'

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
                // Scharf & hell – realistischer Eisberg wie im Referenzbild,
                // nur minimal entsättigt für farbliche Kohärenz.
                ctx.filter = 'saturate(0.95) brightness(1.02) contrast(1.02)'
                ctx.drawImage(frame, dx, dy, dw, dh)
                ctx.filter = 'none'
            }

            // ── Sehr dezentes, kühles Overlay – nur unten (Wasserlinie) etwas
            //    kräftiger für Tiefe. Himmel/Eisberg bleiben hell & klar. ──
            const grade = ctx.createLinearGradient(0, 0, 0, canvas.height)
            grade.addColorStop(0,    'rgba(12, 28, 44, 0.08)')
            grade.addColorStop(0.55, 'rgba(10, 24, 38, 0.10)')
            grade.addColorStop(1,    'rgba(4, 14, 24, 0.42)')
            ctx.globalCompositeOperation = 'source-over'
            ctx.fillStyle = grade
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // ── Ganz sanfte Vignette, hält den Fokus mittig (kaum sichtbar) ──
            const vig = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
                canvas.width / 2, canvas.height / 2, canvas.height * 0.9,
            )
            vig.addColorStop(0, 'rgba(0,0,0,0)')
            vig.addColorStop(1, 'rgba(2, 10, 18, 0.22)')
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

            // Weicher Crossfade aus Akt 1 (Anfang) …
            const fadeIn  = Math.min(Math.max(progress / 0.10, 0), 1)
            // … und sanftes Ausblenden am Ende (KEIN weißer Wash mehr) — die
            // dahinterliegende Problem-Sektion scheint dadurch weich durch.
            const fadeOut = 1 - Math.min(Math.max((progress - 0.92) / 0.12, 0), 1)
            canvas.style.opacity = String(Math.min(fadeIn, fadeOut))

            paint()
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
