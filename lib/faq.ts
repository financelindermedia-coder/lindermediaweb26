/**
 * FAQ-Inhalte zentral: werden sowohl von FragenSection (sichtbar) als auch vom
 * FAQPage-Structured-Data auf der Startseite genutzt. Eine Quelle – damit die
 * ausgezeichneten Antworten immer exakt dem entsprechen, was auf der Seite steht
 * (Google-Anforderung; KI-Systeme zitieren die Antworten direkt).
 *
 * Reihenfolge ist Absicht: erst die Fragen, die jemand VOR dem Gespräch hat
 * (Erkenne ich mich wieder? Was kostet mich das Nichtstun?), dann die zum
 * Ablauf, zuletzt die zum ersten Schritt. Wer bis Frage 08 liest, ist nicht
 * mehr am Prüfen, sondern am Abwägen.
 */
export type FaqItem = { q: string; a: string }

export const FAQ: FaqItem[] = [
    {
        q: 'Woran erkenne ich, dass meine Marke ein Klarheitsproblem hat?',
        a: 'Die Symptome zeigen sich meist an anderer Stelle: Angebote werden über den Preis verglichen, Kunden verstehen die Unterschiede zum Wettbewerb nicht, Marketing erzeugt Aufmerksamkeit, aber nicht die richtigen Anfragen. Oft ist nicht die Leistung das Problem – sondern die Wahrnehmung.',
    },
    {
        q: 'Was kostet fehlende Klarheit?',
        a: 'Die interessantere Frage als „Was kostet Markenentwicklung?" ist: Was kostet fehlende Klarheit? Wenn Kunden Unterschiede nicht erkennen und Marketing immer wieder neu ansetzen muss, entstehen Kosten, die selten auf einer einzelnen Rechnung stehen – aber täglich spürbar sind. Deshalb beginnen wir nicht mit einem Maßnahmenkatalog, sondern mit der Frage, wo die eigentliche Ursache liegt.',
    },
    {
        q: 'Ist meine Marke wirklich das Problem?',
        a: 'Vielleicht. Vielleicht auch nicht. Manchmal liegt die Ursache in der Positionierung, manchmal in der Kommunikation, manchmal in der Website oder in der Sichtbarkeit. Deshalb beginnen wir mit Fragen statt mit Lösungen. Erst wenn klar ist, wo die Herausforderung liegt, entscheiden wir, welche Maßnahmen wirklich sinnvoll sind.',
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
        q: 'Kann LinderMedia auch eine bestehende Marke weiterentwickeln?',
        a: 'Ja. Nicht jede Marke braucht einen kompletten Neustart. Manchmal ist bereits viel Substanz vorhanden und muss nur klarer strukturiert, visuell geschärft oder digital besser übersetzt werden. Deshalb prüfen wir zuerst, was bleiben sollte – und was tatsächlich verändert werden muss.',
    },
    {
        q: 'Was passiert nach dem ersten Gespräch?',
        a: 'Zunächst einmal nichts, was Sie nicht möchten. Das erste Gespräch dient dazu, die Ausgangslage zu verstehen und herauszufinden, wo die eigentliche Aufgabe liegt. Wenn daraus ein gemeinsames Projekt entstehen soll, definieren wir anschließend Umfang, Ziele, Vorgehen und die nächsten Schritte. Ohne unnötige Verkaufsrunden und ohne vorgefertigtes Paket.',
    },
]
