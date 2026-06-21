'use client'

import { useEffect, useRef, useState } from 'react'

const TOTAL_VH = 1200
const END_VH   = 1060
const CX = 500, CY = 320, R_CENTER = 65, R_SAT = 222

function rad(deg: number) { return deg * Math.PI / 180 }

function nodeOp(vh: number, start: number): number {
    const fi = 14, fo = 28
    if (vh < start) return 0
    if (vh < start + fi) return (vh - start) / fi
    if (vh > END_VH) return 0
    if (vh > END_VH - fo) return (END_VH - vh) / fo
    return 1
}

const CENTER_START = 820
const ITEMS = [
    { label: 'SEO',             lines: ['Gefunden', 'werden.'],         angle: -90,  r: 52,  start: 834 },
    { label: 'Google Ads',      lines: ['Gezielt sichtbar', 'werden.'], angle: -30,  r: 68,  start: 848 },
    { label: 'Web Design',      lines: ['Vertrauen', 'schaffen.'],      angle: 30,   r: 57,  start: 862 },
    { label: 'Content',         lines: ['Relevanz', 'aufbauen.'],       angle: 90,   r: 63,  start: 876 },
    { label: 'Automatisierung', lines: ['Prozesse', 'skalieren.'],      angle: 150,  r: 74,  start: 890 },
    { label: 'Leads',           lines: ['Anfragen', 'erzeugen.'],       angle: 210,  r: 48,  start: 904 },
]

