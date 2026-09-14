'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'
import { STUFEN, leistungenDerStufe, type StufenNr } from '@/lib/leistungen'

/** Ankerbezeichner der Stufen auf /leistungen (siehe app/leistungen/page.tsx). */
const STUFE_ANKER: Record<StufenNr, string> = {
    '01': 'klarheit',
    '02': 'charakter',
    '03': 'praesenz',
    '04': 'wirkung',
}

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
                {STUFEN.map((stufe, i) => {
                    const leistungen = leistungenDerStufe(stufe.nr)

                    return (
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

                            {leistungen.length === 1 ? (
                                <ul className="lgl-links">
                                    <li>
                                        <Link href={`/leistungen#${STUFE_ANKER[stufe.nr]}`}>
                                            <span>{leistungen[0].name}</span>
                                            <span className="lgl-pfeil" aria-hidden="true">→</span>
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                // Mehrere Disziplinen: eine Zeile Namen statt einer
                                // vollen Liste einzelner Zeilen – die Reihenfolge
                                // bleibt die aus lib/leistungen, der Link fuehrt auf
                                // den Stufen-Abschnitt der Gesamtseite (dort stehen
                                // alle Disziplinen der Gruppe im Zusammenhang).
                                <div className="lgl-gruppe">
                                    <p className="lgl-summe">
                                        {leistungen.map((l) => l.name).join(' · ')}
                                    </p>
                                    <Link className="lgl-mehr" href={`/leistungen#${STUFE_ANKER[stufe.nr]}`}>
                                        <span>Leistungen ansehen</span>
                                        <span className="lgl-pfeil" aria-hidden="true">→</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
