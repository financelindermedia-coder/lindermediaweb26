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
    /**
     * Was das Projekt geloest hat, Key-Visual und Route – fuer die kompakten
     * Portfolio-Karten auf /referenzen (siehe app/referenzen/page.tsx).
     * Dieselben Werte stehen auch in der Projektliste der Startseite
     * (CasesSection.tsx); die kleine Dopplung besteht dort bereits beim Namen
     * und ist bewusst in Kauf genommen, statt die groessere, interaktive
     * Startseiten-Komponente fuer einen zweiten, viel kleineren
     * Verwendungszweck umzubauen.
     */
    problem: string
    teaser: string
    visual: string
    visualAlt: string
    fallstudie: string
}

export const FALLSTUDIEN: Fallstudie[] = [
    {
        slug: 'solar-impact-yacht',
        name: 'Solar Impact Yacht',
        problem: 'Positionierung · Technologie-Vermittlung',
        teaser: 'Wie aus komplexer Technologie eine verständliche Marke wurde.',
        visual: '/images/solarimpact.jpg',
        visualAlt: 'die dunkelgraue SWATH-Yacht in Fahrt vor einer Felsküste',
        fallstudie: '/projekte/solar-impact-yacht',
    },
    {
        slug: 'novodex',
        name: 'Novodex',
        problem: 'Premium-Positionierung · Prozess-Sicherheit',
        teaser: 'Wie aus einem Yachtdeck ein planbarer Refit-Prozess wurde.',
        visual: '/images/Novodex.webp',
        visualAlt: 'die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch',
        fallstudie: '/projekte/novodex',
    },
    {
        slug: 'wellenwind',
        name: 'Wellenwind',
        problem: 'Markenaufbau · Content-System · E-Commerce',
        teaser: 'Wie aus Produkten eine eigenständige Marke mit Haltung wurde.',
        visual: '/images/wellenwind.webp',
        visualAlt: 'drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke',
        fallstudie: '/projekte/wellenwind',
    },
    {
        slug: 'marevo',
        name: 'Marèvo',
        problem: 'Premium-Wahrnehmung · Differenzierung',
        teaser: 'Wie eine Premium-Marke ihren eigenen Maßstab findet.',
        visual: '/images/marevo.webp',
        visualAlt: 'eine Segelyacht mit dunklen Segeln in Fahrt, darüber der Schriftzug MARÈVO',
        fallstudie: '/projekte/marevo',
    },
    {
        slug: 'lubrican',
        name: 'LubriCan',
        problem: 'Produktverständnis · E-Commerce',
        teaser: 'Wie technische Leistung sichtbar wird, bevor sie erklärt werden muss.',
        visual: '/images/lubrican.webp',
        visualAlt: 'zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, oben die Wortmarke',
        fallstudie: '/projekte/lubrican',
    },
    {
        slug: 'schaaf-tender',
        name: 'Schaaf Tender',
        problem: 'Differenzierung · Premium-Wahrnehmung',
        teaser: 'Wie Details zum eigentlichen Verkaufsargument werden.',
        visual: '/images/case-schaaf-hero-2.webp',
        visualAlt: 'der weiße Schaaf-Tender in Fahrt auf offener See vor einer flachen Küstenlinie',
        fallstudie: '/projekte/schaaf-tender',
    },
]

/** Die naechste Fallstudie im Ring; `undefined`, wenn der Slug unbekannt ist. */
export function naechsteFallstudie(slug: string): Fallstudie | undefined {
    const i = FALLSTUDIEN.findIndex((f) => f.slug === slug)
    if (i === -1) return undefined
    return FALLSTUDIEN[(i + 1) % FALLSTUDIEN.length]
}
