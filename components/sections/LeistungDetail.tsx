'use client'

import useReveal from '@/components/useReveal'
import type { LeistungsPunkt } from '@/lib/leistungen'

/**
 * Editorial-Detailbereich statt Kachelraster: erklaert die Einzeldisziplinen
 * aus dem Leistungssystem als Fliesstext-Abschnitte statt als Karten (Auftrag
 * Umbau Leistungsseiten, Punkt 9–11).
 *
 * Nicht jede Disziplin bekommt gleich viel Raum (Punkt 11): Eintraege mit
 * `text` laufen als grosser, numerierter Abschnitt in einer von drei
 * Layout-Varianten (rhythmischer Wechsel statt "Text/Text/Text"), Eintraege
 * ohne `text` werden zu kompakten Sammelzeilen gebuendelt statt einzeln eine
 * fast leere Sektion zu tragen. Woher `text` fehlt: siehe lib/leistungen.ts –
 * hier wird nichts nachtraeglich erfunden, nur was an Fliesstext vorhanden
 * ist, bekommt die grosse Buehne.
 *
 * Die duenne orange Linie zwischen den vollen Abschnitten (Punkt 12) ist eine
 * Fortsetzung der Linie aus LeistungSystem – sparsam, nur zwischen den
 * gewichtigen Abschnitten, nicht bei jeder Kompakt-Zeile.
 */

type Eintrag = LeistungsPunkt

const VARIANTEN = ['led-a', 'led-b', 'led-c'] as const

function VollAbschnitt({
    nr, eintrag, variante, mitLinie,
}: {
    nr: number
    eintrag: Eintrag
    variante: (typeof VARIANTEN)[number]
    mitLinie: boolean
}) {
    const ref = useReveal<HTMLElement>({ threshold: 0.3 })

    return (
        <article className={`led-voll ${variante}${mitLinie ? ' led-mit-linie' : ''} reveal`} data-reveal ref={ref}>
            <p className="led-nr">{String(nr).padStart(2, '0')}</p>
            <h3 className="led-titel">{eintrag.name}</h3>
            {eintrag.text && <p className="led-text">{eintrag.text}</p>}
        </article>
    )
}

function KompaktZeile({ eintraege }: { eintraege: Eintrag[] }) {
    const ref = useReveal<HTMLDivElement>({ threshold: 0.3 })
    return (
        <div className="led-kompakt reveal" data-reveal ref={ref}>
            {eintraege.map((e) => (
                <span className="led-kompakt-item" key={e.name}>{e.name}</span>
            ))}
        </div>
    )
}

export default function LeistungDetail({
    index,
    titel,
    eintraege,
}: {
    index: string
    titel: string
    eintraege: Eintrag[]
}) {
    const sectionRef = useReveal<HTMLElement>({ threshold: 0.1 })

    // Aufeinanderfolgende Eintraege ohne Text zu einer Sammelzeile buendeln,
    // statt jedem eine eigene (fast leere) Sektion zu geben.
    const bloecke: (
        | { art: 'voll'; nr: number; eintrag: Eintrag }
        | { art: 'kompakt'; eintraege: Eintrag[] }
    )[] = []
    let laufendKompakt: Eintrag[] = []
    let vollZaehler = 0

    const flush = () => {
        if (laufendKompakt.length > 0) {
            bloecke.push({ art: 'kompakt', eintraege: laufendKompakt })
            laufendKompakt = []
        }
    }

    eintraege.forEach((e) => {
        if (e.text) {
            flush()
            vollZaehler += 1
            bloecke.push({ art: 'voll', nr: vollZaehler, eintrag: e })
        } else {
            laufendKompakt.push(e)
        }
    })
    flush()

    const vollGesamt = bloecke.filter((b) => b.art === 'voll').length

    return (
        <section className="csx csx-chapter csx-wide led" ref={sectionRef}>
            <div className="csx-inner">
                <div className="csx-body lst-body">
                    <p className="csx-num reveal" data-reveal>
                        {index}
                        <span className="csx-num-rule" aria-hidden="true" />
                    </p>
                    <h2 className="csx-h2 reveal" data-reveal>{titel}</h2>

                    <div className="led-liste">
                        {bloecke.map((b, i) =>
                            b.art === 'voll' ? (
                                <VollAbschnitt
                                    key={b.eintrag.name}
                                    nr={b.nr}
                                    eintrag={b.eintrag}
                                    variante={VARIANTEN[(b.nr - 1) % VARIANTEN.length]}
                                    mitLinie={b.nr < vollGesamt}
                                />
                            ) : (
                                <KompaktZeile key={`kompakt-${i}`} eintraege={b.eintraege} />
                            ),
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
