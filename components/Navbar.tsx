'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
    { label: 'Markenarchitektur', href: '#video-scroll' },
    { label: 'FAQ',               href: '#faq'          },
]

export default function Navbar() {
    const navRef  = useRef<HTMLElement>(null)
    const darkRef = useRef(false)

    useEffect(() => {
        function update() {
            const el = document.getElementById('video-scroll')
            if (!el || !navRef.current) return
            const progress  = window.scrollY / el.offsetHeight
            const wantsDark = progress < 0.1

            if (wantsDark === darkRef.current) return
            darkRef.current = wantsDark

            const nav   = navRef.current
            const cta   = nav.querySelector<HTMLElement>('[data-cta]')
            const links = nav.querySelectorAll<HTMLElement>('[data-navlink]')

            if (wantsDark) {
                nav.style.background = 'rgba(200,216,232,0.3)'
                if (cta) { cta.style.color = '#0c3d66'; cta.style.borderColor = 'rgba(12,61,102,0.4)' }
                links.forEach(l => { l.style.color = 'rgba(12,61,102,0.7)' })
            } else {
                nav.style.background = 'rgba(2,8,16,0.15)'
                if (cta) { cta.style.color = 'rgba(255,255,255,0.85)'; cta.style.borderColor = 'rgba(255,255,255,0.3)' }
                links.forEach(l => { l.style.color = 'rgba(255,255,255,0.6)' })
            }
        }

        window.addEventListener('scroll', update, { passive: true })
        update()
        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <nav
            ref={navRef}
            style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                padding: '1.2rem var(--px)',
                background: 'rgba(200,216,232,0.3)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                fontFamily: 'var(--font-barlow), sans-serif',
                transition: 'background 0.4s ease',
            }}
        >
            {/* Left — Nav links */}
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
                {NAV_LINKS.map(link => (
                    <a
                        key={link.href}
                        data-navlink
                        href={link.href}
                        style={{
                            fontSize: '0.82rem', fontWeight: 400, letterSpacing: '0.16em',
                            textTransform: 'uppercase', color: 'rgba(12,61,102,0.7)',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease, opacity 0.3s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.dataset.prev = e.currentTarget.style.color; e.currentTarget.style.color = '#ffffff' }}
                        onMouseLeave={e => { e.currentTarget.style.color = e.currentTarget.dataset.prev ?? '' }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/* Center — Logo */}
            <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    src="/logo/logo_LM_white_box.svg"
                    alt="LinderMedia"
                    width={36}
                    height={35}
                    style={{ display: 'block', filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.3))' }}
                />
            </a>

            {/* Right — CTA */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                    data-cta
                    href="#contact"
                    className="nav-cta"
                    style={{
                        fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.16em',
                        textTransform: 'uppercase', color: '#0c3d66',
                        textDecoration: 'none', padding: '0.55rem 1.4rem',
                        border: '1px solid rgba(12,61,102,0.4)',
                        borderRadius: '2px', whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Gespräch beginnen
                </a>
            </div>
        </nav>
    )
}
