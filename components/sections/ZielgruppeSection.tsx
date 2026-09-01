'use client'

import useReveal from '@/components/useReveal'

/**
 * Für wen die Arbeit gedacht ist.
 *
 * Steht zwischen der Person und den Einwänden (FAQ): Wer bis hierhin gelesen
 * hat, weiß, was gemacht wird und von wem – offen ist nur noch die Frage, ob
 * er selbst gemeint ist. Der Abschnitt beantwortet sie über die Aufgabe, nicht
 * über die Branche; eine Branchenliste würde die Hälfte der passenden
 * Unternehmen ausschließen und die andere Hälfte nicht überzeugen.
 *
 * Gestaltung im Ton der Nachbarsektionen: dunkler Grund, zentrierte Lesespalte,
 * als einziger Akzent die orange Haarlinie und die Schlussfrage.
 */
export default function ZielgruppeSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="zielgruppe" ref={ref} className="zg" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="zg-inner reveal" data-reveal>
                <p className="zg-eye">| Für wen wir arbeiten</p>
                <h2 className="zg-head">
                    Für Unternehmen,<br />
                    deren Leistung mehr kann<br />
                    <span>als ihr Auftritt zeigt.</span>
                </h2>

                {/* Der Satz stand schon vorher auf der Seite und trägt die
                    Positionierung am genauesten – er bleibt wörtlich. */}
                <p className="zg-lead">
                    Für Unternehmen, die in ihrer Sache wirklich gut sind – und trotzdem
                    nicht so wahrgenommen werden, wie sie es verdienen.
                </p>

                <p className="zg-text">
                    Besonders relevant ist unsere Arbeit für Unternehmen mit
                    erklärungsbedürftigen Leistungen, technischen Produkten,
                    anspruchsvollen Dienstleistungen oder einem hohen Anspruch
                    an ihre Marke.
                </p>
                <p className="zg-text">
                    Für Unternehmen, bei denen der Unterschied nicht einfach über ein
                    neues Logo oder mehr Werbung entsteht. Sondern über die Frage:
                </p>

                <p className="zg-frage">
                    Was macht uns wirklich relevant –<br />
                    und wie wird das sichtbar?
                </p>
            </div>
        </section>
    )
}
