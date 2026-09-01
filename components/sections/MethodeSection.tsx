'use client'

import { Fragment, useEffect, useRef } from 'react'
import Link from 'next/link'
import useVisibleRaf from '@/components/useVisibleRaf'

/**
 * „Der Weg zur Wirkung" – der Prozessbereich am tiefsten Punkt der Reise.
 *
 * Gepinnter Horizontal-Scroller wie die Problem-Sektion, nur in die ANDERE
 * Richtung: der Track startet rechts (Headline + orange Fokuskarte) und wandert
 * beim Herunterscrollen nach rechts, sodass die Schritte von links hereinkommen
 * (row-reverse + umgekehrte Translation).
 *
 * Auf schmalen ODER flachen Viewports greift das nicht: dort wird derselbe
 * Inhalt zu einer schlichten vertikalen Reihenfolge (`.ped-stack`), kein
 * Karussell. Der Pin und die Translation werden dafuer auch im Skript
 * stillgelegt, sonst bekaeme der Container weiter eine gerechnete Hoehe.
 * Siehe STACK_QUERY.
 */

const ARROW = (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

// Vier Schritte, nicht fuenf: Klarheit → Charakter → Praesenz → Wirkung.
//
// Aufbau je Karte: Nummer, Titel, ein Satz Einordnung (`intro`), die Erklaerung
// (`text`), die zugeordneten Leistungen im Fuss und ein Verweis auf die
// zugehoerige Leistungsseite. Der Schritt bleibt damit eine Etappe der Marke
// und wird nicht zur Leistungsbox – die Leistungen stehen bewusst im kleinsten
// Grad ganz unten.
const STEPS = [
    {
        num: '01',
        title: 'Klarheit\nschaffen',
        intro: 'Wofür Sie stehen. Wen Sie erreichen. Warum Sie gewählt werden.',
        text: 'Wir schärfen Positionierung, Zielgruppe, Botschaft und Markenarchitektur – nicht als theoretisches Konzept, sondern als Grundlage für alles, was danach sichtbar wird.',
        services: 'Markenstrategie · Positionierung · Zielgruppen · Botschaften · Markenarchitektur',
        href: '/leistungen/markenstrategie',
        linkLabel: 'Mehr über Markenstrategie',
    },
    {
        num: '02',
        title: 'Charakter\ngestalten',
        intro: 'Eine erkennbare Form für Haltung, Sprache und Bildwelt.',
        text: 'Aus der strategischen Richtung entsteht eine visuelle Identität, die wiedererkennbar ist und über alle Berührungspunkte funktioniert.',
        services: 'Corporate Design · Art Direction · Identität · Bildwelt · Gestaltung',
        href: '/leistungen/corporate-design',
        linkLabel: 'Mehr über Corporate Design',
    },
    {
        num: '03',
        title: 'Präsenz\naufbauen',
        intro: 'Die Marke muss nicht nur existieren. Sie muss sichtbar werden.',
        text: 'Websites, Fotografie, Film, Video und 3D übersetzen die Marke in konkrete Erlebnisse – digital, räumlich und visuell.',
        services: 'Webdesign · Websites · Fotografie · Film & Video · 3D-Visualisierung',
        href: '/leistungen/webdesign',
        linkLabel: 'Mehr über digitale Präsenz',
    },
    {
        num: '04',
        title: 'Wirkung\nverstärken',
        intro: 'Die richtige Botschaft muss die richtigen Menschen erreichen.',
        text: 'Wenn Fundament und Auftritt stimmen, können Marketing, SEO, Content, Ads und Automatisierung darauf aufbauen.',
        services: 'SEO · Content · Marketing · Ads · Automatisierung',
        href: '/leistungen/seo',
        linkLabel: 'Mehr über Sichtbarkeit',
    },
]

/**
 * Wann aus dem Querlauf eine gestapelte Spalte wird.
 *
 * Nicht nur nach Breite: Eine Karte ist mindestens 400px hoch
 * (`.ped-panel { height: clamp(400px, 66vh, 540px) }`), der gepinnte Bereich
 * aber genau 100vh. Auf einem quer gehaltenen Handy (844x390) passt die Karte
 * deshalb nicht in den Ausschnitt und wird oben wie unten abgeschnitten – der
 * Querlauf laeuft zwar, ist aber unlesbar. Unter 620px Hoehe wird darum
 * ebenfalls gestapelt.
 *
 * MUSS mit der Media-Query der `.ped-stack`-Regeln in globals.css
 * uebereinstimmen.
 */
const STACK_QUERY = '(max-width: 768px), (max-height: 620px)'

const splitTitle = (t: string) => t.split('\n').map((l, j) => <span key={j}>{l}<br /></span>)

/**
 * Ein Stueck Weg zwischen zwei Panels – waagerecht, aber mit demselben Schwung
 * wie die senkrechte Kette im Abstieg (siehe `Pfad` in DescentStack.tsx).
 * `hoch` kehrt den Bogen um; im Wechsel gesetzt ergibt das eine durchlaufende
 * Welle statt einer Reihe gerader Striche.
 */
function Wegstueck({ hoch }: { hoch?: boolean }) {
    return (
        <span className="ped-path" aria-hidden="true">
            <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path
                    d={hoch ? 'M0,20 Q50,3 100,20' : 'M0,20 Q50,37 100,20'}
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    )
}

export default function MethodeSection() {
    const pinRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const distanceRef = useRef(0)
    const stackedRef = useRef(false)

    useEffect(() => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track) return

        const layout = () => {
            stackedRef.current = window.matchMedia(STACK_QUERY).matches
            if (stackedRef.current) {
                // Gestapelt bestimmt der Inhalt die Hoehe; eine Restposition aus
                // dem Querlauf wuerde die Spalte sonst seitlich verschieben.
                pin.style.height = ''
                track.style.transform = ''
                return
            }
            distanceRef.current = Math.max(track.scrollWidth - window.innerWidth, 0)
            pin.style.height = `${window.innerHeight + distanceRef.current}px`
        }

        layout()
        window.addEventListener('resize', layout)
        return () => window.removeEventListener('resize', layout)
    }, [])

    // Nur laufen lassen, solange die Strecke in Reichweite ist.
    useVisibleRaf(pinRef, () => {
        const pin = pinRef.current
        const track = trackRef.current
        if (!pin || !track || stackedRef.current) return
        const scrolled = Math.min(Math.max(-pin.getBoundingClientRect().top, 0), distanceRef.current)
        // Gegenrichtung: Start bei -distance (rechtes Ende), wandert nach 0
        track.style.transform = `translate3d(${scrolled - distanceRef.current}px, 0, 0)`
    })

    return (
        <section id="methode" className="ped ped-pinned ped-stack ped-frost" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="ped-pin" ref={pinRef}>
                <div className="ped-sticky">
                    <div className="ped-track ped-track-rev" ref={trackRef}>
                        {/* Headline / Intro (rechts, da row-reverse) */}
                        <div className="ped-headcell ped-headcell-right">
                            {/* Eyebrow und „Von Chaos zu Charakter" stehen jetzt
                                zentral ueber dem Bereich (DescentStack) – hier
                                waere beides eine Wiederholung. */}
                            <h2 className="ped-headline">
                                Wir arbeiten<br /><span>unter der Oberfläche.</span>
                            </h2>
                            <p className="ped-hc-lead">
                                Nicht mit einzelnen Maßnahmen, sondern Schritt für Schritt
                                an dem, was eine Marke klar, erkennbar und wirksam macht.
                            </p>
                            <a className="ped-hc-link" href="#leistungen">
                                <span>Die Lösung</span>{ARROW}
                            </a>
                        </div>

                        {/* Der Weg setzt hier an: vom Einstieg zur Fokuskarte,
                            die den Satz traegt, auf den alles zulaeuft. */}
                        <Wegstueck hoch />

                        {/* Orange Fokuskarte */}
                        <article className="ped-panel ped-accent">
                            <span className="ped-tag">Der Ansatz</span>
                            <h3 className="ped-title">{splitTitle('Ein System,\nkein Zufall.')}</h3>
                            <p className="ped-desc">
                                Strategie, Design und Markenpräsenz greifen ineinander.
                                Was später sichtbar wird, beginnt mit Entscheidungen,
                                die vorher getroffen werden.
                            </p>
                            <a className="ped-arrow" href="#leistungen" aria-label="Die Lösung">{ARROW}</a>
                        </article>

                        {/* Schritte 01–04, durch denselben Pfad verbunden wie die
                            Etappen im Abstieg – hier waagerecht. */}
                        {STEPS.map((s, i) => (
                            <Fragment key={s.num}>
                            <Wegstueck hoch={i % 2 === 1} />
                            <article className="ped-panel ped-glass">
                                <span className="ped-num">{s.num}</span>
                                <h3 className="ped-title">{splitTitle(s.title)}</h3>
                                <p className="ped-quote">{s.intro}</p>
                                <p className="ped-steptext">{s.text}</p>
                                <p className="ped-services">{s.services}</p>
                                <Link className="ped-steplink" href={s.href}>
                                    <span>{s.linkLabel}</span>{ARROW}
                                </Link>
                            </article>
                            </Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
