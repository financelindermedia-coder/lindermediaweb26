import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseImpact,
    CaseOutro,
    CaseProcess,
    CaseTerms,
    CaseTurn,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Novodex.
 *
 * AKTIVER CASE. Es gibt keinen Projektfilm, aus dem sich Standbilder ziehen
 * liessen, und bislang auch keine Fotos echter Refits.
 *
 * ACHTUNG – die flaechigen Hintergruende der Kapitel sind KI-generierte
 * Stimmungsbilder (Quelle: openart, Ordner Sessions/edit/novodex). Sie zeigen
 * KEINE ausgefuehrten Novodex-Arbeiten und liegen deshalb nur als stark
 * abgedunkelter Grund hinter dem Text, ohne `alt`.
 *
 * Der sichtbare Bildnachweis am Seitenende ist auf Wunsch entfernt worden
 * (2026-08-24). Damit traegt diese Seite KEINE Kennzeichnung mehr fuer das
 * KI-Material und keinen Hinweis darauf, dass die Portalansichten Demodaten
 * zeigen. Wenn beides wieder soll: `AiBadge` (components/AiBadge.tsx) ist
 * genau dafuer da und sitzt leiser als ein Absatz Fliesstext.
 *
 * Portal- und Anfrage-Ansicht sind Screenshots des Prototyps (lovable.dev bzw.
 * aistudio) und zeigen Demodaten, keine echten Projekte.
 */

const TITLE =
    'Novodex – Markenstrategie & digitaler Refit-Prozess | LinderMedia'
