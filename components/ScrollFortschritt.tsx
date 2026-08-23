'use client'

import { useEffect, useRef } from 'react'

/**
 * Scroll-Fortschritt als duenne senkrechte Linie am rechten Rand, in der ein
 * heller Abschnitt mitwandert.
 *
 * Die Seite ist sehr lang – ohne Anhaltspunkt weiss niemand, ob nach dem
 * Aufstieg noch drei Bildschirme kommen oder dreissig. Bewusst kein Balken am
 * oberen Rand: Der wuerde quer ueber das Bild laufen und die Ruhe stoeren, die
 * die ganze Strecke aufbaut.
 *
 * Geschrieben wird nur eine CSS-Variable, und das hoechstens einmal pro Bild –
 * die Position selbst rechnet das Stylesheet aus. Der Listener ist `passive`,
 * damit er das Scrollen nicht ausbremst.
 */
export default function ScrollFortschritt() {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let raf = 0

        const schreiben = () => {
            raf = 0
            const el = ref.current
            if (!el) return
            const strecke = document.documentElement.scrollHeight - window.innerHeight
            const anteil = strecke > 0 ? window.scrollY / strecke : 0
            el.style.setProperty('--p', Math.min(1, Math.max(0, anteil)).toFixed(4))
        }

        const anstossen = () => {
            if (raf === 0) raf = requestAnimationFrame(schreiben)
        }

        schreiben()
        window.addEventListener('scroll', anstossen, { passive: true })
        window.addEventListener('resize', anstossen)
        return () => {
            if (raf !== 0) cancelAnimationFrame(raf)
            window.removeEventListener('scroll', anstossen)
            window.removeEventListener('resize', anstossen)
        }
    }, [])

    return (
        <div ref={ref} className="sprog" aria-hidden="true">
            <span className="sprog-lauf" />
        </div>
    )
}
