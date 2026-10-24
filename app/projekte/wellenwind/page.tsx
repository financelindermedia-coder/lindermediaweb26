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
    'Wellenwind – Markenaufbau, Onlineshop & Content | LinderMedia'
const DESCRIPTION =
    'Markenstrategie, Bildwelt, Onlineshop und Content-System für die maritime Lifestyle-Marke Wellenwind.'

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
                text="Wellenwind verbindet Segel-Lifestyle mit Kleidung für den Alltag. Die Fallstudie dokumentiert eine gemeinsame Richtung für Markenbild, Onlineshop und Content."
                image="/images/wellenwind.webp"
                alt="Drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Erkennbar werden,<br /><strong>ohne über den Preis zu gehen.</strong></>}
                text={[
                    'Wie wird eine neue Segelmarke erkennbar, ohne sich vor allem über den Preis abzugrenzen? Der Ausgangspunkt war eine Haltung, die über einzelne Produkte hinausgeht.',
                ]}
                wide
            >
                <CaseTodo items={['Von Wellenwind bestätigte Ausgangslage und Zielsetzung, idealerweise als freigegebene Kundenformulierung.']} />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Der strategische Gedanke"
                headline={<>Nicht nur maritim.<br /><strong>Sondern eine Haltung.</strong></>}
                text={[
                    'Nicht nur Segelbekleidung zeigen, sondern Küstengeist und Leichtigkeit als verbindende Themen nutzen. So kann die Marke auch Momente an Land erzählen.',
                ]}
                image="/images/case-wellenwind-strategie-2.webp"
                alt="Drei Personen in Wellenwind-Hoodies gehen an einer Hafenpromenade entlang, die Rückenmotive gut sichtbar."
                flip
            >
                <CaseTerms items={['Küstengeist', 'Leichtigkeit', 'Wiedererkennung']} />
                <CaseTodo items={['Freigegebene Positionierung, Zielgruppe und konkrete Markenbotschaft.']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Umsetzung"
                headline={<>Bildwelt, Shop<br />und Content<br /><strong>aus einer Quelle.</strong></>}
                text={[
                    'Dokumentiert sind eine Bildwelt mit Produkten, Menschen und maritimen Situationen, ein Onlineshop-Auftritt sowie Kampagnenmotive, Social Content und Bewegtbild. Shop und Inhalte folgen derselben Bildsprache.',
                ]}
                wide
            >
                <CaseFigure
                    src="/images/case-wellenwind-kampagne-2.webp"
                    alt="Startseite des Wellenwind-Onlineshops mit großflächigem Motiv und der Navigation zu den Kollektionen."
                    caption="Onlineshop: dieselbe Bildsprache wie in Kampagne und Social Content."
                />
                <CaseTodo items={[
                    'Genaue, von Wellenwind bestätigte Leistungen und LinderMedias jeweilige Rolle (Strategie, Gestaltung, Foto/Film, Shop, Content).',
                    'Nutzungsrechte, Projektzuordnung und Veröffentlichungsfreigabe für jedes Medium; aktuellen Shop-Stand prüfen.',
                    'Instagram-Feed-Hintergrund (August 2026) wurde aus dem Layout genommen; nur mit konkretem, freigegebenem Einzelmotiv wieder einsetzen.',
                ]} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Ergebnis und Beleg"
                headline={<>Ein zusammenhängender<br /><strong>Markenauftritt.</strong></>}
                text={[
                    'Entstanden ist ein Markenauftritt für Shop, Kampagne und Social Content. Unabhängige Wirkungsdaten oder belegte Geschäftsergebnisse liegen dafür nicht vor – gezeigt wird deshalb die dokumentierte Arbeit.',
                ]}
                image="/images/case-wellenwind-ergebnis-2.webp"
                alt="Eine Seglerin im Hoodie mit dem Motiv Sea of Life an Bord, dahinter glitzert das Wasser."
                // Die Seglerin steht bei rund 78 % der Bildbreite; mittig
                // zugeschnitten bliebe von ihr nur die Schulter am Rand.
                imagePosition="85% center"
            >
                <CaseTerms items={['Markenstrategie', 'Bildwelt', 'Onlineshop', 'Kampagnenmotive', 'Social Content']} />
                <CaseTodo items={[
                    'Nachprüfbarer Wirkungsbeleg (Vorher/Nachher, Shop-Kennzahlen mit Zeitraum und Vergleichsbasis oder freigegebenes Kundenzitat); ohne Beleg keine Erfolgsbehauptung.',
                    'Aussage zum nachhaltigen Druck nur als Profilangabe kennzeichnen oder belegen; keine Zertifizierung suggerieren (hier nicht verwendet).',
                    'Kundenname, Zitate, Fotos, Videos und Posts freigeben; ggf. Personenfreigaben.',
                ]} />
                <CaseOutro
                    slug="wellenwind"
                    frage="Sie planen einen Markenauftritt? Erzählen Sie uns, wo Ihre Marke heute steht."
                    ctaLabel="Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
