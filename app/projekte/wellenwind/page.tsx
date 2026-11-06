import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseTrio,
    CaseMassnahmen,
    CaseOutro,
    CaseTerms,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Wellenwind.
 *
 * PROJEKTARCHIV. Projektname und Arbeit duerfen gezeigt werden, sofern
 * Bildmaterial und Markenverwendung freigegeben sind; externe Kundenlinks sind
 * nicht erforderlich. Der Archivhinweis steht sichtbar im Auftakt.
 *
 * Bildmaterial: Standbilder aus public/video/ww_promo.mp4 (Sekunden siehe
 * scripts/to-webp.sh). Bewusst Momente ohne die eingebrannten Kampagnen-
 * Schriftzuege gewaehlt – neben den eigenen Ueberschriften der Seite wuerden
 * sie doppeln. Der Master liegt nur in 800x450 vor.
 */

const TITLE =
    'Wellenwind – Markenaufbau & Onlineshop | LinderMedia'
const DESCRIPTION =
    'Markenstrategie, Bildwelt, Onlineshop und Content-System für die maritime Lifestyle-Marke Wellenwind: ein stimmiger Markenauftritt vom Konzept bis zum Shop.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/wellenwind' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/wellenwind`,
        images: [`${SITE_URL}/images/wellenwind.webp`],
        type: 'article',
    },
}

export default function WellenwindPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="wellenwind"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/wellenwind.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Projektarchiv · Markenstrategie · Onlineshop · Content"
                headline={<>Eine Marke für<br /><strong>Küste und Alltag.</strong></>}
                meta="Wellenwind · Sea-licious Funwear"
                text="Wellenwind sollte nicht vor allem über den Preis erkennbar werden. Eine gemeinsame Haltung zu Segeln und Küstenalltag verbindet Bildwelt, Shop und Content."
                image="/images/wellenwind.webp"
                alt="Drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke."
            />

            <CaseTrio
                herausforderung="Eine neue Segel-Lifestyle-Marke muss erkennbar werden, ohne sich vor allem über den Preis zu behaupten. Wellenwind sollte mehr erzählen als das einzelne Kleidungsstück."
                ansatz="LinderMedia entwickelte eine gemeinsame Haltung zu Segeln und Küstenalltag und trug sie in Bildwelt, Onlineshop und Content. Produkte werden im Nutzungskontext gezeigt, nicht nur als Artikel."
                ergebnis="Ein stimmiger Markenauftritt, der Produktdarstellung, Shop und Inhalte an jedem Kontaktpunkt zusammenhält und die Marke wiedererkennbar macht."
            />

            <CaseChapter
                index="02"
                eyebrow="Ausgangslage"
                headline={<>Erkennbar werden,<br /><strong>ohne über den Preis zu gehen.</strong></>}
                text={[
                    'Eine neue Segel-Lifestyle-Marke muss zunächst erkennbar werden. Wellenwind sollte sich von etablierten Segelmarken abgrenzen, ohne vor allem über den Preis zu konkurrieren. Die Marke sollte mehr erzählen als das einzelne Kleidungsstück.',
                ]}
                wide
            >
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Strategischer Gedanke"
                headline={<>Nicht nur maritim.<br /><strong>Sondern eine Haltung.</strong></>}
                text={[
                    'Wellenwind wird nicht nur als Segelbekleidung gezeigt, sondern als Marke mit eigener Haltung zu Segeln und Küstenalltag. Diese Idee soll sich an den relevanten Kontaktpunkten wiederfinden: in der Produktdarstellung, im Onlineshop und in den Inhalten.',
                ]}
                image="/images/case-wellenwind-strategie-2.webp"
                alt="Drei Personen in Wellenwind-Hoodies gehen an einer Hafenpromenade entlang, die Rückenmotive gut sichtbar."
                flip
            >
                <CaseTerms items={['Küstengeist', 'Leichtigkeit', 'Wiedererkennung']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Maßnahmen"
                headline={<>Dieselbe Haltung<br /><strong>an jedem Kontaktpunkt.</strong></>}
                wide
            >
                <CaseMassnahmen items={[
                    {
                        titel: 'Eine Bildwelt mit Produkt und Nutzungskontext',
                        text: 'Produktmotive und Menschen in Wellenwind-Kleidung zeigen die Marke nicht nur als Artikel, sondern im maritimen Alltag.',
                    },
                    {
                        titel: 'Den Onlineshop in die Markendarstellung eingebunden',
                        text: 'Der Shop übernimmt dieselbe Bildsprache: Menschen am Wasser statt reiner Produktfreisteller.',
                        children: (
                            <CaseFigure
                                src="/images/case-wellenwind-kampagne-2.webp"
                                alt="Ausschnitt aus dem Wellenwind-Onlineshop: Hoodies an der Kleiderstange und darunter drei Motive mit Menschen in Wellenwind-Kleidung am Hafen."
                                caption="Onlineshop: dieselbe Bildsprache wie in Kampagne und Social Content."
                            />
                        ),
                    },
                    {
                        titel: 'Kampagnen- und Social-Content als Kontaktpunkte',
                        text: 'Kampagnenmotive und Social Content greifen die Bildwelt des Shops auf, damit die Marke überall gleich erkennbar bleibt.',
                    },
                ]} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Ergebnis"
                headline={<>Ein zusammenhängender<br /><strong>Markenauftritt.</strong></>}
                text={[
                    'Produktdarstellung, Bildwelt und Shop folgen einer gemeinsamen visuellen Richtung. Das ist das sichtbare Ergebnis der dokumentierten Arbeit.',
                    'Wirkungsdaten oder Geschäftsergebnisse liegen dafür nicht vor – gezeigt wird deshalb die dokumentierte Arbeit.',
                ]}
                wide
            >
                <CaseTerms items={['Markenstrategie', 'Bildwelt', 'Onlineshop', 'Social Content']} />
                <CaseOutro
                    slug="wellenwind"
                    frage="Sie planen einen Markenauftritt? Erzählen Sie uns, wo Ihre Marke heute steht."
                    ctaLabel="Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
