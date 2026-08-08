'use client'

import { useMemo, useRef } from 'react'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * Kompass-Overlay für die Orientierung-Section — liegt perspektivisch auf der
 * Wasseroberfläche, synchron zur Videozeit.
 *
 * Bodenpunkt (X = seitlich, Z = Tiefe) → Bildschirm über eine Lochkamera:
 *     sx = CX + F  * X / Z
 *     sy = HORIZON + KV     / Z
 * Damit sitzt der Kompass korrekt verkürzt auf dem Wasser, mittig zum
 * Horizont/Leuchtturm.
 *
 * Ablauf: Der Kompass blendet bei Sekunde 2,5 ein, hält kurz und blendet
 * danach wieder aus – ein kurzer Orientierungs-Moment, kein Dauer-Element.
 * Das Video läuft dabei normal weiter (kein Pausieren).
 */

const ACCENT = '#ff6b35'
const ACCENT_SOFT = '#ffb070'

/* ── Kamera / Projektion (justierbar) ─────────────────────────────────── */
const CX = 960
const HORIZON = 430   // Horizont-/Fluchtpunkthöhe (viewBox 1080), am Video kalibriert
const F = 1000
const KV = 1150
const ZM = 5.2         // Tiefe des Kompass-Bodenpunkts
const Y_OFFSET = 60    // versetzt den Kompass zusätzlich nach unten (viewBox-Einheiten)

const P = (X: number, Z: number): [number, number] => [CX + (F * X) / Z, HORIZON + KV / Z]

/* ── Zeitachse in Sekunden ─────────────────────────────────────────────── */
const T = {
    cIn: [2.5, 3.2],   // Kompass einblenden – ab Sekunde 2,5
    hold: 2.4,         // Sekunden, die er stehen bleibt
    ticks: [2.6, 3.5],
    rose: [2.7, 3.5],
    letters: [2.8, 3.6],
    needle: [2.6, 3.4],
} as const
const OUT_START = T.cIn[1] + T.hold
const OUT_END = OUT_START + 0.8

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const smooth = (t: number) => {
    t = clamp(t)
    return t * t * (3 - 2 * t)
}
const seg = (t: number, a: number, b: number) => smooth((t - a) / (b - a))
const f1 = (n: number) => n.toFixed(1)

type Props = {
    videoRef: React.RefObject<HTMLVideoElement>
    className?: string
}

