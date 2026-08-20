'use client'

import Image from 'next/image'
import useReveal from '@/components/useReveal'

/**
 * Radiale System-Grafik: LinderMedia im Zentrum, acht Disziplinen ringförmig
 * darum, über feine gepunktete Linien verbunden. Beim Scrollen faden Linien und
 * Nodes ruhig nacheinander ein. Erklärt Zusammenhänge, nicht Leistungen.
 * Mobil: gestapeltes Raster (keine Linien).
 *
 * Steht bewusst NACH dem Leistungsteaser (KernleistungenSection) und ist ihm
 * auch typografisch nachgeordnet: die drei Hauptbereiche tragen die Aussage,
 * die Einzeldisziplinen zeigen nur, was daran alles hängt.
 */
type Align = 'ct' | 'cb' | 'l' | 'r'
type Node = { label: string; sub: [string, string]; angle: number; align: Align; icon: JSX.Element }

const I = (d: JSX.Element) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {d}
    </svg>
)

const NODES: Node[] = [
    { label: 'Strategie', sub: ['Richtung geben.', 'Klarheit schaffen.'], angle: -90, align: 'ct',
      icon: I(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>) },
    { label: 'Design', sub: ['Ästhetik gestalten.', 'Bedeutung sichtbar machen.'], angle: -45, align: 'l',
      icon: I(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>) },
    { label: 'Fotografie', sub: ['Momente einfangen.', 'Echt. Ausdrucksstark.'], angle: 0, align: 'l',
      icon: I(<><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M8 6l1.5-2h5L16 6" /></>) },
    { label: 'Film & Video', sub: ['Geschichten bewegen.', 'Emotionen erzeugen.'], angle: 45, align: 'l',
      icon: I(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10 9l5 3-5 3V9z" /></>) },
    { label: 'Webdesign', sub: ['Digital erlebbar machen.', 'Funktion trifft Ästhetik.'], angle: 90, align: 'cb',
      icon: I(<><rect x="3" y="4" width="18" height="13" rx="2" /><path d="M8 21h8M12 17v4" /></>) },
    { label: '3D & Visualisierung', sub: ['Komplexes vereinfachen.', 'Produkte zum Leben erwecken.'], angle: 135, align: 'r',
      icon: I(<><path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" /><path d="M12 12l9-5M12 12v10M12 12L3 7" /></>) },
    { label: 'Technologie', sub: ['Erlebnisse entwickeln.', 'Stabil. Schnell. Sicher.'], angle: 180, align: 'r',
      icon: I(<><path d="M8 8l-4 4 4 4M16 8l4 4-4 4" /></>) },
    { label: 'Identität', sub: ['Marke formen.', 'Charakter zeigen.'], angle: 225, align: 'r',
      icon: I(<><path d="M12 2l4.5 6L12 22 7.5 8 12 2z" /><path d="M7.5 8h9" /></>) },
]

const R = 34 // Radius der Icon-Positionen in % der Stage
const PLACED = NODES.map((n) => {
    const a = n.angle * (Math.PI / 180)
    return { ...n, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
})

export default function LeistungenSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="system" ref={ref} className="a2 sysr">
            <div className="sysr-head reveal" data-reveal>
                <p className="a2-eye">| Weitere Kompetenzfelder</p>
                <p className="sysr-title sysr-lead">
                    Alles, was an den drei Bereichen hängt — im selben System gedacht,
                    nicht als Liste einzeln zugekaufter Gewerke.
                </p>
            </div>

            <div className="sysr-stage">
                <svg className="sysr-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                    {PLACED.map((n, i) => (
                        <line
                            key={n.label}
                            x1="50" y1="50" x2={n.x} y2={n.y}
                            style={{ ['--d' as string]: `${0.25 + i * 0.1}s` } as React.CSSProperties}
                        />
                    ))}
                </svg>

                <span className="sysr-ring" aria-hidden="true" />

                <div className="sysr-center">
                    <span className="sysr-badge">
                        <Image src="/logo/logo_LM_white_box.svg" alt="LinderMedia" width={52} height={51} />
                    </span>
                </div>

                {PLACED.map((n, i) => (
                    <div
                        key={n.label}
                        className={`sysr-node sysr-node-${n.align} reveal`}
                        data-reveal
                        style={{ left: `${n.x}%`, top: `${n.y}%`, ['--d' as string]: `${0.3 + i * 0.1}s` } as React.CSSProperties}
                    >
                        <span className="sysr-ic">{n.icon}</span>
                        <span className="sysr-lbl">
                            <span className="sysr-name">{n.label}</span>
                            <span className="sysr-sub">{n.sub[0]}<br />{n.sub[1]}</span>
                        </span>
                    </div>
                ))}
            </div>
        </section>
    )
}
