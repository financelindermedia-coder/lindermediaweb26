'use client'

import useReveal from '@/components/useReveal'

/**
 * Arbeitsweise: eigene Vollbreite-Sektion, zweispaltig (Headline links,
 * Argumentation rechts), kein Glass-Card mehr. Erklärt, warum Strategie,
 * Gestaltung und Umsetzung hier nicht getrennt eingekauft werden – nicht,
 * welche Leistungen es gibt. Die stehen in der System-Grafik weiter unten
 * (LeistungenSection.tsx, gepaart mit LeistungenIntro im `.a2-duo`-Panel).
 * Trägt den Anker `#leistungen`, weil sie jetzt der Blockanfang ist (siehe
 * app/page.tsx).
 *
 * Rechts eine Kette von Verneinungen: Erst was NICHT unabhängig voneinander
 * entsteht, dann der Schluss daraus. Deshalb stehen die vier Sätze
 * untereinander und nicht als Absatz – die Wiederholung ist die
 * Argumentation.
 */
export default function UspSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="leistungen" ref={ref} className="a2 a2-usp-section">
            <div className="a2-usp">
                <div className="a2-usp-head">
                    <p className="a2-eye reveal" data-reveal>
                        | Von der Idee zur Wirkung
                    </p>
                    <h2 className="a2-head reveal" data-reveal>
                        Aus einer klaren Richtung<br />
                        <span>entsteht ein Auftritt, der funktioniert.</span>
                    </h2>
                </div>
                <div className="a2-usp-body reveal" data-reveal>
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
                    <p className="a2-usp-quiet">
                        Vom ersten Gedanken bis zum letzten Bild.
                    </p>
                </div>
            </div>
        </section>
    )
}
