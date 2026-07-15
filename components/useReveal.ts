'use client'

import { useEffect, useRef } from 'react'

/**
 * Leichter Scroll-Reveal: setzt `.is-in` auf dem Element (und optional auf
 * allen `[data-reveal]`-Kindern gestaffelt), sobald es in den Viewport kommt.
 * Respektiert `prefers-reduced-motion` (dann sofort sichtbar, keine Bewegung).
 */
export default function useReveal<T extends HTMLElement = HTMLDivElement>(
    options?: { once?: boolean; threshold?: number }
) {
    const ref = useRef<T>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const reduce =
            typeof window !== 'undefined' &&
            window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

        if (reduce) {
            el.classList.add('is-in')
            el.querySelectorAll('[data-reveal]').forEach((c) => c.classList.add('is-in'))
            return
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        el.classList.add('is-in')
                        el.querySelectorAll('[data-reveal]').forEach((c) =>
                            c.classList.add('is-in')
                        )
                        if (options?.once !== false) io.unobserve(el)
                    } else if (options?.once === false) {
                        el.classList.remove('is-in')
                        el.querySelectorAll('[data-reveal]').forEach((c) =>
                            c.classList.remove('is-in')
                        )
                    }
                })
            },
            { threshold: options?.threshold ?? 0.25, rootMargin: '0px 0px -8% 0px' }
        )

        io.observe(el)
        return () => io.disconnect()
    }, [options?.once, options?.threshold])

    return ref
}
