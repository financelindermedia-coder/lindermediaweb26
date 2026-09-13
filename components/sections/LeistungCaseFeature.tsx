'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'
import type { Fallstudie } from '@/lib/cases'

/**
 * "Das ist die Theorie. Jetzt die Praxis." – ein bis zwei grosse Case-Bloecke
 * statt einer Reihe kleiner Karten (Umbau-Auftrag Leistungsseiten, Punkt 13).
 *
 * Nutzt bewusst NICHT die interaktive CasesSection.tsx der Startseite (Video,
 * Slider, Tastatursteuerung) nach – das waere fuer einen einzelnen, statischen
 * Beleg auf der Leistungsseite ueberdimensioniert. Stattdessen derselbe
 * randlose 16:9-Rahmen (`.kvframe`/`.kvframe-screen`, siehe globals.css), nur
 * mit einem stillen Bild statt Video/Slider – die Bild- und Textdaten kommen
 * aus `lib/cases.ts` (`FALLSTUDIEN`), derselben Quelle wie die Projektliste.
 * Weitere Cases zur Leistung stehen bereits kompakt in `LeistungVerweise`
 * ("Wo das zu sehen ist.") – hier werden nur die ersten ein bis zwei gross
 * gezeigt.
 */
export default function LeistungCaseFeature({
    index,
    cases,
}: {
    index: string
    cases: Fallstudie[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.1 })
    if (cases.length === 0) return null

    return (
        <section className="csx csx-chapter csx-wide lcf" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <h2 className="csx-h2 reveal" data-reveal>
                        Das ist die Theorie.<br />Jetzt die Praxis.
                    </h2>

                    <div className="lcf-liste">
                        {cases.map((c, i) => (
                            <article
                                className="lcf-case reveal"
                                data-reveal
                                key={c.slug}
                                style={{ ['--d' as string]: `${0.1 + i * 0.12}s` } as React.CSSProperties}
                            >
                                <Link href={c.fallstudie} className="kvframe lcf-frame">
                                    <div className="kvframe-screen">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={c.visual}
                                            alt={`${c.name} — Key-Visual: ${c.visualAlt}.`}
                                            className="cm-img"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                    </div>
                                </Link>
                                <div className="lcf-meta">
                                    <p className="lcf-name">{c.name}</p>
                                    <p className="lcf-problem">{c.problem}</p>
                                    <p className="lcf-teaser">{c.teaser}</p>
                                    <Link href={c.fallstudie} className="lcf-link">
                                        <span>Case ansehen</span>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
