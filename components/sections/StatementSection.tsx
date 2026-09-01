'use client'

import useReveal from '@/components/useReveal'

/**
 * Der Übergang zum Kontakt: sehr reduziert, große Typografie, viel Luft.
 *
 * Steht als letzter Abschnitt vor dem Formular und stellt keine Behauptung mehr
 * auf, sondern eine Frage. Die vier „Vielleicht"-Zeilen sind bewusst Angebote
 * statt Diagnosen – wer hier ankommt, soll sich in einer davon wiederfinden,
 * ohne dass ihm etwas unterstellt wird.
 */
export default function StatementSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="statement" ref={ref} className="a2 a2-statement-section">
            <div className="a2-card a2-statement reveal" data-reveal>
                <p className="a2-eye a2-statement-eye" data-reveal>| Die nächste Frage</p>
                <p>
                    Was sollte Ihr Unternehmen
                </p>
                <p className="a2-statement-emph">
                    heute klarer zeigen?
                </p>
                <ul className="a2-statement-liste" data-reveal>
                    <li>Vielleicht braucht Ihre Marke eine neue Richtung.</li>
                    <li>Vielleicht ist die Richtung längst da, aber noch nicht sichtbar.</li>
                    <li>Vielleicht funktioniert Ihr Marketing – nur nicht so, wie es sollte.</li>
                    <li>
                        Oder Sie wissen bereits, dass etwas nicht stimmt, aber noch nicht
                        genau, wo Sie anfangen sollen.
                    </li>
                </ul>
                <p className="a2-statement-schluss" data-reveal>
                    Genau darüber können wir sprechen.
                </p>
            </div>
        </section>
    )
}
