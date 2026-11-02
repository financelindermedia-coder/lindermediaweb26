import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseMassnahmen,
    CaseOutro,
    CaseSideScroll,
    CaseTerms,
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
                headline={<>Wirkung zuerst.<br /><strong>Technik, wenn sie Orientierung gibt.</strong></>}
                meta="LubriCan · Produkt- und Markenauftritt"
                text="Einzelne Produkte und technische Informationen sollten in einem verständlichen Marken- und Shopauftritt zusammenfinden."
                image="/images/lubrican.webp"
                alt="Zwei LubriCan-Flaschen vor einem roten Sportwagen in einer Werkstatt, darüber die Wortmarke."
            />

            <CaseChapter
                index="02"
                eyebrow="Ausgangslage"
                headline={<>Orientierung schaffen,<br /><strong>ohne Tiefe zu verlieren.</strong></>}
                text={[
                    'Einzelne LubriCan-Produkte und technische Informationen sollten in einem verständlichen, zusammenhängenden Marken- und Shopauftritt zusammenfinden. Die Herausforderung war, Orientierung zu schaffen, ohne die technische Tiefe der Produkte zu verlieren.',
                ]}
                image="/images/case-lubrican-ausgangslage.webp"
                alt=""
                wide
            >
            </CaseChapter>

            <CaseSideScroll>
                <CaseChapter
                    index="03"
                    eyebrow="Strategischer Gedanke"
                    headline={<>Wirkung zuerst,<br /><strong>Technik dort, wo sie hilft.</strong></>}
                    text={[
                        'Nicht mit einer langen Liste technischer Eigenschaften beginnen: Das Produkt soll zuerst im Anwendungskontext verständlich werden. Technische Details folgen dort, wo sie bei der Orientierung oder Auswahl helfen.',
                        'Das ist die Leitlinie der Kommunikation – keine Aussage über die Wirkung des Produkts selbst.',
                    ]}
                    image="/images/case-lubrican-strategie.webp"
                    alt=""
                    wide
                >
                    <CaseTerms items={['Präzision', 'Orientierung', 'Vertrauen']} />
                </CaseChapter>

                <CaseChapter
                    index="04"
                    eyebrow="Maßnahmen"
                    headline={<>Von der Leitlinie<br /><strong>zum Produkt- und Shopauftritt.</strong></>}
                    wide
                >
                    <CaseMassnahmen items={[
                        {
                            titel: 'Produkte im Anwendungskontext inszeniert',
                            text: 'Der Einstieg zeigt das Produkt dort, wo es gebraucht wird: im Fahrzeug- und Werkstattumfeld, nicht vor neutralem Grund.',
                        },
                        {
                            titel: 'Produktdarstellung und technische Information verbunden',
                            text: 'Das Produktdetail neben dem Motorblock verbindet das Produkt mit der Technik, auf die es wirkt – so entsteht Orientierung, ohne dass die Technik zur Liste wird.',
                        },
                        {
                            titel: 'Den Shop als Informationsweg gezeigt',
                            text: 'Der Shop führt über Fahrzeugkategorien zum passenden Produkt. Kategorien und Produktinformationen stehen im selben Weg, nicht in getrennten Bereichen.',
                        },
                    ]} />
                </CaseChapter>

                <CaseChapter
                    index="05"
                    eyebrow="Produktdarstellung"
                    headline={<>Das Produkt<br /><strong>neben der Technik.</strong></>}
                    wide
                >
                    <CaseFigure
                        src="/images/case-lubrican-produkt.webp"
                        alt="Zwei LubriCan-Flaschen neben einem freigestellten Motorblock vor tiefblauem Grund."
                        caption="Produktdetail: LubriCan-Flaschen neben dem Motorblock."
                    />
                </CaseChapter>

                <CaseChapter
                    index="06"
                    eyebrow="Onlineshop"
                    headline={<>Der Shop<br /><strong>als Informationsweg.</strong></>}
                    wide
                >
                    <CaseFigure
                        src="/images/case-lubrican-digital.webp"
                        alt="Ansicht des Onlineshops: eine Fahrzeugkategorie mit großflächigem Bild und Einstieg in das Sortiment."
                        caption="Onlineshop: Einstieg über die Fahrzeugkategorie."
                    />
                </CaseChapter>

                <CaseChapter
                    index="07"
                    eyebrow="Ergebnis"
                    headline={<>Ein zusammenhängender<br /><strong>Marken- und Produktauftritt.</strong></>}
                    text={[
                        'Produktdarstellung, Markenauftritt und Shop führen die Leitlinie zu einem zusammenhängenden Auftritt zusammen.',
                        'Ein messbarer Effekt ist für dieses Projekt nicht belegt – gezeigt wird deshalb die dokumentierte Arbeit.',
                    ]}
                    image="/images/case-lubrican-ergebnis.webp"
                    alt=""
                    wide
                >
                    <CaseTerms items={['Branding', 'Produktinszenierung', 'Onlineshop']} />
                </CaseChapter>
            </CaseSideScroll>

            <section className="csx csx-outro-sec"><div className="csx-inner">
                <CaseOutro
                    slug="lubrican"
                    frage="Sie möchten technische Produkte verständlich präsentieren?"
                    ctaLabel="Projekt besprechen"
                />
            </div></section>
        </main>
    )
}
