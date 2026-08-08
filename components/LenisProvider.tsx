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
        if (touchOnly || reduced) return

        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            infinite: false,
            wheelMultiplier: 1.1,
            syncTouch: false,
        })

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
            lenis.destroy()
        }
    }, [])

    return null
}
