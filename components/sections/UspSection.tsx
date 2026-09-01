'use client'

import useReveal from '@/components/useReveal'

/**
 * Arbeitsweise: reine Typografie in einer großen Glass-Card. Erklärt, warum
 * Strategie, Gestaltung und Umsetzung hier nicht getrennt eingekauft werden –
 * nicht, welche Leistungen es gibt. Die stehen in der System-Grafik daneben.
 *
 * Der Aufbau ist eine Kette von Verneinungen, die auf einen Satz zuläuft: Erst
 * was NICHT unabhängig voneinander entsteht, dann der Schluss daraus. Deshalb
 * stehen die vier Sätze untereinander und nicht als Absatz – die Wiederholung
 * ist die Argumentation.
 */
export default function UspSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="usp" ref={ref} className="a2 a2-usp-section">
            <div className="a2-card a2-usp reveal" data-reveal>
                <p className="a2-eye" data-reveal>
                    | Von der Idee zur Wirkung
                </p>
                <h2 className="a2-head" data-reveal>
                    Aus einer klaren Richtung<br />
                    <span>entsteht ein Auftritt, der funktioniert.</span>
                </h2>
                <div className="a2-usp-body" data-reveal>
                    <p>Wir denken nicht in einzelnen Disziplinen.</p>
                    <ul className="a2-usp-liste">
                        <li>Eine Website wird nicht unabhängig von der Marke entwickelt.</li>
                        <li>Eine Bildwelt entsteht nicht unabhängig von der Positionierung.</li>
                        <li>Content wird nicht produziert, bevor klar ist, wofür er steht.</li>
                        <li>Und Marketing sollte nicht versuchen, eine unklare Marke lauter zu machen.</li>
                    </ul>
                    <p className="a2-usp-lead">
                        Deshalb verbinden wir Strategie, Gestaltung und Umsetzung
                        von Anfang an.
                    </p>
                    <p className="a2-usp-emph">
                        Eine Strategie.<br />
                        Eine Handschrift.<br />
                        Ein System.
                    </p>
                    <p className="a2-usp-quiet">
                        Vom ersten Gedanken bis zum letzten Bild.
                    </p>
                </div>
            </div>
        </section>
    )
}
