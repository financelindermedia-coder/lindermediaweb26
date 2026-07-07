'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TransitionBridge() {
    const bridgeRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!bridgeRef.current) return

        const bridge = bridgeRef.current
        const videoScroll = document.getElementById('video-scroll')
        
        if (!videoScroll) return

        /* Animate gradient overlay from dark (drone) to light (first content) */
        gsap.fromTo(
            bridge,
            {
                background: 'linear-gradient(to bottom, rgba(2, 8, 16, 1), rgba(26, 58, 77, 0.8))',
                opacity: 1,
            },
            {
                background: 'linear-gradient(to bottom, rgba(26, 58, 77, 0.3), rgba(26, 58, 77, 0))',
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: bridge,
                    start: 'top center',
                    end: 'bottom center',
                    scrub: 1.5,
                    markers: false,
                },
            }
        )

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <div
            ref={bridgeRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '100vh',
                zIndex: 5,
                pointerEvents: 'none',
                background: 'linear-gradient(to bottom, rgba(2, 8, 16, 1), rgba(26, 58, 77, 0.8))',
                opacity: 1,
            }}
            aria-hidden="true"
        />
    )
}
