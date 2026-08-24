'use client'

import { useRef } from 'react'
import Link from 'next/link'
import useReveal from '@/components/useReveal'
import useVisibleRaf from '@/components/useVisibleRaf'
import { naechsteFallstudie } from '@/lib/cases'

/**
 * Bausteine der Fallstudien-Seiten.
 *
 * Aufbau wie auf der Startseite: nummerierte Kapitel, grossflaechiges Bild,
 * Text auf dunklem Grund. Die Effekte sind dieselben und kommen aus denselben
 * Hooks – `useReveal` fuer das gestaffelte Einblenden, `useVisibleRaf` fuer den
 * Parallax der Bilder. Nichts davon laeuft, solange die Sektion ausserhalb des
 * Viewports steht.
 *
 * Das Bildmaterial stammt aus dem Schnitt-Master des Projektfilms
 * (public/video/N_swath.mp4, Standbilder ueber scripts/to-webp.sh).
 */

/**
 * Sanfter Parallax: Das Bild laeuft langsamer als die Seite.
 *
 * Der Versatz braucht Ueberdeckung, sonst faehrt eine Kante ins Bild – deshalb
 * ist das Bild um `SCALE` groesser als sein Rahmen. Bei reduzierter Bewegung
 * bleibt es stehen; das `scale` bleibt, damit der Bildausschnitt derselbe ist.
 */
const PARALLAX = 54
const SCALE = 1.14

function useParallax<T extends HTMLElement>() {
    const hostRef = useRef<T>(null)
    const imgRef = useRef<HTMLImageElement>(null)

    useVisibleRaf(hostRef, () => {
        const host = hostRef.current
        const img = imgRef.current
        if (!host || !img) return

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            img.style.transform = `scale(${SCALE})`
            return
        }

        const r = host.getBoundingClientRect()
        const vh = window.innerHeight
        // −1, solange die Sektion unter dem Bild steht, +1 darueber, 0 mittig.
        const p = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2)
        const clamped = Math.max(-1, Math.min(1, p))
        img.style.transform = `translate3d(0, ${(clamped * PARALLAX).toFixed(1)}px, 0) scale(${SCALE})`
    })

    return { hostRef, imgRef }
}

/**
 * Bild mit Parallax und Verlaufsmaske – die Maskenrichtung setzt das CSS.
 *
 * `position` steuert den Ausschnitt: Der Rahmen ist annaehernd quadratisch, das
 * Material 16:9 – es wird also seitlich beschnitten. Ausserdem liegt eine Haelfte
 * des Rahmens unter dem Scrim. Wo das Motiv sonst in den abgedunkelten Teil
 * rutscht oder angeschnitten wird, verschiebt `position` es zurueck ins Bild.
 */
function CaseMedia({ src, alt, position }: { src: string; alt: string; position?: string }) {
    const { hostRef, imgRef } = useParallax<HTMLDivElement>()

    return (
        <div className="csx-media" ref={hostRef} aria-hidden={alt === '' ? true : undefined}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={imgRef} src={src} alt={alt} loading="lazy" decoding="async"
                style={position ? { objectPosition: position } : undefined}
            />
            <span className="csx-media-scrim" aria-hidden="true" />
        </div>
    )
}

/**
 * Auftakt der Fallstudie: Bild ueber die volle Breite, die Angaben zum Projekt
 * in einer Glass-Card davor – dasselbe Panel-Muster wie im Leistungsblock der
 * Startseite.
 */
export function CaseHero({
    index,
    kicker,
    headline,
    meta,
    text,
    note,
    leistungen,
    image,
    alt,
}: {
    index: string
    kicker: string
    headline: React.ReactNode
    /** Projektzeile unter der Headline, z. B. „LubriCan · Produktauftritt". */
    meta?: string
    text: string
    /** Abgesetzter Hinweis, etwa zum Archivstatus eines Projekts. */
    note?: string
    /** Leistungszeile im Fuss der Karte – entfaellt, wo der Kicker sie schon traegt. */
    leistungen?: string
    image: string
    alt: string
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.1 })

    return (
        <section className="csx csx-hero" ref={ref}>
            <CaseMedia src={image} alt={alt} />
            <div className="csx-inner">
                <div className="csx-card reveal" data-reveal>
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <p className="csx-eye reveal" data-reveal>{kicker}</p>
                    <h1 className="csx-h1 reveal" data-reveal>{headline}</h1>
                    {meta && <p className="csx-meta reveal" data-reveal>{meta}</p>}
                    <p className="csx-p reveal" data-reveal>{text}</p>
                    {note && <p className="csx-note reveal" data-reveal>{note}</p>}
                    {leistungen && (
                        <p className="csx-leistungen reveal" data-reveal>{leistungen}</p>
                    )}
                </div>
            </div>
        </section>
    )
}

