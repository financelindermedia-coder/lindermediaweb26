'use client'

import useReveal from '@/components/useReveal'

/**
 * EINE Kundenstimme als ruhiger, gewichtiger Moment zwischen den Projekten und
 * der Personensektion – bewusst keine Testimonial-Sektion mit mehreren Karten
 * und kein gepinnter Scroller mehr.
 *
 * Gestaltung: groß, zentriert, viel Luft, begrenzte Zeilenlänge. Keine Karte,
 * kein Rahmen, kein Anführungszeichen-Ornament – der einzige Akzent ist die
 * feine orange Haarlinie über dem Zitat.
 */

const ZITAT =
    '„Wir haben vorher viel Geld für Werbung ausgegeben und nicht verstanden, warum es nicht funktioniert. LinderMedia hat uns nicht einfach eine neue Website gebaut, sondern zuerst geholfen zu verstehen, wen wir eigentlich ansprechen wollen."'

const AUTOR = '— Geschäftsführer, Baugewerbe Bayern'

export default function StimmenSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="stimmen" ref={ref} className="stq" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <figure className="stq-inner reveal" data-reveal>
                <span className="stq-rule" aria-hidden="true" />
                <blockquote className="stq-text">{ZITAT}</blockquote>
                <figcaption className="stq-attr">{AUTOR}</figcaption>
            </figure>
        </section>
    )
}
