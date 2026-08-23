/**
 * Reihenfolge der Fallstudien.
 *
 * Nur Projekte, zu denen es eine eigene Seite unter /projekte/… gibt – die
 * Projektliste auf der Startseite (components/sections/CasesSection.tsx) fuehrt
 * mehr Arbeiten, aber nicht zu allen existiert eine Fallstudie.
 *
 * Die Reihenfolge steuert die Abschlussnavigation: Jede Fallstudie verweist auf
 * die naechste, die letzte zurueck auf die erste. Ein Ring statt einer Kette –
 * so laeuft niemand ins Leere, egal wo er einsteigt.
 */
export type Fallstudie = {
    slug: string
    /** Wie das Projekt in der Navigation genannt wird. */
    name: string
}

export const FALLSTUDIEN: Fallstudie[] = [
    { slug: 'solar-impact-yacht', name: 'Solar Impact Yacht' },
    { slug: 'novodex', name: 'Novodex' },
    { slug: 'wellenwind', name: 'Wellenwind' },
    { slug: 'marevo', name: 'Marèvo' },
    { slug: 'lubrican', name: 'LubriCan' },
    { slug: 'schaaf-tender', name: 'Schaaf Tender' },
]

/** Die naechste Fallstudie im Ring; `undefined`, wenn der Slug unbekannt ist. */
export function naechsteFallstudie(slug: string): Fallstudie | undefined {
    const i = FALLSTUDIEN.findIndex((f) => f.slug === slug)
    if (i === -1) return undefined
    return FALLSTUDIEN[(i + 1) % FALLSTUDIEN.length]
}
