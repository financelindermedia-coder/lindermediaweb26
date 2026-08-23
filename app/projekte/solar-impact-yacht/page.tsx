import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseHero,
    CaseOutro,
    CasePillars,
    CaseTile,
} from '@/components/sections/CaseChapter'
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

const TITLE = 'Solar Impact Yacht — Fallstudie'
const DESCRIPTION =
    'Wie aus einer komplexen SWATH-Technologie ein Markenauftritt wurde, der Präzision, Innovation und Zukunftsperspektive verbindet.'

export const metadata: Metadata = {
    title: TITLE,
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
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Projektarchiv · Branding · Webdesign · Positionierung"
                headline={<>Ein Markenauftritt<br />für die Zukunft<br /><strong>der Schifffahrt.</strong></>}
                text="Solar Impact Yacht verband innovative SWATH-Technologie und solarbetriebene Schifffahrt."
                note="Der ursprüngliche digitale Auftritt ist derzeit nicht öffentlich zugänglich."
                leistungen="Markenstrategie · Positionierung · Corporate Design · Webdesign"
                image="/images/case-solarimpact-hero-2.webp"
                alt="Die Solar Impact Yacht liegt in der Dämmerung ruhig auf offener See, dahinter eine flache Bergkette."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Eine Technologie,<br />die erst verstanden<br /><strong>werden musste.</strong></>}
                text={[
                    'SWATH ist komplex, neu und erklärungsbedürftig. Die Herausforderung: ein Markenauftritt, der Vertrauen schafft, Zusammenhänge verständlich macht und die Pionierleistung hinter Solar Impact Yacht sichtbar werden lässt.',
                    'Aus einer technischen Idee sollte ein Auftritt entstehen, der Präzision, Innovation und Zukunftsperspektive verbindet – und auch Menschen erreicht, die nicht tief in der Technologie stecken.',
                ]}
                image="/images/case-solarimpact-technologie.webp"
                alt="Unterwasseraufnahme der beiden SWATH-Rümpfe: Der eigentliche Auftrieb liegt vollständig unter der Wasseroberfläche."
            />

            {/* Der Satz traegt die Haltung des Projekts – deshalb steht er allein,
                in voller Breite, zwischen Ausgangslage und Fundament. */}
            <section className="csx-statement">
                <span className="csx-statement-media" aria-hidden="true" />
                <div className="csx-statement-inner">
                    <span className="csx-rule" aria-hidden="true" />
                    <p className="csx-statement-text">
                        Nicht die Technologie<br />
                        sollte im Mittelpunkt stehen.<br />
                        <strong>Sondern die Veränderung,<br />die sie ermöglichen kann.</strong>
                    </p>
                </div>
            </section>

            <CaseChapter
                index="03"
                eyebrow="Das Fundament"
                headline={<>Klarheit vor<br /><strong>Kommunikation.</strong></>}
                text={[
                    'Bevor Gestaltung sichtbar werden konnte, musste klar sein, wofür Solar Impact Yacht steht – und was SWATH überhaupt bedeutet: Small Waterplane Area Twin Hull. Der Auftrieb liegt in zwei Torpedokörpern tief unter der Oberfläche, verbunden über schmale Streben. Was durch die Wellen läuft, ist deshalb nur ein Bruchteil dessen, was ein herkömmlicher Rumpf ihnen entgegensetzt.',
                    'Das Ergebnis ist ein Schiff, das kaum auf den Seegang reagiert. Genau diese Ruhe war das Versprechen der Marke – und sie musste erklärt werden, bevor jemand sie erlebt hatte.',
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
                    caption="Erklärt statt behauptet: Krängung und Wasserlinienfläche im Vergleich zu Katamaran und Einrumpfboot."
                />

            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Identität"
                headline={<>Technologie mit einer<br /><strong>klaren Haltung.</strong></>}
                text={[
                    'Aus der Positionierung wurde eine visuelle Sprache: reduziert, technisch präzise und auf das Wesentliche konzentriert – damit die Technologie wirken kann, ohne sich zu erklären.',
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

            {/* Die Ueberschrift und der Text dieses Kapitels sind von mir gesetzt
                und noch nicht freigegeben – anders als die uebrigen, die aus
                Andreas' Vorlage stammen. Die Aufnahmen der Broschuere fehlen
                noch; ihr Platz steht. */}
            <CaseChapter
                index="05"
                eyebrow="Die Anwendung"
                headline={<>Die Marke<br /><strong>wird greifbar.</strong></>}
                text={[
                    'Was digital entwickelt wurde, musste auch auf Papier tragen. Geschäftsausstattung und Broschüre übernehmen dieselbe Zurückhaltung: gedecktes Anthrazit, viel Ruhe um die Marke herum, die Wortmarke als einziger Akzent.',
                    'Gerade im Premium-Segment entscheidet das Gedruckte mit. Es ist das, was nach einem Gespräch dableibt.',
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
            </CaseChapter>

            <CaseChapter
                index="06"
                eyebrow="Die Umsetzung"
                headline={<>Eine digitale Bühne<br /><strong>für die Idee.</strong></>}
                text={[
                    'Klare Strukturen, starke Bildsprache und präzise Inhalte führen durch die Technologie und machen sie erlebbar.',
                    'Was an Bord selbstverständlich ist – Orientierung, Übersicht, Ruhe –, sollte auch der Auftritt leisten.',
                ]}
                image="/images/case-solarimpact-umsetzung.webp"
                alt="Navigationsansicht an Bord: eine Seekarte mit eingezeichneter Route, Uhrzeit und Ladestand der Batterien."
                flip
            />

            <CaseChapter
                index="07"
                eyebrow="Das Ergebnis"
                headline={<>Aus einer komplexen Idee<br /><strong>wurde ein klarer Auftritt.</strong></>}
                text={[
                    'Strategie, Gestaltung und digitale Präsenz erzählen dieselbe Geschichte.',
                ]}
                image="/images/case-solarimpact-ergebnis-2.webp"
                alt="Die Yacht liegt im letzten Licht des Tages ruhig vor einer flachen Bergkette."
            >
                <CaseOutro slug="solar-impact-yacht" />
            </CaseChapter>
        </main>
    )
}
