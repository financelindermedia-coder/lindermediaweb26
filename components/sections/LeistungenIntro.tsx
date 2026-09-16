'use client'

import useReveal from '@/components/useReveal'

/**
 * Kopfzeile des Leistungen-Blocks: Headline plus ein kurzer Fließtext, der
 * die vier Stufen benennt (Strategie/Charakter/Markenpräsenz/Wirkung) – ohne
 * die radiale Grafik. Die steht jetzt weiter unten, gepaart mit der
 * Handschrift-Aussage (UspSection), in einem eigenen Block (siehe app/page.tsx).
 * Der Satz je Stufe ist derselbe wie die "claim"-Zeile an den Grafik-Knoten
 * (LeistungenSection.tsx) und die Kapitel-Überschriften auf /leistungen –
 * dieselbe Aussage an drei Stellen, nicht drei verschiedene Formulierungen.
 */
export default function LeistungenIntro() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="leistungen" ref={ref} className="a2 sysr-intro">
            <h2 className="sysr-head reveal" data-reveal>
                Eine Strategie, ein System,<br />eine Handschrift.
            </h2>
            <p className="sysr-intro-text reveal" data-reveal>
                <strong>Strategie</strong> gibt Richtung. <strong>Charakter</strong> gibt ihr eine
                Form. <strong>Markenpräsenz</strong> macht sie sichtbar. <strong>Wirkung</strong>{' '}
                macht daraus ein Ergebnis.
            </p>
        </section>
    )
}
