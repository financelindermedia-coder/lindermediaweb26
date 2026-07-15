'use client'

import useReveal from '@/components/useReveal'

/**
 * USP-Sektion: reine Typografie in einer großen Glass-Card. Erklärt die
 * Arbeitsweise, nicht die Leistungen – „Alles erzählt dieselbe Geschichte."
 */
export default function UspSection() {
    const ref = useReveal<HTMLElement>()

    return (
        <section id="usp" ref={ref} className="a2 a2-usp-section">
            <div className="a2-card a2-usp reveal" data-reveal>
                <p className="a2-eye" data-reveal>
                    | Unsere Arbeitsweise
                </p>
                <h2 className="a2-head" data-reveal>
                    Alles erzählt<br /><span>dieselbe Geschichte.</span>
                </h2>
                <div className="a2-usp-body" data-reveal>
                    <p>
                        Viele Unternehmen arbeiten mit unterschiedlichen Spezialisten.
                        Designer. Fotografen. Videografen. Entwickler. Marketing.
                        Jeder leistet gute Arbeit &ndash; doch häufig erzählt jeder
                        eine andere Geschichte.
                    </p>
                    <p className="a2-usp-lead">
                        Wir glauben an einen anderen Weg.
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
