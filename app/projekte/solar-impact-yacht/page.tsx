import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseHero,
    CaseTrio,
    CaseMassnahmen,
    CaseOutro,
    CaseSideScroll,
    CaseTerms,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Solar Impact Yacht.
 *
 * Hero und vier Kapitel: Ausgangslage, Strategischer Gedanke, Massnahmen,
 * Ergebnis. Bewusst schlank: keine Technik-, Farb- oder Typografie-Kacheln,
 * keine Vergleichsgrafiken (Dateien liegen weiter in public/images). Der
 * fruehere Webauftritt ist nicht mehr oeffentlich zugaenglich und steht
 * deshalb nicht auf der Seite.
 */

const TITLE =
    'Solar Impact Yacht – Positionierung | LinderMedia'
const DESCRIPTION =
    'Solar Impact Yacht als Technologieunternehmen statt als Yachtbauer positioniert: Die mögliche Bedeutung für die Schifffahrt steht vor der technischen Bauweise.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/solar-impact-yacht' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/solar-impact-yacht`,
        images: [`${SITE_URL}/images/case-solarimpact-hero-2.webp`],
        type: 'article',
    },
}

export default function SolarImpactPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="solar-impact-yacht"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/case-solarimpact-hero-2.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Projektarchiv · Markenstrategie · Positionierung"
                headline={<>Nicht als Yachtbauer.<br /><strong>Als Technologieunternehmen.</strong></>}
                text="Die Positionierung stellte die mögliche Bedeutung für die Schifffahrt vor die technische Bauweise."
                image="/images/case-solarimpact-hero-2.webp"
                alt="Die Solar Impact Yacht liegt in der Dämmerung ruhig auf offener See, dahinter eine flache Bergkette."
            />

            <CaseTrio
                herausforderung="Eine neue Technologie braucht einen klaren Platz im Markt. Die Marke sollte nicht allein über ein Yachtmodell oder eine Bauweise wahrgenommen werden."
                ansatz="LinderMedia positionierte Solar Impact als Technologieunternehmen. Die Geschichte beginnt mit der möglichen Veränderung für die Schifffahrt, nicht mit der technischen Erklärung der Bauweise."
                ergebnis="Eine Positionierung und Leitlinie, die die Relevanz der Technologie verständlich macht und über die unmittelbare Produktentwicklung hinaus trägt."
            />

            <CaseChapter
                index="02"
                eyebrow="Ausgangslage"
                headline={<>Eine Technologie,<br />die ihren Platz erst<br /><strong>finden musste.</strong></>}
                text={[
                    'Solar Impact Yacht stand vor einer Positionierungsaufgabe: Die Marke sollte nicht allein über ein einzelnes Yachtmodell oder eine technische Bauweise wahrgenommen werden. Entscheidend war, verständlich zu machen, warum die Technologie für die Schifffahrt relevant sein könnte.',
                ]}
                video="/video/case-solarimpact-swath.mp4"
                wide
            >
            </CaseChapter>

            <CaseSideScroll>
                <CaseChapter
                    index="03"
                    eyebrow="Strategischer Gedanke"
                    headline={<>Mit der Veränderung beginnen,<br /><strong>nicht mit der Bauweise.</strong></>}
                    text={[
                        'Solar Impact wurde als Technologieunternehmen statt als klassischer Yachtbauer positioniert. Die Geschichte beginnt mit der möglichen Veränderung für die Schifffahrt – nicht mit einer technischen Erklärung der Bauweise.',
                        'Eine neue Technologie braucht nicht nur eine Erklärung, sondern auch einen klaren Platz im Markt und eine Geschichte, die über die unmittelbare Produktentwicklung hinaus verständlich ist.',
                    ]}
                    image="/images/case-solarimpact-daemmerung.webp"
                    alt="Solar Impact Yacht in der Dämmerung auf ruhiger See mit leuchtendem Salon"
                    wide
                >
                </CaseChapter>

                <CaseChapter
                    index="04"
                    eyebrow="Maßnahmen"
                    headline={<>Aus der Entscheidung<br /><strong>wurde eine Leitlinie.</strong></>}
                    image="/images/case-solarimpact-keyfacts.webp"
                    alt="Die Solar Impact Yacht auf hellem Grund mit einer Leiste technischer Kennzahlen darunter"
                    wide
                >
                    <CaseMassnahmen items={[
                        {
                            titel: 'Positionierung geschärft',
                            text: 'Die Wahrnehmung verschiebt sich vom Yachtbauer zum Technologieunternehmen. Diese Richtung ist die Grundlage für alles, was die Marke zeigt und sagt.',
                        },
                        {
                            titel: 'Eine übergeordnete Markengeschichte angelegt',
                            text: 'Die Kommunikation stellt die mögliche Bedeutung für die Schifffahrt vor die Funktionsbeschreibung. So wird die strategische Entscheidung zur Leitlinie für den Auftritt.',
                        },
                    ]} />
                </CaseChapter>

                <CaseChapter
                    index="05"
                    eyebrow="Ergebnis"
                    headline={<>Eine neue Perspektive<br /><strong>auf die Schifffahrt.</strong></>}
                    image="/images/case-solarimpact-unterwasser.webp"
                    alt="Die Solar Impact Yacht an der Wasserlinie, unter Wasser sind die schmalen Rümpfe sichtbar"
                    imagePosition="50% 20%"
                    text={[
                        'Die dokumentierte Arbeit zeigt eine strategische Neuausrichtung: Solar Impact Yacht sollte als Technologieunternehmen wahrgenommen werden, das eine neue Perspektive auf die Schifffahrt eröffnet.',
                        'Ein messbarer oder extern bestätigter Effekt liegt für dieses Projekt nicht vor – gezeigt wird deshalb die dokumentierte Arbeit.',
                    ]}
                    wide
                >
                    <CaseTerms items={['Markenstrategie', 'Positionierung', 'Markengeschichte']} />
                </CaseChapter>
            </CaseSideScroll>

            <section className="csx csx-outro-sec"><div className="csx-inner">
                <CaseOutro
                    slug="solar-impact-yacht"
                    frage="Sie möchten eine komplexe Technologie klar positionieren?"
                    ctaLabel="Ein ähnliches Projekt besprechen"
                />
            </div></section>
        </main>
    )
}
