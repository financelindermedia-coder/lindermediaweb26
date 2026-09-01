'use client'

import useReveal from '@/components/useReveal'

/**
 * Die Kundenstimme zwischen den Projekten und der Personensektion.
 *
 * Das Zitat steht auf ausdrücklichen Wunsch wieder als Zitat da. Es ist
 * sinngemäß wiedergegeben und nicht wörtlich protokolliert – und genau das
 * sagt die Herkunftszeile darunter auch. Ein sinngemäßer Satz, der als Wortlaut
 * ausgegeben wird, ist das größere Glaubwürdigkeitsrisiko als eine offen
 * benannte Wiedergabe; wer den Unterschied merkt, zweifelt sonst an allem
 * anderen mit.
 *
 * Sobald Name und Unternehmen freigegeben sind, gehören sie in `ATTRIBUTION` –
 * erfundene Namen kommen hier nicht hinein.
 *
 * Gestaltung: groß, zentriert, viel Luft. Als Akzente nur das Anführungszeichen
 * über dem Zitat und die feine orange Haarlinie.
 */

const ZITAT =
    'Wir haben vorher viel Geld für Werbung ausgegeben und nicht verstanden, warum es nicht funktioniert. LinderMedia hat uns nicht einfach eine neue Website gebaut, sondern zuerst geholfen zu verstehen, wen wir eigentlich ansprechen wollen.'

/** Rolle und Branche – so konkret, wie es ohne Freigabe zulässig ist. */
const ATTRIBUTION = 'Geschäftsführer · Baugewerbe Bayern'

/* Der Hinweis steht bewusst auf der Seite und nicht nur im Quelltext: Ein
   unerklaert anonymes Zitat liest sich wie erfunden, ein erklaert anonymes wie
   Diskretion. Denselben Halbsatz kostet es so oder so. */
const HERKUNFT = 'Sinngemäß aus einem Erstgespräch wiedergegeben · ohne Namensnennung'

export default function StimmenSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="stimmen" ref={ref} className="stq" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="stq-inner reveal" data-reveal>
                <span className="stq-rule" aria-hidden="true" />
                <p className="stq-eye">Aus einem Erstgespräch</p>
                <figure className="stq-figure">
                    <span className="stq-mark" aria-hidden="true">&ldquo;</span>
                    <blockquote className="stq-text">{ZITAT}</blockquote>
                    <figcaption className="stq-sub">{ATTRIBUTION}</figcaption>
                </figure>
                <p className="stq-attr">{HERKUNFT}</p>
            </div>
        </section>
    )
}
