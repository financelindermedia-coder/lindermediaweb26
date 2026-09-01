import Image from 'next/image'
import type { CSSProperties } from 'react'

/*
 * Dieselben Sprungmarken wie in der Kopfleiste, nur ausgeschrieben: Wer unten
 * ankommt, sucht keine Kurzform mehr, sondern eine Uebersicht. Deshalb steht
 * hier „Ueber LinderMedia" und oben nur „Ueber".
 *
 * Die Wege sind absolut (`/#…`) statt reiner Fragmente: Der Fuss steht auch
 * unter den Fallstudien und den Leistungsseiten – dort fuehrte `#methode` sonst
 * ins Leere.
 */
const NAV = [
    { label: 'Methode',           href: '/#methode'    },
    { label: 'Leistungen',        href: '/#leistungen' },
    { label: 'Projekte',          href: '/#projekte'   },
    { label: 'Über LinderMedia',  href: '/#ueber-uns'  },
    { label: 'FAQ',               href: '/#faq'        },
]

const LABEL: CSSProperties = {
    fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.2em',
    textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
    marginBottom: '0.7rem',
}

const VALUE: CSSProperties = {
    fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.7,
    color: '#ffffff',
}

const MUTED: CSSProperties = {
    fontSize: '0.75rem', fontWeight: 300, letterSpacing: '0.08em',
    color: 'rgba(255,255,255,0.4)',
}

export default function Footer() {
    return (
        <footer style={{
            background: 'rgba(2, 8, 16, 0.3)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            borderTop: '1px solid rgba(255,255,255,0.07)',
            padding: '5rem var(--px) 4rem',
            fontFamily: 'var(--font-barlow), sans-serif',
            color: '#ffffff',
        }}>

            {/* ── Main grid ── */}
            <div className="footer-grid" style={{
                paddingBottom: '3.5rem',
                borderBottom: '1px solid rgba(255,255,255,0.07)',
                marginBottom: '2.5rem',
                alignItems: 'start',
            }}>

                {/* Col 1 — Logo + Wordmark */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <Image
                        src="/logo/logo_LM_white_box.svg"
                        alt="LinderMedia"
                        width={48}
                        height={47}
                        style={{ display: 'block', marginBottom: '1rem', opacity: 0.9 }}
                    />
                    <p style={{
                        fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.22em',
                        textTransform: 'uppercase', color: '#ffffff', marginBottom: '0.5rem',
                    }}>
                        LinderMedia
                    </p>
                    <p style={{ ...MUTED, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>
                        Markenstrategie · Design · Digitale Umsetzung
                    </p>
                </div>

                {/* Col 2 — Navigation */}
                <div>
                    <p style={LABEL}>Navigation</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                        {/* Hover steht in CSS (`.footer-link`), nicht als
                            onMouseEnter/onMouseLeave: Mit Ereignisbehandlern
                            waere der Fuss ein Client-Component – und er steht
                            auch unter den Leistungsseiten, die bewusst auf dem
                            Server gerendert werden. */}
                        {NAV.map(l => (
                            <a key={l.href} href={l.href} className="footer-link" style={{ ...VALUE, textDecoration: 'none' }}>
                                {l.label}
                            </a>
                        ))}
                        <a href="/#contact" style={{
                            marginTop: '0.8rem',
                            fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.14em',
                            textTransform: 'uppercase', color: '#ff6b35',
                            textDecoration: 'none',
                        }}>
                            Projekt besprechen →
                        </a>
                    </div>
                </div>

                {/* Col 3 — Kontakt */}
                <div>
                    <p style={LABEL}>Kontakt</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                        <div>
                            <p style={{ ...MUTED, marginBottom: '0.15rem' }}>Telefon</p>
                            <a href="tel:+4917693177417" style={{ ...VALUE, textDecoration: 'none' }}>
                                +49 (0) 176. 931 77 417
                            </a>
                        </div>
                        <div>
                            <p style={{ ...MUTED, marginBottom: '0.15rem' }}>E-Mail</p>
                            <a href="mailto:hello@lindermedia.de" style={{ ...VALUE, textDecoration: 'none' }}>
                                hello@lindermedia.de
                            </a>
                        </div>
                        <div>
                            <p style={{ ...MUTED, marginBottom: '0.15rem' }}>Adresse</p>
                            <p style={VALUE}>
                                Schloßstraße 31<br />
                                56459 Pottum
                            </p>
                            <p style={{
                                marginTop: '0.4rem',
                                fontSize: '0.72rem', fontWeight: 300, letterSpacing: '0.12em',
                                color: 'rgba(255,255,255,0.3)', fontVariantNumeric: 'tabular-nums',
                            }}>
                                50°33′07″ N &nbsp;·&nbsp; 7°48′54″ E
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Bottom row ── */}
            <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: '1rem',
            }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 300, letterSpacing: '0.06em', color: 'rgba(255,255,255,0.35)' }}>
                    © {new Date().getFullYear()} LinderMedia — Alle Rechte vorbehalten.
                </p>
                <div style={{ display: 'flex', gap: '2.5rem' }}>
                    <a href="/impressum" style={{ fontSize: '0.82rem', fontWeight: 400, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Impressum</a>
                    <a href="/datenschutz" style={{ fontSize: '0.82rem', fontWeight: 400, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Datenschutz</a>
                </div>
            </div>
        </footer>
    )
}
