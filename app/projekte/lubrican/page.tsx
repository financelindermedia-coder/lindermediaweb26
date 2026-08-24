import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFocus,
    CaseHero,
    CaseImpact,
    CaseOutro,
    CaseTerms,
    CaseTurn,
} from '@/components/sections/CaseChapter'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie LubriCan.
 *
 * ARBEITSFASSUNG. Vor dem Livegang gegen die Projektdokumentation pruefen:
 * Produktkategorien, Bildmaterial, Shop-Screens und die konkrete Ausgangslage.
 * Die Texte stammen aus der Vorlage von Andreas und sind bewusst frei von
 * Leistungskennzahlen, solange nichts davon belegt ist.
 *
 * Bildmaterial: Standbilder aus public/video/lc_promo.mp4 (Sekunden siehe
 * scripts/to-webp.sh). Der Master liegt nur in 800x450 vor – fuer die
 * halbseitigen Kapitelbilder ist das die Untergrenze. Sobald hoeher aufgeloestes
 * Material vorliegt, nur die .jpg-Originale ersetzen und to-webp.sh laufen
 * lassen; die Seite bleibt unveraendert.
 */

const TITLE = 'LubriCan — Fallstudie'
const DESCRIPTION =
    'Ein klarer Marken- und Shopauftritt für ein technisches Produkt: Qualität, Orientierung und Vertrauen gehören von Anfang an zusammen.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/lubrican' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/lubrican`,
        images: [`${SITE_URL}/images/lubrican.webp`],
        type: 'article',
    },
}

export default function LubriCanPage() {
    return (
        <main className="csx-page">
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Branding · Produktinszenierung · Onlineshop"
                headline={<>Technik,<br /><strong>die verstanden wird.</strong></>}
                meta="LubriCan · Produkt- und Markenauftritt"
                text="Ein klarer Marken- und Shopauftritt für ein Angebot, bei dem Qualität, Orientierung und Vertrauen von Anfang an zusammengehören."
                image="/images/lubrican.webp"
                alt="Zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, darüber die Wortmarke."
            />

            <CaseChapter
                index="01"
                eyebrow="Die Ausgangslage"
                headline={<>Ein technisches Produkt<br />braucht mehr als eine<br /><strong>Produktseite.</strong></>}
                text={[
                    'Bei LubriCan sollte aus einzelnen Produkten und technischen Informationen ein konsistenter Markenauftritt entstehen. Die Herausforderung lag darin, Kompetenz und Produktnutzen klar zu vermitteln, ohne den digitalen Auftritt unnötig kompliziert zu machen.',
                    'Marke, Produktinszenierung und Onlineshop sollten deshalb nicht nebeneinanderstehen, sondern dieselbe Sprache sprechen – klar, präzise und leicht zugänglich.',
                ]}
                image="/images/case-lubrican-ausgangslage.webp"
                alt="Kolben und Pleuel eines Motors in Nahaufnahme, freigestellt vor dunklem Grund."
            />

            <CaseTurn
                frage={<>Wie wird technische Leistung<br />verständlich,<br /><strong>bevor sie erklärt werden muss?</strong></>}
                nicht="das Produkt über seine Eigenschaften erklären."
                sondern={<>die Leistung zeigen,<br />bevor sie erklärt wird.</>}
                begruendung="Technische Produkte werden meist über Datenblätter verkauft. Das funktioniert bei denen, die schon wissen, wonach sie suchen – und verliert alle anderen. Deshalb steht am Anfang das Bild der Wirkung, und die technische Tiefe folgt dort, wo sie gebraucht wird."
                folgen={[
                    'Produktinszenierung im Performance-Umfeld statt vor weißem Grund.',
                    'Eine gemeinsame Logik für Marke, Produktbild und Shop.',
                    'Der Shop führt vom ersten Eindruck zur passenden Lösung, nicht zur Kategorienliste.',
                    'Die technische Tiefe bleibt – sie steht nur nicht mehr am Anfang.',
                ]}
            />

            <CaseChapter
                index="02"
                eyebrow="Die Strategie"
                headline={<>Orientierung,<br />bevor Produkte<br /><strong>sichtbar werden.</strong></>}
                text={[
                    'Im ersten Schritt wurde eine gemeinsame Logik für Marke, Produktdarstellung und digitale Führung entwickelt. Sie schafft Orientierung: Was ist relevant, wie wird es erklärt und wie führt der Auftritt vom ersten Eindruck bis zur passenden Lösung?',
                    'Daraus entstand ein System, in dem Corporate Design, Produktbilder und Shop-Erlebnis nicht als einzelne Bausteine erscheinen, sondern als zusammenhängender Markenauftritt.',
                ]}
                image="/images/case-lubrican-strategie.webp"
                alt="Ineinandergreifende Zahnräder im Detail, von Schmierfilm überzogen."
                flip
            >
                <CaseTerms items={['Präzision', 'Orientierung', 'Vertrauen']} />
                <CaseFocus
                    headline={<>Ein System,<br />keine Produktliste.</>}
                    text="Produkt, Information und Shop folgen einer gemeinsamen Logik."
                />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Die Produktinszenierung"
                headline={<>Produkte sind nicht<br />nur sichtbar.<br /><strong>Sie sind einordenbar.</strong></>}
                text={[
                    'Die visuelle Sprache macht Qualität und Produktnutzen auf den ersten Blick greifbar. Detailaufnahmen, Anwendungen und relevante Informationen arbeiten zusammen, statt um Aufmerksamkeit zu konkurrieren.',
                    'So entsteht eine Produktdarstellung, die nicht beim ersten Eindruck endet, sondern die Entscheidung Schritt für Schritt unterstützt.',
                ]}
                image="/images/case-lubrican-produkt.webp"
                alt="Zwei LubriCan-Flaschen neben einem freigestellten Motorblock vor tiefblauem Grund."
            />

            <CaseChapter
                index="04"
                eyebrow="Die digitale Umsetzung"
                headline={<>Vom ersten Eindruck<br /><strong>zur passenden Lösung.</strong></>}
                text={[
                    'Der Shop übersetzt die Markenlogik in eine klare digitale Führung. Kategorien, Produktinformationen und Kontaktpunkte helfen dabei, schneller zu verstehen, was relevant ist – ohne technische Tiefe zu verlieren.',
                    'Die digitale Umsetzung wird damit nicht nur zur Verkaufsfläche, sondern zum verständlichen Zugang zum gesamten Angebot.',
                ]}
                image="/images/case-lubrican-digital.webp"
                alt="Ansicht des Onlineshops: eine Fahrzeugkategorie mit großflächigem Bild und Einstieg in das Sortiment."
                flip
            />

            <CaseChapter
                index="05"
                eyebrow="Das Ergebnis"
                headline={<>Aus einem technischen<br />Angebot wurde ein klarer,<br /><strong>zusammenhängender Auftritt.</strong></>}
                text={[
                    'Marke, Produktdarstellung und digitale Führung greifen ineinander. Dadurch entsteht ein Auftritt, der Qualität sichtbar macht, Orientierung schafft und Raum für die Weiterentwicklung des Angebots gibt.',
                ]}
                image="/images/case-lubrican-ergebnis.webp"
                alt="Die LubriCan-Wortmarke als Leuchtschrift vor dunklem, geprägtem Grund."
            >
                <CaseImpact
                    ziel="Orientierung schaffen, ohne technische Tiefe aufzugeben."
                    strategie="Wirkung vor Erklärung: erst einordnen lassen, dann informieren."
                    massnahmen={['Branding', 'Produktinszenierung', 'Onlineshop', 'Content']}
                    wirkung="Aus einer Produktliste wurde ein Auftritt, der die Entscheidung Schritt für Schritt trägt. Wer den Shop betritt, muss nicht bereits wissen, wonach er sucht, um fündig zu werden."
                />
                <CaseOutro slug="lubrican" />
            </CaseChapter>
        </main>
    )
}
