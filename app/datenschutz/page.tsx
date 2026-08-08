import type { CSSProperties } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Datenschutzerklärung',
    description: 'Informationen zur Verarbeitung personenbezogener Daten bei LinderMedia gemäß DSGVO.',
    alternates: { canonical: '/datenschutz' },
    robots: { index: true, follow: true },
}

const h1: CSSProperties = { fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.02em', textTransform: 'uppercase', color: '#fff', marginBottom: '2.5rem' }
const h2: CSSProperties = { fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ff6b35', margin: '2.4rem 0 0.8rem' }
const p: CSSProperties = { fontSize: '1rem', fontWeight: 300, lineHeight: 1.8, color: 'rgba(255,255,255,0.75)' }
const muted: CSSProperties = { ...p, color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem' }

export default function DatenschutzPage() {
    return (
        <main style={{ minHeight: '100vh', background: '#020810', padding: '6rem var(--px) 6rem', fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#ff6b35', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '3rem' }}>
                    ← Zur Startseite
                </Link>

                <h1 style={h1}>Datenschutzerklärung</h1>

                <p style={p}>
                    Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie
                    gemäß der Datenschutz-Grundverordnung (DSGVO) über Art, Umfang und Zweck der Verarbeitung
                    personenbezogener Daten auf dieser Website.
                </p>

                <h2 style={h2}>1. Verantwortlicher</h2>
                <p style={p}>
                    LinderMedia<br />
                    Dipl.-Ing. Andreas Linder<br />
                    Schloßstraße 31, D – 56459 Pottum<br />
                    Telefon: <a href="tel:+4917693177417" style={{ color: '#fff', textDecoration: 'none' }}>+49 (0) 176. 931 77 417</a><br />
                    E-Mail: <a href="mailto:hello@lindermedia.de" style={{ color: '#fff', textDecoration: 'none' }}>hello@lindermedia.de</a>
                </p>

                <h2 style={h2}>2. Erhebung und Speicherung von Zugriffsdaten</h2>
                <p style={p}>
                    Beim Aufruf dieser Website werden durch den Hosting-Provider automatisch Informationen in
                    Server-Logfiles gespeichert (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene
                    Seite, verwendeter Browser). Diese Verarbeitung erfolgt zur Gewährleistung eines
                    störungsfreien Betriebs und der Sicherheit auf Grundlage unseres berechtigten Interesses
                    (Art. 6 Abs. 1 lit. f DSGVO). Diese Website wird gehostet bei der Hetzner Online GmbH,
                    Industriestr. 25, 91710 Gunzenhausen, Deutschland. Die Verarbeitung erfolgt ausschließlich
                    auf Servern innerhalb der Europäischen Union, eine Übermittlung in Drittstaaten findet
                    dadurch nicht statt. Details entnehmen Sie der Datenschutzerklärung von Hetzner unter{' '}
                    <a href="https://www.hetzner.com/de/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'underline' }}>
                        hetzner.com/de/legal/privacy-policy
                    </a>.
                </p>

                <h2 style={h2}>3. Kontaktformular &amp; Kontaktaufnahme</h2>
                <p style={p}>
                    Wenn Sie uns über das Kontaktformular oder per E-Mail Anfragen zukommen lassen, werden Ihre
                    Angaben (z. B. Name, Unternehmen, E-Mail-Adresse und Ihre Nachricht) zum Zweck der
                    Bearbeitung der Anfrage und für den Fall von Anschlussfragen gespeichert. Rechtsgrundlage
                    ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO
                    (berechtigtes Interesse an der Beantwortung). Die Daten werden gelöscht, sobald sie für die
                    Zweckerreichung nicht mehr erforderlich sind.
                </p>

                <h2 style={h2}>4. Cookies</h2>
                <p style={p}>
                    Diese Website verwendet technisch notwendige Cookies, soweit sie für den Betrieb
                    erforderlich sind. Nicht notwendige Cookies oder Tracking-Dienste werden nur mit Ihrer
                    Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) eingesetzt.
                    {' '}<span style={{ color: 'rgba(255,255,255,0.45)' }}>[Eingesetzte Dienste ergänzen, falls vorhanden]</span>
                </p>

                <h2 style={h2}>5. Ihre Rechte</h2>
                <p style={p}>
                    Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17),
                    Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) sowie Widerspruch
                    gegen die Verarbeitung (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit
                    Wirkung für die Zukunft widerrufen.
                </p>

                <h2 style={h2}>6. Beschwerderecht bei der Aufsichtsbehörde</h2>
                <p style={p}>
                    Ihnen steht ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu, insbesondere in
                    dem Mitgliedstaat Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des mutmaßlichen
                    Verstoßes.
                </p>

                <h2 style={h2}>7. Aktualität</h2>
                <p style={p}>
                    Diese Datenschutzerklärung wird bei Bedarf angepasst, um sie an geänderte rechtliche oder
                    technische Rahmenbedingungen anzupassen.
                </p>

                <p style={{ ...muted, marginTop: '3rem' }}>
                    Hinweis: Sobald Tracking- oder Analyse-Dienste eingebunden werden, wird Abschnitt 4
                    (Cookies) um die dann eingesetzten Dienste ergänzt.
                </p>
            </div>
        </main>
    )
}
