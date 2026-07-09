'use client'

import Image from 'next/image'

/**
 * Leistungen als vernetzte System-Grafik: das LinderMedia-Logo in der Mitte,
 * sechs Disziplinen ringsum, mit Verbindungslinien zum Zentrum – „Ein System.
 * Alle Disziplinen. Ein Ziel." Links der Intro-Text.
 */

type Side = 'l' | 'r'
type Node = { label: string; sub: string; icon: JSX.Element; side: Side; pos: number }

const ICONS = {
    strategie: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>,
    branding: <><path d="M12 2l4.5 6L12 22 7.5 8 12 2z" /><path d="M7.5 8h9" /></>,
    webdesign: <><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M9 21h6M12 17v4" /></>,
    content: <><path d="M5 3h9l5 5v13H5z" /><path d="M14 3v5h5M8 13h8M8 17h8" /></>,
    seoads: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>,
    automation: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></>,
}

const NODES: Node[] = [
    { label: 'Strategie', sub: 'Klarheit schaffen',            icon: ICONS.strategie,  side: 'l', pos: 14 },
    { label: 'Branding',  sub: 'Markenidentität entwickeln',   icon: ICONS.branding,   side: 'l', pos: 50 },
    { label: 'Webdesign', sub: 'Digital erlebbar machen',      icon: ICONS.webdesign,  side: 'l', pos: 86 },
    { label: 'Content',   sub: 'Relevanz kommunizieren',       icon: ICONS.content,    side: 'r', pos: 14 },
    { label: 'SEO & Ads', sub: 'Sichtbarkeit aufbauen',        icon: ICONS.seoads,     side: 'r', pos: 50 },
    { label: 'Automation',sub: 'Prozesse intelligent verbinden',icon: ICONS.automation,side: 'r', pos: 86 },
]

export default function LeistungenSection() {
    return (
        <section id="leistungen" className="sys" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="sys-inner">
                {/* Intro */}
                <div className="sys-intro">
                    <p className="sys-eye">| 05 — Unsere Leistungen</p>
                    <h2 className="sys-headline">
                        Ein System.<br />Alle Disziplinen.<br /><span>Ein Ziel.</span>
                    </h2>
                    <p className="sys-lead">
                        Wir verbinden Strategie, Kreativität und Technologie zu einem
                        System, das für Sie arbeitet.
                    </p>
                    <a className="sys-link" href="#contact">
                        <span>Mehr erfahren</span>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                    </a>
                </div>

                {/* Diagramm */}
                <div className="sys-diagram">
                    <svg className="sys-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                        {NODES.map((n) => {
                            const x = n.side === 'l' ? 36 : 64
                            return <line key={n.label} x1="50" y1="50" x2={x} y2={n.pos} />
                        })}
                    </svg>

                    <div className="sys-center">
                        <span className="sys-center-badge">
                            <Image src="/logo/logo_LM_white_box.svg" alt="LinderMedia" width={44} height={43} />
                        </span>
                    </div>

                    {NODES.map((n) => (
                        <div key={n.label} className={`sys-node sys-node-${n.side}`} style={{ top: `${n.pos}%` }}>
                            <span className="sys-ic">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{n.icon}</svg>
                            </span>
                            <span className="sys-tx">
                                <span className="sys-lbl">{n.label}</span>
                                <span className="sys-sub">{n.sub}</span>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
