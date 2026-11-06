'use client'

import type { CSSProperties, ReactNode } from 'react'
import useReveal from '@/components/useReveal'

/**
 * „Der Weg zur Wirkung“ – von Chaos zu Charakter.
 *
 * Steht direkt nach dem Hero. Vier Schritte, die den Weg von einer unklaren
 * Außendarstellung zur klar positionierten Marke zeigen, darunter eine Leiste
 * mit dem Nutzen. Bewusst ohne Schaltfläche und ohne Bildmaterial.
 *
 * Icons: einheitlicher Linienstil (weiße Kontur, je ein orangefarbener Akzent)
 * im 64er-Raster; sie erben die Strichstärke vom umgebenden SVG.
 */

const W = 'var(--wzw-line)'
const O = 'var(--wzw-orange)'

type Schritt = { titel: string; text: string; icon: ReactNode }

const SCHRITTE: Schritt[] = [
    {
        titel: 'Ordnung schaffen',
        text: 'Komplexes reduzieren, Klarheit gewinnen.',
        icon: (
            <>
                {/* Verworrenes Netz: Knoten, die sich kreuzende Linien verbinden */}
                <path d="M10 18 L30 44 L52 14 L20 36 L50 50 L14 50 Z" stroke={W} />
                <path d="M10 18 L52 14 M30 44 L14 50 M20 36 L52 14" stroke={W} />
                <circle cx="10" cy="18" r="3.2" stroke={W} />
                <circle cx="52" cy="14" r="3.2" stroke={W} />
                <circle cx="14" cy="50" r="3.2" stroke={W} />
                <circle cx="50" cy="50" r="3.2" stroke={W} />
                <circle cx="30" cy="44" r="3.6" stroke={O} />
            </>
        ),
    },
    {
        titel: 'Positionierung schärfen',
        text: 'Den Kern Ihrer Leistung herausarbeiten.',
        icon: (
            <>
                {/* Drei Ebenen übereinander; die oberste ist der Kern */}
                <path d="M32 40 L8 28 L32 16 L56 28 Z" stroke={O} />
                <path d="M8 36 L32 48 L56 36" stroke={W} />
                <path d="M8 44 L32 56 L56 44" stroke={W} />
            </>
        ),
    },
    {
        titel: 'Auftritt gestalten',
        text: 'Website, Inhalte, Foto, Film und Design als starke Einheit.',
        icon: (
            <>
                {/* Monitor mit davorstehendem Smartphone */}
                <rect x="6" y="10" width="42" height="30" rx="3" stroke={W} />
                <path d="M20 50 H34 M27 40 V50" stroke={W} />
                <rect x="42" y="26" width="14" height="26" rx="3" stroke={O} />
                <path d="M47.5 48.5 H50.5" stroke={O} />
            </>
        ),
    },
    {
        titel: 'Wirkung erzielen',
        text: 'Sichtbarkeit erhöhen, Vertrauen stärken und messbar mehr Anfragen.',
        icon: (
            <>
                {/* Wachsende Balken mit Pfeil nach oben rechts */}
                <path d="M8 56 H58" stroke={W} />
                <rect x="10" y="42" width="8" height="14" stroke={W} />
                <rect x="24" y="34" width="8" height="22" stroke={W} />
                <rect x="38" y="24" width="8" height="32" stroke={W} />
                <path d="M12 28 L28 16 L36 20 L54 6 M44 6 H54 V16" stroke={O} />
            </>
        ),
    },
]

const NUTZEN: { label: string; icon: ReactNode }[] = [
    {
        label: 'Klarer Auftritt',
        icon: (
            <>
                <circle cx="32" cy="32" r="22" stroke={W} />
                <circle cx="32" cy="32" r="12" stroke={W} />
                <circle cx="32" cy="32" r="3" stroke={O} />
            </>
        ),
    },
    {
        label: 'Stärkere Marke',
        icon: (
            <>
                <path d="M32 6 L54 14 V32 C54 45 44 54 32 58 C20 54 10 45 10 32 V14 Z" stroke={W} />
                <path d="M32 20 L36 29 L46 30 L38.5 36.5 L41 46 L32 41 L23 46 L25.5 36.5 L18 30 L28 29 Z" stroke={O} />
            </>
        ),
    },
    {
        label: 'Messbare Ergebnisse',
        icon: (
            <>
                <circle cx="32" cy="32" r="22" stroke={W} />
                <path d="M32 10 V32 H54" stroke={W} />
                <path d="M22 40 L30 46 L44 28" stroke={O} />
            </>
        ),
    },
]

function Icon({ children, size }: { children: ReactNode; size: number }) {
    return (
        <svg
            viewBox="0 0 64 64"
            width={size}
            height={size}
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
        >
            {children}
        </svg>
    )
}

export default function ChaosCharakter() {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })
    const d = (i: number): CSSProperties => ({ ['--d' as string]: `${i * 0.1}s` })

    return (
        <section className="wzw" ref={ref} aria-labelledby="wzw-h2">
            <div className="wzw-inner">
                <p className="wzw-eye reveal" data-reveal>| Der Weg zur Wirkung</p>
                <h2 className="wzw-h2 reveal" data-reveal id="wzw-h2">
                    Von Chaos <strong>zu Charakter.</strong>
                </h2>
                <p className="wzw-lead reveal" data-reveal>
                    Gute Leistungen bleiben oft unsichtbar, weil Positionierung, Auftritt und
                    Botschaft nicht zusammenwirken. Wir bringen Ordnung ins Chaos, entwickeln
                    eine klare Identität und machen aus Ihrem Angebot eine starke,
                    unverwechselbare Marke.
                </p>

                <ol className="wzw-steps">
                    {SCHRITTE.map((s, i) => (
                        <li className="wzw-step reveal" data-reveal key={s.titel} style={d(i + 1)}>
                            <span className="wzw-step-ic"><Icon size={64}>{s.icon}</Icon></span>
                            <span className="wzw-step-nr">0{i + 1}</span>
                            <h3 className="wzw-step-h">{s.titel}</h3>
                            <p className="wzw-step-t">{s.text}</p>
                        </li>
                    ))}
                </ol>

                <ul className="wzw-benefits reveal" data-reveal style={d(5)}>
                    {NUTZEN.map((n) => (
                        <li key={n.label}>
                            <Icon size={34}>{n.icon}</Icon>
                            <span>{n.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
