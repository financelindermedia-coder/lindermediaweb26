import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseHero,
    CaseOutro,
    CaseTerms,
    CaseTodo,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
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

const TITLE =
    'LubriCan – Branding, Produktinszenierung & Onlineshop | LinderMedia'
const DESCRIPTION =
    'Wie Marke, Produktinszenierung und Onlineshop für ein technisches Performance-Produkt zu einem verständlichen System verbunden wurden.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
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
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="lubrican"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/lubrican.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Branding · Produktinszenierung · Onlineshop"
                headline={<>Technisches Produkt,<br /><strong>klar inszeniert.</strong></>}
                meta="LubriCan · Produkt- und Markenauftritt"
                text="Ein Marken- und Shopauftritt für LubriCan. Im Mittelpunkt stehen verständliche Produktdarstellung und Orientierung."
                image="/images/lubrican.webp"
                alt="Zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, darüber die Wortmarke."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Ein technisches Produkt<br />braucht mehr als eine<br /><strong>Produktseite.</strong></>}
                text={[
                    'Einzelne Produkte und technische Informationen sollten in einem konsistenten Auftritt zusammenfinden.',
                ]}
                wide
            >
                <CaseTodo items={['Kundenbriefing oder freigegebene Beschreibung der tatsächlichen Ausgangslage; bestätigte Rolle von LinderMedia.']} />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Der strategische Gedanke"
                headline={<>Wirkung zuerst,<br /><strong>Technik dort, wo sie hilft.</strong></>}
                text={[
                    'Technische Details folgen dort, wo sie bei der Orientierung helfen. Dieser Leitgedanke verbindet Marke, Produktdarstellung und Shop.',
                ]}
                wide
            >
                <CaseTerms items={['Präzision', 'Orientierung', 'Vertrauen']} />
                <CaseTodo items={['Bestätigte Strategie und Kundenfreigabe.']} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Umsetzung"
                headline={<>Produktinszenierung<br /><strong>und Onlineshop.</strong></>}
                text={[
                    'Genannt sind Branding, Produktinszenierung, Onlineshop und Content. Gezeigt werden ein Produktmotiv im Performance-Umfeld und eine Ansicht des Shops.',
                ]}
                image="/images/case-lubrican-produkt.webp"
                alt="Zwei LubriCan-Flaschen neben einem freigestellten Motorblock vor tiefblauem Grund."
            >
                <CaseTodo items={['Konkret ausgeführte Leistungen, Umfang und Zuordnung der gezeigten Medien.']} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Der Onlineshop"
                headline={<>Vom ersten Eindruck<br /><strong>zur passenden Lösung.</strong></>}
                text={[
                    'Der Shop übersetzt die Markenlogik in eine klare digitale Führung mit Kategorien, Produktinformationen und Kontaktpunkten.',
                ]}
                image="/images/case-lubrican-digital.webp"
                alt="Ansicht des Onlineshops: eine Fahrzeugkategorie mit großflächigem Bild und Einstieg in das Sortiment."
                flip
            >
                <CaseTodo items={['Bestätigung, dass die Shopansicht den realisierten Stand zeigt; Rechte und Bildfreigaben.']} />
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Ergebnis und Beleg"
                headline={<>Ein zusammenhängender<br /><strong>Marken- und Produktauftritt.</strong></>}
                text={[
                    'Die gezeigten Motive machen den Marken- und Produktauftritt sowie den Einstieg in den Shop sichtbar. Ein messbarer Effekt oder eine bestätigte Veränderung ist für dieses Projekt nicht belegt.',
                ]}
                wide
            >
                <CaseTerms items={['Branding', 'Produktinszenierung', 'Onlineshop', 'Content']} />
                <CaseTodo items={[
                    'Freigegebener Vorher/Nachher-Beleg, Kundenfeedback oder belastbare Kennzahl; ohne Beleg keine Erfolgsbehauptung.',
                    'Freigabe von Kundenname, Marke, Bildern, Zitaten und Projektbehauptungen.',
                    'Aus dem Layout genommen (Dateien bleiben): Zahnrad-Motiv und Kolben/Pleuel – nur wieder einsetzen, wenn sie eine konkrete Produktinformation belegen; das Wortmarken-Leuchtschriftbild, falls Branding nicht schon im Hero sichtbar wäre.',
                ]} />
                <CaseOutro
                    slug="lubrican"
                    frage="Sie möchten technische Produkte verständlich präsentieren?"
                    ctaLabel="Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