const DESCRIPTION =
    'Wie aus einem Yachtdeck-Anbieter eine klar positionierte Marke für den gesamten Refit-Prozess wurde.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/novodex' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/novodex`,
        images: [`${SITE_URL}/images/Novodex.webp`],
        type: 'article',
    },
}

/* Die sieben Phasen, wie sie das Kundenportal fuehrt. Bewusst als Element auf
   der Seite und nicht als Screenshot: So bleibt der Ablauf in jeder Groesse
   lesbar und laesst sich pflegen, ohne ein Bild neu zu exportieren. */
const PHASEN = [
    { titel: 'Beratung & Planung',      zusatz: 'Vision & Materialwahl' },
    { titel: 'Digitale Vermessung',     zusatz: 'Laser-Scan & Analyse' },
    { titel: 'Material & CNC',          zusatz: 'Präzisions-Fertigung' },
    { titel: 'Oberflächen-Veredelung',  zusatz: 'Versiegelung & Schutz' },
    { titel: 'Installation',            zusatz: 'Montage & Verklebung' },
    { titel: 'Qualitätssicherung',      zusatz: 'Abnahme & Check' },
    { titel: 'Pflege & Service',        zusatz: 'Nachbetreuung' },
]

export default function NovodexPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="novodex"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/Novodex.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Markenstrategie · Digitaler Prozess · Kundenportal"
                headline={<>Präzision,<br /><strong>die planbar wird.</strong></>}
                meta="Novodex · Premium Yachtdeck-Refits"
                text="Ein durchgängiger Refit-Prozess – von der Analyse bis zur dokumentierten Übergabe."
                image="/images/Novodex.webp"
                alt="Die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch."
            />

            <CaseChapter
                index="01"
                eyebrow="Die Ausgangslage"
                headline={<>Ein Refit ist mehr<br /><strong>als ein neues Deck.</strong></>}
                text={[
                    'Ein Yachtdeck-Refit verbindet viele Anforderungen: handwerkliche Präzision, technische Planung, Material, Timing und eine klare Abstimmung. Für Eigner wird der Prozess schnell komplex, wenn mehrere Gewerke koordiniert werden müssen und Verantwortung nicht an einer Stelle zusammenläuft.',
                    'Novodex sollte deshalb nicht nur als Anbieter von Yachtdecks sichtbar werden, sondern als verlässlicher Refit-Partner. Ein Auftritt, der zeigt: Hier greifen Bootsbau, Engineering und Projektmanagement in einem klaren Prozess zusammen.',
                ]}
                image="/images/case-novodex-ausgangslage-bg.webp"
                alt=""
                wide
            />

            {/* Ohne Grundbild: Die übrigen Hintergründe dieser Seite sind
                KI-Stimmungsbilder, und ausgerechnet unter der strategischen
                Entscheidung hat ein erfundenes Motiv nichts zu suchen. */}
            <CaseTurn
                frage={<>Wie wird aus einer<br />handwerklichen Leistung eine Marke,<br /><strong>die nicht über den Preis verglichen wird?</strong></>}
                nicht="ein weiterer Anbieter für Yachtdecks sein."
                sondern={<>der Partner für<br />den gesamten Refit-Prozess.</>}
                begruendung="Wer ein Deck anbietet, wird mit anderen Decks verglichen – über Material, Quadratmeter und Preis. Wer einen Prozess verantwortet, wird über Verlässlichkeit verglichen. Das ist ein anderer Wettbewerb, und es ist der, in dem Novodex seine Stärken überhaupt zeigen kann."
                folgen={[
                    'Der Prozess wird zum Produkt: sieben Phasen von der Beratung bis zur Nachbetreuung.',
                    'Digitale Technik als Beleg für Präzision – 3D-Scan und CNC sind Argumente, kein Selbstzweck.',
                    'Ein Kundenportal, das Fortschritt, Entscheidungen und Unterlagen an einem Ort hält.',
                    'Eine Anfrage in zwei Schritten – und daneben steht, was danach passiert.',
                ]}
            />

            <CaseChapter
                index="02"
                eyebrow="Die Strategie"
                headline={<>Präzision braucht<br /><strong>einen klaren Prozess.</strong></>}
                text={[
                    'Die Strategie stellt nicht ein einzelnes Produkt in den Mittelpunkt, sondern die Sicherheit eines durchgängigen Ablaufs. Von 3D-Scan und CAD-Engineering bis zur CNC-Fertigung wird digitale Technologie als Werkzeug für präzise Ergebnisse und nachvollziehbare Entscheidungen verständlich gemacht.',
                    'Daraus entstand ein Markenrahmen, der technische Kompetenz mit Verlässlichkeit und klarer Kommunikation verbindet. Novodex positioniert sich damit als ein Ansprechpartner für den gesamten Refit-Prozess – vom ersten Aufmaß bis zur dokumentierten Umsetzung.',
                ]}
                image="/images/case-novodex-strategie-bg.webp"
                alt=""
                wide
            >
                <CaseTerms items={['Präzision', 'Verlässlichkeit', 'Klarheit']} />
                <CaseFocus
                    headline={<>Ein Prozess,<br />der Vertrauen schafft.</>}
                    text="Analyse, Planung, Fertigung und Übergabe folgen einer klaren, nachvollziehbaren Logik."
                />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Analyse & Planung"
                headline={<>Das Deck wird<br /><strong>vorher verstanden.</strong></>}
                text={[
                    'Der digitale Prozess macht Anforderungen, Flächen und Entscheidungen früh sichtbar. So entsteht eine belastbare Grundlage für Aufmaß, technische Planung und die weitere Umsetzung.',
                    'Analyse und Planung reduzieren Komplexität nicht durch Vereinfachung, sondern durch einen klaren Überblick über das, was gebaut werden soll.',
                ]}
                image="/images/case-novodex-planung-bg.webp"
                alt=""
                wide
            >
                <CaseProcess steps={PHASEN} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Das Kundenportal"
                headline={<>Jeder Schritt<br /><strong>bleibt nachvollziehbar.</strong></>}
                text={[
                    'Das Kundenportal bündelt Projektstatus, Abstimmungen und Dokumentation. Die digitale Oberfläche ist kein Selbstzweck, sondern Teil der Verlässlichkeit, die Novodex verspricht.',
                    'Für Eigner entsteht damit ein nachvollziehbarer Verlauf: Ein Bautagebuch hält fest, was an Bord passiert, das Dokumenten-Center sammelt Gutachten und Fotodokumentation – Entscheidungen, Fortschritt und Unterlagen bleiben an einem Ort zugänglich.',
                ]}
                // Hier bewusst das echte Key-Visual statt eines KI-Bildes –
                // es ist das einzige belegte Motiv des Projekts.
                image="/images/Novodex.webp"
                alt=""
                wide
            >
                <CaseFigure
                    src="/images/case-novodex-portal.webp"
                    alt="Kundenportal: eine Leiste mit sieben Projektphasen, darunter das Bautagebuch mit Einträgen und rechts das Dokumenten-Center."
                    caption="Portal-Ansicht: Projektfortschritt, Bautagebuch und Dokumenten-Center (Prototyp mit Demodaten)."
                />
                <CaseFigure
                    src="/images/case-novodex-anfrage.webp"
                    alt="Anfrageformular in zwei Schritten, daneben Kontaktdaten und eine Übersicht, was nach der Anfrage passiert."
                    caption="Der Einstieg: zwei Schritte, und daneben steht, was danach passiert."
                />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Die Umsetzung"
                headline={<>Aus Planung wird<br /><strong>passgenaue Qualität.</strong></>}
                text={[
                    'Material, Fertigung und Ausführung führen zusammen, was vorher digital präzise vorbereitet wurde. Die sichtbare Qualität des Decks ist deshalb kein isoliertes Endprodukt, sondern das Ergebnis eines durchgängigen Prozesses.',
                ]}
                image="/images/case-novodex-umsetzung-bg.webp"
                alt=""
                wide
            />

            <CaseChapter
                index="06"
                eyebrow="Das Ergebnis"
                headline={<>Aus Komplexität wird<br />ein klarer, dokumentierter<br /><strong>Refit-Prozess.</strong></>}
                text={[
                    'Strategie, Analyse, Planung, Fertigung und Übergabe greifen ineinander. Dadurch entsteht ein Auftritt, der handwerkliche Qualität sichtbar macht und den gesamten Refit-Prozess für Kunden nachvollziehbar begleitet.',
                ]}
                image="/images/case-novodex-ergebnis-bg.webp"
                alt=""
                wide
            >
                <CaseImpact
                    ziel="Aus dem Vergleich über Material und Preis heraus – hinein in einen Vergleich über Prozesssicherheit."
                    strategie="Nicht das Ergebnis verkaufen, sondern den Weg dorthin nachvollziehbar machen."
                    massnahmen={['Markenentwicklung', 'Prozessdefinition', 'Kundenportal', 'Visualisierung', 'Design']}
                    wirkung="Der Eigner entscheidet nicht mehr nur über ein Deck, sondern über einen kontrollierten Refit. Damit verschiebt sich das Gespräch vom Preis zur Verantwortung – und die läuft bei Novodex an einer Stelle zusammen."
                />
                <CaseOutro slug="novodex" />
            </CaseChapter>
        </main>
    )
}
