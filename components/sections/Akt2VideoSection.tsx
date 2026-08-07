'use client'

import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'
import AiBadge from '@/components/AiBadge'

/**
 * Akt-2-Video-Sektion: vollflächiges Fullscreen-Video mit Text-Overlay links
 * (Kicker, Headline, orangefarbene Linie, Fließtext, CTA), zentralem Play/Pause,
 * Kapitel-Zähler unten. Video läuft autoplay/muted/loop; der Button pausiert.
 */
type Props = {
    id?: string
    index: string
    kicker: string
    headline: string
    text: string[]
    ctaLabel?: string
    ctaHref?: string
    chapter: string
    videoSrc: string
    poster?: string
    /** KI-generiertes Material: blendet den Transparenzhinweis unten rechts ein. */
    aiGenerated?: boolean
}

export default function Akt2VideoSection({
    id,
    index,
    kicker,
    headline,
    text,
    ctaLabel,
    ctaHref = '#contact',
    chapter,
    videoSrc,
    poster,
    aiGenerated = false,
}: Props) {
    const revealRef = useReveal<HTMLElement>({ threshold: 0.3 })
    const sectionRef = useRef<HTMLElement | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [paused, setPaused] = useState(false)
    /** Erst laden, wenn die Sektion in die Naehe des Viewports kommt. */
    const [armed, setArmed] = useState(false)
    /** Vom Nutzer per Button pausiert – dann nicht automatisch weiterspielen. */
    const manuallyPaused = useRef(false)

    /**
     * Die drei Fullscreen-Videos wiegen zusammen rund 31 MB. Ohne diesen
     * Observer laedt der Browser sie schon beim Seitenaufruf an, obwohl sie weit
     * unterhalb des Viewports liegen. Die Quelle wird deshalb erst gesetzt, wenn
     * die Sektion einen Viewport entfernt ist; ausserhalb des Bildes pausiert
     * das Video wieder (spart Dekodier-Last und Akku auf Mobilgeraeten).
     */
    useEffect(() => {
        const el = sectionRef.current
        if (!el) return

        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setArmed(true)

                const v = videoRef.current
                if (!v || !v.src) return
                if (entry.intersectionRatio > 0.15) {
                    if (!manuallyPaused.current) v.play().catch(() => {})
                } else if (!v.paused) {
                    v.pause()
                }
            },
            { rootMargin: '100% 0px', threshold: [0, 0.15, 0.5] },
        )
        io.observe(el)
        return () => io.disconnect()
    }, [])

    const toggle = () => {
        const v = videoRef.current
        if (!v) return
        if (v.paused) {
            manuallyPaused.current = false
            v.play().catch(() => {})
            setPaused(false)
        } else {
            manuallyPaused.current = true
            v.pause()
            setPaused(true)
        }
    }

    return (
        <section
            id={id}
            ref={(el) => {
                // useReveal liefert ein RefObject (current readonly) – der
                // Cast erlaubt, dasselbe Element an beide Refs zu haengen.
                ;(revealRef as React.MutableRefObject<HTMLElement | null>).current = el
                sectionRef.current = el
            }}
            className="a2v"
        >
            <video
                ref={videoRef}
                className="a2v-video"
                // Quelle erst setzen, wenn die Sektion in Reichweite ist
                src={armed ? videoSrc : undefined}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                {...(aiGenerated ? { 'data-ai-generated': 'true' } : {})}
            />
            <span className="a2v-overlay" aria-hidden="true" />

            <div className="a2v-inner">
                <div className="a2v-content">
                    <p className="a2v-kicker reveal" data-reveal>
                        <span className="a2v-kicker-rule" />
                        {kicker}
                    </p>
                    <h2 className="a2v-title reveal" data-reveal>
                        {headline}
                    </h2>
                    <span className="a2v-rule reveal" data-reveal />
                    <div className="a2v-text reveal" data-reveal>
                        {text.map((line, i) => (
                            <p key={i}>{line}</p>
                        ))}
                    </div>
                    {ctaLabel && (
                        <a className="a2v-cta reveal" data-reveal href={ctaHref}>
                            <span>{ctaLabel}</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </a>
                    )}
                </div>
            </div>

            <button
                type="button"
                className="a2v-play"
                onClick={toggle}
                aria-label={paused ? 'Video abspielen' : 'Video pausieren'}
            >
                {paused ? (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
                )}
            </button>

            <div className="a2v-foot">
                <span className="a2v-foot-index">{index}</span>
                <span className="a2v-foot-chapter">{chapter}</span>
            </div>

            {aiGenerated && <AiBadge className="a2v-ai" />}
        </section>
    )
}
