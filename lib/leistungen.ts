/**
 * Die Leistungsseiten unter /leistungen/….
 *
 * Eine Quelle für Route, Inhalt, Metadaten, Structured Data und die Verweise
 * aus Startseite und Fallstudien. Wer hier einen Eintrag ergänzt, bekommt Seite,
 * Sitemap, Schema und interne Verlinkung mit – ohne dass die drei Stellen
 * auseinanderlaufen können.
 *
 * Aufbau jeder Seite bewusst gleich: Was ist das? → Was gehört dazu? → Woran
 * halten wir uns dabei? → Wo kann man es sehen? → Wie geht es weiter. Der
 * Besucher soll auf der zweiten Leistungsseite nicht neu lesen lernen müssen.
 *
 * REDAKTIONELLE REGEL (siehe auch CaseImpact): Hier steht, was die Arbeit
 * umfasst – nicht, was sie erreicht hat. Ergebnisversprechen ohne Beleg gehören
 * auf keine dieser Seiten.
 */

/**
 * Die vier Schritte der Methode – dieselben wie im Prozessbereich auf der
 * Startseite (components/sections/MethodeSection.tsx).
 *
 * Sie ordnen die neun Disziplinen: Nicht jede Leistung steht auf derselben
 * Ebene, und eine Liste aus neun gleich grossen Einträgen behauptet genau das.
 */
export const STUFEN = [
    { nr: '01', name: 'Klarheit' },
    { nr: '02', name: 'Charakter' },
    { nr: '03', name: 'Präsenz' },
    { nr: '04', name: 'Wirkung' },
] as const

export type StufenNr = (typeof STUFEN)[number]['nr']

/**
 * Ein Punkt im Leistungsumfang. Ohne `text` wird er als Schlagwort gesetzt.
 *
 * Lange Komposita tragen im `name` ein WEICHES TRENNZEICHEN (U+00AD) an der
 * Wortfuge: „Geschäfts­ausstattung". Es ist unsichtbar und wirkt nur, wenn die
 * Zeile bricht – ohne es trennte der Browser nach Silben und schrieb
 * „GESCHÄFTSAUS-STATTUNG" in die Kachel. Deshalb steht das CSS auf
 * `hyphens: manual`: gebrochen wird genau hier und sonst nirgends.
 *
 * WICHTIG: Vor der Ausgabe in Structured Data muss das Zeichen raus – siehe
 * `ohneTrennung()` in app/leistungen/[slug]/page.tsx.
 */
export type LeistungsPunkt = { name: string; text?: string }

export type Leistung = {
    slug: string
    /** Kurzname für Navigation, Verweise und Breadcrumb. */
    name: string
    /**
     * Der Schritt der Methode, zu dem die Disziplin gehört (siehe STUFEN).
     *
     * Damit ist die Zuordnung an einer Stelle festgehalten statt in der
     * Übersicht auf der Startseite noch einmal nachgebaut: Wer eine Leistung
     * ergänzt, ordnet sie hier ein und sie erscheint dort in der richtigen
     * Spalte.
     */
    stufe: StufenNr
    /** Vollständiger Seitentitel für <title> – exakt, ohne Template-Anhang. */
    seoTitle: string
    seoDescription: string
    /** H1, zweizeilig gesetzt. Die zweite Zeile steht fett. */
    h1: [string, string]
    /** Der Satz unter der H1 – ein Gedanke, keine Zusammenfassung. */
    intro: string
    text: string[]
    /** Überschrift über dem Leistungsumfang. */
    umfangTitel: string
    umfang: LeistungsPunkt[]
    /** Der Leitgedanke: woran wir uns bei dieser Disziplin halten. */
    leitgedanke?: { headline: string; text: string }
    /** Slugs aus lib/cases – nur Projekte, zu denen es eine Fallstudie gibt. */
    cases: string[]
    /** Frage über dem Abschluss-CTA. */
    ctaFrage: string
    ctaLabel: string
}

