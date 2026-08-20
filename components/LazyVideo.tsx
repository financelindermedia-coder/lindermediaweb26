'use client'

import { useEffect, useRef, useState } from 'react'
import useVideoSource from '@/components/useVideoSource'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'

/**
 * Hintergrund-Video, das erst laedt, wenn es in die Naehe des Viewports kommt.
 *
 * Hintergrund: ein `<video autoPlay>` mit `preload="auto"` zieht seine Datei
 * sofort beim Seitenaufruf – auch wenn es, wie das Leuchtturm-Video im
 * Abschluss, mehrere Bildschirmhoehen weiter unten liegt. Bis dahin steht das
 * Poster; die Quelle wird erst einen Viewport vorher gesetzt. Verlaesst das
 * Video das Bild wieder, pausiert es (spart Dekodier-Last und Akku).
 *
 * Bei `prefers-reduced-motion: reduce` wird die Quelle gar nicht erst gesetzt –
 * es bleibt beim Poster, bis jemand ueber den Schalter selbst startet.
 */
type Props = {
    src: string
    poster?: string
    className?: string
    /** Setzt data-ai-generated="true" fuer die EU-AI-Act-Kennzeichnung. */
    aiGenerated?: boolean
    /**
     * Blendet einen kleinen Play/Pause-Schalter ein. Der Button wird als
     * Geschwister des Videos ausgegeben und positioniert sich im naechsten
     * `position: relative`-Vorfahren – deshalb die eigene Klasse.
     */
    pauseControl?: boolean
    pauseControlClassName?: string
    /** Was der Schalter benennt, z. B. „Hintergrundvideo". */
    pauseControlLabel?: string
}

export default function LazyVideo({
    src,
    poster,
    className,
    aiGenerated,
    pauseControl = false,
    pauseControlClassName = '',
    pauseControlLabel = 'Hintergrundvideo',
}: Props) {
    const ref = useRef<HTMLVideoElement>(null)
    const [armed, setArmed] = useState(false)
    /** Desktop- oder Mobil-Schnitt; `null`, solange noch nicht gemessen wurde. */
    const resolvedSrc = useVideoSource(src)
    const reduced = usePrefersReducedMotion()
    const [userStarted, setUserStarted] = useState(false)
    const [paused, setPaused] = useState(false)
    /** Vom Nutzer angehalten – dann nicht beim naechsten Sichtbarwerden weiterlaufen. */
    const manuallyPaused = useRef(false)

    const autoplay = !reduced || userStarted
    const showAsPaused = paused || !autoplay

    useEffect(() => {
        const el = ref.current
        if (!el || !autoplay) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setArmed(true)
                if (!el.src) return
                if (entry.intersectionRatio > 0.1) {
                    if (!manuallyPaused.current) el.play().catch(() => {})
                } else if (!el.paused) {
                    el.pause()
                }
            },
            { rootMargin: '100% 0px', threshold: [0, 0.1] },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [autoplay])

    const toggle = () => {
        // Erster Klick bei „weniger Bewegung": Quelle scharfschalten, den Rest
        // erledigt der Observer.
        if (!autoplay) {
            setUserStarted(true)
            manuallyPaused.current = false
            setPaused(false)
            return
        }

        const el = ref.current
        if (!el) return
        if (el.paused) {
            manuallyPaused.current = false
            el.play().catch(() => {})
            setPaused(false)
        } else {
            manuallyPaused.current = true
            el.pause()
            setPaused(true)
        }
    }

    return (
        <>
            <video
                ref={ref}
                className={className}
                src={armed && autoplay && resolvedSrc ? resolvedSrc : undefined}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                {...(aiGenerated ? { 'data-ai-generated': 'true' } : {})}
            />
            {pauseControl && (
                <button
                    type="button"
                    className={`media-pause ${pauseControlClassName}`.trim()}
                    onClick={toggle}
                    aria-label={`${pauseControlLabel} ${showAsPaused ? 'abspielen' : 'pausieren'}`}
                >
                    {showAsPaused ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                    )}
                </button>
            )}
        </>
    )
}
