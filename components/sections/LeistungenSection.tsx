'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'

/**
 * Radiale System-Grafik: LinderMedia im Zentrum, die vier Bereiche ringförmig
 * darum, über feine gepunktete Linien verbunden. Beim Scrollen faden Linien und
 * Nodes ruhig nacheinander ein. Erklärt Zusammenhänge, nicht Leistungen.
 * Mobil: gestapeltes Raster (keine Linien).
 *
 * Frueher standen hier acht Einzeldisziplinen (Fotografie, Film & Video,
 * Webdesign, 3D, Technologie, Identität …), dann drei gebuendelte Bereiche
 * (Strategie/Design/Markenpraesenz). Jetzt vier, angeglichen an die vier
 * Stufen von /leistungen (Klarheit/Charakter/Praesenz/Wirkung – hier mit den
 * erzaehlerischeren Namen der Startseite). Die Knoten sind deshalb Links: sie
 * ersetzen LeistungenLinks als einzigen Klickpfad von der Startseite zu den
 * neun Einzeldisziplinen, verweisen aber nur auf die Stufen-Abschnitte, nicht
 * auf jede Einzelseite – dieselbe Flughoehe wie die Grafik selbst.
 *
 * Traegt keine eigene Kopfzeile mehr – die steht jetzt in LeistungenIntro.tsx
 * als eigener Block darueber (Headline + Fliesstext statt Grafik). Diese
 * Sektion sitzt danach neben UspSection ("Handschrift") in einem eigenen,
 * zweiten Block (siehe app/page.tsx, `.a2-duo-grid`).
 */
type Align = 'ct' | 'cb' | 'l' | 'r'
type Node = { label: string; claim: string; bundle: string; href: string; angle: number; align: Align; icon: JSX.Element }

const I = (d: JSX.Element) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {d}
    </svg>
)

