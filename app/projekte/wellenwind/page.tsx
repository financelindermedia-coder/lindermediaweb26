import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseImpact,
    CaseOutro,
    CaseTerms,
    CaseTurn,
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
                headline={<>Eine Marke<br /><strong>mit Küstengeist.</strong></>}
                meta="Wellenwind · Sea-licious Funwear"
                text="Marke, Onlineshop und Content wurden zusammengeführt – zu einem Auftritt, der über alle Berührungspunkte hinweg dieselbe Haltung vermittelt."
                note="Diese Fallstudie dokumentiert die im Projekt entstandene Strategie, Gestaltung und Content-Arbeit."
                image="/images/wellenwind.webp"
                alt="Drei Hoodies in Hellblau, Weiß und Türkis vor dunklem Grund, daneben die Wellenwind-Wortmarke."
            />

            <CaseChapter
                index="01"
                eyebrow="Die Ausgangslage"
                headline={<>Eine Marke, die sich<br /><strong>nach Meer anfühlt.</strong></>}
                text={[
                    'Wellenwind brachte Marke, Onlineshop und Content zusammen. Die Aufgabe bestand darin, daraus einen Auftritt zu entwickeln, der nicht nur einzelne Produkte zeigt, sondern über alle Berührungspunkte hinweg eine erkennbare Haltung vermittelt.',
                    'Entscheidend war, dass sich die Marke in der strategischen Richtung, im Einkaufserlebnis und in der laufenden Kommunikation gleich anfühlt.',
                ]}
                image="/images/case-wellenwind-ausgangslage-2.webp"
                alt="Zwei Segler am Steuerrad einer Yacht in Fahrt, Gischt schlägt über die Bordwand."
            />

            <CaseTurn
                frage={<>Wie behauptet sich eine neue Marke<br />zwischen etablierten Segelmarken,<br /><strong>ohne über den Preis zu konkurrieren?</strong></>}
                nicht="eine weitere Marke für Segelbekleidung sein."
                sondern={<>eine Haltung,<br />die auch an Land trägt.</>}
                begruendung="Über Produktmerkmale lässt sich in diesem Markt nichts gewinnen – Material, Schnitt und Preis sind vergleichbar. Ein Lebensgefühl ist es nicht. Deshalb stand am Anfang nicht das Kleidungsstück, sondern die Frage, welche Momente die Marke miteinander verbinden."
                folgen={[
                    'Küstengeist statt Segelsport: Die Marke funktioniert auch abseits des Wassers.',
                    'Eine Bildwelt aus Momenten statt aus Produktaufnahmen.',
                    'Shop, Kampagne und Social Content entstehen aus derselben Quelle.',
                    'Ein Rahmen, der neue Produkte aufnimmt, ohne sich jedes Mal neu erklären zu müssen.',
                ]}
            />

            <CaseChapter
                index="02"
                eyebrow="Die Strategie"
                headline={<>Nicht nur maritim.<br /><strong>Sondern eine Haltung.</strong></>}
                text={[
                    'Wellenwind sollte nicht als beliebige Mode- oder Produktmarke auftreten. Die Marke brauchte eine eigene Haltung, die sich im Alltag genauso selbstverständlich anfühlt wie an Bord, am Hafen oder auf dem Weg ans Wasser.',
                    'Deshalb stand nicht ein einzelnes Kleidungsstück im Mittelpunkt, sondern die Frage, welche Momente die Marke miteinander verbinden. Aus dieser Richtung entstand ein klarer Rahmen für Bildwelt, Sprache, Produkte und Inhalte: entspannt, maritim und mit einer eigenen, wiedererkennbaren Leichtigkeit.',
                    'Die Strategie sorgt dafür, dass Onlineshop, Kampagne und Social Content nicht nebeneinanderstehen. Sie erzählen dieselbe Geschichte – nur in unterschiedlichen Formaten.',
                ]}
                image="/images/case-wellenwind-strategie-2.webp"
                alt="Drei Personen in Wellenwind-Hoodies gehen an einer Hafenpromenade entlang, die Rückenmotive gut sichtbar."
                flip
            >
                <CaseTerms items={['Küstengeist', 'Leichtigkeit', 'Wiedererkennung']} />
                <CaseFocus
                    headline={<>Eine Haltung,<br />keine Kulisse.</>}
                    text="Wellenwind verbindet Produkt, Küste und Alltag zu einer Bildwelt, die nicht nur nach Meer aussieht, sondern sich danach anfühlt."
                />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Die Bildwelt"
                headline={<>Produkte werden<br /><strong>zu Momenten.</strong></>}
                text={[
                    'Die Bildwelt verbindet Produkt, Menschen und maritime Situationen. Kleidung wird nicht isoliert gezeigt, sondern als Teil von Momenten, die Nähe zum Wasser, Bewegung und alltägliche Freiheit vermitteln.',
                    'So entsteht eine visuelle Sprache, die im Onlineshop funktioniert und zugleich genug Charakter für Kampagnen, Social Content und Bewegtbild trägt.',
                ]}
                image="/images/case-wellenwind-bildwelt-2.webp"
                alt="Drei Hoodies auf Bügeln vor dunklem Grund: Ship Happens, Regatta und ein orangefarbenes Modell."
            />

            <CaseChapter
                index="04"
                eyebrow="Kampagne & Content"
                headline={<>Ein Auftritt, der<br /><strong>weitererzählt wird.</strong></>}
                text={[
                    'Shop, Kampagnenmotive und Bewegtbild greifen dieselbe Bildsprache auf. Ein Motiv am Hafen, ein vertikales Social-Video oder ein Produkt im Shop gehören sichtbar zur selben Marke.',
                    'Dadurch kann Wellenwind in unterschiedlichen Formaten präsent sein, ohne sich mit jeder neuen Maßnahme neu erklären zu müssen.',
                ]}
                // Grund ist der Instagram-Auftritt der Marke, perspektivisch
                // angeschnitten – das Kapitel handelt genau davon, dass dieselbe
                // Bildsprache in jedem Format wiederkehrt. Aufgenommen von
                // instagram.com/wellenwind.shop (siehe Bildnachweis unten).
                image="/images/case-wellenwind-social-bg.webp"
                alt=""
                wide
            >
                <CaseFigure
                    src="/images/case-wellenwind-kampagne-2.webp"
                    alt="Startseite des Wellenwind-Onlineshops mit großflächigem Motiv und der Navigation zu den Kollektionen."
                    caption="Der Onlineshop – dieselbe Bildsprache wie im Feed, nur in einem anderen Format."
                />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Das Ergebnis"
                headline={<>Aus einzelnen Motiven<br />wurde eine Marke,<br /><strong>die weitererzählt wird.</strong></>}
                text={[
                    'Aus der strategischen Richtung entstand ein zusammenhängender Markenauftritt: eine Bildwelt, die Produkt und Lebensgefühl verbindet, ein Onlineshop mit erkennbarem Charakter und Kampagnenmotive, die auch außerhalb des Shops funktionieren.',
                    'Das Ergebnis ist kein einzelner Launch, sondern ein Rahmen, der der Marke Raum für neue Produkte, saisonale Kampagnen und fortlaufenden Content gibt.',
                ]}
                image="/images/case-wellenwind-ergebnis-2.webp"
                alt="Eine Seglerin im Hoodie mit dem Motiv Sea of Life an Bord, dahinter glitzert das Wasser."
                // Die Seglerin steht bei rund 78 % der Bildbreite. Der Rahmen ist
                // deutlich schmaler als das 16:9-Material, mittig zugeschnitten
                // blieb von ihr nur die Schulter am rechten Rand.
                imagePosition="85% center"
            >
                <CaseTerms items={['Eine Marke, die sich nach Meer anfühlt – und bleibt']} />
                <CaseImpact
                    ziel="Wiedererkennbar werden, bevor das Sortiment wächst."
                    strategie="Content nicht als Produktwerbung führen, sondern als wiedererkennbare Themenwelt."
                    massnahmen={['Markenstrategie', 'Bildwelt', 'Onlineshop', 'Kampagnenmotive', 'Social Content']}
                    wirkung="Produkt, Shop und Content gehören sichtbar zur selben Marke. Jede neue Maßnahme zahlt auf das Bestehende ein, statt bei null anzufangen – die Marke wird mit jedem Motiv erkennbarer statt beliebiger."
                />
                <p className="csx-bildnachweis">
                    Der flächige Grund im Kapitel „Kampagne &amp; Content“ ist eine
                    Aufnahme des Instagram-Auftritts der Marke
                    (instagram.com/wellenwind.shop, August 2026); die Beiträge
                    stammen aus dem Projekt, die Oberfläche darum von Instagram.
                </p>
                <CaseOutro slug="wellenwind" />
            </CaseChapter>
        </main>
    )
}
