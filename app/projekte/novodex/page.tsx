import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseHero,
    CaseList,
    CaseOutro,
    CaseProcess,
    CaseTerms,
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
    'NOVODEX – Markenentwicklung, Corporate Design & Digital Experience | LinderMedia'
const DESCRIPTION =
    'NOVODEX – von der Idee zur eigenständigen Marke: Markenstrategie, Naming, Corporate Design, Webdesign und ein digitales Konzept für den Refit-Prozess.'

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
                kicker="NOVODEX · Markenentwicklung · Corporate Identity · Markenarchitektur · Digital Experience"
                headline={<>Von der Idee zur<br /><strong>eigenständigen Marke.</strong></>}
                text="Eine Marke entsteht nicht durch ein Logo allein. Sie braucht eine klare Identität, eine durchdachte Positionierung und einen visuellen Auftritt, der ihre Werte und Leistungen unverwechselbar kommuniziert."
                note="Für NOVODEX wurde eine ganzheitliche Markenentwicklung konzipiert – von der Namensfindung und strategischen Ausrichtung über die Entwicklung der Wortmarke und des Corporate Designs bis hin zur digitalen Markenpräsenz."
                image="/images/Novodex.webp"
                alt="Die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch."
            />

            <CaseChapter
                index="02"
                eyebrow="Ausgangslage"
                headline={<>Eine neue Marke braucht<br /><strong>ein klares Fundament.</strong></>}
                text={[
                    'Im Premiumsegment für Yachtdeck-Refits sollte eine eigenständige Marke entstehen, die handwerkliche Präzision, technische Kompetenz und maritime Ästhetik miteinander verbindet.',
                    'Die Herausforderung bestand darin, aus einer Geschäftsidee eine klar positionierte Marke zu entwickeln. Sie sollte Vertrauen schaffen, eine hochwertige Zielgruppe ansprechen und gleichzeitig die technischen und handwerklichen Leistungen verständlich vermitteln.',
                    'Dafür brauchte es mehr als einen Namen und ein Logo: eine durchgängige Markenidentität.',
                ]}
                image="/images/case-novodex-deck-bestand.webp"
                alt=""
                wide
            />

            <CaseChapter
                index="03"
                eyebrow="Markenstrategie & Positionierung"
                headline={<>Erst die Strategie.<br /><strong>Dann das Erscheinungsbild.</strong></>}
                text={[
                    'Am Anfang stand die Definition des Markenkerns. Welche Werte soll NOVODEX vermitteln? Wie positioniert sich die Marke im Markt? Und wodurch unterscheidet sie sich von klassischen Anbietern im Yachtdeck- und Refit-Bereich?',
                ]}
                image="/images/case-novodex-deck-strategie.webp"
                alt=""
                wide
            >
                <CaseList
                    lead="Die strategische Grundlage umfasst:"
                    items={[
                        'Definition von Markencharakter und Markenwerten',
                        'Positionierung im Premiumsegment',
                        'Zielgruppen- und Wettbewerbsbetrachtung',
                        'Entwicklung der Markenbotschaft',
                        'Definition der sprachlichen Tonalität',
                        'Entwicklung einer konsistenten Markenarchitektur',
                    ]}
                />
                <CaseTerms items={['Präzision', 'Qualität', 'Vertrauen', 'Beständigkeit']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Naming & Markenidentität"
                headline={<>Ein Name mit<br /><strong>eigenständigem Charakter.</strong></>}
                text={[
                    'Die Namensentwicklung bildete einen wichtigen Baustein der Markenstrategie. Ziel war ein prägnanter, international verständlicher Markenname mit technischem Charakter und eigenständiger Wiedererkennbarkeit.',
                    'Aus der Namensidee NOVODEX entstand eine visuelle Identität, die maritime Handwerkskunst mit moderner Technologie und einem hochwertigen Markenverständnis verbindet.',
                ]}
                image="/images/case-novodex-deck-naming.webp"
                alt=""
                wide
            >
                <CaseList
                    lead="Die Markenentwicklung umfasste:"
                    items={[
                        'Namensfindung und Namenskonzeption',
                        'Recherche und Bewertung möglicher Markennamen',
                        'Entwicklung der Wortmarke NOVODEX',
                        'Definition der visuellen Markenidentität',
                        'Entwicklung eines konsistenten Markenauftritts',
                    ]}
                    note="Hinweis: Eine rechtliche Markenfreigabe oder Markenregistrierung ist von der Namensentwicklung und Recherche zu unterscheiden."
                />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Corporate Design"
                headline={<>Eine visuelle Sprache für<br /><strong>Qualität und Präzision.</strong></>}
                text={[
                    'Das Corporate Design übersetzt die strategische Positionierung in ein eigenständiges visuelles Erscheinungsbild.',
                    'Eine reduzierte, hochwertige Gestaltung verbindet maritime Anmutung mit technischer Klarheit. Farben, Typografie, Bildsprache und grafische Elemente schaffen einen konsistenten Auftritt über alle Kommunikationskanäle hinweg.',
                ]}
                image="/images/case-novodex-deck-design.webp"
                alt=""
                wide
            >
                <CaseList
                    lead="Entwickelte Gestaltungselemente:"
                    items={[
                        'Logo und Wortmarke',
                        'Farbwelt und Typografie',
                        'Gestaltungsraster und Bildsprache',
                        'Grafische Gestaltungselemente',
                        'Digitale und kommunikative Markenanwendungen',
                        'Visuelle Gestaltungsrichtlinien',
                    ]}
                />
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Webdesign & digitale Markenpräsenz"
                headline={<>Die Marke wird<br /><strong>digital erlebbar.</strong></>}
                text={[
                    'Die Website übersetzt die Markenidentität in eine digitale Erlebniswelt. Sie verbindet hochwertige Bildsprache, klare Informationsarchitektur und eine moderne Nutzerführung.',
                    'Im Mittelpunkt stehen die Leistungen, die handwerkliche Qualität und der strukturierte Weg zu einem neuen Yachtdeck.',
                    'Dabei wurde die digitale Präsenz nicht isoliert betrachtet, sondern als konsequente Fortführung des Corporate Designs entwickelt.',
                ]}
                image="/images/case-novodex-deck-web.webp"
                alt=""
                wide
            />

            <CaseChapter
                index="07"
                eyebrow="Digitale Prozesse & Customer Experience"
                headline={<>Vom ersten Kontakt bis<br /><strong>zum fertigen Yachtdeck.</strong></>}
                text={[
                    'Über den Markenauftritt hinaus wurde ein digitales Konzept entwickelt, das den gesamten Refit-Prozess verständlich und transparent macht.',
                    'Ein Sieben-Phasen-Modell strukturiert den Projektablauf – von der ersten Beratung über digitale Vermessung und Fertigung bis hin zu Montage, Qualitätssicherung und Service.',
                ]}
                wide
            >
                <CaseProcess steps={PHASEN} />
                <CaseList
                    lead="Ergänzend wurden digitale Anwendungskonzepte ausgearbeitet:"
                    items={[
                        'Mehrstufiges Anfrageformular mit Projektinformationen und Foto-Upload',
                        'Interne Verwaltung von Anfragen und Angeboten',
                        'Überführung angenommener Angebote in Projekte',
                        'Digitales Bautagebuch',
                        'Kundenportal mit Projektfortschritt und Dokumenten-Center',
                    ]}
                    note="Die Portalansicht visualisiert die geplante Customer Experience anhand eines Prototyps mit Demodaten."
                />
            </CaseChapter>

            <CaseChapter
                index="08"
                eyebrow="Ergebnis"
                headline={<>Eine Marke. Ein konsistenter Auftritt.<br /><strong>Eine klare Richtung.</strong></>}
                text={[
                    'Aus einer Geschäftsidee wurde ein ganzheitliches Markenkonzept entwickelt. NOVODEX verbindet eine eigenständige Markenidentität mit einem hochwertigen Corporate Design und einer digitalen Strategie, die weit über die klassische Unternehmenswebsite hinausgeht.',
                    'Das Ergebnis ist ein durchgängiges Konzept, in dem Markenstrategie, Gestaltung, Kommunikation und digitale Prozesse zusammenspielen.',
                    'NOVODEX – Precision meets craftsmanship.',
                ]}
                image="/images/case-novodex-deck-ergebnis.webp"
                alt=""
                wide
            >
                <CaseTerms items={[
                    'Markenstrategie', 'Naming', 'Markenentwicklung', 'Logo Design', 'Corporate Identity',
                    'Corporate Design', 'Webdesign', 'UX/UI', 'Digitale Strategie', 'Customer Experience',
                ]} />
                <CaseOutro
                    slug="novodex"
                    ctaLabel="Über Ihr nächstes Projekt sprechen"
                />
            </CaseChapter>
        </main>
    )
}
