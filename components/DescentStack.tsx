'use client'

import { useEffect, useRef, useState } from 'react'
import useReveal from '@/components/useReveal'
import HeroSplitBoxes from '@/components/HeroSplitBoxes'

/**
 * Der Abstieg als durchlaufende Kette.
 *
 * Frueher waren das vier fixierte Szenen im TextLayer, die einander
 * ueberblendet haben – immer nur eine sichtbar. Jetzt laufen die Karten
 * mittig durch das Bild und sind mit einer senkrechten Linie verbunden:
 * die Reihenfolge wird als Weg lesbar statt als Folge von Einzelbildern.
 *
 * Die Karten liegen absolut im Abstiegs-Driver (`#video-scroll`), damit sie
 * an den richtigen Stellen der Eisberg-Sequenz stehen. `top` ist so gesetzt,
 * dass die erste Karte genau dort steht, wo die Wasserlinie durchs Bild zieht
 * (Frames ~51–72). Wer hier verschiebt, prueft die Szenenzeiten in
 * TextLayer.tsx mit – „erkenntnis" laeuft dort bis 196vh.
 */

type Station = {
    id: string
    kicker?: string
    title: React.ReactNode
    text: string
    /**
     * Vier Fragen als eigener Grad zwischen den Absätzen – kein Fließtext.
     * Nur die erste Karte trägt sie: Sie sind der Kern der Aussage, nicht ihre
     * Ausschmückung.
     */
    fragen?: string[]
    /** Zweiter Absatz nach dem Zwischengrad. */
    nachsatz?: string
    /** Der Satz, auf den die Karte hinausläuft – abgesetzt in der Akzentfarbe. */
    schluss?: string
}

const STATIONS: Station[] = [
    {
        /* Steht genau dort, wo die Wasserlinie durchs Bild zieht: die Spitze
           trennt sich sichtbar von der Masse darunter. Deshalb liegt hier „Die
           meisten sehen nur die Spitze" und nicht mehr im fixierten TextLayer
           über Wasser – Bild und Aussage fallen so zusammen. */
        id: 'spitze',
        kicker: 'Die Wahrnehmung',
        title: <>Die meisten sehen<br /><strong>nur die Spitze.</strong></>,
        text: 'Websites. Logos. Kampagnen. Social Media. Alles, was eine Marke sichtbar macht, ist nur der Teil, den Menschen am Ende wahrnehmen. Darunter liegen die Entscheidungen, die diesen Auftritt tragen:',
        fragen: [
            'Wofür steht das Unternehmen?',
            'Für wen ist es relevant?',
            'Was macht es anders?',
            'Warum sollte jemand genau hier kaufen, anfragen oder bleiben?',
        ],
        nachsatz: 'Erst wenn diese Fragen klar sind, kann Gestaltung mehr sein als Oberfläche.',
    },
    {
        id: 'problem',
        kicker: 'Das eigentliche Problem',
        title: <>Wenn die Leistung besser ist<br /><strong>als ihre Wahrnehmung.</strong></>,
        text: 'Viele Unternehmen sind in ihrer Sache hervorragend und werden von außen trotzdem nicht so wahrgenommen. Der Wettbewerb sieht ähnlich aus, die Website erklärt zu viel oder zu wenig, Marketing bringt Aufmerksamkeit, aber nicht die richtigen Anfragen. Das Problem liegt dann selten in der Leistung selbst – sondern darin, dass sie nicht klar genug sichtbar wird.',
        schluss: 'Genau diese Lücke schließen wir.',
    },
    {
        id: 'markenpraesenz',
        title: 'Markenpräsenz',
        text: 'Website, Fotografie, Film, Video und 3D machen sichtbar, was eine Marke nach außen trägt.',
    },
    {
        id: 'design',
        title: 'Design',
        text: 'Design gibt einer klaren Richtung Charakter – in Gestaltung, Sprache und Bildwelt.',
    },
    {
        id: 'strategie',
        title: 'Strategie',
        text: 'Hier beginnt alles: Wofür stehen Sie? Wen wollen Sie erreichen? Und warum sollen Kunden sich für Sie entscheiden?',
    },
]

export default function DescentStack() {
    return (
        <>
            {/* Ab der Wende wird der Hintergrund weichgezeichnet – dieselbe
                Behandlung wie im Prozessbereich darunter, damit die grosse
                Zeile darauf lesbar bleibt. */}
            <div className="dsc-veil" aria-hidden="true" />
            <Chain />
        </>
    )
}

function Chain() {
    return (
        <div className="dsc" aria-label="Der Abstieg: von der Wahrnehmung zur Strategie">
            <div className="dsc-chain">
                <Pfad />
                <HeroSplitBoxes />
                {STATIONS.map((s) => (
                    <Card key={s.id} station={s} />
                ))}
            </div>
            <Turn />
        </div>
    )
}

