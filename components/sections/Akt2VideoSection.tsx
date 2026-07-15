'use client'

import { useRef, useState } from 'react'
import useReveal from '@/components/useReveal'

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
}: Props) {
    const revealRef = useReveal<HTMLElement>({ threshold: 0.3 })
    const videoRef = useRef<HTMLVideoElement>(null)
    const [paused, setPaused] = useState(false)

    const toggle = () => {
        const v = videoRef.current
        if (!v) return
        if (v.paused) {
            v.play()
            setPaused(false)
        } else {
            v.pause()
            setPaused(true)
        }
    }

    return (
        <section id={id} ref={revealRef} className="a2v">
            <video
                ref={videoRef}
                className="a2v-video"
                src={videoSrc}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
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
        </section>
    )
}
