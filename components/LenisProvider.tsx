'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function LenisProvider() {
    useEffect(() => {
        if (typeof window === 'undefined') return

        const lenis = new Lenis({
            duration: 1.4,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            infinite: false,
            wheelMultiplier: 1.1,
            syncTouch: false,
        })

        function raf(time: number) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)
        return () => lenis.destroy()
    }, [])

    return null
}
