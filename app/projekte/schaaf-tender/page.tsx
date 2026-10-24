import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseOutro,
    CaseTerms,
    CaseTodo,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Schaaf Tender.
 *
 * ENTWURF – anders als bei LubriCan, Wellenwind und Novodex lagen fuer dieses
 * Projekt keine Texte vor. Ueberschriften und Fliesstext sind von mir und
 * brauchen Freigabe. Die Angaben zum Produkt stammen von schaaf-boats.com
 * (Tender 15 und 24, umlaufende Kufe, Carbonteile, Antriebe vom Aussenborder
 * bis zum E-Jet) und aus dem vorliegenden Material – nichts davon ist erfunden.
 *
 * Leistungen laut Andreas: Screendesign und alles Weitere – ausgenommen ist
 * allein die Programmierung. Der Auftritt schaaf-boats.com ist also gestaltet,
 * aber nicht umgesetzt worden; das Kapitel „Das Screendesign" sagt das auch so.
 *
 * Bildmaterial (Sekunden siehe scripts/to-webp.sh):
 *   video/VID_20200912_160853683.mp4  1920x1080  echte Fahraufnahmen
 *   video/Studio T15 web.mp4          1280x682   Studio-Renderings
 *   video/schaaf.mp4                   800x450   nur hier: Yachtdeck und Broschuere
 *
 * Die beiden Screendesign-Abbildungen sind eigene Aufnahmen von
 * schaaf-boats.com (Puppeteer, 1600x1000 bei deviceScaleFactor 1.5). Sie sind
 * damit reproduzierbar, altern aber mit der Seite – bei einem Relaunch neu
 * aufnehmen.
 */

const TITLE =
    'Schaaf Tender – Markenauftritt, Visualisierung & Screendesign | LinderMedia'
