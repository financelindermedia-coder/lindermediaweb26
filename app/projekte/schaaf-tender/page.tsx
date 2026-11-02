import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseHero,
    CaseOutro,
    CaseSideScroll,
    CaseTerms,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Schaaf Yachtbau (Tender).
 *
 * Die Texte stammen aus der Vorlage von Andreas (2026-11-02). Die Angaben zum
 * Produkt stammen urspruenglich von schaaf-boats.com (Tender 15 und 24,
 * umlaufende Kufe, Carbonteile, Antriebe vom Aussenborder bis zum E-Jet).
 *
 * Leistungen laut Andreas: Screendesign und alles Weitere – ausgenommen ist
 * allein die Programmierung.
 *
 * Bildmaterial (Sekunden siehe scripts/to-webp.sh):
 *   video/VID_20200912_160853683.mp4  1920x1080  echte Fahraufnahmen
 *   video/Studio T15 web.mp4          1280x682   Studio-Renderings
 *   video/schaaf.mp4                   800x450   nur hier: Yachtdeck und Broschuere
 *
 * Die Screendesign-Abbildungen (case-schaaf-web-*.webp) liegen weiter in
 * public/images, stehen aber nicht mehr auf der Seite.
 */

const TITLE =
    'Schaaf Yachtbau – Markenstrategie, Screendesign & 3D-Visualisierung | LinderMedia'
