'use client'

import { useEffect, useRef, useState } from 'react'
import useVideoSource from '@/components/useVideoSource'

/**
 * Hintergrund-Video, das erst laedt, wenn es in die Naehe des Viewports kommt.
 *
 * Hintergrund: ein `<video autoPlay>` mit `preload="auto"` zieht seine Datei
 * sofort beim Seitenaufruf – auch wenn es, wie das Leuchtturm-Video im
 * Abschluss, mehrere Bildschirmhoehen weiter unten liegt. Bis dahin steht das
 * Poster; die Quelle wird erst einen Viewport vorher gesetzt. Verlaesst das
 * Video das Bild wieder, pausiert es (spart Dekodier-Last und Akku).
 */
type Props = {
    src: string
    poster?: string
    className?: string
    /** Setzt data-ai-generated="true" fuer die EU-AI-Act-Kennzeichnung. */
    aiGenerated?: boolean
}

export default function LazyVideo({ src, poster, className, aiGenerated }: Props) {
    const ref = useRef<HTMLVideoElement>(null)
    const [armed, setArmed] = useState(false)
    /** Desktop- oder Mobil-Schnitt; `null`, solange noch nicht gemessen wurde. */
    const resolvedSrc = useVideoSource(src)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setArmed(true)
                if (!el.src) return
                if (entry.intersectionRatio > 0.1) el.play().catch(() => {})
                else if (!el.paused) el.pause()
            },
            { rootMargin: '100% 0px', threshold: [0, 0.1] },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    return (
        <video
            ref={ref}
            className={className}
            src={armed && resolvedSrc ? resolvedSrc : undefined}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            {...(aiGenerated ? { 'data-ai-generated': 'true' } : {})}
        />
    )
}
