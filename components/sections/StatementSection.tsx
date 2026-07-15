'use client'

import useReveal from '@/components/useReveal'

/**
 * Statement-Sektion: sehr reduzierte Glass-Card, große Typografie, viel Luft.
 * Verdichtet den Leitgedanken vor dem emotionalen Abschluss.
 */
export default function StatementSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="statement" ref={ref} className="a2 a2-statement-section">
            <div className="a2-card a2-statement reveal" data-reveal>
                <p>
                    Nicht einzelne Maßnahmen machen Marken erfolgreich.
                </p>
                <p className="a2-statement-emph">
                    Sondern die Konsequenz, mit der jede Entscheidung
                    dieselbe Geschichte erzählt.
                </p>
            </div>
        </section>
    )
}
