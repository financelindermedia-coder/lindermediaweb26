'use client'

import useReveal from '@/components/useReveal'

/**
 * Leistungskarten: ruhige Übersicht der neun Disziplinen im bestehenden
 * Kartenstil (Icon, Headline, kurzer Text, Button). Nicht erklären – nur
 * Orientierung geben. Reihenfolge = ganzheitlicher Markenaufbau.
 */
type Karte = { nr: string; titel: string; text: string; icon: JSX.Element }

const I = (d: JSX.Element) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        {d}
    </svg>
)

const KARTEN: Karte[] = [
    { nr: '01', titel: 'Markenstrategie', text: 'Klarheit über Position, Botschaft und Ziel – das Fundament jeder Marke.', icon: I(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>) },
    { nr: '02', titel: 'Corporate Design', text: 'Eine visuelle Identität, die auf jedem Kanal wiedererkennbar bleibt.', icon: I(<><path d="M12 2l4.5 6L12 22 7.5 8 12 2z" /><path d="M7.5 8h9" /></>) },
    { nr: '03', titel: 'Fotografie', text: 'Bilder mit Haltung – die die Marke authentisch spürbar machen.', icon: I(<><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6l1.5-2h5L16 6" /></>) },
    { nr: '04', titel: 'Filmproduktion', text: 'Bewegtbild, das Emotion transportiert und Geschichten verdichtet.', icon: I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3V9z" /></>) },
    { nr: '05', titel: 'CGI & 3D', text: 'Produkte und Welten fotorealistisch inszeniert – ohne Grenzen der Realität.', icon: I(<><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" /><path d="M12 12l9-5M12 12v10M12 12L3 7" /></>) },
    { nr: '06', titel: 'Webdesign', text: 'Digitale Auftritte, die führen, überzeugen und konvertieren.', icon: I(<><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M3 8h18M9 21h6M12 17v4" /></>) },
    { nr: '07', titel: 'SEO', text: 'Sichtbarkeit dort, wo Kunden aktiv suchen – nachhaltig aufgebaut.', icon: I(<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>) },
    { nr: '08', titel: 'KI-Visualisierung', text: 'Ideen sofort sichtbar – mit KI vom Gedanken zum Bild.', icon: I(<><path d="M12 3a4 4 0 0 1 4 4 4 4 0 0 1 0 8 4 4 0 0 1-8 0 4 4 0 0 1 0-8 4 4 0 0 1 4-4z" /><path d="M12 7v10M8 11h8" /></>) },
    { nr: '09', titel: 'Automation', text: 'Prozesse intelligent verbinden – mehr Wirkung bei weniger Aufwand.', icon: I(<><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></>) },
]

export default function LeistungskartenSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.1 })

    return (
        <section id="leistungen" ref={ref} className="a2 lk">
            <div className="lk-head">
                <p className="a2-eye">| 06 — Unsere Leistungen</p>
                <h2 className="a2-head lk-title">
                    Neun Disziplinen.<br />
                    <span>Eine Handschrift.</span>
                </h2>
            </div>

            <div className="lk-grid">
                {KARTEN.map((k) => (
                    <article key={k.nr} className="lk-card reveal" data-reveal>
                        <span className="lk-ic">{k.icon}</span>
                        <span className="lk-nr">{k.nr}</span>
                        <h3 className="lk-name">{k.titel}</h3>
                        <p className="lk-text">{k.text}</p>
                        <a className="lk-btn" href="#contact">
                            <span>Mehr erfahren</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}
