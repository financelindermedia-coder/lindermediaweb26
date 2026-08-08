'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const NAV_LINKS = [
    { label: 'Methode',     href: '#methode'    },
    { label: 'Leistungen',  href: '#leistungen' },
    { label: 'Projekte',    href: '#projekte'   },
    { label: 'Über uns',    href: '#ueber-uns'  },
    { label: 'FAQ',         href: '#faq'        },
]

/**
 * Schaltet das Signet im geoeffneten Mobil-Menue um: petrol auf hellem Panel,
 * weiss auf dunklem. Das Signet in der Leiste selbst bleibt immer weiss – es
 * liegt ueber dem Videobild, nicht ueber einer definierten Flaeche.
 */
function menuLogo(nav: HTMLElement, variant: 'light' | 'dark') {
    nav.querySelectorAll<HTMLElement>('.nav-mobile-brand [data-logo]').forEach((el) => {
        el.style.display = el.dataset.logo === variant ? 'block' : 'none'
    })
}

export default function Navbar() {
    const navRef  = useRef<HTMLElement>(null)
    const darkRef = useRef(false)
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        function update() {
            const el = document.getElementById('video-scroll')
            if (!el || !navRef.current) return
            const progress  = window.scrollY / el.offsetHeight
            const wantsDark = progress < 0.1

            if (wantsDark === darkRef.current) return
            darkRef.current = wantsDark

            const nav    = navRef.current
            const cta    = nav.querySelector<HTMLElement>('[data-cta]')
            const links  = nav.querySelectorAll<HTMLElement>('[data-navlink]')
            const burger = nav.querySelectorAll<HTMLElement>('[data-burger] span')
            const mark   = nav.querySelector<HTMLElement>('[data-navwordmark]')
            // Mobil-Menue schaltet mit: dunkelblaue Schrift auf hellem Panel,
            // weisse auf dunklem – damit es nicht als Fremdkoerper unter einer
            // hellen Leiste haengt.
            const panel  = nav.querySelector<HTMLElement>('[data-mobilepanel]')
            const mLinks = nav.querySelectorAll<HTMLElement>('[data-mobilelink]')
            const mMark  = nav.querySelector<HTMLElement>('[data-mobilewordmark]')

            if (wantsDark) {
                // Ueber dem hellen Eisberg-Nebel: Leiste hell, Schrift bleibt
                // aber weiss – dunkelblau war auf dem wechselnden Videobild
                // schlecht lesbar. Der Schatten traegt sie ueber hellen Stellen.
                nav.style.background = 'rgba(2,8,16,0.28)'
                if (cta) { cta.style.color = '#ffffff'; cta.style.borderColor = 'rgba(255,255,255,0.5)' }
                links.forEach(l => { l.style.color = '#ffffff' })
                burger.forEach(s => { s.style.background = '#ffffff' })
                if (mark) mark.style.color = '#ffffff'

                if (panel) {
                    panel.style.background = 'rgba(206,220,234,0.98)'
                    panel.style.borderTopColor = 'rgba(12,61,102,0.18)'
                }
                mLinks.forEach(l => {
                    l.style.color = '#0c3d66'
                    l.style.borderBottomColor = 'rgba(12,61,102,0.14)'
                })
                if (mMark) mMark.style.color = '#0c3d66'
                // Signet im geoeffneten Menue folgt dem hellen Panel; das in der
                // Leiste bleibt weiss (siehe unten, beide Zustaende gleich).
                menuLogo(nav, 'light')
            } else {
                nav.style.background = 'rgba(2,8,16,0.35)'
                if (cta) { cta.style.color = '#ffffff'; cta.style.borderColor = 'rgba(255,255,255,0.45)' }
                links.forEach(l => { l.style.color = '#ffffff' })
                burger.forEach(s => { s.style.background = '#ffffff' })
                if (mark) mark.style.color = '#ffffff'

                if (panel) {
                    panel.style.background = 'rgba(8,22,32,0.98)'
                    panel.style.borderTopColor = 'rgba(255,255,255,0.08)'
                }
                mLinks.forEach(l => {
                    l.style.color = 'rgba(255,255,255,0.85)'
                    l.style.borderBottomColor = 'rgba(255,255,255,0.07)'
                })
                if (mMark) mMark.style.color = '#ffffff'
                menuLogo(nav, 'dark')
            }
        }

        window.addEventListener('scroll', update, { passive: true })
        update()
        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <nav
            ref={navRef}
            className="nav-bar"
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
            {/* Left — Nav links (Desktop) */}
            <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '2.4rem' }}>
                {NAV_LINKS.map(link => (
                    <a
                        key={link.href}
                        data-navlink
                        href={link.href}
                        style={{
                            fontSize: '0.82rem', fontWeight: 600, letterSpacing: '0.16em',
                            textTransform: 'uppercase', color: '#ffffff',
                            textDecoration: 'none',
                            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                            transition: 'color 0.3s ease, opacity 0.3s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.dataset.prev = e.currentTarget.style.color; e.currentTarget.style.color = '#ff6b35' }}
                        onMouseLeave={e => { e.currentTarget.style.color = e.currentTarget.dataset.prev ?? '' }}
                    >
                        {link.label}
                    </a>
                ))}
            </div>

            {/* Left — Burger (Mobile) */}
            <button
                type="button"
                data-burger
                className="nav-burger"
                aria-label="Menü"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
            >
                <span style={{ transform: menuOpen ? 'translateY(6px) rotate(45deg)' : 'none' }} />
                <span style={{ opacity: menuOpen ? 0 : 1 }} />
                <span style={{ transform: menuOpen ? 'translateY(-6px) rotate(-45deg)' : 'none' }} />
            </button>

            {/* Center — Logo (mobil zusätzlich mit Wortmarke) */}
            <a
                href="#"
                className="nav-brand"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem', textDecoration: 'none' }}
                onClick={() => setMenuOpen(false)}
            >
                {/* Immer weiss: die Leiste liegt ueber wechselndem Videobild,
                    nicht ueber einer definierten Flaeche – der Schatten traegt
                    das Signet auch ueber hellen Stellen. */}
                <Image
                    src="/logo/logo_LM_white_box.svg"
                    alt="LinderMedia"
                    width={36}
                    height={35}
                    priority
                    style={{ display: 'block', filter: 'drop-shadow(0 1px 8px rgba(0,0,0,0.55))' }}
                />
                {/* Nur mobil sichtbar – auf dem Desktop tragen Navigation und
                    CTA die Leiste, dort wuerde die Wortmarke die Mitte fuellen. */}
                <span className="nav-wordmark" data-navwordmark aria-hidden="true">LinderMedia</span>
            </a>

            {/* Right — CTA (Desktop) */}
            <div className="nav-cta-wrap" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <a
                    data-cta
                    href="#contact"
                    className="nav-cta"
                    style={{
                        fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.16em',
                        textTransform: 'uppercase', color: '#ffffff',
                        textShadow: '0 1px 8px rgba(0,0,0,0.6)',
                        textDecoration: 'none', padding: '0.55rem 1.4rem',
                        border: '1px solid rgba(255,255,255,0.5)',
                        borderRadius: '2px', whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease',
                    }}
                >
                    Gespräch anfragen
                </a>
            </div>

            {/* Mobile dropdown menu */}
            <div data-mobilepanel className={`nav-mobile${menuOpen ? ' open' : ''}`}>
                {/* Marke im geoeffneten Menue: das Signet in der Leiste liegt
                    hinter dem Panel, hier steht die Marke wieder fuer sich. */}
                <a
                    className="nav-mobile-brand"
                    href="#"
                    onClick={() => setMenuOpen(false)}
                    aria-label="LinderMedia — zum Seitenanfang"
                >
                    {/* Zwei Signet-Fassungen: das weisse verschwindet auf hellem
                        Panel, das petrolfarbene auf dunklem. update() blendet um. */}
                    <Image
                        data-logo="dark"
                        src="/logo/logo_LM_white_box.svg"
                        alt=""
                        width={44}
                        height={43}
                    />
                    <Image
                        data-logo="light"
                        src="/logo/logo_LM_petrol_box.svg"
                        alt=""
                        width={44}
                        height={43}
                        style={{ display: 'none' }}
                    />
                    <span data-mobilewordmark aria-hidden="true">LinderMedia</span>
                </a>
                {NAV_LINKS.map(link => (
                    <a key={link.href} data-mobilelink href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>
                ))}
                <a className="nav-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Gespräch anfragen</a>
            </div>
        </nav>
    )
}
