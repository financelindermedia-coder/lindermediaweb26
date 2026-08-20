'use client'

import useReveal from '@/components/useReveal'

/**
 * Die Wende: „Von Chaos zu Charakter."
 *
 * Steht zwischen Problem und Methode, weil der Satz genau diese Bewegung
 * beschreibt. Die Problem-Sektion endet mit Symptomen und fehlender Strategie —
 * hier kippt die Seite, danach beginnt das geordnete Vorgehen. Als eigener,
 * ruhiger Block: eine Aussage, viel Luft, sonst nichts.
 *
 * Bewusst ohne Link oder Schaltfläche. Der nächste Schritt steht direkt
 * darunter in der Methode-Sektion; ein Verweis hier würde nur von ihr ablenken.
 */
export default function WendeSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.25 })

    return (
        <section id="wende" ref={ref} className="wende">
            <div className="wende-inner">
                <span className="wende-rule reveal" data-reveal aria-hidden="true" />
                <h2 className="wende-head reveal" data-reveal style={{ ['--d' as string]: '0.08s' } as React.CSSProperties}>
                    Von Chaos<br /><strong>zu Charakter.</strong>
                </h2>
                <p className="wende-lead reveal" data-reveal style={{ ['--d' as string]: '0.2s' } as React.CSSProperties}>
                    Wir schaffen Klarheit, Identität und visuelle Wirkung.
                </p>
                <p className="wende-claim reveal" data-reveal style={{ ['--d' as string]: '0.32s' } as React.CSSProperties}>
                    Weniger Lärm. <strong>Mehr Wirkung.</strong>
                </p>
            </div>
        </section>
    )
}
