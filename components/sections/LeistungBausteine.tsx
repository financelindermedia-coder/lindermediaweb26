'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'

/**
 * Bausteine der Leistungsseiten.
 *
 * Bewusst dieselbe Sprache wie die Fallstudien (`.csx-*`): dunkler Grund,
 * nummerierte Kapitel, gestaffeltes Einblenden über `useReveal`. Eine eigene
 * Gestaltung für die Leistungsseiten hätte einen zweiten Unterseiten-Stil
 * eröffnet – und die Seite lebt davon, dass alles wie dieselbe Marke aussieht.
 *
 * Client-Components nur wegen `useReveal`; die Seite selbst bleibt ein
 * Server-Component, damit Metadaten und Structured Data statisch entstehen.
 */

const PFEIL = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

/**
 * Auftakt: Eyebrow, zweizeilige H1, der Einordnungssatz und der Fließtext.
 *
 * Ohne Bild – anders als bei den Fallstudien gibt es hier kein Projektmotiv,
 * das etwas belegen würde. Ein beliebiges Stimmungsbild an dieser Stelle wäre
 * Dekoration, und die Seite argumentiert sonst nirgends damit.
 */
export function LeistungHero({
    eyebrow,
    h1,
    intro,
    text,
}: {
    eyebrow: string
    h1: [string, string]
    intro: string
    text: string[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.1 })

    return (
        <section className="csx csx-chapter csx-wide lst-hero" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-eye lst-eye reveal" data-reveal>{eyebrow}</p>
                    <h1 className="csx-h1 reveal" data-reveal>
                        {h1[0]}<br /><strong>{h1[1]}</strong>
                    </h1>
                    <p className="lst-intro reveal" data-reveal>{intro}</p>
                    {text.map((t) => (
                        <p className="csx-p reveal" data-reveal key={t.slice(0, 24)}>{t}</p>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * Der Leitgedanke: woran wir uns halten, oder – auf /leistungen – die
 * Schluss-Aussage des Gesamtsystems. Steht abgesetzt in der Akzentfarbe – er
 * ist die Antwort, nicht die Herleitung.
 */
export function LeistungLeitgedanke({
    label = 'Der Leitgedanke',
    headline,
    text,
}: {
    /** Z. B. "Klarheit. Charakter. Präsenz. Wirkung.", wenn die Fläche als Schluss-Aussage statt als Leitgedanke dient. */
    label?: string
    headline: string
    text: string
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section className="lst-leit" ref={ref}>
            <div className="lst-leit-inner">
                <p className="lst-leit-label reveal" data-reveal>{label}</p>
                <p className="lst-leit-head reveal" data-reveal>{headline}</p>
                <p className="lst-leit-text reveal" data-reveal>{text}</p>
            </div>
        </section>
    )
}

/** Abschluss: die Frage, der Weg ins Gespräch, der Rückweg zur Startseite. */
export function LeistungOutro({ frage, label }: { frage: string; label: string }) {
    return (
        <nav className="csx-outro lst-outro" aria-label="Weiter auf dieser Seite">
            <p className="lst-outro-frage">{frage}</p>
            <Link href="/#contact" className="csx-cta">
                {label} {PFEIL}
            </Link>
            <Link href="/" className="csx-outro-back">
                Zurück zur Startseite {PFEIL}
            </Link>
        </nav>
    )
}