export default function SichtbarkeitOverlay() {
    const wrapRef   = useRef<HTMLDivElement>(null)
    const centerRef = useRef<SVGGElement>(null)
    const nodeRefs  = useRef<(SVGGElement | null)[]>(Array(6).fill(null))
    const lineRefs  = useRef<(SVGLineElement | null)[]>(Array(6).fill(null))
    const [hov, setHov] = useState<number | null>(null)

    useEffect(() => {
        function update() {
            const scrollEl = document.getElementById('video-scroll')
            const driverH  = scrollEl ? scrollEl.offsetHeight : window.innerHeight * TOTAL_VH
            const vh       = (window.scrollY / driverH) * TOTAL_VH
            const wrap     = wrapRef.current
            if (!wrap) return

            const cOp = nodeOp(vh, CENTER_START)
            wrap.style.opacity       = cOp > 0 ? '1' : '0'
            wrap.style.visibility    = cOp > 0 ? 'visible' : 'hidden'
            wrap.style.pointerEvents = cOp > 0 ? 'auto' : 'none'

            if (centerRef.current) centerRef.current.style.opacity = String(cOp)

            ITEMS.forEach((item, i) => {
                const op = nodeOp(vh, item.start)
                const nEl = nodeRefs.current[i]
                const lEl = lineRefs.current[i]
                if (nEl) nEl.style.opacity = String(op)
                if (lEl) lEl.style.opacity = String(Math.min(op, cOp))
            })
        }

        window.addEventListener('scroll', update, { passive: true })
        update()
        return () => window.removeEventListener('scroll', update)
    }, [])

    return (
        <div
            ref={wrapRef}
            className="sichtbarkeit-overlay"
            style={{
                position: 'fixed', inset: 0, zIndex: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, visibility: 'hidden', pointerEvents: 'none',
            }}
        >
            <style>{`
                @keyframes pulse-ring {
                    0%   { r: 78; opacity: 0.55; }
                    70%  { r: 105; opacity: 0; }
                    100% { r: 105; opacity: 0; }
                }
                @keyframes pulse-ring2 {
                    0%   { r: 78; opacity: 0.3; }
                    70%  { r: 120; opacity: 0; }
                    100% { r: 120; opacity: 0; }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                @keyframes float-node-0 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
                @keyframes float-node-1 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
                @keyframes float-node-2 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-3px); } }
                @keyframes float-node-3 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
                @keyframes float-node-4 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
                @keyframes float-node-5 { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
                @keyframes dash-flow {
                    to { stroke-dashoffset: -20; }
                }
                .so-line { animation: dash-flow 1.4s linear infinite; }
                .so-float-0 { animation: float-node-0 4.2s ease-in-out infinite; }
                .so-float-1 { animation: float-node-1 5.1s ease-in-out infinite 0.4s; }
                .so-float-2 { animation: float-node-2 4.6s ease-in-out infinite 0.8s; }
                .so-float-3 { animation: float-node-3 5.4s ease-in-out infinite 0.2s; }
                .so-float-4 { animation: float-node-4 4.8s ease-in-out infinite 1.1s; }
                .so-float-5 { animation: float-node-5 5.0s ease-in-out infinite 0.6s; }
            `}</style>

            <svg
                viewBox="0 0 1000 640"
                style={{ height: '88vh', width: 'auto', maxWidth: '92vw', display: 'block', fontFamily: 'var(--font-barlow), sans-serif' }}
            >
                <defs>
                    {/* Turquoise glow for center */}
                    <filter id="so-glow-center" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="14" result="blur1" />
                        <feFlood floodColor="#00d4b4" floodOpacity="0.7" result="color1" />
                        <feComposite in="color1" in2="blur1" operator="in" result="teal1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
                        <feFlood floodColor="#00d4b4" floodOpacity="0.5" result="color2" />
                        <feComposite in="color2" in2="blur2" operator="in" result="teal2" />
                        <feMerge>
                            <feMergeNode in="teal1" />
                            <feMergeNode in="teal2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Turquoise glow for satellite nodes */}
                    <filter id="so-glow-sat" x="-60%" y="-60%" width="220%" height="220%">
                        <feGaussianBlur stdDeviation="9" result="blur" />
                        <feFlood floodColor="#00d4b4" floodOpacity="0.6" result="color" />
                        <feComposite in="color" in2="blur" operator="in" result="teal" />
                        <feMerge>
                            <feMergeNode in="teal" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Strong turquoise hover glow */}
                    <filter id="so-glow-hov" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="18" result="blur1" />
                        <feFlood floodColor="#00d4b4" floodOpacity="0.85" result="color1" />
                        <feComposite in="color1" in2="blur1" operator="in" result="teal1" />
                        <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur2" />
                        <feFlood floodColor="#00d4b4" floodOpacity="0.6" result="color2" />
                        <feComposite in="color2" in2="blur2" operator="in" result="teal2" />
                        <feMerge>
                            <feMergeNode in="teal1" />
                            <feMergeNode in="teal2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    {/* Radial gradient for center */}
                    <radialGradient id="center-grad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%"   stopColor="#1a5c96" />
                        <stop offset="100%" stopColor="#0a2d52" />
                    </radialGradient>
                    {/* Radial gradient for satellites */}
                    <radialGradient id="sat-grad" cx="40%" cy="35%" r="65%">
                        <stop offset="0%"   stopColor="#143a66" />
                        <stop offset="100%" stopColor="#050f22" />
                    </radialGradient>
                    <radialGradient id="sat-grad-hov" cx="40%" cy="35%" r="65%">
                        <stop offset="0%"   stopColor="#1e5494" />
                        <stop offset="100%" stopColor="#0a2040" />
                    </radialGradient>
                </defs>

                {/* Connection lines — animated dash flow */}
                {ITEMS.map((item, i) => {
                    const dx = Math.cos(rad(item.angle))
                    const dy = Math.sin(rad(item.angle))
                    const sx = CX + R_SAT * dx
                    const sy = CY + R_SAT * dy
                    return (
                        <line
                            key={'l' + i}
                            ref={el => { lineRefs.current[i] = el }}
                            className="so-line"
                            style={{ opacity: 0 }}
                            x1={CX + dx * R_CENTER}
                            y1={CY + dy * R_CENTER}
                            x2={sx - dx * item.r}
                            y2={sy - dy * item.r}
                            stroke="rgba(255,255,255,0.55)"
                            strokeWidth="1.2"
                            strokeDasharray="5 5"
                        />
                    )
                })}

                {/* Center node */}
                <g ref={centerRef} style={{ opacity: 0 }}>
                    {/* Animated pulse rings */}
                    <circle cx={CX} cy={CY} fill="none" stroke="rgba(0,212,180,0.45)" strokeWidth="1.5">
                        <animate attributeName="r"       values="78;112;112" dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0;0"    dur="2.4s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={CX} cy={CY} fill="none" stroke="rgba(0,212,180,0.25)" strokeWidth="1">
                        <animate attributeName="r"       values="78;128;128" dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.35;0;0"   dur="2.4s" begin="0.8s" repeatCount="indefinite" />
                    </circle>
                    {/* Rotating dashed ring */}
                    <circle
                        cx={CX} cy={CY} r={R_CENTER + 16}
                        fill="none"
                        stroke="rgba(0,212,180,0.2)"
                        strokeWidth="1"
                        strokeDasharray="8 6"
                        style={{
                            transformBox: 'fill-box',
                            transformOrigin: 'center',
                            animation: 'spin-slow 18s linear infinite',
                        }}
                    />
                    {/* Solid outer ring */}
                    <circle cx={CX} cy={CY} r={R_CENTER + 8}
                        fill="none" stroke="rgba(0,212,180,0.18)" strokeWidth="8" />
                    {/* Main circle */}
                    <circle cx={CX} cy={CY} r={R_CENTER}
                        fill="url(#center-grad)"
                        filter="url(#so-glow-center)"
                        stroke="rgba(0,212,180,0.85)"
                        strokeWidth="1.8" />
                    <text x={CX} y={CY - 9} textAnchor="middle"
                        fill="#00d4b4" fontSize="13" fontWeight="800" letterSpacing="0.18em">SICHT-</text>
                    <text x={CX} y={CY + 10} textAnchor="middle"
                        fill="#00d4b4" fontSize="13" fontWeight="800" letterSpacing="0.18em">BARKEIT</text>
                </g>

                {/* Satellite nodes */}
                {ITEMS.map((item, i) => {
                    const dx    = Math.cos(rad(item.angle))
                    const dy    = Math.sin(rad(item.angle))
                    const sx    = CX + R_SAT * dx
                    const sy    = CY + R_SAT * dy
                    const isHov = hov === i
                    const fsLbl = item.r < 55 ? 8.5 : item.r > 68 ? 10.5 : 9.5
                    const fsLn  = item.r < 55 ? 9.5  : item.r > 68 ? 12.5 : 11

                    return (
                        <g
                            key={'n' + i}
                            ref={el => { nodeRefs.current[i] = el }}
                            className={`so-float-${i}`}
                            style={{
                                opacity: 0,
                                cursor: 'pointer',
                                transformBox: 'fill-box',
                                transformOrigin: 'center',
                            } as React.CSSProperties}
                            onMouseEnter={() => setHov(i)}
                            onMouseLeave={() => setHov(null)}
                        >
                            {/* Outer ambient glow ring */}
                            <circle cx={sx} cy={sy} r={item.r + 18}
                                fill="none"
                                stroke={isHov ? 'rgba(0,212,180,0.4)' : 'rgba(0,212,180,0.1)'}
                                strokeWidth="14"
                                style={{ transition: 'stroke 0.3s', filter: 'blur(4px)' }} />
                            {/* Hover pulse ring */}
                            {isHov && (
                                <circle cx={sx} cy={sy} fill="none" stroke="rgba(0,212,180,0.5)" strokeWidth="1.5">
                                    <animate attributeName="r"       values={`${item.r};${item.r + 28};${item.r + 28}`} dur="1.2s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.5;0;0" dur="1.2s" repeatCount="indefinite" />
                                </circle>
                            )}
                            {/* Border ring */}
                            <circle cx={sx} cy={sy} r={item.r + 3}
                                fill="none"
                                stroke={isHov ? 'rgba(0,212,180,0.55)' : 'rgba(0,212,180,0.15)'}
                                strokeWidth="1"
                                style={{ transition: 'stroke 0.3s' }} />
                            {/* Main circle */}
                            <circle cx={sx} cy={sy} r={item.r}
                                fill={isHov ? 'url(#sat-grad-hov)' : 'url(#sat-grad)'}
                                filter={isHov ? 'url(#so-glow-hov)' : 'url(#so-glow-sat)'}
                                stroke={isHov ? 'rgba(0,212,180,1)' : 'rgba(0,212,180,0.6)'}
                                strokeWidth={isHov ? 2.5 : 1.5}
                                style={{ transition: 'all 0.25s' }} />
                            {/* Label */}
                            <text x={sx} y={sy - fsLn * 0.85} textAnchor="middle"
                                fill={isHov ? 'rgba(0,212,180,1)' : 'rgba(255,255,255,0.85)'}
                                fontSize={fsLbl} letterSpacing="0.18em" fontWeight="400"
                                style={{ transition: 'fill 0.25s' }}>
                                {item.label.toUpperCase()}
                            </text>
                            {/* Tagline */}
                            <text x={sx} y={sy + fsLn * 0.55} textAnchor="middle"
                                fill="white" fontSize={fsLn} fontWeight="700">
                                {item.lines[0]}
                            </text>
                            <text x={sx} y={sy + fsLn * 1.9} textAnchor="middle"
                                fill="white" fontSize={fsLn} fontWeight="700">
                                {item.lines[1]}
                            </text>
                        </g>
                    )
                })}
            </svg>
        </div>
    )
}
