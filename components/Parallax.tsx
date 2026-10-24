'use client'

import { useEffect } from 'react'

/**
 * Leichter Parallax ohne Bibliothek.
 *
 * Elemente mit `data-parallax="0.12"` verschieben sich gegenueber dem
 * Scrollen: Der Wert ist der Anteil des Abstands zur Bildschirmmitte, den das
 * Element als vertikalen Versatz bekommt (positiv = wirkt tiefer/langsamer,
 * negativ = driftet gegen). Geschrieben wird nur die CSS-Variable `--py`; wie
 * sie verwendet wird (translate, plus ggf. scale), steht im jeweiligen
 * Stylesheet.
 *
 * - Gerechnet wird am Elternelement, nicht am Element selbst: Dessen Position
 *   aendert sich durch den Versatz nicht, die Rechnung schaukelt sich also nicht
 *   auf.
 * - Nur sichtbare Elemente werden aktualisiert (IntersectionObserver); ein
 *   Scroll-Ereignis loest hoechstens ein Update pro Bild aus.
 * - `data-parallax-min="821"` schaltet den Effekt unter dieser Fensterbreite ab
 *   (Handy: ruhiger, kein Versatz in schmalen Fenstern).
 * - Bei `prefers-reduced-motion: reduce` passiert nichts.
 */
export default function Parallax() {
    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

        const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))
        if (els.length === 0) return

        const visible = new Set<HTMLElement>()
        let raf = 0

        const apply = (el: HTMLElement) => {
            const parent = el.parentElement
            if (!parent) return
            const min = Number(el.dataset.parallaxMin ?? 0)
            if (window.innerWidth < min) {
                el.style.setProperty('--py', '0px')
                el.style.setProperty('--pp', '0')
                return
            }
            const speed = Number(el.dataset.parallax)
            const r = parent.getBoundingClientRect()
            // Begrenzt, damit ueberdimensionierte Medien nie Kanten freigeben.
            const lim = window.innerHeight * 0.6
            const diff = Math.max(-lim, Math.min(lim, r.top + r.height / 2 - window.innerHeight / 2))
            el.style.setProperty('--py', `${(diff * speed).toFixed(1)}px`)
            // Signierter Fortschritt −1…1 (0 = Element mittig im Bild) fuer weitere Effekte in CSS.
            el.style.setProperty('--pp', (diff / lim).toFixed(3))
        }

        const update = () => {
            raf = 0
            visible.forEach(apply)
        }
        const queue = () => { if (!raf) raf = requestAnimationFrame(update) }

        // Der Observer meldet das Elternelement – Zuordnung zurueck zu den Elementen.
        const byParent = new Map<Element, HTMLElement[]>()
        els.forEach((el) => {
            const p = el.parentElement ?? el
            byParent.set(p, [...(byParent.get(p) ?? []), el])
        })
        const io = new IntersectionObserver(
            (entries) => {
                for (const e of entries) {
                    for (const el of byParent.get(e.target) ?? []) {
                        if (e.isIntersecting) { visible.add(el); apply(el) } else visible.delete(el)
                    }
                }
            },
            { rootMargin: '25% 0px' },
        )
        byParent.forEach((_, p) => io.observe(p))

        window.addEventListener('scroll', queue, { passive: true })
        window.addEventListener('resize', queue)
        return () => {
            io.disconnect()
            if (raf) cancelAnimationFrame(raf)
            window.removeEventListener('scroll', queue)
            window.removeEventListener('resize', queue)
        }
    }, [])

    return null
}
