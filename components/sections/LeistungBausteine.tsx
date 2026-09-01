'use client'

import Link from 'next/link'
import useReveal from '@/components/useReveal'
import type { LeistungsPunkt } from '@/lib/leistungen'

/**
 * Bausteine der Leistungsseiten.
 *
 * Bewusst dieselbe Sprache wie die Fallstudien (`.csx-*`): dunkler Grund,
 * nummerierte Kapitel, gestaffeltes Einblenden über `useReveal`. Eine eigene
 * Gestaltung für die Leistungsseiten hätte einen zweiten Unterseiten-Stil
 * eröffnet – und die Seite lebt davon, dass alles wie dieselbe Marke aussieht.
 *
 * Client-Components nur wegen `useReveal`; die Seite selbst bleibt ein
 * Server-Component, damit Metadaten und Structured Data statisch entstehen.
 */

const PFEIL = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
)

/**
 * Auftakt: Eyebrow, zweizeilige H1, der Einordnungssatz und der Fließtext.
 *
 * Ohne Bild – anders als bei den Fallstudien gibt es hier kein Projektmotiv,
 * das etwas belegen würde. Ein beliebiges Stimmungsbild an dieser Stelle wäre
 * Dekoration, und die Seite argumentiert sonst nirgends damit.
 */
export function LeistungHero({
    eyebrow,
    h1,
    intro,
    text,
}: {
    eyebrow: string
    h1: [string, string]
    intro: string
    text: string[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.1 })

    return (
        <section className="csx csx-chapter csx-wide lst-hero" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-eye lst-eye reveal" data-reveal>{eyebrow}</p>
                    <h1 className="csx-h1 reveal" data-reveal>
                        {h1[0]}<br /><strong>{h1[1]}</strong>
                    </h1>
                    <p className="lst-intro reveal" data-reveal>{intro}</p>
                    {text.map((t) => (
                        <p className="csx-p reveal" data-reveal key={t.slice(0, 24)}>{t}</p>
                    ))}
                </div>
            </div>
        </section>
    )
}

/**
 * Der Leistungsumfang – auf allen neun Seiten dasselbe Kachelraster.
 *
 * Zwei Dichten aus einer Datenquelle, aber EIN Element: Punkte mit Erklärung
 * bekommen die volle Kachel, reine Schlagworte eine kompakte (`--kompakt`).
 * Fläche, Rahmen und die orange Oberkante sind identisch – nur die Textzeile
 * entfällt, wo es keine gibt.
 *
 * Vorher war die zweite Sorte eine Strichliste. Inhaltlich ließ sich das
 * begründen, in der Abfolge der Seiten war es aber schlicht ein Bruch: Wer von
 * der Markenstrategie zum Corporate Design klickt, sieht denselben Abschnitt in
 * einer anderen Form. Erfundene Erklärsätze für 60 Schlagworte wären der
 * schlechtere Weg zur Einheitlichkeit gewesen – die Kachel trägt auch ohne sie.
 */
export function LeistungUmfang({
    index,
    titel,
    punkte,
}: {
    index: string
    titel: string
    punkte: LeistungsPunkt[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.15 })
    const mitText = punkte.some((p) => p.text)

    return (
        <section className="csx csx-chapter csx-wide lst-umfang" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <h2 className="csx-h2 reveal" data-reveal>{titel}</h2>

                    <div className={`lst-karten${mitText ? '' : ' lst-karten--kompakt'}`}>
                        {punkte.map((p, i) => (
                            <div
                                className="lst-karte reveal"
                                data-reveal
                                key={p.name}
                                // Die kompakte Fassung staffelt enger: neun Kacheln
                                // in 0,07er-Schritten liefen sonst über eine halbe
                                // Sekunde nach.
                                style={{ ['--d' as string]: `${0.1 + i * (mitText ? 0.07 : 0.04)}s` } as React.CSSProperties}
                            >
                                {/* Geisterziffer wie in den Schritt-Panels: sie gibt
                                    der Kachel Tiefe, ist aber keine Information –
                                    die Punkte sind nicht durchnummeriert gemeint. */}
                                <span className="lst-karte-nr" aria-hidden="true">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <p className="lst-karte-name">{p.name}</p>
                                {p.text && <p className="lst-karte-text">{p.text}</p>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/**
 * Der Leitgedanke: woran wir uns in dieser Disziplin halten. Steht abgesetzt in
 * der Akzentfarbe – er ist die Antwort, nicht die Herleitung.
 */
export function LeistungLeitgedanke({ headline, text }: { headline: string; text: string }) {
    const ref = useReveal<HTMLElement>({ threshold: 0.2 })

    return (
        <section className="lst-leit" ref={ref}>
            <div className="lst-leit-inner">
                <p className="lst-leit-label reveal" data-reveal>Der Leitgedanke</p>
                <p className="lst-leit-head reveal" data-reveal>{headline}</p>
                <p className="lst-leit-text reveal" data-reveal>{text}</p>
            </div>
        </section>
    )
}

/** Verweisblock: Fallstudien zu dieser Leistung und die übrigen Disziplinen. */
export function LeistungVerweise({
    index,
    cases,
    andere,
}: {
    index: string
    cases: { slug: string; name: string }[]
    andere: { slug: string; name: string }[]
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.12 })

    return (
        <section className="csx csx-chapter csx-wide lst-verweise" ref={ref}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    {cases.length > 0 && (
                        <>
                            <p className="csx-num reveal" data-reveal>
                                {index}
                                <span className="csx-num-rule" aria-hidden="true" />
                            </p>
                            <h2 className="csx-h2 reveal" data-reveal>Wo das zu sehen ist.</h2>
                            <ul className="lst-cases">
                                {cases.map((c, i) => (
                                    <li
                                        className="reveal"
                                        data-reveal
                                        key={c.slug}
                                        style={{ ['--d' as string]: `${0.12 + i * 0.07}s` } as React.CSSProperties}
                                    >
                                        <Link href={`/projekte/${c.slug}`}>
                                            <span>{c.name}</span>{PFEIL}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}

                    <div className="lst-andere reveal" data-reveal>
                        <p className="lst-andere-label">Weitere Leistungen</p>
                        <ul className="lst-andere-liste">
                            {andere.map((a) => (
                                <li key={a.slug}>
                                    <Link href={`/leistungen/${a.slug}`}>{a.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

/** Abschluss: die Frage, der Weg ins Gespräch, der Rückweg zur Startseite. */
export function LeistungOutro({ frage, label }: { frage: string; label: string }) {
    return (
        <nav className="csx-outro lst-outro" aria-label="Weiter auf dieser Seite">
            <p className="lst-outro-frage">{frage}</p>
            <Link href="/#contact" className="csx-cta">
                {label} {PFEIL}
            </Link>
            <Link href="/#leistungen" className="csx-outro-back">
                Zurück zur Übersicht {PFEIL}
            </Link>
        </nav>
    )
}
