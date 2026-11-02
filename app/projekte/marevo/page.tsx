import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseMassnahmen,
    CaseOutro,
    CaseSideScroll,
    CaseTerms,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Marèvo.
 *
 * ENTWURF. Grundlage ist das Screendesign aus `Marevo_Screen-Design.pdf`; die
 * dortigen Texte sind englisch und hier sinngemaess ins Deutsche uebertragen,
 * nicht woertlich uebersetzt – aus einer Produktseite wird eine Fallstudie, die
 * rueckblickend erzaehlt. Die Kapitelfolge ist dieselbe wie bei den anderen
 * Cases (Ausgangslage → Strategie → … → Ergebnis).
 *
 * Die englischen Originalzeilen stehen jeweils als Kommentar an der Stelle, an
 * der sie eingeflossen sind – damit nachvollziehbar bleibt, was aus dem
 * Screendesign stammt und was ich formuliert habe.
 *
 * BILDMATERIAL: Die Hintergruende und die Abbildungen im Screendesign-Kapitel
 * sind Ansichten aus `Marevo_Screen-Design.pdf`. ImageMagick kann das PDF hier
 * nicht rendern (Ghostscript fehlt, und winget kennt kein Paket dafuer) – die
 * Ansichten stammen deshalb aus dem PDF-Viewer von Chrome, ueber Puppeteer
 * durchgeblaettert und abfotografiert (Skript im Scratchpad, `pdf3.js`).
 *
 * Zwei Hintergruende sind perspektivisch angeschnitten (`-distort Perspective`),
 * damit der Entwurf im Hintergrund nicht wie ein flach aufgelegter Screenshot
 * wirkt. Die fehlenden Ecken sind mit dem Seitengrund gefuellt.
 *
 * Die vier Renderings der Yacht liegen weiterhin nicht als Dateien vor.
 */

const TITLE =
    'Marèvo – Premium-Markenentwicklung & Screendesign | LinderMedia'
const DESCRIPTION =
    'Marèvo – Markenidee, Bildwelt und Screendesign-Entwurf für eine Premium-Segelyacht: Die Leitidee „Weiter statt schneller“ als gestalterische Case Study.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/marevo' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/marevo`,
        images: [`${SITE_URL}/images/case-marevo-hero.webp`],
        type: 'article',
    },
}

export default function MarevoPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="marevo"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/case-marevo-hero.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Entwurf · Markenentwicklung · Leitidee · Bildwelt · Screendesign"
                headline={<>Weiter<br /><strong>statt schneller.</strong></>}
                meta="Marèvo · Segelyacht im Premium-Segment"
                text="Der Entwurf positioniert Marèvo über Stimmigkeit, Ausdauer und Zurückhaltung – nicht über Länge oder Tempo."
                note="Gestalterischer Entwurf: Markenidee, Bildwelt und Screendesign."
                image="/images/case-marevo-hero.webp"
                ki
                alt="Die Yacht liegt bei Sonnenuntergang still auf spiegelglattem Wasser, der Horizont geht in Gold über."
            />

            <CaseChapter
                index="02"
                eyebrow="Ausgangslage"
                headline={<>Wenn alle mit denselben<br /><strong>Zahlen werben.</strong></>}
                text={[
                    'Der Entwurf für Marèvo setzt bei der Frage an, wie sich eine Premium-Segelyacht anders als über Länge, Fläche und Tempo erzählen lässt. Das ist eine strategische Ausgangsannahme des Entwurfs, keine Analyse des Wettbewerbs.',
                ]}
                wide
            >
            </CaseChapter>

            <CaseSideScroll>
                <CaseChapter
                    index="03"
                    eyebrow="Strategischer Gedanke"
                    headline={<>Nicht schneller um jeden Preis.<br /><strong>Weiter, weil alles zusammenpasst.</strong></>}
                    text={[
                        '„Weiter statt schneller“ verschiebt den Maßstab. Nicht Zahlen oder Spitzentempo sollen die Geschichte tragen, sondern Stimmigkeit, Ausdauer und Zurückhaltung. Die Leitidee gibt der Marke eine eigene Haltung und führt sie durch Markenbild, Bildwelt und Screendesign weiter.',
                    ]}
                    image="/images/case-marevo-bg-segel.webp"
                    ki
                    alt=""
                    wide
                >
                    <CaseTerms items={['Stimmigkeit', 'Ausdauer', 'Zurückhaltung']} />
                    <CaseFocus
                        headline={<>Weiter statt schneller.</>}
                        text="Der Maßstab ist nicht die Spitze, sondern die Strecke, die man ohne Kompromiss zurücklegt."
                    />
                </CaseChapter>

                <CaseChapter
                    index="04"
                    eyebrow="Maßnahmen"
                    headline={<>Eine Haltung,<br /><strong>übersetzt in einen Auftritt.</strong></>}
                    image="/images/case-marevo-bg-heck.webp"
                    ki
                    alt=""
                    wide
                >
                    <CaseMassnahmen items={[
                        {
                            titel: 'Eine Leitidee entwickelt',
                            text: '„Weiter statt schneller“ ist der Einstieg in die Markenstory. Stimmigkeit, Ausdauer und Zurückhaltung erklären die Haltung dahinter.',
                        },
                        {
                            titel: 'Die Bildwelt darauf ausgerichtet',
                            text: 'Das Yachtmotiv im Abendlicht ist der atmosphärische Einstieg: Ruhe und Weite statt Tempo und Zahlen.',
                        },
                        {
                            titel: 'Die Idee im Screendesign weitergeführt',
                            text: 'Der Auftakt mit der Zeile „Take the long way“ übersetzt die Leitidee in einen digitalen Auftritt.',
                        },
                        {
                            titel: 'Den Status des Projekts klar benannt',
                            text: 'Marèvo ist hier ein gestalterischer Entwurf: Markenidee, Bildwelt und Screendesign als Konzept. Er zeigt keinen abgeschlossenen Marktauftritt.',
                        },
                    ]} />
                </CaseChapter>

                <CaseChapter
                    index="05"
                    eyebrow="Screendesign"
                    headline={<>Die Leitidee<br /><strong>im Auftakt.</strong></>}
                    wide
                >
                    <CaseFigure
                        src="/images/case-marevo-screen-auftakt.webp"
                        alt="Auftakt des Entwurfs: die Zeile „Take the long way“ über einer Yacht im Abendlicht."
                        caption="Screendesign-Entwurf: der Auftakt mit der Leitzeile „Take the long way“."
                    />
                </CaseChapter>

                <CaseChapter
                    index="06"
                    eyebrow="Ergebnis"
                    headline={<>Sichtbar ist<br /><strong>der Entwurf.</strong></>}
                    text={[
                        'Sichtbar ist ein gestalterischer Ansatz für eine eigenständige Premium-Positionierung und seine Übersetzung in Bildwelt und Screendesign.',
                        'Eine gemessene Veränderung der Markenwahrnehmung oder des Geschäftsergebnisses ist damit nicht verbunden.',
                    ]}
                    image="/images/case-marevo-bg-fahrt.webp"
                    ki
                    alt=""
                    wide
                >
                </CaseChapter>
            </CaseSideScroll>

            <section className="csx csx-outro-sec"><div className="csx-inner">
                <CaseOutro
                    slug="marevo"
                    frage="Sie möchten Ihrer Marke eine klare Richtung geben?"
                    ctaLabel="Projekt besprechen"
                />
            </div></section>
        </main>
    )
}
