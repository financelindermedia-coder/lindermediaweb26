'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * Das Leistungssystem: ersetzt die Kachelliste "Was dazugehört." durch einen
 * kleinen Graphen, der zeigt, WIE die Einzeldisziplinen zusammenhängen, statt
 * sie als gleich gewichtete Posten nebeneinanderzustellen.
 *
 * Optik angelehnt an die radiale System-Grafik der Startseite
 * (LeistungenSection.tsx, `.sysr-*`): Der Wurzelknoten jeder Stufe traegt das
 * LinderMedia-Zeichen in einem leuchtenden Badge, die Bausteine darunter
 * kleinere Icon-Kreise mit demselben Glow – dieselbe Formsprache, nicht neu
 * erfunden.
 *
 * Reihen können mehrere Knoten tragen (Verzweigung/Zusammenführung). Die
 * Kanten werden nicht fest positioniert, sondern aus den tatsächlichen
 * Rechtecken der Knoten gemessen – genau die Technik aus `MobilPfad` in
 * LeistungenSection.tsx, hier verallgemeinert auf beliebige Kanten statt
 * einer festen Kette. So sitzen Verzweigungspunkte auf jedem Breakpoint
 * richtig, ohne zwei Hand-SVGs pflegen zu müssen.
 *
 * Scrollytelling (Punkt "wirkt nicht langweilig"): Die Verbindungslinien
 * zeichnen sich nicht einmalig ein, sondern folgen direkt der Scrollposition
 * – `useVisibleRaf` setzt `stroke-dashoffset` jedes Bild neu, solange der
 * Graph sichtbar ist (kein Pin, kein Scroll-Lock: die Seite scrollt normal
 * weiter, nur die Linie zeichnet sich dabei). Bei
 * `prefers-reduced-motion: reduce` greift dieser Loop gar nicht erst – dann
 * zeigt die CSS-Regel `.lsy.is-in` alles sofort vollstaendig (`useReveal`).
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

/**
 * Docking-Punkt zwischen zwei Stufen-Graphen: eine Linie, die beim Erreichen
 * kurz einwaechst (scaleY 0 → 1), statt einfach dazustehen – zeigt, dass die
 * naechste Stufe "andockt", ohne eine Kantenmessung ueber zwei separate
 * `LeistungSystem`-Instanzen hinweg zu bauen (jede misst nur innerhalb ihres
 * eigenen Graphen).
 */
export function LeistungDock() {
    const ref = useReveal<HTMLDivElement>({ threshold: 0.6 })
    return (
        <div className="lsy-dock reveal" data-reveal ref={ref} aria-hidden="true">
            <span className="lsy-dock-linie" />
        </div>
    )
}

export default function LeistungSystem({
    id,
    index,
    titel,
    lead,
    reihen,
    kanten,
}: {
    /** Anker fuer Direktlinks, z. B. `/leistungen#praesenz`. */
    id?: string
    index: string
    titel: string
    /** Kurzer Absatz zwischen Headline und Graph (ein bis zwei Saetze). */
    lead?: string
    reihen: SystemKnoten[][]
    kanten: SystemKante[]
}) {
    const sectionRef = useReveal<HTMLElement>({ threshold: 0.15 })
    const { graphRef, pfade } = useSystemLinien(kanten)
    const svgRef = useRef<SVGSVGElement>(null)

    // Linien folgen der Scrollposition, solange der Graph in der Naehe des
    // Viewports steht (useVisibleRaf haelt die Schleife sonst an – siehe
    // components/useVisibleRaf.ts). Direktes DOM-Styling statt React-State:
    // eine Zustandsaenderung pro Bild waere unnoetiger Render-Druck.
    useVisibleRaf(sectionRef, () => {
        const section = sectionRef.current
        const svg = svgRef.current
        if (!section || !svg) return

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        const r = section.getBoundingClientRect()
        const vh = window.innerHeight
        const fortschritt = Math.max(0, Math.min(1, (vh - r.top) / (vh * 0.85)))

        svg.querySelectorAll<SVGPathElement>('path').forEach((p, i) => {
            const lokal = Math.max(0, Math.min(1, (fortschritt - i * 0.06) * 1.5))
            p.style.opacity = lokal > 0 ? '1' : '0'
            p.style.strokeDashoffset = String(1 - lokal)
        })
    })

    let laufindex = 0

    return (
        <section id={id} className="csx csx-chapter csx-wide lsy" ref={sectionRef}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <h2 className="csx-h2 reveal" data-reveal>{titel}</h2>
                    {lead && <p className="csx-p lsy-lead reveal" data-reveal>{lead}</p>}

                    <div className="lsy-graph" ref={graphRef}>
                        <svg ref={svgRef} className="lsy-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <defs>
                                <linearGradient id="lsy-verlauf" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.4" />
                                </linearGradient>
                            </defs>
                            {pfade.map((d, i) => (
                                <path
                                    key={d}
                                    d={d}
                                    fill="none"
                                    stroke="url(#lsy-verlauf)"
                                    strokeWidth="1.4"
                                    strokeDasharray="0.018 0.05"
                                    pathLength={1}
                                    vectorEffect="non-scaling-stroke"
                                    style={{ ['--d' as string]: `${0.15 + i * 0.05}s` } as React.CSSProperties}
                                />
                            ))}
                        </svg>

                        {reihen.map((reihe, ri) => (
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
                                                {ri === 0 ? (
                                                    <span className="lsy-badge" aria-hidden="true">
                                                        <Image src="/logo/logo_LM_white_box.svg" alt="" width={40} height={39} />
                                                    </span>
                                                ) : (
                                                    <span className="lsy-ic" aria-hidden="true">
                                                        <span className="lsy-ic-dot" />
                                                    </span>
                                                )}
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
