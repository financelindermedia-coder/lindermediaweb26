'use client'

import useReveal from '@/components/useReveal'

/**
 * Kurzer Prozessblock am Ende der Leistungsseite: "Von der Idee zur Wirkung."
 * Bewusst NICHT MethodeSection.tsx (der gepinnte Horizontal-Scroller auf der
 * Startseite) wiederverwendet – der ist an die Klarheit/Charakter/Präsenz/
 * Wirkung-Erzaehlung der Startseite gebunden und laeuft ueber Pinning +
 * Scroll-Translation. Genau das schliesst der Umbau-Auftrag fuer die
 * Leistungsseiten aus ("Scroll-Animation darf kein Hindernis sein, kein
 * Scroll-Jacking, kein erzwungenes Stoppen").
 *
 * Deshalb eine eigene, einfache Komponente: normale Dokumentfluss-Reihe
 * (Desktop) bzw. Spalte (Mobil), reines `useReveal`-Einblenden, generisch
 * ueber `schritte` befuellt – ab Phase 2 direkt fuer alle Leistungsseiten
 * wiederverwendbar.
 */

export type ProzessSchritt = { nr: string; label: string }

export default function LeistungProzess({
    headline,
    schritte,
}: {
    headline: [string, string]
    schritte: ProzessSchritt[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section className="csx csx-chapter csx-wide lpz" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <h2 className="csx-h2 reveal" data-reveal>
                        {headline[0]}<br />{headline[1]}
                    </h2>

                    <ol className="lpz-liste">
                        {schritte.map((s, i) => (
                            <li
                                className="lpz-schritt reveal"
                                data-reveal
                                key={s.nr}
                                style={{ ['--d' as string]: `${0.08 + i * 0.06}s` } as React.CSSProperties}
                            >
                                <span className="lpz-nr">{s.nr}</span>
                                <span className="lpz-label">{s.label}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}
