'use client'

import useReveal from '@/components/useReveal'

/**
 * Kurze Headline neben der radialen System-Grafik (LeistungenSection), im
 * `.a2-duo`-Panel (siehe app/page.tsx). Die ausführliche Erklärung dazu steht
 * jetzt vorneweg in UspSection, die auch den Anker `#leistungen` trägt – hier
 * nur noch die knappe Zusammenfassung, ohne eigenen Fließtext.
 *
 * `.a2-head` statt einer eigenen `sysr-head`-Klasse: dieselbe Versalien-/
 * Halbfett-Schlusszeile wie jede andere Sektionsheadline (siehe UspSection).
 */
export default function LeistungenIntro() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section ref={ref} className="a2 sysr-intro">
            <h2 className="a2-head reveal" data-reveal>
                Eine Strategie, ein System,<br /><span>eine Handschrift.</span>
            </h2>
        </section>
    )
}
