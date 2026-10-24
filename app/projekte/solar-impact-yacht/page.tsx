import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseOutro,
    CasePillars,
    CaseTerms,
    CaseTile,
    CaseTodo,
    CaseTurn,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Solar Impact Yacht.
 *
 * Sechs nummerierte Kapitel, jedes mit einem grossflaechigen Bild – Aufbau,
 * Typografie und Effekte wie die Akt-2-Kapitel der Startseite. Das Bild wechselt
 * kapitelweise die Seite; die beiden mittleren Kapitel laufen bewusst ohne
 * seitliches Bild ueber die volle Breite, damit die Strecke atmet.
 *
 * Das Bildmaterial sind Standbilder aus dem Projektfilm (Sekunden siehe
 * scripts/to-webp.sh). Ein Nachbau des damaligen Webauftritts steht bewusst
 * nicht auf der Seite: Er ist nicht mehr oeffentlich zugaenglich, und ein
 * rekonstruiertes Mockup wuerde etwas behaupten, was sich nicht belegen laesst.
 * Der Hinweis dazu steht im Auftakt.
 */

const TITLE =
    'Solar Impact Yacht – Markenstrategie & Webdesign | LinderMedia'
const DESCRIPTION =
    'Wie LinderMedia komplexe SWATH-Technologie in eine klare Markenpositionierung, visuelle Identität und digitale Präsenz übersetzt hat.'

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

const I = (d: JSX.Element) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {d}
    </svg>
)

