'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'
import { STUFEN, leistungenDerStufe } from '@/lib/leistungen'

/**
 * Die neun Disziplinen als Wege zu ihren eigenen Seiten.
 *
 * Steht unter der System-Grafik im Block `#leistungen`. Die Grafik zeigt den
 * Zusammenhang der drei Ebenen – sie ist bewusst keine Liste und soll auch
 * keine werden. Wer die Einzeldisziplin sucht, findet sie hier.
 *
 * GEORDNET NACH DEN VIER SCHRITTEN DER METHODE, nicht als Reihe gleich großer
 * Marken. Neun Pillen nebeneinander behaupten, dass Markenstrategie und
 * Automatisierung dasselbe Gewicht und denselben Ort im Ablauf haben – genau
 * das bestreitet die Seite an jeder anderen Stelle. In vier Spalten liest man
 * stattdessen ab, wann im Prozess eine Disziplin überhaupt an die Reihe kommt;
 * dass Spalte 03 vier Einträge trägt und Spalte 01 einen, ist die Aussage und
 * kein Ungleichgewicht.
 *
 * Die Zuordnung steht an der Leistung selbst (`stufe` in lib/leistungen), nicht
 * hier – sonst gäbe es zwei Wahrheiten darüber, wohin eine Disziplin gehört.
 */
export default function LeistungenLinks() {
    const ref = useReveal<HTMLDivElement>({ threshold: 0.15 })

    return (
        <div className="lgl" ref={ref}>
            <p className="lgl-label reveal" data-reveal>Die Disziplinen im Einzelnen</p>

            <div className="lgl-grid">
                {STUFEN.map((stufe, i) => (
                    <div
                        className="lgl-spalte reveal"
                        data-reveal
                        key={stufe.nr}
                        style={{ ['--d' as string]: `${0.1 + i * 0.08}s` } as React.CSSProperties}
                    >
                        <p className="lgl-nr">
                            {stufe.nr}
                            <span className="lgl-nr-rule" aria-hidden="true" />
                        </p>
                        <p className="lgl-stufe">{stufe.name}</p>
                        <ul className="lgl-links">
                            {leistungenDerStufe(stufe.nr).map((l) => (
                                <li key={l.slug}>
                                    <Link href={`/leistungen/${l.slug}`}>
                                        <span>{l.name}</span>
                                        <span className="lgl-pfeil" aria-hidden="true">→</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    )
}
