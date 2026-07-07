'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SectionTransitionProps {
    fromColor: string
    toColor: string
    position: 'top' | 'bottom'
}

export default function SectionTransition({ fromColor, toColor, position }: SectionTransitionProps) {
    const overlayRef = useRef<HTMLDivElement>(null)
    const morphRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!overlayRef.current) return

        const overlay = overlayRef.current
        const section = overlay.closest('section')

        if (!section) return

        /* Morph background color on scroll */
        gsap.to(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top center',
                end: 'bottom center',
                scrub: 1.2,
                markers: false,
            },
            backgroundColor: toColor,
            duration: 1,
            ease: 'power2.inOut',
        })

        /* Optional: add subtle gradient morph overlay effect */
        if (morphRef.current) {
            const fromPercent = position === 'top' ? 0 : 100
            const toPercent = position === 'top' ? 100 : 0

            gsap.fromTo(
                morphRef.current,
                { backgroundPosition: `${fromPercent}%` },
                {
                    backgroundPosition: `${toPercent}%`,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top center',
                        end: 'bottom center',
                        scrub: 1,
                        markers: false,
                    },
                    duration: 1,
                }
            )
        }

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [fromColor, toColor, position])

    return (
        <div
            ref={overlayRef}
            className="section-transition-container"
            style={{
                position: 'relative',
                width: '100%',
                overflow: 'hidden',
            }}
        >
            {/* Gradient morph effect */}
            <div
                ref={morphRef}
                style={{
                    position: 'absolute',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'none',
                    opacity: 0.3,
                    background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
                    backgroundSize: '100% 200%',
                    backgroundPosition: position === 'top' ? '0%' : '100%',
                }}
                aria-hidden="true"
            />
        </div>
    )
}