/**
 * Der Weg durch den Abstieg – eine maeandrierende Linie, die jeden Wegpunkt
 * tatsaechlich trifft.
 *
 * Die Kurve wird nicht fest gesetzt, sondern aus den Positionen der Wegpunkte
 * gerechnet: Die Karten verteilen sich ueber `space-between` und sind
 * unterschiedlich hoch, ihre Abstaende haengen also von Viewport und
 * Textumbruch ab. Eine fest notierte Kurve lief deshalb neben den Punkten her.
 *
 * Zwischen je zwei Punkten sitzt ein Bogen, dessen Kontrollpunkt abwechselnd
 * nach links und rechts ausholt; an den Punkten selbst liegt die Linie wieder
 * in der Mitte. Vor dem ersten und nach dem letzten Punkt laeuft sie noch ein
 * Stueck weiter und verliert sich – der Weg fuehrt weiter, statt abzubrechen.
 */
const MITTE = 50
const AUSSCHLAG = 17

function Pfad() {
    const ref = useRef<SVGSVGElement>(null)
    const [d, setD] = useState('')

    useEffect(() => {
        const berechnen = () => {
            const svg = ref.current
            const kette = svg?.parentElement
            if (!svg || !kette) return

            const kr = kette.getBoundingClientRect()
            if (kr.height === 0) return
            const punkte = [...kette.querySelectorAll('.dsc-node')].map((n) => {
                const r = n.getBoundingClientRect()
                return ((r.top + r.height / 2 - kr.top) / kr.height) * 1000
            })
            if (punkte.length < 2) return

            // Auslauf oben: vor dem ersten Punkt
            let pfad = `M${MITTE},${(punkte[0] - 60).toFixed(1)}`
            pfad += ` L${MITTE},${punkte[0].toFixed(1)}`

            punkte.slice(1).forEach((y, i) => {
                const vorher = punkte[i]
                const mitteY = (vorher + y) / 2
                const x = i % 2 === 0 ? MITTE - AUSSCHLAG : MITTE + AUSSCHLAG
                pfad += ` Q${x},${mitteY.toFixed(1)} ${MITTE},${y.toFixed(1)}`
            })

            // Auslauf unten: weiter Richtung Wende
            const letzter = punkte[punkte.length - 1]
            pfad += ` Q${MITTE - 8},${(letzter + 90).toFixed(1)} ${MITTE},${(letzter + 170).toFixed(1)}`

            setD(pfad)
        }

        berechnen()
        // Die Kartenhoehen haengen am Textumbruch – bei Groessenaenderung neu rechnen.
        const ro = new ResizeObserver(berechnen)
        if (ref.current?.parentElement) ro.observe(ref.current.parentElement)
        window.addEventListener('resize', berechnen)
        return () => {
            ro.disconnect()
            window.removeEventListener('resize', berechnen)
        }
    }, [])

    return (
        <svg
            ref={ref}
            className="dsc-path"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="dsc-verlauf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
                    <stop offset="7%" stopColor="#ff6b35" stopOpacity="0.9" />
                    <stop offset="88%" stopColor="#ff6b35" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                </linearGradient>
            </defs>
            {d && (
                <path
                    d={d}
                    fill="none"
                    stroke="url(#dsc-verlauf)"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                />
            )}
        </svg>
    )
}

function Card({ station }: { station: Station }) {
    const ref = useReveal<HTMLElement>({ threshold: 0.3 })
    return (
        <article ref={ref} className="dsc-card reveal">
            {/* Wegpunkt: dort, wo der Pfad die Etappe erreicht. */}
            <span className="dsc-node" aria-hidden="true" />
            {station.kicker && <p className="dsc-kicker">{station.kicker}</p>}
            <h2 className="dsc-title">{station.title}</h2>
            <p className="dsc-text">{station.text}</p>
            {station.fragen && (
                <ul className="dsc-fragen">
                    {station.fragen.map((f) => <li key={f}>{f}</li>)}
                </ul>
            )}
            {station.nachsatz && <p className="dsc-text">{station.nachsatz}</p>}
            {station.schluss && <p className="dsc-schluss">{station.schluss}</p>}
        </article>
    )
}

/**
 * Die Wende am tiefsten Punkt – zentral nach der Strategie und unmittelbar vor
 * dem Prozessbereich. Sie traegt die Aussage, der Scroller darunter zeigt, wie
 * sie praktisch aussieht.
 *
 * Stand frueher als eigene Sektion mit dunklem Kasten hinter dem Aufstieg.
 * Jetzt dieselbe Typografie (`.wende-*`), aber ohne Hintergrund: der Eisberg
 * laeuft dahinter durch. Die Kette endet eine Etappe vorher – die Wende gehoert
 * dem Bild, nicht der Reihe.
 */
function Turn() {
    const ref = useReveal<HTMLDivElement>({ threshold: 0.4 })
    return (
        <div ref={ref} className="dsc-turn reveal">
            <p className="dsc-turn-eye">Der Weg zur Wirkung</p>
            <h2 className="wende-head">
                Von Chaos<br /><strong>zu Charakter.</strong>
            </h2>
            <p className="wende-lead">
                Wir schaffen Klarheit, Identität und visuelle Wirkung.
            </p>
            <p className="wende-claim">
                Weniger Lärm. <strong>Mehr Wirkung.</strong>
            </p>
        </div>
    )
}