/**
 * Nummeriertes Kapitel. `flip` stellt das Bild nach links und den Text nach
 * rechts – im Wechsel gelesen bleibt die Strecke in Bewegung.
 * `children` steht unter dem Text, dort haengen die Karten der Kapitel 03/04.
 */
export default function CaseChapter({
    index,
    eyebrow,
    headline,
    text,
    image,
    alt,
    imagePosition,
    flip,
    wide,
    children,
}: {
    index: string
    eyebrow: string
    headline: React.ReactNode
    text?: string[]
    image?: string
    alt?: string
    /** Bildausschnitt, falls die Mitte das Motiv nicht trifft (CSS object-position). */
    imagePosition?: string
    flip?: boolean
    /** Kapitel ohne seitliches Bild: Text und Karten laufen ueber die Breite. */
    wide?: boolean
    children?: React.ReactNode
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.15 })

    return (
        <section
            className={`csx csx-chapter${flip ? ' csx-flip' : ''}${wide ? ' csx-wide' : ''}`}
            ref={ref}
        >
            {image && <CaseMedia src={image} alt={alt ?? ''} position={imagePosition} />}
            <div className="csx-inner">
                <div className="csx-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <p className="csx-eye reveal" data-reveal>{eyebrow}</p>
                    <h2 className="csx-h2 reveal" data-reveal>{headline}</h2>
                    {text?.map((t) => (
                        <p className="csx-p reveal" data-reveal key={t.slice(0, 24)}>{t}</p>
                    ))}
                    {children}
                </div>
            </div>
        </section>
    )
}

/** Die drei Saeulen der Positionierung als Karten – Kapitel „Das Fundament". */
export function CasePillars({
    items,
}: {
    items: { icon: JSX.Element; label: string; text: string }[]
}) {
    return (
        <div className="csx-pillars">
            {items.map((it, i) => (
                <div
                    className="csx-pillar reveal"
                    data-reveal
                    key={it.label}
                    style={{ ['--d' as string]: `${0.1 + i * 0.1}s` } as React.CSSProperties}
                >
                    <span className="csx-pillar-ic">{it.icon}</span>
                    <span className="csx-pillar-name">{it.label}</span>
                    <span className="csx-pillar-text">{it.text}</span>
                </div>
            ))}
        </div>
    )
}

/** Karte im Identitaets-Kapitel: Kopfzeile plus freier Inhalt. */
export function CaseTile({
    label,
    span,
    children,
}: {
    label: string
    /** Breitere Kachel im Raster (Farbwelt, Typografie). */
    span?: boolean
    children: React.ReactNode
}) {
    return (
        <div className={`csx-tile reveal${span ? ' csx-tile-span' : ''}`} data-reveal>
            <p className="csx-tile-label">{label}</p>
            <div className="csx-tile-body">{children}</div>
        </div>
    )
}

/**
 * Drei Begriffe als Zeile – die Positionierung auf den Punkt gebracht.
 * Bewusst keine Karten: Es sind Schlagworte, keine Inhalte.
 */
export function CaseTerms({ items }: { items: string[] }) {
    return (
        <p className="csx-terms reveal" data-reveal>
            {items.map((t, i) => (
                <span key={t}>
                    {i > 0 && <span className="csx-terms-dot" aria-hidden="true">·</span>}
                    {t}
                </span>
            ))}
        </p>
    )
}

/**
 * Fokuskarte: der Ansatz des Projekts in einem Satz, in der Akzentfarbe
 * abgesetzt. Steht bewusst neben dem Fliesstext und nicht darin – sie ist die
 * Antwort, nicht die Herleitung.
 */
export function CaseFocus({
    label = 'Der Ansatz',
    headline,
    text,
}: {
    label?: string
    headline: React.ReactNode
    text: string
}) {
    return (
        <div className="csx-focus reveal" data-reveal>
            <p className="csx-focus-label">{label}</p>
            <p className="csx-focus-head">{headline}</p>
            <p className="csx-focus-text">{text}</p>
        </div>
    )
}

/**
 * Platzhalter fuer ein Kapitelbild, zu dem noch kein Material vorliegt.
 *
 * Sichtbar als Platzhalter ausgezeichnet – kein Blindbild, das versehentlich
 * live gehen kann. Format 16:9 wie die echten Bilder, damit sich das Layout
 * beim Einsetzen nicht mehr verschiebt.
 */
export function CaseFigureTodo({ hinweis }: { hinweis: string }) {
    return (
        <div className="csx-figure-todo reveal" data-reveal>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
                 strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <circle cx="8.5" cy="10" r="1.5" />
                <path d="m21 15-5-4-4.5 4.5L9 13l-6 5" />
            </svg>
            <span>{hinweis}</span>
        </div>
    )
}

