import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseOutro,
    CaseProcess,
    CaseTerms,
    CaseTodo,
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
    'Markenstrategie, Prozessdarstellung und Kundenportal-Prototyp für Novodex: ein Refit-Prozess, klar vom Aufmaß bis zur Übergabe.'

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
                headline={<>Klar vom Aufmaß<br /><strong>bis zur Übergabe.</strong></>}
                meta="Novodex · Premium Yachtdeck-Refits"
                text="Novodex beschreibt einen durchgängigen Refit-Prozess für Yachtdecks: sieben Phasen, digitale Planung und nachvollziehbare Projektdokumentation."
                image="/images/Novodex.webp"
                alt="Die Wortmarke NOVODEX auf einem Teakdeck neben einer polierten Winsch."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Ein Refit ist mehr<br /><strong>als ein neues Deck.</strong></>}
                text={[
                    'Ein Yachtdeck-Refit verbindet Materialwahl, technische Planung, Timing und die Abstimmung mehrerer Gewerke.',
                    'Die Aufgabe: Novodex nicht nur als Yachtdeck-Anbieter, sondern als Partner für den gesamten Refit-Prozess zu positionieren.',
                ]}
                wide
            />

            <CaseChapter
                index="03"
                eyebrow="Der strategische Gedanke"
                headline={<>Präzision braucht<br /><strong>einen klaren Prozess.</strong></>}
                text={[
                    'Statt nur das fertige Deck in den Mittelpunkt zu stellen, rückt die Strategie den Ablauf dorthin: vom ersten Gespräch und digitalen Aufmaß über Fertigung und Montage bis zur Übergabe.',
                    '3D-Scan, CAD-Engineering und CNC werden als Werkzeuge dieses Prozesses beschrieben – als Belege für Präzision, nicht als Selbstzweck.',
                ]}
                wide
            >
                <CaseTerms items={['Präzision', 'Verlässlichkeit', 'Klarheit']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Umsetzung"
                headline={<>Sieben Phasen,<br /><strong>ein nachvollziehbarer Ablauf.</strong></>}
                text={[
                    'Der Ablauf führt von der Beratung und Planung über digitale Vermessung, Material und CNC, Oberflächenveredelung, Installation und Qualitätssicherung bis zu Pflege und Service.',
                ]}
                wide
            >
                <CaseProcess steps={PHASEN} />
                <CaseTodo items={['Bestätigen, welche der sieben Prozessphasen tatsächlich umgesetzt werden oder im Betrieb verwendet sind.']} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Das Kundenportal"
                headline={<>Jeder Schritt<br /><strong>bleibt nachvollziehbar.</strong></>}
                text={[
                    'Das Kundenportal soll Projektstatus, Abstimmungen und Unterlagen bündeln: mit Bautagebuch und Dokumenten-Center. Dazu kommt ein Anfrageformular in zwei Schritten.',
                ]}
                wide
            >
                <CaseTerms items={['Portal-Ansicht: Prototyp mit Demodaten']} />
                <CaseFigure
                    src="/images/case-novodex-portal.webp"
                    alt="Prototyp des Kundenportals mit Demodaten: eine Leiste mit sieben Projektphasen, darunter das Bautagebuch mit Einträgen und rechts das Dokumenten-Center."
                    caption="Prototyp mit Demodaten: Projektfortschritt, Bautagebuch und Dokumenten-Center."
                />
                <CaseFigure
                    src="/images/case-novodex-anfrage.webp"
                    alt="Anfrageformular in zwei Schritten, daneben Kontaktdaten und eine Übersicht, was nach der Anfrage passiert."
                    caption="Anfrage in zwei Schritten, mit Übersicht der nächsten Schritte."
                />
                <CaseTodo items={[
                    'Status des Portals klären: Konzept, funktionsfähiger Prototyp oder aktives Portal. Mehr als „Prototyp mit Demodaten“ nur mit aktuellem Nachweis.',
                    'Demodaten auf personenbezogene oder vertrauliche Angaben prüfen; Veröffentlichungsfreigabe für Portal- und Formularansicht.',
                ]} />
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Ergebnis und Beleg"
                headline={<>Ein klar dargestellter,<br />dokumentierter<br /><strong>Refit-Prozess.</strong></>}
                text={[
                    'Als strategisches Ziel verschiebt die Fallstudie den Vergleich vom Material- und Quadratmeterpreis hin zu Prozesssicherheit und Verantwortung. Ob sich diese Wirkung bei Kunden oder im Markt eingestellt hat, ist nicht belegt.',
                ]}
                wide
            >
                <CaseTerms items={['Markenentwicklung', 'Prozessdefinition', 'Kundenportal (Prototyp)', 'Visualisierung', 'Design']} />
                <CaseTodo items={[
                    'Freigegebener Nachweis zum realisierten Prozess oder Ergebnis (konkretes Projektbeispiel); Wirkung nur mit belegbaren Daten oder freigegebenem Kundenstatement.',
                    'Konkrete Rolle von LinderMedia je Bereich bestätigen (Strategie, Prozessdefinition, Portal, Visualisierung, Design).',
                    'Nutzungsfreigabe für Bilder; prüfen, ob die entfernten dekorativen Hintergründe konkrete Novodex-Arbeiten zeigen.',
                ]} />
                <CaseOutro
                    slug="novodex"
                    ctaLabel="Über Ihr nächstes Projekt sprechen"
                />
            </CaseChapter>
        </main>
    )
}
