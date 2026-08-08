'use client'

import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 303
const SKIP_FRAMES  = 0
const USE_FRAMES   = TOTAL_FRAMES - SKIP_FRAMES

/**
 * Auf schmalen Viewports laeuft die Sequenz aus /frames-m: halbe Kantenlaenge
 * und nur jeder zweite Frame – 2,8 statt 16,8 MB (scripts/to-mobile-frames.sh).
 * Das ist die erste Ladung der Seite ueberhaupt, deshalb faellt sie mobil am
 * staerksten ins Gewicht. Bei 1200vh Scrollweg bleiben 152 Frames fluessig.
 */
const NARROW_QUERY = '(max-width: 820px)'

export default function VideoCanvas() {
    const canvasRef       = useRef<HTMLCanvasElement>(null)
    const framesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
    const currentFrameRef = useRef(-1)
    const rafRef          = useRef<number | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const narrow = window.matchMedia(NARROW_QUERY).matches
        const dir  = narrow ? '/frames-m' : '/frames'
        // Mobil liegt nur jeder zweite Frame vor – die Dateinamen bleiben gleich.
        const step = narrow ? 2 : 1
        /** Naechster tatsaechlich vorhandener Frame zu einem Wunsch-Index. */
        const snap = (i: number) => i - (i % step)

        function setSize() {
            if (!canvas) return
            canvas.width  = window.innerWidth
            canvas.height = window.innerHeight
        }
        setSize()

        // Light fog placeholder until first real frame loads
        ctx.fillStyle = '#c8d8e8'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        function drawFrame(fileIdx: number) {
            const frame = framesRef.current[fileIdx]
            if (!frame || !ctx || !canvas) return
            const scale = Math.max(canvas.width / 1920, canvas.height / 1080)
            const dw = 1920 * scale
            const dh = 1080 * scale
            const dx = (canvas.width - dw) / 2
            const dy = (canvas.height - dh) / 2
            ctx.drawImage(frame, dx, dy, dw, dh)
        }

        /**
         * Frames gestaffelt laden statt alle 303 auf einmal.
         *
         * Vorher wurden beim Mount 303 Requests gleichzeitig abgesetzt (rund
         * 17 MB). Das saettigt die Verbindung und verzoegert genau das Bild,
         * das der Nutzer als erstes sieht. Jetzt: zuerst das Startbild allein,
         * danach der Rest ueber eine kleine Anzahl paralleler Arbeiter – die
         * Reihenfolge bleibt die Abspielreihenfolge, also ist der naechste
         * benoetigte Frame in aller Regel schon da, bevor er gebraucht wird.
         */
        const CONCURRENCY = 6
        let cancelled = false

        function loadFrame(i: number): Promise<void> {
            return new Promise((resolve) => {
                const img = new Image()
                img.decoding = 'async'
                img.src = `${dir}/frame_${String(i + 1).padStart(4, '0')}.webp`
                const done = () => resolve()
                img.onload = () => {
                    framesRef.current[i] = img
                    // Startbild zeichnen, sobald es da ist
                    if (i === SKIP_FRAMES && currentFrameRef.current === -1) {
                        currentFrameRef.current = SKIP_FRAMES
                        drawFrame(SKIP_FRAMES)
                    }
                    done()
                }
                img.onerror = done
            })
        }

        async function preloadFrames() {
            await loadFrame(SKIP_FRAMES)
            if (cancelled) return

            const queue: number[] = []
            for (let i = 0; i < TOTAL_FRAMES; i += step) if (i !== SKIP_FRAMES) queue.push(i)

            let cursor = 0
            const worker = async () => {
                while (!cancelled && cursor < queue.length) {
                    await loadFrame(queue[cursor++])
                }
            }
            await Promise.all(Array.from({ length: CONCURRENCY }, worker))
        }
        void preloadFrames()

        function updateFrame() {
            rafRef.current = null
            const el = document.getElementById('video-scroll')
            if (!el) return
            const progress = Math.min(window.scrollY / el.offsetHeight, 1)
            // Map progress to the usable frame range starting at SKIP_FRAMES
            const offset  = Math.min(Math.floor(progress * USE_FRAMES), USE_FRAMES - 1)
            const fileIdx = snap(SKIP_FRAMES + offset)
            if (fileIdx !== currentFrameRef.current) {
                currentFrameRef.current = fileIdx
                drawFrame(fileIdx)
            }
        }

        function onScroll() {
            if (rafRef.current !== null) return
            rafRef.current = requestAnimationFrame(updateFrame)
        }

        function onResize() {
            setSize()
            if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current)
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)

        return () => {
            cancelled = true
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            data-ai-generated="true"
            style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, display: 'block' }}
        />
    )
}
