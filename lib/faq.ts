/**
 * FAQ-Inhalte zentral: werden sowohl von FragenSection (sichtbar) als auch vom
 * FAQPage-Structured-Data auf der Startseite genutzt. Eine Quelle – damit die
 * ausgezeichneten Antworten immer exakt dem entsprechen, was auf der Seite steht
 * (Google-Anforderung; KI-Systeme zitieren die Antworten direkt).
 */
export type FaqItem = { q: string; a: string }

export const FAQ: FaqItem[] = [
    {
        q: 'Woran erkenne ich, dass meine Marke ein Klarheitsproblem hat?',
        a: 'Die Symptome zeigen sich meist an anderer Stelle: Angebote werden über den Preis verglichen, Kunden verstehen die Unterschiede zum Wettbewerb nicht, Marketing erzeugt Aufmerksamkeit, aber keine Wirkung. Oft ist nicht die Leistung das Problem – sondern die Wahrnehmung.',
    },
    {
        q: 'Was kostet fehlende Klarheit?',
        a: 'Die interessantere Frage als „Was kostet Markenentwicklung?" ist: Was kostet fehlende Klarheit? Wenn Kunden Unterschiede nicht erkennen und Marketing ständig neu ansetzen muss, entstehen Kosten, die selten auf einer Rechnung stehen – aber täglich spürbar sind.',
    },
    {
        q: 'Ist meine Marke wirklich das Problem?',
        a: 'Vielleicht. Vielleicht auch nicht. Deshalb beginnen wir mit Fragen statt mit Lösungen. Manchmal liegt die Ursache in der Positionierung, manchmal in der Kommunikation, manchmal in der Sichtbarkeit. Erst wenn klar ist, wo die Herausforderung liegt, sprechen wir über Maßnahmen.',
    },
    {
        q: 'Wie läuft die Zusammenarbeit ab?',
        a: 'Sie sprechen direkt mit der Person, die Ihre Strategie entwickelt und umsetzt – keine Account-Manager, keine langen Übergaben. Wir klären zuerst das Fundament (Positionierung, Botschaft, Zielgruppe) und bauen darauf die sichtbaren Maßnahmen: Website, SEO, Content, Ads, Automatisierung.',
    },
    {
        q: 'Für wen ist LinderMedia gedacht?',
        a: 'Für Unternehmen, die in ihrer Sache wirklich gut sind – und trotzdem nicht so wahrgenommen werden, wie sie es verdienen. Ob Handwerk, Beratung oder Dienstleistung: Wenn Ihre Stärke nach außen nicht ankommt, liegt das selten am Angebot, sondern an fehlender Klarheit.',
    },
]
