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
                    Viele Unternehmen leisten mehr, als ihr Auftritt erkennen lässt. Angebote, Qualität und Erfahrung sind vorhanden – aber Positionierung, Gestaltung und Kommunikation erzählen noch nicht dieselbe Geschichte. LinderMedia bringt diese Teile in eine klare Richtung. Damit sichtbar wird, wofür ein Unternehmen steht und warum es die passende Wahl ist.
                </p>
                <p className="wende-claim">
                    Weniger Lärm. <strong>Mehr Wirkung.</strong>
                </p>
                </div>
            </div>
        </section>
    )
}
