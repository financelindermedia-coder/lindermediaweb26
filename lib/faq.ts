/**
 * FAQ-Inhalte zentral: werden sowohl von FragenSection (sichtbar) als auch vom
 * FAQPage-Structured-Data auf der Startseite genutzt. Eine Quelle – damit die
 * ausgezeichneten Antworten immer exakt dem entsprechen, was auf der Seite steht
 * (Google-Anforderung; KI-Systeme zitieren die Antworten direkt).
 *
 * Bewusst nur die fünf wichtigsten Fragen: Erkenne ich mich wieder? Wie läuft
 * die Zusammenarbeit ab? Ist das etwas für mich? Was genau bekomme ich? Was
 * passiert als Nächstes?
 */
export type FaqItem = { q: string; a: string }

export const FAQ: FaqItem[] = [
    {
        q: 'Woran erkenne ich, dass meine Marke ein Klarheitsproblem hat?',
        a: 'Die Symptome zeigen sich meist an anderer Stelle: Angebote werden über den Preis verglichen, Kunden verstehen die Unterschiede zum Wettbewerb nicht, Marketing erzeugt Aufmerksamkeit, aber nicht die richtigen Anfragen. Oft ist nicht die Leistung das Problem – sondern die Wahrnehmung.',
    },
    {
        q: 'Wie läuft die Zusammenarbeit ab?',
        a: 'Sie sprechen direkt mit der Person, die Strategie, Gestaltung und Umsetzung begleitet. Zuerst klären wir das Fundament: Positionierung, Zielgruppe, Botschaft und die Rolle der Marke. Darauf bauen die sichtbaren Maßnahmen auf – beispielsweise Corporate Design, Website, Fotografie, Film, SEO, Content oder digitale Systeme. Der konkrete Umfang richtet sich nach der Aufgabe, nicht nach einem vorgefertigten Paket.',
    },
    {
        q: 'Für wen ist LinderMedia gedacht?',
        a: 'Für Unternehmen, die in ihrer Sache gut sind und trotzdem nicht so wahrgenommen werden, wie sie es verdienen. Besonders dort, wo Leistungen erklärungsbedürftig sind, Unterschiede schwer sichtbar werden oder mehrere Kommunikationsmaßnahmen bisher kein gemeinsames Bild ergeben. Ob technisches Unternehmen, Dienstleister, Handwerksbetrieb, Produktmarke oder Premium-Anbieter: Entscheidend ist nicht die Branche, sondern die Aufgabe.',
    },
    {
        q: 'Entwickelt LinderMedia nur Marken oder auch Websites?',
        a: 'Beides. Der Unterschied liegt darin, dass die Website nicht isoliert betrachtet wird. Wenn wir eine Website entwickeln, betrachten wir gleichzeitig Positionierung, Nutzerführung, Inhalte, visuelle Identität, Performance und die Rolle der Website innerhalb des gesamten Markenauftritts. So entsteht keine schöne Einzelmaßnahme, sondern ein digitaler Auftritt, der zur Marke passt.',
    },
    {
        q: 'Was passiert nach dem ersten Gespräch?',
        a: 'Zunächst einmal nichts, was Sie nicht möchten. Das erste Gespräch dient dazu, die Ausgangslage zu verstehen und herauszufinden, wo die eigentliche Aufgabe liegt. Wenn daraus ein gemeinsames Projekt entstehen soll, definieren wir anschließend Umfang, Ziele, Vorgehen und die nächsten Schritte. Ohne unnötige Verkaufsrunden und ohne vorgefertigtes Paket.',
    },
]