/**
 * Abschlussnavigation, auf allen Fallstudien gleich: zurueck zur Uebersicht,
 * weiter zur naechsten Fallstudie, oder direkt ins Gespraech. `slug` ist die
 * eigene Seite – daraus ergibt sich die naechste (siehe lib/cases.ts).
 */
export function CaseOutro({ slug }: { slug: string }) {
    const next = naechsteFallstudie(slug)
    const pfeil = (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
             strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
    )

    return (
        <nav className="csx-outro" aria-label="Weiter auf dieser Seite">
            <Link href="/#projekte" className="csx-outro-back">
                Zurück zu allen Arbeiten {pfeil}
            </Link>

            {next && (
                <Link href={`/projekte/${next.slug}`} className="csx-outro-next">
                    <span className="csx-outro-next-label">Weitere Case Study</span>
                    <span className="csx-outro-next-name">{next.name} {pfeil}</span>
                </Link>
            )}

            <Link href="/#contact" className="csx-cta">
                Über Ihr nächstes Projekt sprechen {pfeil}
            </Link>
        </nav>
    )
}

/**
 * Abbildung in voller Spaltenbreite.
 *
 * Bewusst ohne Parallax und ohne Beschnitt: Hier stehen Arbeitsergebnisse wie
 * Geschaeftsausstattung oder Broschuere: Sie sollen vollstaendig zu sehen sein,
 * nicht angeschnitten durch einen formatfuellenden Rahmen. Deshalb behaelt das
 * Bild sein Seitenverhaeltnis und bekommt nur das Einblenden der uebrigen Seite.
 */
export function CaseFigure({
    src,
    alt,
    caption,
    bleed,
}: {
    src: string
    alt: string
    caption?: string
    /**
     * Randlos ueber die Sektionsbreite, Kanten weich ausgeblendet.
     *
     * Fuer Grafiken, die ihren eigenen Hintergrund mitbringen: Gerahmt stehen
     * sie als Kasten in fremder Farbe auf der Seite. Ohne Rahmen und mit
     * auslaufenden Kanten wirken sie wie die grossflaechigen Kapitelbilder.
     */
    bleed?: boolean
}) {
    return (
        <figure className={`csx-figure reveal${bleed ? ' csx-figure--bleed' : ''}`} data-reveal>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} loading="lazy" decoding="async" />
            {caption && <figcaption>{caption}</figcaption>}
        </figure>
    )
}

/**
 * Prozesskette: nummerierte Phasen mit Titel und Zusatz.
 *
 * Fuer Ablaeufe, die den Kern eines Projekts ausmachen – etwa die sieben Phasen
 * eines Refits. Bewusst als eigenes Element statt als Screenshot: So bleibt es
 * in jeder Groesse scharf, traegt die Typografie der Seite und laesst sich
 * pflegen, ohne ein Bild neu zu exportieren.
 */
export function CaseProcess({
    steps,
}: {
    steps: { titel: string; zusatz: string }[]
}) {
    return (
        <ol className="csx-process">
            {steps.map((s, i) => (
                <li
                    className="csx-step reveal"
                    data-reveal
                    key={s.titel}
                    style={{ ['--d' as string]: `${0.08 + i * 0.06}s` } as React.CSSProperties}
                >
                    <span className="csx-step-nr">{String(i + 1).padStart(2, '0')}</span>
                    <span className="csx-step-titel">{s.titel}</span>
                    <span className="csx-step-zusatz">{s.zusatz}</span>
                </li>
            ))}
        </ol>
    )
}

/**
 * Die strategische Wende – der Baustein, der eine Fallstudie von einem
 * Portfolioeintrag unterscheidet.
 *
 * Steht bewusst zwischen Ausgangslage und Umsetzung, in voller Breite und mit
 * eigenem Grund: Hier wird nicht gezeigt, was gemacht wurde, sondern warum es
 * so und nicht anders gemacht wurde. Der Aufbau ist auf allen Fallstudien
 * gleich – erst die Frage, die das Projekt zu beantworten hatte, dann die
 * Entscheidung als Gegensatz („nicht … sondern …"), dann die Begruendung und
 * das, was daraus folgte.
 *
 * Das „nicht" ist keine Abwertung des Kunden, sondern der naheliegende Weg,
 * den fast jeder im Markt geht. Erst dadurch wird die Entscheidung eine.
 */
