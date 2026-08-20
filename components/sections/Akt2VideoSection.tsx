'use client'

import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'
import useVideoSource from '@/components/useVideoSource'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'
import AiBadge from '@/components/AiBadge'
import CompassOverlay from '@/components/CompassOverlay'

/**
 * Akt-2-Video-Sektion: vollflächiges Fullscreen-Video mit Text-Overlay links
 * (Kicker, Headline, orangefarbene Linie, Fließtext, CTA), optionalem zentralem
 * Play/Pause, Kapitel-Zähler unten. Video läuft autoplay/muted; ohne
 * `endHoldSeconds` nativ `loop`, damit hält es am Ende zusätzlich auf dem
 * letzten Frame, bevor es neu beginnt.
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
    /** Zeichnet die zentrierte Kompass-/Leitlinien-Animation über das Video. */
    compassOverlay?: boolean
    /**
     * Play/Pause in die Ecke statt in die Bildmitte – für Sektionen, in deren
     * Mitte schon etwas anderes liegt (Kompass-Overlay). Der Button bleibt in
     * beiden Fällen vorhanden: ein laufendes Vollbildvideo ohne Halt-Möglichkeit
     * ist für manche Besucher schlicht nicht benutzbar.
     */
    cornerPlayButton?: boolean
    /**
     * Hält das Video am Ende für diese Anzahl Sekunden auf dem letzten Frame,
     * bevor es von vorn beginnt (sanfterer Loop statt native `loop`-Attribut).
     */
    endHoldSeconds?: number
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
    compassOverlay = false,
    cornerPlayButton = false,
    endHoldSeconds = 0,
}: Props) {
    const revealRef = useReveal<HTMLElement>({ threshold: 0.3 })
    const sectionRef = useRef<HTMLElement | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    /** Erst laden, wenn die Sektion in die Naehe des Viewports kommt. */
    const [armed, setArmed] = useState(false)
    /** Desktop- oder Mobil-Schnitt; `null`, solange noch nicht gemessen wurde. */
    const resolvedSrc = useVideoSource(videoSrc)
    const reduced = usePrefersReducedMotion()
    /**
     * Bei „weniger Bewegung" startet nichts von allein; das Poster bleibt als
     * Standbild stehen. Wer trotzdem sehen will, was sich bewegt, kann es ueber
     * denselben Button starten – deshalb ist der Anfangszustand dort „pausiert".
     */
    const [paused, setPaused] = useState(false)
    /** Vom Nutzer per Button pausiert – dann nicht automatisch weiterspielen. */
    const manuallyPaused = useRef(false)
    /** Erst nach einem Klick laden, solange „weniger Bewegung" gilt. */
    const [userStarted, setUserStarted] = useState(false)
    const autoplay = !reduced || userStarted
    /** Der Button zeigt „Abspielen", solange nichts laeuft – auch vor dem ersten Start. */
    const showAsPaused = paused || !autoplay

    /**
     * Die drei Fullscreen-Videos wiegen zusammen rund 27 MB (mobil 9 MB). Ohne diesen
     * Observer laedt der Browser sie schon beim Seitenaufruf an, obwohl sie weit
     * unterhalb des Viewports liegen. Die Quelle wird deshalb erst gesetzt, wenn
     * die Sektion einen Viewport entfernt ist; ausserhalb des Bildes pausiert
     * das Video wieder (spart Dekodier-Last und Akku auf Mobilgeraeten).
     */
    useEffect(() => {
        const el = sectionRef.current
        // Solange „weniger Bewegung" gilt und niemand auf Start gedrueckt hat,
        // wird nichts geladen und nichts gestartet – das Poster steht.
        if (!el || !autoplay) return

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
    }, [autoplay])

    /**
     * Statt des nativen `loop`-Attributs (das sofort und übergangslos neu
     * startet) wartet die Sektion nach dem natürlichen Ende noch
     * `endHoldSeconds` auf dem letzten Frame (hier: der Leuchtturm), bevor
     * sie von vorn beginnt.
     */
    useEffect(() => {
        if (endHoldSeconds <= 0) return
        const v = videoRef.current
        if (!v) return

        let timeoutId: ReturnType<typeof setTimeout> | undefined
        const onEnded = () => {
            timeoutId = setTimeout(() => {
                if (manuallyPaused.current) return
                v.currentTime = 0
                v.play().catch(() => {})
            }, endHoldSeconds * 1000)
        }
        v.addEventListener('ended', onEnded)
        return () => {
            v.removeEventListener('ended', onEnded)
            if (timeoutId) clearTimeout(timeoutId)
        }
    }, [endHoldSeconds])

    const toggle = () => {
        // Erster Klick bei „weniger Bewegung": Quelle scharfschalten. Das
        // eigentliche Abspielen uebernimmt dann der Observer oben.
        if (!autoplay) {
            setUserStarted(true)
            manuallyPaused.current = false
            setPaused(false)
            return
        }

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
                src={armed && autoplay && resolvedSrc ? resolvedSrc : undefined}
                poster={poster}
                autoPlay
                muted
                loop={endHoldSeconds <= 0}
                playsInline
                preload="none"
                {...(aiGenerated ? { 'data-ai-generated': 'true' } : {})}
            />
            <span className="a2v-overlay" aria-hidden="true" />

            {compassOverlay && <CompassOverlay videoRef={videoRef} className="a2v-compass" />}

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

            {/* Immer vorhanden: ein laufendes Vollbildvideo ohne Halt-Moeglichkeit
                ist fuer manche Besucher nicht benutzbar. Wo die Bildmitte schon
                belegt ist (Kompass), rueckt der Button in die Ecke. */}
            <button
                type="button"
                className={`a2v-play${cornerPlayButton ? ' a2v-play--corner' : ''}`}
                onClick={toggle}
                aria-label={showAsPaused ? 'Video abspielen' : 'Video pausieren'}
            >
                {showAsPaused ? (
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
