'use client'

import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'

/**
 * Das Leistungssystem: ersetzt die Kachelliste "Was dazugehört." durch einen
 * kleinen Graphen, der zeigt, WIE die Einzeldisziplinen zusammenhängen, statt
 * sie als gleich gewichtete Posten nebeneinanderzustellen (siehe Auftrag zum
 * Umbau der Leistungsseiten, Punkt 5–8).
 *
 * Bewusst kein Kachelgrid, keine Icons, keine Business-Infografik: reine
 * Typografie, eine dünne orange Verbindungslinie, viel Fläche. Die Linien sind
 * ausgezogen (nicht gestrichelt wie der narrative "Weg" in DescentStack/
 * MethodeSection) – hier geht es um Struktur, nicht um eine Reise.
 *
 * Reihen können mehrere Knoten tragen (Verzweigung/Zusammenführung, z. B.
 * UX + UI Design). Die Kanten werden nicht fest positioniert, sondern aus den
 * tatsächlichen Rechtecken der Knoten gemessen – genau die Technik aus
 * `MobilPfad` in LeistungenSection.tsx, hier verallgemeinert auf beliebige
 * Kanten statt einer festen Kette. So sitzen Verzweigungspunkte auf jedem
 * Breakpoint richtig, ohne zwei Hand-SVGs pflegen zu müssen.
 *
 * Aufbau statt Sofort-Sichtbarkeit (Punkt 7): EIN `useReveal`-Trigger auf dem
 * ganzen Graphen, Knoten und Linien blenden gestaffelt per `--d` ein – kein
 * Scroll-Lock, kein Pinning (Punkt 8), bei `prefers-reduced-motion: reduce`
 * steht laut `useReveal` sofort alles da (Punkt 19). Die animierte Ebene liegt
 * in einem inneren Span, das gemessene `.lsy-node` bleibt layoutstabil, damit
 * die Linie nicht der Eintritts-Animation hinterherzuckelt.
 *
 * Die Knotennamen stehen als echtes Text-Markup (kein SVG-Text) – crawlbar
 * und vorlesbar, die SVG-Linien sind rein dekorativ (`aria-hidden`).
 */

export type SystemKnoten = { id: string; label: string }
export type SystemKante = { from: string; to: string }

function useSystemLinien(kanten: SystemKante[]) {
    const graphRef = useRef<HTMLDivElement>(null)
    const [pfade, setPfade] = useState<string[]>([])

    useEffect(() => {
        const graph = graphRef.current
        if (!graph) return

        const berechnen = () => {
            const kr = graph.getBoundingClientRect()
            if (kr.width === 0 || kr.height === 0) return

            const rect = (id: string) => {
                const el = graph.querySelector<HTMLElement>(`[data-node="${CSS.escape(id)}"]`)
                if (!el) return null
                const r = el.getBoundingClientRect()
                return {
                    cx: ((r.left + r.width / 2 - kr.left) / kr.width) * 100,
                    top: ((r.top - kr.top) / kr.height) * 100,
                    bottom: ((r.bottom - kr.top) / kr.height) * 100,
                }
            }

            const naechstePfade = kanten
                .map(({ from, to }) => {
                    const a = rect(from)
                    const b = rect(to)
                    if (!a || !b) return null
                    // Von der Unterkante des Eltern- zur Oberkante des
                    // Kind-Knotens – nie durch den Knoten hindurch.
                    return `M${a.cx.toFixed(1)},${a.bottom.toFixed(1)} L${b.cx.toFixed(1)},${b.top.toFixed(1)}`
                })
                .filter((p): p is string => Boolean(p))

            setPfade(naechstePfade)
        }

        berechnen()
        const ro = new ResizeObserver(berechnen)
        ro.observe(graph)
        window.addEventListener('resize', berechnen)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', berechnen)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kanten.length])

    return { graphRef, pfade }
}

export default function LeistungSystem({
    index,
    titel,
    reihen,
    kanten,
}: {
    index: string
    titel: string
    reihen: SystemKnoten[][]
    kanten: SystemKante[]
}) {
    const sectionRef = useReveal<HTMLElement>({ threshold: 0.15 })
    const { graphRef, pfade } = useSystemLinien(kanten)

    let laufindex = 0

    return (
        <section className="csx csx-chapter csx-wide lsy" ref={sectionRef}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <h2 className="csx-h2 reveal" data-reveal>{titel}</h2>

                    <div className="lsy-graph" ref={graphRef}>
                        <svg className="lsy-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <defs>
                                <linearGradient id="lsy-verlauf" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.55" />
                                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.3" />
                                </linearGradient>
                            </defs>
                            {pfade.map((d, i) => (
                                <path
                                    key={d}
                                    d={d}
                                    fill="none"
                                    stroke="url(#lsy-verlauf)"
                                    strokeWidth="1.2"
                                    vectorEffect="non-scaling-stroke"
                                    style={{ ['--d' as string]: `${0.15 + i * 0.05}s` } as React.CSSProperties}
                                />
                            ))}
                        </svg>

                        {reihen.map((reihe) => (
                            <div
                                className={`lsy-row${reihe.length > 1 ? ' lsy-row--verzweigt' : ''}`}
                                key={reihe.map((n) => n.id).join('+')}
                            >
                                {reihe.map((n) => {
                                    const d = 0.1 + laufindex * 0.07
                                    laufindex += 1
                                    return (
                                        <div
                                            className="lsy-node"
                                            data-node={n.id}
                                            key={n.id}
                                            style={{ ['--d' as string]: `${d}s` } as React.CSSProperties}
                                        >
                                            <span className="lsy-node-in">
                                                <span className="lsy-node-dot" aria-hidden="true" />
                                                <p className="lsy-node-label">{n.label}</p>
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
