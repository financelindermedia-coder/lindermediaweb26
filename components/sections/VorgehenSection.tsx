'use client'

import useReveal from '@/components/useReveal'
import './VorgehenSection.css'

/**
 * „Von der Idee zur Wirkung" – das Vorgehen in vier Schritten, direkt nach dem
 * ersten Videobereich. Helle Sektion als Atempause zwischen den dunklen
 * Abschnitten; ersetzt die frühere Argumentations-Sektion „Aus einer klaren
 * Richtung entsteht …".
 */
const SCHRITTE = [
    { nr: '01', titel: 'Verstehen', text: 'Ausgangslage, Zielgruppe und Potenzial erkennen.' },
    { nr: '02', titel: 'Entscheiden', text: 'Positionierung, Fokus und Richtung gemeinsam schärfen.' },
    { nr: '03', titel: 'Gestalten', text: 'Identität, Inhalte und digitale Erlebnisse entwickeln.' },
    { nr: '04', titel: 'Umsetzen', text: 'Veröffentlichen, auswerten und weiterentwickeln.' },
]

export default function VorgehenSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="vorgehen" ref={ref} className="vg">
            {/* Sprungmarke fuer „Leistungen" in Navigation, Hero und Footer. */}
            <span id="leistungen" className="vg-anchor" aria-hidden="true" />
            <div className="vg-head">
                <div>
                    <p className="vg-eye reveal" data-reveal>Vorgehen</p>
                    <h2 className="vg-h2 reveal" data-reveal>
                        Von der Idee<br /><strong>zur Wirkung.</strong>
                    </h2>
                </div>
                <p className="vg-intro reveal" data-reveal>
                    Keine Schablone. Ein klarer Prozess, dessen Umfang sich nach Ihrer Aufgabe richtet.
                </p>
            </div>

            <ol className="vg-steps">
                {SCHRITTE.map((s, i) => (
                    <li key={s.nr} className="vg-step reveal" data-reveal style={{ ['--d' as string]: `${i * 0.14}s` } as React.CSSProperties}>
                        <span className="vg-nr" aria-hidden="true">{s.nr}</span>
                        <h3 className="vg-titel">{s.titel}</h3>
                        <p className="vg-text">{s.text}</p>
                    </li>
                ))}
            </ol>
        </section>
    )
}