const NODES: Node[] = [
    // Gleichmaessig verteilt: 90 Grad zwischen den Knoten, im Uhrzeigersinn in
    // der Reihenfolge des tatsaechlichen Ablaufs (oben → rechts → unten →
    // links) – wer der Linie folgt, liest den Prozess. Jede Ebene traegt ihren
    // Satz und darunter, kleiner, was in ihr gebuendelt ist. Ein Erklaertext
    // dazwischen stand hier auch schon; er machte die Etiketten zu schwer und
    // ist bewusst wieder raus.
    { label: 'Strategie', claim: 'Gibt Richtung.',
      bundle: 'Positionierung · Zielgruppe · Botschaft · Markenarchitektur',
      href: '/leistungen#klarheit',
      angle: -90, align: 'ct',
      icon: I(<><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 1v3M12 20v3M1 12h3M20 12h3" /></>) },
    { label: 'Charakter', claim: 'Gibt Form.',
      bundle: 'Corporate Design · Art Direction · Identität · Bildwelt',
      href: '/leistungen#charakter',
      angle: 0, align: 'l',
      icon: I(<><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" /></>) },
    { label: 'Markenpräsenz', claim: 'Macht sichtbar.',
      bundle: 'Website · Fotografie · Film & Video · 3D-Visualisierung',
      href: '/leistungen#praesenz',
      angle: 90, align: 'cb',
      icon: I(<><path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" /><circle cx="12" cy="12" r="3" /></>) },
    { label: 'Wirkung', claim: 'Bringt Ergebnisse.',
      bundle: 'SEO · Content · Marketing · Automatisierung',
      href: '/leistungen#wirkung',
      angle: 180, align: 'r',
      icon: I(<><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>) },
]

const R = 42 // Radius der Icon-Positionen in % der Stage.
const PLACED = NODES.map((n) => {
    const a = n.angle * (Math.PI / 180)
    return { ...n, x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) }
})

/**
 * Verbindung fuer das gestapelte Mobil-Layout: Badge und Icon-Kreise liegen
 * dort auf verschiedenen Achsen (Badge horizontal zentriert, Icons folgen dem
 * Textblock) – ohne Linie wirken sie wie lose Kreise ohne Zusammenhang.
 *
 * Wie ein Baumdiagramm: die Linie laeuft nur in den Luecken zwischen den
 * Kreisen, von der Unterkante des einen zur Oberkante des naechsten – nicht
 * durch die Icons hindurch. Dafuer aus den tatsaechlichen Rechtecken von
 * Badge und Icons gemessen (Positionen haengen vom Textumbruch der Labels ab
 * und stehen erst nach dem Layout fest, gleiches Prinzip wie `Pfad` in
 * DescentStack.tsx). Nur ueber CSS auf den gestapelten Breakpoint beschraenkt
 * (siehe `.sysr-mpath`); im radialen Desktop-Layout uebernehmen weiterhin die
 * gepunkteten `.sysr-lines`.
 */
function MobilPfad() {
    const ref = useRef<SVGSVGElement>(null)
    const [d, setD] = useState('')

    useEffect(() => {
        const berechnen = () => {
            const svg = ref.current
            const stage = svg?.parentElement
            if (!svg || !stage) return
            const kr = stage.getBoundingClientRect()
            if (kr.width === 0 || kr.height === 0) return

            const anker = [stage.querySelector('.sysr-badge'), ...stage.querySelectorAll('.sysr-ic')]
                .filter((el): el is Element => !!el)
                .map((el) => {
                    const r = el.getBoundingClientRect()
                    return {
                        cx: ((r.left + r.width / 2 - kr.left) / kr.width) * 100,
                        top: ((r.top - kr.top) / kr.height) * 100,
                        bottom: ((r.bottom - kr.top) / kr.height) * 100,
                    }
                })
            if (anker.length < 2) return

            // Nur die Strecke zwischen Unterkante und naechster Oberkante –
            // jedes Paar ein eigenes Segment, damit keine Linie ueber einen
            // Kreis hinweg zum uebernaechsten laeuft.
            const segmente = anker.slice(1).map((b, i) => {
                const a = anker[i]
                return `M${a.cx.toFixed(1)},${a.bottom.toFixed(1)} L${b.cx.toFixed(1)},${b.top.toFixed(1)}`
            })
            setD(segmente.join(' '))
        }

        berechnen()
        const ro = new ResizeObserver(berechnen)
        if (ref.current?.parentElement) ro.observe(ref.current.parentElement)
        window.addEventListener('resize', berechnen)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', berechnen)
        }
    }, [])

    return (
        <svg ref={ref} className="sysr-mpath" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
                <linearGradient id="sysr-verlauf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0.35" />
                </linearGradient>
            </defs>
            {d && (
                <path
                    d={d}
                    fill="none"
                    stroke="url(#sysr-verlauf)"
                    strokeWidth="1.4"
                    strokeDasharray="1.3 3.6"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                />
            )}
        </svg>
    )
}

export default function LeistungenSection() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section id="system" ref={ref} className="a2 sysr">
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
                <MobilPfad />

                <span className="sysr-ring" aria-hidden="true" />

                <div className="sysr-center">
                    <span className="sysr-badge">
                        <Image src="/logo/logo_LM_white_box.svg" alt="LinderMedia" width={52} height={51} />
                    </span>
                </div>

                {PLACED.map((n, i) => (
                    <Link
                        key={n.label}
                        href={n.href}
                        className={`sysr-node sysr-node-${n.align} reveal`}
                        data-reveal
                        style={{ left: `${n.x}%`, top: `${n.y}%`, ['--d' as string]: `${0.3 + i * 0.1}s` } as React.CSSProperties}
                    >
                        <span className="sysr-ic">{n.icon}</span>
                        <span className="sysr-lbl">
                            <span className="sysr-name">{n.label}</span>
                            <span className="sysr-claim">{n.claim}</span>
                            <span className="sysr-bundle">{n.bundle}</span>
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    )
}
