'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider() {
    useEffect(() => {
        if (typeof window === 'undefined') return

        /*
         * Lenis glaettet ausschliesslich das Mausrad – Touch laeuft wegen
         * `syncTouch: false` nativ weiter. Auf einem Telefon haette die
         * Bibliothek also keine Wirkung, wuerde aber trotzdem dauerhaft eine
         * rAF-Schleife laufen lassen. Gleiches gilt, wenn jemand reduzierte
         * Bewegung eingestellt hat: dann ist weiches Scrollen gerade nicht
         * erwuenscht.
         */
        const touchOnly = window.matchMedia('(hover: none) and (pointer: coarse)').matches
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        /*
         * Sprungmarken (#projekte, #faq …) gleiten statt zu springen. Mit Lenis
         * ueber dessen eigenes scrollTo (sonst kaempfen zwei Scroll-Antriebe
         * gegeneinander), ohne Lenis ueber das native sanfte Scrollen.
         */
        let lenisRef: Lenis | null = null
        const onAnchorClick = (e: MouseEvent) => {
            const a = (e.target as HTMLElement | null)?.closest?.('a[href^="#"], a[href^="/#"]') as HTMLAnchorElement | null
            if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return
            const url = new URL(a.href, window.location.href)
            if (url.pathname !== window.location.pathname || !url.hash || url.hash === '#') return
            const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
            if (!target) return
            e.preventDefault()
            history.replaceState(null, '', url.hash)
            if (reduced) { target.scrollIntoView(); return }
            if (lenisRef) lenisRef.scrollTo(target, { duration: 1.6 })
            else target.scrollIntoView({ behavior: 'smooth' })
        }
        document.addEventListener('click', onAnchorClick)

        if (touchOnly || reduced) return () => document.removeEventListener('click', onAnchorClick)

        const lenis = new Lenis({
            // Traegheit statt fester Dauer: das Rad schiebt, der Scroll gleitet nach.
            lerp: 0.085,
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            infinite: false,
            wheelMultiplier: 1,
            syncTouch: false,
        })

        lenisRef = lenis
        let handle = 0
        function raf(time: number) {
            lenis.raf(time)
            handle = requestAnimationFrame(raf)
        }

        handle = requestAnimationFrame(raf)
        return () => {
            // Ohne das Abbestellen liefe die Schleife nach dem Unmount weiter
            // und riefe `raf` auf einer zerstoerten Instanz auf.
            cancelAnimationFrame(handle)
            document.removeEventListener('click', onAnchorClick)
            lenis.destroy()
        }
    }, [])

    return null
}