export default function CompassOverlay({ videoRef, className }: Props) {
    const svgRef = useRef<SVGSVGElement>(null)
    const compassRef = useRef<SVGGElement>(null)
    const ticksRef = useRef<SVGGElement>(null)
    const roseRef = useRef<SVGGElement>(null)
    const needleRef = useRef<SVGGElement>(null)
    const lettersRef = useRef<SVGGElement>(null)

    const geo = useMemo(() => {
        // Lokale Geometrie bezieht sich auf den rohen (unversetzten) Bodenpunkt,
        // damit die Perspektive stimmt; der Y-Offset wird nur auf das finale
        // <g transform> addiert – verschiebt die fertige Gruppe als Ganzes.
        const [ccx0, ccy0] = P(0, ZM)
        const loc = (X: number, Z: number): [number, number] => {
            const [sx, sy] = P(X, Z)
            return [sx - ccx0, sy - ccy0]
        }
        const gp = (alpha: number, r: number) => loc(r * Math.sin(alpha), ZM + r * Math.cos(alpha))
        const D = (deg: number) => (deg * Math.PI) / 180

        // Tickmarks alle 5°, Hauptmarken alle 45°
        const ticks = []
        for (let i = 0; i < 72; i++) {
            const a = (i * 5 * Math.PI) / 180
            const major = (i * 5) % 45 === 0
            const rOut = 0.7
            const rIn = 0.7 - (major ? 0.12 : 0.06)
            const [x1, y1] = gp(a, rOut)
            const [x2, y2] = gp(a, rIn)
            ticks.push({ x1, y1, x2, y2, major, ord: i })
        }

        // Kompassrose – schlanke Kites in Bodenperspektive
        const kite = (alpha: number, len: number, w: number) => {
            const c = gp(0, 0)
            const br = loc(w * Math.cos(alpha), ZM - w * Math.sin(alpha))
            const tp = gp(alpha, len)
            const bl = loc(-w * Math.cos(alpha), ZM + w * Math.sin(alpha))
            return `M${f1(c[0])},${f1(c[1])} L${f1(br[0])},${f1(br[1])} L${f1(tp[0])},${f1(tp[1])} L${f1(bl[0])},${f1(bl[1])} Z`
        }
        const roseMain = [0, 90, 180, 270].map((d) => kite(D(d), 0.8, 0.05)).join(' ')
        const roseDiag = [45, 135, 225, 315].map((d) => kite(D(d), 0.46, 0.028)).join(' ')

        // Buchstaben N/E/S/W – Größe perspektivisch (nah = groß)
        const letters = [
            { ch: 'N', a: 0 },
            { ch: 'E', a: 90 },
            { ch: 'S', a: 180 },
            { ch: 'W', a: 270 },
        ].map(({ ch, a }) => {
            const al = D(a)
            const r = 1.02
            const Z = ZM + r * Math.cos(al)
            const [x, y] = gp(al, r)
            const size = 17 * Math.pow(ZM / Z, 0.85)
            return { ch, x, y, size }
        })

        // nur ein dünner Strich Richtung Norden (statt massiver Nadel)
        const nTip = gp(0, 1.15)
        const nBase = gp(0, 0)

        return {
            center: [ccx0, ccy0 + Y_OFFSET] as [number, number],
            ticks,
            roseMain,
            roseDiag,
            letters,
            north: { x1: nBase[0], y1: nBase[1], x2: nTip[0], y2: nTip[1] },
        }
    }, [])

    /*
     * Nur mitlaufen, solange die Sektion in Reichweite ist. Die Schleife
     * schreibt pro Bild rund achtzig SVG-Attribute an einer weichgezeichneten
     * Gruppe – die Orientierung-Sektion liegt aber ganz am Ende der Seite.
     * Ohne diese Bremse liefe der Aufwand ab dem Seitenaufruf durchgehend mit.
     */
    useVisibleRaf(svgRef, () => {
        const tickEls = ticksRef.current ? (Array.from(ticksRef.current.children) as SVGLineElement[]) : []
        const letterEls = lettersRef.current ? (Array.from(lettersRef.current.children) as SVGTextElement[]) : []
        const [cxs, cys] = geo.center

        const v = videoRef.current
        const t = v ? v.currentTime || 0 : 0

        // Kompass: einblenden ab Sekunde 2,5, kurz halten, wieder ausblenden
        const cVis = 0.72 * seg(t, T.cIn[0], T.cIn[1]) * (1 - seg(t, OUT_START, OUT_END))
        const s = 0.6 + 0.4 * smooth(seg(t, T.cIn[0], T.cIn[1]))
        compassRef.current?.setAttribute('opacity', cVis.toFixed(3))
        compassRef.current?.setAttribute('transform', `translate(${cxs},${cys}) scale(${s.toFixed(3)})`)

        const tk = seg(t, T.ticks[0], T.ticks[1])
        tickEls.forEach((el, i) => {
            el.setAttribute('opacity', clamp((tk - (i / 72) * 0.5) / 0.5).toFixed(3))
        })

        const rp = seg(t, T.rose[0], T.rose[1])
        roseRef.current?.setAttribute('opacity', rp.toFixed(3))
        roseRef.current?.setAttribute('transform', `scale(${(0.5 + 0.5 * rp).toFixed(3)}) rotate(${((1 - rp) * 18).toFixed(2)})`)

        const lpp = seg(t, T.letters[0], T.letters[1])
        letterEls.forEach((el, i) => {
            el.setAttribute('opacity', clamp((lpp - i * 0.12) / 0.5).toFixed(3))
        })

        const np = seg(t, T.needle[0], T.needle[1])
        needleRef.current?.setAttribute('opacity', np.toFixed(3))
    })

    return (
        <svg ref={svgRef} className={className} viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
                <filter id="co-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={ACCENT} floodOpacity="0.55" />
                    <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor={ACCENT} floodOpacity="0.3" />
                </filter>
            </defs>

            <g ref={compassRef} transform={`translate(${geo.center[0]},${geo.center[1]})`} opacity={0}>
                <g ref={needleRef} filter="url(#co-glow)" opacity={0}>
                    <line x1={f1(geo.north.x1)} y1={f1(geo.north.y1)} x2={f1(geo.north.x2)} y2={f1(geo.north.y2)} stroke={ACCENT} strokeWidth={1.5} strokeLinecap="round" />
                </g>

                <g ref={ticksRef} filter="url(#co-glow)">
                    {geo.ticks.map((tk) => (
                        <line
                            key={tk.ord}
                            x1={f1(tk.x1)}
                            y1={f1(tk.y1)}
                            x2={f1(tk.x2)}
                            y2={f1(tk.y2)}
                            stroke={tk.major ? ACCENT : ACCENT_SOFT}
                            strokeWidth={tk.major ? 1.3 : 0.6}
                            opacity={0}
                        />
                    ))}
                </g>

                <g ref={roseRef} filter="url(#co-glow)" opacity={0}>
                    <path d={geo.roseDiag} fill={ACCENT_SOFT} opacity={0.32} />
                    <path d={geo.roseMain} fill={ACCENT} opacity={0.62} />
                </g>

                <g ref={lettersRef} filter="url(#co-glow)" fontFamily="Arial, sans-serif" fontWeight={700} fill={ACCENT} textAnchor="middle" dominantBaseline="middle">
                    {geo.letters.map((l) => (
                        <text key={l.ch} x={f1(l.x)} y={f1(l.y)} fontSize={f1(l.size)} opacity={0}>
                            {l.ch}
                        </text>
                    ))}
                </g>

                <circle r={8} fill="#fff" />
                <circle r={4.5} fill={ACCENT} />
            </g>
        </svg>
    )
}
