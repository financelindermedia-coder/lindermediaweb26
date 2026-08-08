'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * Laesst eine rAF-Schleife nur laufen, solange das beobachtete Element in der
 * Naehe des Viewports ist und der Tab im Vordergrund steht.
 *
 * Mehrere Sektionen der Seite haengen an einer Dauerschleife: die gepinnte
 * Problem-/Methode-Strecke liest pro Bild `getBoundingClientRect()` und setzt
 * ein `transform`, das Kompass-Overlay schreibt gut 80 SVG-Attribute. Ohne
 * Sichtbarkeitspruefung passiert das ab dem Seitenaufruf durchgehend – auch
 * fuer die Kompass-Sektion, die erst nach zwanzig Bildschirmhoehen kommt. Auf
 * einem Telefon ist das dauerhafte Last auf dem Hauptthread und geht direkt zu
 * Lasten der Bildrate beim Scrollen und der Akkulaufzeit.
 *
 * `frame` darf sich bei jedem Render aendern; die Schleife wird deswegen nicht
 * neu aufgesetzt. Sie startet und stoppt ausschliesslich ueber Sichtbarkeit.
 *
 * @param targetRef Element, dessen Sichtbarkeit die Schleife steuert.
 * @param frame     Wird pro Bild aufgerufen, solange sichtbar.
 * @param rootMargin Vorlauf des Observers – grosszuegig, damit die Animation
 *                   schon laeuft, bevor die Sektion tatsaechlich im Bild ist.
 */
export default function useVisibleRaf(
    targetRef: RefObject<Element | null>,
    frame: () => void,
    rootMargin = '50% 0px',
) {
    const frameRef = useRef(frame)
    frameRef.current = frame

    useEffect(() => {
        const el = targetRef.current
        if (!el) return

        let raf = 0
        let visible = false

        const loop = () => {
            frameRef.current()
            raf = requestAnimationFrame(loop)
        }
        const start = () => {
            if (raf === 0 && visible && !document.hidden) raf = requestAnimationFrame(loop)
        }
        const stop = () => {
            if (raf !== 0) {
                cancelAnimationFrame(raf)
                raf = 0
            }
        }

        const io = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting
                if (visible) start()
                else {
                    stop()
                    /*
                     * Ein letztes Bild nach dem Verlassen: sonst friert die
                     * Sektion in dem Zustand ein, den sie beim Ausblenden
                     * hatte, und zeigt beim Zurueckscrollen kurz den alten.
                     */
                    frameRef.current()
                }
            },
            { rootMargin },
        )
        io.observe(el)

        const onVisibility = () => (document.hidden ? stop() : start())
        document.addEventListener('visibilitychange', onVisibility)

        return () => {
            io.disconnect()
            document.removeEventListener('visibilitychange', onVisibility)
            stop()
        }
    }, [targetRef, rootMargin])
}
