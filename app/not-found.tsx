import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Seite nicht gefunden',
    description: 'Diese Seite gibt es nicht (mehr). Zur Startseite, zu den Referenzen oder direkt ins Gespräch mit LinderMedia.',
    robots: { index: false, follow: true },
}

const link = {
    color: '#ff6b35', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.14em',
    textTransform: 'uppercase', textDecoration: 'none', minHeight: '44px',
    display: 'inline-flex', alignItems: 'center',
} as const

export default function NotFound() {
    return (
        <main style={{
            minHeight: '100vh', background: '#020810', color: '#fff', display: 'flex',
            alignItems: 'center', padding: '6rem var(--px)', fontFamily: 'var(--font-barlow), sans-serif',
        }}>
            <div style={{ maxWidth: '40rem' }}>
                <p style={{ color: '#ff6b35', fontWeight: 700, letterSpacing: '0.2em', fontSize: '0.85rem', marginBottom: '1.2rem' }}>404</p>
                <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: '1.4rem' }}>
                    Diese Seite<br />gibt es nicht.
                </h1>
                <p style={{ fontSize: '1.1rem', fontWeight: 300, lineHeight: 1.7, color: 'rgba(255,255,255,0.75)', marginBottom: '2rem' }}>
                    Der Link ist veraltet oder wurde falsch eingegeben. Von hier aus finden Sie weiter:
                </p>
                <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem 2rem' }} aria-label="Weiter auf dieser Seite">
                    <Link href="/" style={link}>Startseite</Link>
                    <Link href="/referenzen" style={link}>Referenzen</Link>
                    <Link href="/leistungen" style={link}>Leistungen</Link>
                    <Link href="/#contact" style={link}>Kontakt</Link>
                </nav>
            </div>
        </main>
    )
}