const DESCRIPTION =
    'Markenstrategie, Webstrategie, Screendesign, 3D-Visualisierung, Produktfotografie und Marketing für Schaaf Yachtbau: Produkte, die für sich sprechen.'

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
                kicker="Case Study · Markenstrategie · Webstrategie · Screendesign · 3D-Visualisierung · Produktfotografie · Marketing"
                headline={<>Produkte, die<br /><strong>für sich sprechen.</strong></>}
                meta="Schaaf Yachtbau"
                text="Ein hochwertiger Tender ist mehr als ein Beiboot. Er verbindet Funktion, Design und technische Präzision. Für Schaaf Yachtbau entstand ein Marken- und Kommunikationsauftritt, der genau diese Eigenschaften sichtbar macht – digital, visuell und in klassischen Printmedien."
                image="/images/case-schaaf-hero-2.webp"
                alt="Ein dunkler Schaaf-Tender schiebt sich in voller Fahrt durch die Gischt, der Rumpf hebt sich aus dem Wasser."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Ein Produkt mit Charakter.<br /><strong>Ein Auftritt mit Anspruch.</strong></>}
                text={[
                    'Schaaf Yachtbau entwickelt hochwertige Tender für anspruchsvolle Yachtbesitzer. Die Besonderheiten liegen nicht allein in den technischen Daten, sondern vor allem in der Konstruktion, den verwendeten Materialien und den individuellen Ausstattungsmöglichkeiten.',
                    'Die Herausforderung bestand darin, diese Qualität auch in der Kommunikation erlebbar zu machen. Das Produkt sollte nicht einfach präsentiert, sondern verständlich, hochwertig und emotional inszeniert werden.',
                ]}
                image="/images/case-schaaf-ausgangslage-2.webp"
                alt="Blick vom Teakdeck einer Superyacht: Der Tender fährt längsseits vorbei, im Hintergrund liegt eine weitere Yacht vor der bewaldeten Küste."
                flip
            />

            <CaseSideScroll>
                <CaseChapter
                    index="03"
                    eyebrow="Die Strategie"
                    headline={<>Qualität<br /><strong>sichtbar machen.</strong></>}
                    text={[
                        'Am Anfang stand die Frage, wie sich ein technisch anspruchsvolles Produkt überzeugend positionieren lässt.',
                        'Die digitale Kommunikation sollte die Besonderheiten der Tender verständlich vermitteln, Vertrauen schaffen und Interessenten gezielt durch die Produktwelt führen.',
                        'Daraus entstand ein Konzept, das Markenpositionierung, Produktkommunikation und visuelle Inszenierung miteinander verbindet.',
                    ]}
                    image="/images/case-schaaf-strategie-2.webp"
                    alt="Studioansicht des Tender 15 von schräg oben: die umlaufende Kufe zeichnet die Kante des Rumpfes nach."
                />

                <CaseChapter
                    index="04"
                    eyebrow="Der digitale Auftritt"
                    headline={<>Eine Website,<br /><strong>die das Produkt versteht.</strong></>}
                    text={[
                        'Das Screendesign übersetzt die gestalterische und technische Qualität der Tender in eine klare digitale Bildsprache.',
                        'Großzügige Bildwelten, reduzierte Gestaltung und eine nachvollziehbare Informationsarchitektur geben den Produkten den Raum, den sie verdienen.',
                        'Produktmerkmale, Ausstattungsoptionen, Materialien und technische Besonderheiten werden strukturiert vermittelt. So wird aus einer klassischen Unternehmenswebsite eine digitale Präsentationsfläche für die Marke und ihre Produkte.',
                    ]}
                    image="/images/case-schaaf-cockpit-2.webp"
                    alt=""
                    wide
                />

                <CaseChapter
                    index="05"
                    eyebrow="Produktvisualisierung"
                    headline={<>Sichtbar,<br /><strong>bevor es schwimmt.</strong></>}
                    text={[
                        '3D-Visualisierungen machen die Tender unabhängig von Produktionsstand und Aufnahmebedingungen erlebbar.',
                        'Unterschiedliche Perspektiven, Materialvarianten, Farbkombinationen und Ausstattungsdetails lassen sich bereits vor dem fertigen Produkt darstellen.',
                        'Die Visualisierungen dienen nicht nur der Präsentation, sondern auch als Grundlage für gestalterische und konzeptionelle Entscheidungen.',
                    ]}
                    image="/images/case-schaaf-varianten-2.webp"
                    alt=""
                    wide
                />

                <CaseChapter
                    index="06"
                    eyebrow="Produktfotografie"
                    headline={<>Details, die<br /><strong>den Unterschied machen.</strong></>}
                    text={[
                        'Hochwertige Produktfotografie zeigt, was eine Visualisierung allein nicht vermitteln kann: echte Materialien, Oberflächen, Verarbeitung und die Wirkung des Produkts im Wasser.',
                        'Die Bildsprache verbindet technische Präzision mit emotionaler Inszenierung. So entstehen Motive für Website, Verkaufsunterlagen und Marketingkommunikation.',
                    ]}
                    image="/images/case-schaaf-ergebnis-2.webp"
                    alt=""
                    wide
                />

                <CaseChapter
                    index="07"
                    eyebrow="Marketing und Kommunikation"
                    headline={<>Aus Produktqualität wird<br /><strong>Markenkommunikation.</strong></>}
                    text={[
                        'Ein konsistenter Markenauftritt endet nicht bei der Website.',
                        'Die visuelle Gestaltung und die entwickelten Kommunikationsmittel schaffen eine einheitliche Grundlage für die Präsentation der Produkte – von digitalen Medien über Verkaufsbroschüren bis hin zu Produktdokumentationen und Manuals.',
                    ]}
                    image="/images/case-schaaf-print-bg-4.webp"
                    alt=""
                    wide
                />

                <CaseChapter
                    index="08"
                    eyebrow="Das Ergebnis"
                    headline={<>Ein Auftritt<br /><strong>aus einem Guss.</strong></>}
                    text={[
                        'Strategie, Screendesign, Visualisierung und Fotografie greifen ineinander. Das Ergebnis ist eine Produktkommunikation, die technische Eigenschaften verständlich macht und den gestalterischen Anspruch von Schaaf Yachtbau transportiert.',
                    ]}
                    image="/images/case-schaaf-visualisierung-2.webp"
                    alt=""
                    wide
                >
                    <CaseTerms items={[
                        'Markenstrategie', 'Webstrategie', 'Screendesign', 'Digitale Kommunikation',
                        '3D-Produktvisualisierung', 'Produktfotografie', 'Marketing', 'Verkaufsbroschüre', 'Produktmanual',
                    ]} />
                </CaseChapter>
            </CaseSideScroll>

            <section className="csx csx-outro-sec"><div className="csx-inner">
                <CaseOutro
                    slug="schaaf-tender"
                    frage="Sie möchten Ihr Produkt überzeugender präsentieren?"
                    ctaLabel="Projekt besprechen"
                />
            </div></section>
        </main>
    )
}