const DESCRIPTION =
    'Markenauftritt, Visualisierung, Screendesign und Print für einen Superyacht-Tender: der Unterschied liegt im Detail.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/schaaf-tender' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/schaaf-tender`,
        images: [`${SITE_URL}/images/case-schaaf-hero-2.webp`],
        type: 'article',
    },
}

export default function SchaafPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="schaaf-tender"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/case-schaaf-hero-2.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Markenauftritt · Screendesign · Visualisierung · Print"
                headline={<>Der Unterschied<br /><strong>liegt im Detail.</strong></>}
                meta="Schaaf Yachtbau · Superyacht-Tender"
                text="Für Schaaf Yachtbau zeigt der Markenauftritt den Tender nicht über Größe, sondern über seine Details. Visualisierungen machten das Modell bereits vor dem Zuwasserlassen sichtbar."
                image="/images/case-schaaf-hero-2.webp"
                alt="Ein dunkler Schaaf-Tender schiebt sich in voller Fahrt durch die Gischt, der Rumpf hebt sich aus dem Wasser."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Ein Tender ist mehr<br /><strong>als ein Beiboot.</strong></>}
                text={[
                    'Ein Tender ist Zubringer und Sportgerät. Als die Arbeit entstand, lag noch nicht jedes Modell auf dem Wasser. Die Aufgabe: die Details des Schaaf-Tenders sichtbar machen, bevor ein fertiges Boot sie zeigen konnte.',
                ]}
                image="/images/case-schaaf-ausgangslage-2.webp"
                alt="Blick vom Teakdeck einer Superyacht: Der Tender fährt längsseits vorbei, im Hintergrund liegt eine weitere Yacht vor der bewaldeten Küste."
                flip
            />

            <CaseChapter
                index="03"
                eyebrow="Der strategische Gedanke"
                headline={<>Nicht lauter.<br /><strong>Genauer.</strong></>}
                text={[
                    'Nicht mit Größe, Leistung und Ausstattung auftreten, sondern die Besonderheiten genauer zeigen: die umlaufende Kufe, anpassbare Carbonteile und verschiedene Antriebe vom Außenborder bis zum elektrischen Jet. Viel Weißraum, präzise Ansichten und einzelne Erklärabschnitte geben diesen Merkmalen Platz.',
                ]}
                image="/images/case-schaaf-strategie-2.webp"
                alt="Studioansicht des Tender 15 von schräg oben: die umlaufende Kufe zeichnet die Kante des Rumpfes nach."
            >
                <CaseTerms items={['Stil', 'Performance', 'Präzision']} />
                <CaseTodo items={['Produktangaben zu Kufe, Carbonteilen und Antriebsoptionen durch Schaaf Yachtbau bestätigen lassen.']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Umsetzung"
                headline={<>Visualisierung,<br />Screendesign<br /><strong>und Print.</strong></>}
                text={[
                    'Studioansichten zeigen Rumpf, Deck und Cockpit, als Grundlage für Entscheidungen über Proportion, Material und Farbe vor dem Bau. Digital gehören Abschnitte zur Kufe und zu den Farbkombinationen dazu; als Print-Anwendungen sind eine Verkaufsbroschüre und ein Manual genannt, die dieselben Gestaltungsregeln tragen.',
                ]}
                wide
            >
                <CaseFigure
                    src="/images/case-schaaf-visualisierung-2.webp"
                    alt="Studioansicht des Tender 15 vor dunklem Grund, Deck und Konsole vollständig sichtbar."
                    caption="Studioansicht des Tender 15: Grundlage für Entscheidungen über Proportion, Material und Farbe."
                />
                <CaseFigure
                    src="/images/case-schaaf-web-hero.webp"
                    alt="Startseite von schaaf-boats.com: über dem großflächigen Bild des fahrenden Tenders steht mittig die Wortmarke Schaaf."
                    caption="Screendesign: Startseite mit Wortmarke über dem Bild."
                />
                <CaseFigure
                    src="/images/case-schaaf-web-farben.webp"
                    alt="Abschnitt Farbkombinationen: sechs Ansichten des Tenders in unterschiedlichen Farbstellungen von White Orange bis Black Grey."
                    caption="Farbkombinationen als sechs Ansichten in einem Abschnitt."
                />
                {/* Gestaltet, nicht gebaut – das gehoert in die Fallstudie, sonst
                    liest sich das Kapitel als Anspruch auf die Umsetzung. */}
                <CaseTerms items={['Screendesign von LinderMedia · technische Umsetzung durch Dritte']} />
                <CaseTodo items={[
                    'Rollenabgrenzung bestätigen: Markenauftritt, Visualisierung, Print und technische Umsetzung (nur das Screendesign ist LinderMedia ausdrücklich zugeschrieben).',
                    'Bestätigung der tatsächlichen Übergabe oder Nutzung von Verkaufsbroschüre und Manual; Nutzungsnachweis.',
                    'Aus dem Layout genommen (Dateien bleiben): ähnliche Gesamt-/Cockpit-Ansichten, die Varianten- und Print-Hintergründe.',
                ]} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Ergebnis und Beleg"
                headline={<>Gestaltung,<br /><strong>die früh sichtbar macht.</strong></>}
                text={[
                    'Belegt ist die dokumentierte Gestaltung: Visualisierungen sollten Entscheidungen über Proportion, Material und Farbe ermöglichen, bevor das Boot im Wasser lag. Broschüre und Manual werden als Anwendungen derselben Markenregeln beschrieben.',
                ]}
                wide
            >
                <CaseTerms items={['Markenauftritt', 'Screendesign', 'Visualisierung', 'Verkaufsbroschüre', 'Manual']} />
                <CaseTodo items={[
                    'Freigegebene Kundenbestätigung oder Projektunterlagen zur Nutzung der Visualisierungen und Printmaterialien.',
                    'Messbare Ergebnisse oder belastbare Rückmeldung, falls über die Gestaltungsarbeit hinaus eine Wirkung genannt werden soll; ohne Beleg keine Aussagen zu Anfragen, Verkäufen oder Wahrnehmung.',
                    'Freigabe von Schaaf Yachtbau für Kundenname, Referenznennung und Bilder.',
                ]} />
                <CaseOutro
                    slug="schaaf-tender"
                    frage="Sie möchten Ihr Produkt klarer zeigen?"
                    ctaLabel="Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
