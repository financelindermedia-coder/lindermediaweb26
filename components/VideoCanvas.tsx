'use client'

import { useEffect, useRef } from 'react'

const TOTAL_FRAMES = 266
const SKIP_FRAMES  = 1
const USE_FRAMES   = TOTAL_FRAMES - SKIP_FRAMES

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

        // Preload all frames; prioritise the first visible frame (SKIP_FRAMES)
        for (let i = 0; i < TOTAL_FRAMES; i++) {
            const img = new Image()
            img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`
            img.onload = () => {
                framesRef.current[i] = img
                // Draw the first non-black frame as soon as it arrives
                if (i === SKIP_FRAMES && currentFrameRef.current === -1) {
                    currentFrameRef.current = SKIP_FRAMES
                    drawFrame(SKIP_FRAMES)
                }
            }
        }

        function updateFrame() {
            rafRef.current = null
            const el = document.getElementById('video-scroll')
            if (!el) return
            const progress = Math.min(window.scrollY / el.offsetHeight, 1)
            // Map progress to the usable frame range starting at SKIP_FRAMES
            const offset  = Math.min(Math.floor(progress * USE_FRAMES), USE_FRAMES - 1)
            const fileIdx = SKIP_FRAMES + offset
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
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: 0, display: 'block' }}
        />
    )
}
