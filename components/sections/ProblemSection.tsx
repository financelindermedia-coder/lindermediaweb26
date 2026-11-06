'use client'

import useReveal from '@/components/useReveal'

/**
 * Startseite, Teil A – das Problem: Warum braucht ein Unternehmen LinderMedia?
 *
 * Steht vor den Projekten und wiederholt weder die Lösung (KompetenzSection)
 * noch die Referenzen. Aufgabe: Der Besucher erkennt sein eigenes Unternehmen.
 */
export default function ProblemSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="auftritt" className="pbl" ref={ref}>
            <div className="pbl-inner">
                <p className="pbl-eye reveal" data-reveal>| Warum LinderMedia</p>
                <h2 className="pbl-h2 reveal" data-reveal>
                    Gute Produkte verdienen <strong>einen starken Auftritt.</strong>
                </h2>
                <div className="pbl-cols">
                    <div className="pbl-text reveal" data-reveal>
                        <p>
                            Viele Unternehmen leisten hervorragende Arbeit. Sie entwickeln hochwertige
                            Produkte, bieten überzeugende Dienstleistungen und verfügen über jahrelange
                            Erfahrung. Doch nicht immer wird das auch nach außen sichtbar.
                        </p>
                        <p>
                            Eine Marke muss mehr können, als gut aussehen. Sie muss Vertrauen schaffen,
                            Werte vermitteln und zeigen, was ein Unternehmen besonders macht.
                        </p>
                    </div>
                    <div className="pbl-text reveal" data-reveal>
                        <p>
                            Genau hier setzt LinderMedia an. Wir entwickeln durchdachte Markenauftritte
                            und digitale Erlebnisse, die Unternehmen sichtbar machen, ihre Stärken
                            herausarbeiten und ihre Leistungen überzeugend kommunizieren.
                        </p>
                        <p className="pbl-strong">
                            Von der ersten Idee bis zur fertigen Umsetzung verbinden wir Strategie,
                            Design und moderne Technologien zu einem stimmigen Gesamtauftritt.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
