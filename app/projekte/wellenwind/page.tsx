import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFocus,
    CaseHero,
    CaseOutro,
    CaseTerms,
} from '@/components/sections/CaseChapter'
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

const TITLE = 'Wellenwind — Fallstudie'
const DESCRIPTION =
    'Markenstrategie, Onlineshop und Content für eine Marke mit Küstengeist – eine Bildwelt, die Produkt und Lebensgefühl verbindet.'

export const metadata: Metadata = {
    title: TITLE,
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
                image="/images/case-wellenwind-kampagne-2.webp"
                alt="Startseite des Wellenwind-Onlineshops mit großflächigem Motiv und der Navigation zu den Kollektionen."
                flip
            />

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
            >
                <CaseTerms items={['Eine Marke, die sich nach Meer anfühlt – und bleibt']} />
                <CaseOutro slug="wellenwind" />
            </CaseChapter>
        </main>
    )
}
