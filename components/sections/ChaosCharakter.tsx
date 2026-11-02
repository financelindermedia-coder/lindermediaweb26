'use client'

import useReveal from '@/components/useReveal'

/**
 * „Von Chaos zu Charakter“ – die Wende zwischen Hero und Prozessbereich.
 * Stand frueher am tiefsten Punkt des Eisberg-Abstiegs (DescentStack); jetzt
 * eine eigene, ruhige Sektion direkt nach dem Hero.
 */
export default function ChaosCharakter() {
    const ref = useReveal<HTMLDivElement>({ threshold: 0.4 })
    return (
        <section className="hi-turn" aria-label="Von Chaos zu Charakter">
            <div data-parallax="-0.06" data-parallax-min="821" className="hi-turn-drift">
                <div ref={ref} className="reveal">
                <p className="dsc-turn-eye">Der Weg zur Wirkung</p>
                <h2 className="wende-head">
                    Von Chaos<br /><strong>zu Charakter.</strong>
                </h2>
                <p className="wende-lead">
                    Angebot, Qualität und Erfahrung sind da. Doch der Auftritt zeigt noch nicht klar genug, wofür das Unternehmen steht – und warum es die passende Wahl ist.
                </p>
                <div className="hi-fit">
                    <p className="hi-fit-eye">Sie sind hier richtig, wenn …</p>
                    <ul className="hi-fit-list">
                        <li>Ihre Leistung komplex ist und sich schwer auf den Punkt bringen lässt.</li>
                        <li>Website, Inhalte und Gestaltung noch nicht dieselbe Geschichte erzählen.</li>
                        <li>Sie den nächsten Marketing-Schritt planen, obwohl die strategische Richtung noch offen ist.</li>
                    </ul>
                </div>
                <p className="wende-claim">
                    Dann lohnt sich ein Schritt zurück: <strong>Erst die Richtung klären, dann sichtbar machen.</strong>
                </p>
                </div>
            </div>
        </section>
    )
}
