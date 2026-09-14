'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'
import type { Fallstudie } from '@/lib/cases'

/**
 * Die Referenzseite: "Nicht lesen. Schauen." (Umbau-Auftrag Punkt 18).
 *
 * Jede Karte traegt nur, was in Sekunden erfassbar ist: Bild, Name, eine
 * Branche/Leistungs-Zeile, ein Satz, ein Link – die ausfuehrliche Geschichte
 * steht weiterhin auf der bestehenden `/projekte/[slug]`-Seite. Nutzt
 * `.kvframe`/`.kvframe-screen`/`.cm-img` aus dem Projekte-Bereich weiter
 * (randloser Bildrahmen, kein neuer Rahmen-Stil).
 *
 * Leichte editoriale Varianz statt Gleichform (jede dritte Karte ueber die
 * volle Breite) – aber kein Masonry, das waere mehr Effekt als Lesbarkeit.
 */

const PFEIL = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

function ReferenzKarte({ f, gross }: { f: Fallstudie; gross?: boolean }) {
    const ref = useReveal<HTMLElement>({ threshold: 0.15 })

    return (
        <article className={`ref-karte${gross ? ' ref-karte--gross' : ''} reveal`} data-reveal ref={ref}>
            <Link href={f.fallstudie} className="kvframe ref-frame">
                <div className="kvframe-screen">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={f.visual}
                        alt={`${f.name} — Key-Visual: ${f.visualAlt}.`}
                        className="cm-img"
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </Link>
            <div className="ref-meta">
                <p className="ref-name">{f.name}</p>
                <p className="ref-branche">{f.problem}</p>
                <p className="ref-teaser">{f.teaser}</p>
                <Link href={f.fallstudie} className="ref-link">
                    <span>Projekt ansehen</span>
                    {PFEIL}
                </Link>
            </div>
        </article>
    )
}

export default function Referenzen({ projekte }: { projekte: Fallstudie[] }) {
    const heroRef = useReveal<HTMLElement>({ threshold: 0.1 })

    return (
        <>
            <section className="csx csx-chapter csx-wide lst-hero" ref={heroRef}>
                <div className="csx-inner">
                    <div className="csx-body lst-body">
                        <p className="csx-eye lst-eye reveal" data-reveal>Portfolio</p>
                        <h1 className="csx-h1 reveal" data-reveal>Referenzen</h1>
                        <p className="lst-intro reveal" data-reveal>
                            Aus Strategie, Design und digitaler Umsetzung entstehen echte Projekte.
                        </p>
                    </div>
                </div>
            </section>

            <section className="csx csx-chapter csx-wide">
                <div className="csx-inner">
                    <div className="ref-grid">
                        {projekte.map((f, i) => (
                            <ReferenzKarte f={f} gross={i % 3 === 0} key={f.slug} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
