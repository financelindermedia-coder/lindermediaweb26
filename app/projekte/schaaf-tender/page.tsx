import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseOutro,
    CaseTerms,
} from '@/components/sections/CaseChapter'
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

const TITLE = 'Schaaf Tender — Fallstudie'
const DESCRIPTION =
    'Markenauftritt für einen Superyacht-Tender: Screendesign, Visualisierung und Print für ein Boot, das sich über Details unterscheidet.'

export const metadata: Metadata = {
    title: TITLE,
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
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Markenauftritt · Screendesign · Visualisierung · Print"
                headline={<>Der feine<br /><strong>Unterschied.</strong></>}
                meta="Schaaf Yachtbau · Superyacht-Tender"
                text="Ein Markenauftritt für ein Boot, das sich nicht über Größe unterscheidet, sondern über Details."
                image="/images/case-schaaf-hero-2.webp"
                alt="Ein dunkler Schaaf-Tender schiebt sich in voller Fahrt durch die Gischt, der Rumpf hebt sich aus dem Wasser."
            />

            <CaseChapter
                index="01"
                eyebrow="Die Ausgangslage"
                headline={<>Ein Tender ist mehr<br /><strong>als ein Beiboot.</strong></>}
                text={[
                    'An Bord einer Superyacht ist der Tender vieles: Zubringer, Sportgerät und oft das Erste, was Gäste betreten. Ausgewählt wird er trotzdem meist wie Zubehör – nach Maß, Gewicht und Motorisierung.',
                    'Schaaf Yachtbau baut Tender, die diesen Anspruch umkehren. Die Aufgabe war, dieser Haltung eine sichtbare Form zu geben – zu einem Zeitpunkt, als noch nicht jedes Modell auf dem Wasser lag.',
                ]}
                image="/images/case-schaaf-ausgangslage-2.webp"
                alt="Blick vom Teakdeck einer Superyacht: Der Tender fährt längsseits vorbei, im Hintergrund liegt eine weitere Yacht vor der bewaldeten Küste."
                flip
            />

            <CaseChapter
                index="02"
                eyebrow="Die Strategie"
                headline={<>Nicht lauter.<br /><strong>Genauer.</strong></>}
                text={[
                    'Der Unterschied liegt in Details, die erst beim zweiten Blick auffallen: die umlaufende Kufe, mit der sich das Boot auf jeder Badeplattform sicher abstellen lässt. Carbonteile, deren Farbe sich anpassen lässt. Antriebe vom Außenborder bis zum elektrischen Jet.',
                    'Daraus wurde die Leitidee des Auftritts. Sie verlangt keine großen Worte, sondern eine Darstellung, die genau genug ist, damit die Details überhaupt sichtbar werden.',
                ]}
                image="/images/case-schaaf-strategie-2.webp"
                alt="Studioansicht des Tender 15 von schräg oben: die umlaufende Kufe zeichnet die Kante des Rumpfes nach."
            >
                <CaseTerms items={['Stil', 'Performance', 'Präzision']} />
                <CaseFocus
                    headline={<>Be different.</>}
                    text="Der Unterschied liegt nicht in der Größe, sondern in den Details, die man erst beim zweiten Blick bemerkt."
                />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Die Visualisierung"
                headline={<>Sichtbar,<br />bevor es<br /><strong>zu Wasser ging.</strong></>}
                text={[
                    'Bevor ein Boot gebaut ist, muss es zu sehen sein. Studioansichten zeigen Rumpf, Deck und Cockpit so genau, dass sich daran entscheiden lässt – über Proportionen, Materialien und Farben.',
                    'Die Visualisierung ist damit keine Illustration des Fertigen, sondern ein Werkzeug davor: Sie macht verhandelbar, was sonst erst am gebauten Boot sichtbar geworden wäre.',
                ]}
                image="/images/case-schaaf-cockpit-2.webp"
                alt="Das gebaute Cockpit in Nahaufnahme: Steuerrad, Bedienfeld und die scharfe Kante der Konsole."
                flip
            >
                <CaseFigure
                    src="/images/case-schaaf-visualisierung-2.webp"
                    alt="Studioansicht des Tender 15 vor dunklem Grund, Deck und Konsole vollständig sichtbar."
                    caption="Studioansichten des Tender 15 – Grundlage für Entscheidungen über Proportion, Material und Farbe."
                />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Das Screendesign"
                headline={<>Viel Weißraum.<br /><strong>Ein Boot.</strong></>}
                text={[
                    'Der digitale Auftritt folgt derselben Zurückhaltung wie alles andere: eine Wortmarke, viel Weißraum, großflächige Bilder – und ein Aufbau, der die Details der Reihe nach erklärt statt sie aufzuzählen.',
                    'Ein eigener Abschnitt gilt der umlaufenden Kufe, ein weiterer den Farbkombinationen: Jedes Boot lässt sich in den Carbonteilen anpassen, und die Seite zeigt das, statt es zu behaupten.',
                ]}
                image="/images/case-schaaf-varianten-2.webp"
                alt=""
                wide
            >
                <CaseFigure
                    src="/images/case-schaaf-web-hero.webp"
                    alt="Startseite von schaaf-boats.com: über dem großflächigen Bild des fahrenden Tenders steht mittig die Wortmarke Schaaf."
                    caption="Startseite – die Wortmarke über dem Bild, sonst nichts."
                />
                <CaseFigure
                    src="/images/case-schaaf-web-farben.webp"
                    alt="Abschnitt Farbkombinationen: sechs Ansichten des Tenders in unterschiedlichen Farbstellungen von White Orange bis Black Grey."
                    caption="Farbkombinationen: sechs Stellungen, jede als eigene Ansicht statt als Farbfeld."
                />
                {/* Gestaltet, nicht gebaut – das gehoert in die Fallstudie, sonst
                    liest sich das Kapitel als Anspruch auf die Umsetzung. */}
                <CaseTerms items={['Screendesign von LinderMedia · technische Umsetzung durch Dritte']} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Die Anwendung"
                headline={<>Was nach dem<br />Gespräch<br /><strong>dableibt.</strong></>}
                text={[
                    'Im Superyacht-Umfeld entscheidet das Gedruckte mit. Die Verkaufsbroschüre führt vom Claim über die beiden Modelle bis zum Ausblick auf den Tender 24 – zurückhaltend gesetzt, mit viel Weißraum und dem Boot als einzigem Akzent.',
                    'Dieselben Regeln gelten für das Manual: Auch die technische Dokumentation folgt den Richtlinien der Marke. Wer ein Boot übernimmt, bekommt kein Handbuch, das aus einer anderen Welt zu stammen scheint – Verkauf und Betrieb sprechen dieselbe Sprache.',
                ]}
                image="/images/case-schaaf-print-bg-4.webp"
                alt=""
                wide
            >
                <CaseTerms items={['Verkaufsbroschüre', 'Manual', 'eine Regel für beides']} />
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Das Ergebnis"
                headline={<>Eine Marke, die sich erklärt,<br /><strong>bevor sie im Wasser liegt.</strong></>}
                text={[
                    'Screendesign, Visualisierung und Print tragen dieselbe Haltung. Der Auftritt zeigt ein Boot, dessen Qualität in Details liegt – und macht diese Details früh genug sichtbar, um darüber zu sprechen.',
                ]}
                image="/images/case-schaaf-ergebnis-2.webp"
                alt="Der weiße Tender in Fahrt vor der Küste, eine Person steht aufrecht am Steuer."
            >
                <CaseOutro slug="schaaf-tender" />
            </CaseChapter>
        </main>
    )
}