const PILLARS = [
    {
        label: 'Innovation',
        text: 'Technologie, die neue Möglichkeiten eröffnet.',
        icon: I(<><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></>),
    },
    {
        label: 'Verantwortung',
        text: 'Nachhaltigkeit als integraler Bestandteil jeder Entscheidung.',
        icon: I(<><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" /><path d="M2 21c0-3 1.85-5.36 5.08-6" /></>),
    },
    {
        label: 'Maritime Zukunft',
        text: 'Heute gestalten, was morgen trägt.',
        icon: I(<><path d="M2 8c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" /><path d="M2 14c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" /><path d="M2 20c2.5 0 2.5 2 5 2s2.5-2 5-2 2.5 2 5 2 2.5-2 5-2" /></>),
    },
]

/* Die Farbwerte sind nicht gesetzt, sondern aus dem Bildmaterial des Projekts
   ausgelesen (ImageMagick, dominante Farben der Standbilder). */
const FARBWELT = [
    { hex: '#14171B', name: 'Tiefe' },
    { hex: '#1667B6', name: 'Marine' },
    { hex: '#2090CD', name: 'Wasser' },
    { hex: '#D0C1A8', name: 'Licht' },
    { hex: '#E8E6E2', name: 'Weite' },
]

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
                kicker="Projektarchiv · Branding · Webdesign · Positionierung"
                headline={<>SWATH<br /><strong>verständlich positionieren.</strong></>}
                text="Wie Solar Impact Yacht eine komplexe SWATH-Technologie in eine verständliche, eigenständige Markenposition übersetzte."
                note="Der ursprüngliche digitale Auftritt ist derzeit nicht öffentlich zugänglich."
                leistungen="Markenstrategie · Positionierung · Corporate Design · Webdesign"
                image="/images/case-solarimpact-hero-2.webp"
                alt="Die Solar Impact Yacht liegt in der Dämmerung ruhig auf offener See, dahinter eine flache Bergkette."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Eine Bauart,<br />die erst verstanden<br /><strong>werden musste.</strong></>}
                text={[
                    'SWATH steht für Small Waterplane Area Twin Hull und ist eine erklärungsbedürftige Bauart. Die Aufgabe: ihre Funktionsweise und Relevanz so zu vermitteln, dass auch Menschen ohne technisches Vorwissen folgen können.',
                ]}
                image="/images/case-solarimpact-technologie.webp"
                alt="Unterwasseraufnahme der beiden SWATH-Rümpfe: Der eigentliche Auftrieb liegt vollständig unter der Wasseroberfläche."
            >
                <CaseTodo items={['Bestätigtes Briefing oder freigegebene Formulierung des Projektziels.']} />
            </CaseChapter>

            {/* Die Wende des Projekts: erst die Frage, dann die Entscheidung. Die
                Gegenueberstellung „Technik erklaeren“ gegen „Veraenderung zeigen“
                steht nur hier – nicht noch einmal in Fundament oder Ergebnis. */}
            <CaseTurn
                image="/images/case-solarimpact-fundament.webp"
                frage={<>Wie wird aus einer Technologie,<br />die kaum jemand kennt,<br /><strong>eine Marke, der man vertraut?</strong></>}
                nicht="mit der Bauart beginnen."
                sondern={<>mit der Veränderung beginnen,<br />die sie für die Schifffahrt ermöglichen soll.</>}
                begruendung="Die Technik folgt dort, wo sie die Aussage belegt. Positioniert wurde Solar Impact Yacht deshalb als Technologieunternehmen statt als Yachtbauer."
            />
            <CaseTodo items={['Kundenfreigabe für Strategie und Positionierung als Technologieunternehmen.']} />

            <CaseChapter
                index="03"
                eyebrow="Das Fundament"
                headline={<>Klarheit vor<br /><strong>Kommunikation.</strong></>}
                text={[
                    'Bevor Gestaltung sichtbar werden konnte, musste klar sein, wofür die Marke steht – und was SWATH bedeutet: Der Auftrieb liegt in zwei Torpedokörpern unter der Wasseroberfläche, verbunden über schmale Streben.',
                ]}
                image="/images/case-solarimpact-system-bg.webp"
                alt=""
                wide
            >
                <CasePillars items={PILLARS} />
                <CaseFigure
                    src="/images/case-solarimpact-vergleich.webp"
                    bleed
                    alt="Drei Vergleichsgrafiken: Krängung von Katamaran, SWATH und Einrumpfboot bei sechs Fuß hohen Wellen, dazu die Wasserlinienfläche der drei Bauarten im Vergleich."
                    caption="Vergleichsgrafik zu Krängung und Wasserlinienfläche von Katamaran, SWATH und Einrumpfboot."
                />
                <CaseTodo items={[
                    'Quelle, Zahlen, Maßstab und Messmethode der Vergleichsgrafiken; freigegebene Originalgrafiken.',
                    'Technische Aussagen zum Verhalten im Seegang belegen oder streichen (hier bewusst nicht behauptet).',
                ]} />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Identität"
                headline={<>Technologie mit einer<br /><strong>klaren Haltung.</strong></>}
                text={[
                    'Aus der Positionierung wurde eine visuelle Sprache: reduziert, technisch präzise und auf das Wesentliche konzentriert.',
                ]}
                image="/images/case-solarimpact-identitaet-bg.webp"
                alt=""
                wide
            >
                <div className="csx-tiles">
                    <CaseTile label="Farbwelt" span>
                        <div className="csx-swatches">
                            {FARBWELT.map((c) => (
                                <span className="csx-swatch" key={c.hex}>
                                    <span className="csx-swatch-chip" style={{ background: c.hex }} />
                                    <span className="csx-swatch-name">{c.name}</span>
                                    <span className="csx-swatch-hex">{c.hex}</span>
                                </span>
                            ))}
                        </div>
                    </CaseTile>

                    <CaseTile label="Typografie" span>
                        <p className="csx-type-name">DIN Condensed</p>
                        <p className="csx-type-set">ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
                        <p className="csx-type-set">0123456789</p>
                    </CaseTile>

                    <CaseTile label="Bildwelt">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            className="csx-tile-img"
                            src="/images/case-solarimpact-identitaet.webp"
                            alt="Das Heck der Yacht im Gegenlicht der tief stehenden Sonne, die Silhouette zeichnet sich scharf gegen den hellen Himmel ab."
                            loading="lazy"
                            decoding="async"
                        />
                    </CaseTile>
                </div>
            </CaseChapter>

            {/* Anwendung: genau ein Beleg (Geschaeftsausstattung). Die frueher
                eigene Navigationsansicht („Umsetzung“) steht nicht mehr auf der
                Seite – sie belegt kein freigegebenes Interface; die Datei bleibt
                im Repository. */}
            <CaseChapter
                index="05"
                eyebrow="Die Anwendung"
                headline={<>Die Marke<br /><strong>wird greifbar.</strong></>}
                text={[
                    'Geschäftsausstattung und Broschüre übernehmen dieselbe Zurückhaltung: gedecktes Anthrazit, viel Ruhe um die Marke herum, die Wortmarke als einziger Akzent.',
                ]}
                image="/images/case-solarimpact-anwendung-bg.webp"
                alt=""
                wide
            >
                <CaseFigure
                    src="/images/case-solarimpact-anwendung.webp"
                    alt="Geschäftsausstattung: aufgeschlagene Präsentationsmappe in Anthrazit mit Briefbogen und Visitenkarte, daneben eine geschlossene Mappe."
                    caption="Geschäftsausstattung: Mappe, Briefbogen und Visitenkarte."
                />
                <CaseTodo items={['Bestätigung, dass die Print-Motive zu diesem Projekt gehören und veröffentlicht werden dürfen; Aufnahmen der Broschüre.']} />
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Ergebnis und Beleg"
                headline={<>Aus einer komplexen Idee<br /><strong>wurde ein klarer Auftritt.</strong></>}
                text={[
                    'Umgesetzt wurden Markenstrategie, Positionierung, Corporate Design, Bildwelt, Webdesign, Geschäftsausstattung und Broschüre. Sie folgen derselben Haltung: Strategie, Gestaltung und digitale Präsenz erzählen dieselbe Geschichte.',
                    'Ein messbarer oder extern bestätigter Effekt liegt für dieses Projekt nicht vor – gezeigt wird deshalb die dokumentierte Arbeit.',
                ]}
                image="/images/case-solarimpact-ergebnis-2.webp"
                alt="Die Yacht liegt im letzten Licht des Tages ruhig vor einer flachen Bergkette."
            >
                <CaseTerms items={['Markenstrategie', 'Positionierung', 'Corporate Design', 'Bildwelt', 'Webdesign', 'Geschäftsausstattung', 'Broschüre']} />
                <CaseTodo items={[
                    'Freigegebene Kundenstimme, Nutzertest oder anderer überprüfbarer Wirkungsbeleg; ohne Beleg bleibt es bei der Beschreibung der Umsetzung.',
                    'Rolle von LinderMedia und tatsächlich ausgeführter Projektumfang bestätigen.',
                    'Originalwebsite oder archivierter Screenshot (Auftritt laut Seite nicht öffentlich zugänglich).',
                    'Freigabe für Projektname, Beschreibung, Bilder und Grafiken; CTA-Kontaktweg bestätigen.',
                ]} />
                <CaseOutro
                    slug="solar-impact-yacht"
                    frage="Sie möchten eine komplexe Technologie klar positionieren?"
                    ctaLabel="Ein ähnliches Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