export const LEISTUNGEN: Leistung[] = [
    {
        slug: 'markenstrategie',
        stufe: '01',
        name: 'Markenstrategie',
        seoTitle: 'Markenstrategie & Positionierung | LinderMedia',
        seoDescription:
            'Positionierung, Zielgruppe, Botschaft und Markenarchitektur als Grundlage für Design, Website, Content und Marketing – von LinderMedia.',
        h1: ['Eine Marke beginnt', 'mit einer klaren Richtung.'],
        intro:
            'Bevor ein Unternehmen sichtbarer wird, sollte klar sein, wofür es eigentlich sichtbar sein will.',
        text: [
            'Markenstrategie bedeutet für uns nicht, ein paar Werte auf ein Blatt zu schreiben. Es geht darum, die Entscheidungen sichtbar zu machen, die später jede Kommunikation tragen:',
            'Wer soll uns verstehen? Was soll hängen bleiben? Was unterscheidet uns wirklich? Und warum sollte jemand genau uns wählen?',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            {
                name: 'Positionierung',
                text: 'Wir schärfen die Position eines Unternehmens im relevanten Wettbewerbsumfeld.',
            },
            {
                name: 'Zielgruppe',
                text: 'Wir klären, für wen die Marke relevant ist – und welche Bedürfnisse tatsächlich entscheidend sind.',
            },
            {
                name: 'Marken­botschaft',
                text: 'Wir entwickeln eine Sprache, die nicht nur beschreibt, was ein Unternehmen tut, sondern warum es relevant ist.',
            },
            {
                name: 'Marken­architektur',
                text: 'Wenn mehrere Leistungen, Produkte oder Marken zusammenkommen, schaffen wir eine nachvollziehbare Struktur.',
            },
            {
                name: 'Strategisches Fundament',
                text: 'Das Ergebnis ist keine Präsentation, die nach dem Workshop verschwindet, sondern eine Grundlage für Design, Website, Content und Marketing.',
            },
        ],
        cases: ['solar-impact-yacht', 'novodex', 'wellenwind', 'marevo'],
        ctaFrage: 'Ihre Marke braucht eine klarere Richtung?',
        ctaLabel: 'Projekt besprechen',
    },
    {
        slug: 'corporate-design',
        stufe: '02',
        name: 'Corporate Design',
        seoTitle: 'Corporate Design & Markenidentität | LinderMedia',
        seoDescription:
            'Logo, Farbwelt, Typografie, Bildwelt und Gestaltungssystem: Corporate Design, das eine Strategie sichtbar macht – von LinderMedia.',
        h1: ['Eine klare Marke', 'braucht eine erkennbare Form.'],
        intro: 'Corporate Design macht Strategie sichtbar.',
        text: [
            'Ein gutes Design sieht nicht nur gut aus.',
            'Es macht eine Marke wiedererkennbar, gibt ihr Charakter und sorgt dafür, dass unterschiedliche Medien trotzdem zusammengehören.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Logo und Wortmarke' },
            { name: 'Farbwelt' },
            { name: 'Typografie' },
            { name: 'Bildwelt' },
            { name: 'Art Direction' },
            { name: 'Gestaltungs­system' },
            { name: 'Geschäfts­ausstattung' },
            { name: 'Digitale Anwendungen' },
            { name: 'Brand Guidelines' },
        ],
        leitgedanke: {
            headline: 'Ein System, kein Erscheinungsbild.',
            text: 'Wir entwickeln kein einzelnes Erscheinungsbild, sondern ein System, das auch beim nächsten Projekt noch funktioniert.',
        },
        cases: ['solar-impact-yacht', 'marevo', 'schaaf-tender', 'wellenwind'],
        ctaFrage: 'Aus Strategie soll Identität werden?',
        ctaLabel: 'Projekt besprechen',
    },
    {
        slug: 'webdesign',
        stufe: '03',
        name: 'Webdesign',
        seoTitle: 'Webdesign & Websites für Unternehmen | LinderMedia',
        seoDescription:
            'Websites, die erklären, Vertrauen schaffen und den nächsten Schritt erleichtern: Strategie, UX, Design, Entwicklung, Performance und SEO aus einer Hand.',
        h1: ['Eine Website sollte', 'nicht nur gut aussehen.'],
        intro:
            'Sie sollte erklären, Vertrauen schaffen und den nächsten Schritt erleichtern.',
        text: [
            'Eine Website ist kein isoliertes digitales Produkt. Sie ist häufig der Ort, an dem Menschen zum ersten Mal entscheiden, ob sie einer Marke vertrauen.',
            'Deshalb verbinden wir Strategie, UX, Design, Inhalte, Entwicklung, Performance und SEO.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Informations­architektur' },
            { name: 'UX' },
            { name: 'UI Design' },
            { name: 'Responsive Webdesign' },
            { name: 'Entwicklung' },
            { name: 'CMS' },
            { name: 'Content' },
            { name: 'SEO' },
            { name: 'Performance' },
            { name: 'Conversion' },
            { name: 'Technische Betreuung' },
        ],
        leitgedanke: {
            headline: 'Verstehen vor Funktionsumfang.',
            text: 'Die beste Website ist nicht die mit den meisten Funktionen. Es ist die, die Menschen ohne Umwege verstehen lässt, wo sie sind und warum sie bleiben sollten.',
        },
        cases: ['solar-impact-yacht', 'novodex', 'wellenwind', 'lubrican', 'schaaf-tender'],
        ctaFrage: 'Ihre Website soll mehr erklären als sie zeigt?',
        ctaLabel: 'Website-Projekt besprechen',
    },
    {
        slug: 'fotografie',
        stufe: '03',
        name: 'Fotografie',
        seoTitle: 'Fotografie für Marken und Unternehmen | LinderMedia',
        seoDescription:
            'Unternehmens-, Produkt- und Lifestyle-Fotografie, die aus der Positionierung einer Marke entsteht – nicht unabhängig davon.',
        h1: ['Bilder sind nicht Dekoration.', 'Sie sind Markenkommunikation.'],
        intro: 'Gute Fotografie zeigt nicht nur ein Produkt oder einen Menschen.',
        text: [
            'Sie bestimmt, wie etwas wahrgenommen wird.',
            'Deshalb entwickeln wir Bildwelten nicht unabhängig von der Marke, sondern aus ihrer Positionierung heraus.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Unternehmens­fotografie' },
            { name: 'Produkt­fotografie' },
            { name: 'Lifestyle' },
            { name: 'Architektur' },
            { name: 'Yachting' },
            { name: 'Portrait' },
            { name: 'Kampagnen' },
            { name: 'Content-Produktion' },
        ],
        cases: [],
        ctaFrage: 'Ihre Marke braucht eine eigene Bildsprache?',
        ctaLabel: 'Bildwelt entwickeln',
    },
    {
        slug: 'filmproduktion',
        stufe: '03',
        name: 'Film & Video',
        seoTitle: 'Filmproduktion & Bewegtbild für Marken | LinderMedia',
        seoDescription:
            'Markenfilm, Produktfilm, Social Video und Motion Design – Bewegtbild aus derselben strategischen Richtung wie der übrige Markenauftritt.',
        h1: ['Bewegung macht sichtbar,', 'was ein Bild nicht erklären kann.'],
        intro: 'Film verbindet Atmosphäre, Information und Emotion.',
        text: [
            'Von Markenfilmen über Produktvideos bis zu Social Content entwickeln wir Bewegtbild aus derselben strategischen Richtung wie den restlichen Markenauftritt.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Markenfilm' },
            { name: 'Produktfilm' },
            { name: 'Social Video' },
            { name: 'Imagefilm' },
            { name: 'Yachtfilm' },
            { name: 'Kampagnen' },
            { name: 'FPV' },
            { name: 'Motion Design' },
        ],
        cases: [],
        ctaFrage: 'Sie haben etwas zu zeigen, das ein Standbild nicht trägt?',
        ctaLabel: 'Filmprojekt besprechen',
    },
    {
        slug: '3d-visualisierung',
        stufe: '03',
        name: '3D-Visualisierung',
        seoTitle: '3D-Visualisierung, CGI & Rendering | LinderMedia',
        seoDescription:
            'Produkt-, Architektur- und Yachtvisualisierung: sichtbar machen, was noch nicht gebaut ist – als Grundlage für Entscheidungen und Kommunikation.',
        h1: ['Sichtbar machen,', 'bevor etwas gebaut ist.'],
        intro:
            '3D-Visualisierung ist nicht nur eine Möglichkeit, etwas schöner darzustellen.',
        text: [
            'Sie kann Entscheidungen ermöglichen, bevor ein Produkt, Raum oder Boot tatsächlich existiert.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Produkt­visualisierung' },
            { name: 'Architektur' },
            { name: 'Yacht­visualisierung' },
            { name: 'Konzept­visualisierung' },
            { name: 'CGI' },
            { name: 'Animation' },
            { name: 'Technische Darstellung' },
        ],
        cases: ['schaaf-tender', 'solar-impact-yacht', 'novodex'],
        ctaFrage: 'Etwas soll zu sehen sein, bevor es existiert?',
        ctaLabel: 'Projekt besprechen',
    },
    {
        slug: 'seo',
        stufe: '04',
        name: 'SEO & Sichtbarkeit',
        seoTitle: 'SEO & Sichtbarkeit für Unternehmen | LinderMedia',
        seoDescription:
            'Suchmaschinenoptimierung als Teil der Marken- und Kommunikationsstrategie: technische SEO, OnPage, Content, Local SEO und strukturierte Daten.',
        h1: ['Sichtbarkeit beginnt', 'nicht bei Google.'],
        intro: 'SEO kann keine unklare Positionierung reparieren.',
        text: [
            'Deshalb betrachten wir Suchmaschinenoptimierung als Teil der Marken- und Kommunikationsstrategie.',
            'Erst muss klar sein, wonach Menschen suchen, welche Fragen sie haben und warum die Antwort genau von diesem Unternehmen kommen sollte.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Keyword Research' },
            { name: 'Technische SEO' },
            { name: 'OnPage SEO' },
            { name: 'Content' },
            { name: 'Local SEO' },
            { name: 'Strukturierte Daten' },
            { name: 'Interne Verlinkung' },
            { name: 'Search Console' },
            { name: 'Performance' },
        ],
        cases: [],
        ctaFrage: 'Sie werden gefunden – aber nicht von den Richtigen?',
        ctaLabel: 'Projekt besprechen',
    },
    {
        slug: 'marketing',
        stufe: '04',
        name: 'Marketing',
        seoTitle: 'Marketing, Kampagnen & Ads | LinderMedia',
        seoDescription:
            'Kampagnen, Content, Ads und Landingpages, die auf einer geklärten Positionierung aufbauen – statt eine unklare Marke lauter zu machen.',
        h1: ['Mehr Reichweite', 'ist nicht automatisch mehr Wirkung.'],
        intro:
            'Marketing funktioniert besser, wenn bereits klar ist, was kommuniziert werden soll und für wen.',
        text: [
            'Deshalb setzen wir Kampagnen nicht vor die Strategie, sondern darauf auf.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Kampagnen' },
            { name: 'Content' },
            { name: 'Ads' },
            { name: 'Social Media' },
            { name: 'Landingpages' },
            { name: 'Performance Marketing' },
            { name: 'Content-Systeme' },
        ],
        cases: [],
        ctaFrage: 'Ihr Marketing bringt Aufmerksamkeit, aber nicht die richtigen Anfragen?',
        ctaLabel: 'Projekt besprechen',
    },
    {
        slug: 'automatisierung',
        stufe: '04',
        name: 'Automatisierung',
        seoTitle: 'Automatisierung & digitale Prozesse | LinderMedia',
        seoDescription:
            'Lead-Automatisierung, Formularprozesse, CRM-Anbindung und Content-Workflows: Systeme, die Abläufe vereinfachen statt sie zu verkomplizieren.',
        h1: ['Gute Systeme nehmen Arbeit ab,', 'nicht Verantwortung.'],
        intro: 'Automatisierung sollte Prozesse vereinfachen, nicht komplizierter machen.',
        text: [
            'Wir verbinden digitale Markenauftritte bei Bedarf mit automatisierten Abläufen für Leads, Content, Kommunikation und interne Prozesse.',
        ],
        umfangTitel: 'Was dazugehört.',
        umfang: [
            { name: 'Lead-​Automatisierung' },
            { name: 'Formular­prozesse' },
            { name: 'CRM-Anbindung' },
            { name: 'Content Workflows' },
            { name: 'KI-gestützte Prozesse' },
            { name: 'n8n' },
            { name: 'Schnittstellen' },
            { name: 'Benachrichti­gungen' },
        ],
        cases: [],
        ctaFrage: 'Ein Ablauf kostet Sie jede Woche dieselbe Stunde?',
        ctaLabel: 'Projekt besprechen',
    },
]

export function findeLeistung(slug: string): Leistung | undefined {
    return LEISTUNGEN.find((l) => l.slug === slug)
}

/**
 * Die übrigen Leistungen – für den Verweisblock am Seitenende.
 *
 * Er steht auf jeder Seite, nicht nur dort, wo Fallstudien fehlen: Wer eine
 * Disziplin liest, hat oft die Nachbardisziplin im Sinn, und ohne diesen Block
 * gäbe es keinen Weg dorthin außer zurück über die Startseite.
 */
export function andereLeistungen(slug: string): Leistung[] {
    return LEISTUNGEN.filter((l) => l.slug !== slug)
}

/** Die Disziplinen einer Methodenstufe, in der Reihenfolge von LEISTUNGEN. */
export function leistungenDerStufe(nr: StufenNr): Leistung[] {
    return LEISTUNGEN.filter((l) => l.stufe === nr)
}