export function CaseTurn({
    frage,
    nicht,
    sondern,
    begruendung,
    folgen,
    image,
}: {
    /** Die strategische Frage des Projekts – als Frage formuliert, nicht als Aufgabe. */
    frage: React.ReactNode
    /** Der naheliegende Weg, der bewusst nicht gegangen wurde. */
    nicht: React.ReactNode
    /** Die getroffene Entscheidung. */
    sondern: React.ReactNode
    begruendung?: string
    /** Was aus der Entscheidung folgte – die Bruecke in die Umsetzungskapitel. */
    folgen?: string[]
    /** Grossflaechiges Motiv als Grund, stark abgedunkelt. Optional. */
    image?: string
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.12 })

    return (
        <section className="csx-turn" ref={ref}>
            {image && (
                <span
                    className="csx-turn-media"
                    aria-hidden="true"
                    style={{ backgroundImage: `url('${image}')` }}
                />
            )}
            <div className="csx-turn-inner">
                <div className="csx-turn-frage-block">
                    <p className="csx-turn-label reveal" data-reveal>Die strategische Herausforderung</p>
                    <span className="csx-rule csx-rule--left reveal" data-reveal aria-hidden="true" />
                    <p className="csx-turn-frage reveal" data-reveal>{frage}</p>
                </div>

                <div className="csx-turn-entscheidung">
                    <p className="csx-turn-label csx-turn-label--akzent reveal" data-reveal>
                        Die strategische Entscheidung
                    </p>
                    <p className="csx-turn-nicht reveal" data-reveal>
                        <span className="csx-turn-marker">Nicht</span> {nicht}
                    </p>
                    <p className="csx-turn-sondern reveal" data-reveal>
                        <span className="csx-turn-marker">Sondern</span> {sondern}
                    </p>
                    {begruendung && (
                        <p className="csx-turn-text reveal" data-reveal>{begruendung}</p>
                    )}
                    {folgen && folgen.length > 0 && (
                        <ul className="csx-turn-folgen">
                            {folgen.map((f, i) => (
                                <li
                                    className="csx-turn-folge reveal"
                                    data-reveal
                                    key={f.slice(0, 24)}
                                    style={{ ['--d' as string]: `${0.5 + i * 0.07}s` } as React.CSSProperties}
                                >
                                    {f}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    )
}

/**
 * Wirkung: Ziel → Strategie → Massnahmen → Wirkung als eine Kette.
 *
 * Steht im Ergebniskapitel und beantwortet die Frage, die ein Portfolio offen
 * laesst: Was hat sich dadurch veraendert?
 *
 * BEWUSST OHNE KENNZAHLEN. Fuer keines der Projekte liegen belastbare Werte zu
 * Reichweite, Conversion oder Anfragen vor, und eine erfundene Prozentzahl
 * beschaedigt genau die Glaubwuerdigkeit, die diese Seite aufbaut. Die Wirkung
 * ist deshalb qualitativ beschrieben. Sobald echte Zahlen vorliegen, gehoeren
 * sie in `kennzahlen` – der Baustein nimmt sie auf, ohne dass sich das Layout
 * der uebrigen Fallstudien aendert.
 */
export function CaseImpact({
    ziel,
    strategie,
    massnahmen,
    wirkung,
    kennzahlen,
}: {
    ziel: string
    strategie: string
    massnahmen: string[]
    wirkung: string
    /** Belegte Werte, falls vorhanden – z. B. { wert: '+38 %', label: 'Reichweite' }. */
    kennzahlen?: { wert: string; label: string }[]
}) {
    const kette = [
        { label: 'Ziel', text: ziel },
        { label: 'Strategie', text: strategie },
        { label: 'Maßnahmen', text: massnahmen.join(' · ') },
    ]

    return (
        <div className="csx-impact">
            <p className="csx-impact-label reveal" data-reveal>Was sich verändert hat</p>

            <ol className="csx-impact-kette">
                {kette.map((s, i) => (
                    <li
                        className="csx-impact-glied reveal"
                        data-reveal
                        key={s.label}
                        style={{ ['--d' as string]: `${0.14 + i * 0.08}s` } as React.CSSProperties}
                    >
                        <span className="csx-impact-glied-label">{s.label}</span>
                        <span className="csx-impact-glied-text">{s.text}</span>
                    </li>
                ))}
                <li
                    className="csx-impact-glied csx-impact-glied--wirkung reveal"
                    data-reveal
                    style={{ ['--d' as string]: '0.38s' } as React.CSSProperties}
                >
                    <span className="csx-impact-glied-label">Wirkung</span>
                    <span className="csx-impact-glied-text">{wirkung}</span>
                </li>
            </ol>

            {kennzahlen && kennzahlen.length > 0 && (
                <dl className="csx-impact-zahlen reveal" data-reveal>
                    {kennzahlen.map((k) => (
                        <div className="csx-impact-zahl" key={k.label}>
                            <dt className="csx-impact-zahl-wert">{k.wert}</dt>
                            <dd className="csx-impact-zahl-label">{k.label}</dd>
                        </div>
                    ))}
                </dl>
            )}
        </div>
    )
}
