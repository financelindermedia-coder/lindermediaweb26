import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Impressum — LinderMedia',
    description: 'Impressum und Anbieterkennzeichnung der LinderMedia.',
}

const h1: CSSProperties = { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '2.5rem' }
const h2: CSSProperties = { fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ff6b35', margin: '2.4rem 0 0.8rem' }
const p: CSSProperties = { fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)' }
const muted: CSSProperties = { ...p, color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }

export default function ImpressumPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#020810', padding: '6rem var(--px) 6rem', fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ff6b35', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '3rem' }}>
                    ← Zur Startseite
                </Link>

                <h1 style={h1}>Impressum</h1>

                <h2 style={h2}>Angaben gemäß § 5 DDG</h2>
                <p style={p}>
                    LinderMedia<br />
                    Inhaber: Andreas Linder<br />
                    Schloßstraße 31<br />
                    56459 Pottum
                </p>

                <h2 style={h2}>Kontakt</h2>
                <p style={p}>
                    Telefon: <span style={{ color: 'rgba(255,255,255,0.45)' }}>[Telefonnummer eintragen]</span><br />
                    E-Mail: <a href="mailto:finance.lindermedia@gmail.com" style={{ color: '#fff', textDecoration: 'none' }}>finance.lindermedia@gmail.com</a>
                </p>

                <h2 style={h2}>Umsatzsteuer-ID</h2>
                <p style={p}>
                    Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                    <span style={{ color: 'rgba(255,255,255,0.45)' }}>[USt-IdNr. eintragen, falls vorhanden]</span>
                </p>

                <h2 style={h2}>Redaktionell verantwortlich</h2>
                <p style={p}>
                    Andreas Linder<br />
                    Schloßstraße 31, 56459 Pottum
                </p>

                <h2 style={h2}>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
                <p style={p}>
                    Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                    Verbraucherschlichtungsstelle teilzunehmen.
                </p>

                <h2 style={h2}>Haftung für Inhalte</h2>
                <p style={p}>
                    Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten
                    nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                    Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
                    Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige
                    Tätigkeit hinweisen.
                </p>

                <h2 style={h2}>Haftung für Links</h2>
                <p style={p}>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen
                    Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                    Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
                    Seiten verantwortlich.
                </p>

                <h2 style={h2}>Urheberrecht</h2>
                <p style={p}>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                    dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art
                    der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                    Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>

                <p style={{ ...muted, marginTop: '3rem' }}>
                    Hinweis: Bitte ergänzen Sie die mit [ … ] markierten Angaben vor der Veröffentlichung.
                </p>
            </div>
        </main>
    )
}
