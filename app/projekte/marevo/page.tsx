import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseOutro,
    CasePillars,
    CaseTerms,
} from '@/components/sections/CaseChapter'
import { SITE_URL } from '@/lib/site'

/**
 * Fallstudie Marèvo.
 *
 * ENTWURF. Grundlage ist das Screendesign aus `Marevo_Screen-Design.pdf`; die
 * dortigen Texte sind englisch und hier sinngemaess ins Deutsche uebertragen,
 * nicht woertlich uebersetzt – aus einer Produktseite wird eine Fallstudie, die
 * rueckblickend erzaehlt. Die Kapitelfolge ist dieselbe wie bei den anderen
 * Cases (Ausgangslage → Strategie → … → Ergebnis).
 *
 * Die englischen Originalzeilen stehen jeweils als Kommentar an der Stelle, an
 * der sie eingeflossen sind – damit nachvollziehbar bleibt, was aus dem
 * Screendesign stammt und was ich formuliert habe.
 *
 * BILDMATERIAL: Die Hintergruende und die Abbildungen im Screendesign-Kapitel
 * sind Ansichten aus `Marevo_Screen-Design.pdf`. ImageMagick kann das PDF hier
 * nicht rendern (Ghostscript fehlt, und winget kennt kein Paket dafuer) – die
 * Ansichten stammen deshalb aus dem PDF-Viewer von Chrome, ueber Puppeteer
 * durchgeblaettert und abfotografiert (Skript im Scratchpad, `pdf3.js`).
 *
 * Zwei Hintergruende sind perspektivisch angeschnitten (`-distort Perspective`),
 * damit der Entwurf im Hintergrund nicht wie ein flach aufgelegter Screenshot
 * wirkt. Die fehlenden Ecken sind mit dem Seitengrund gefuellt.
 *
 * Die vier Renderings der Yacht liegen weiterhin nicht als Dateien vor.
 */

const TITLE = 'Marèvo — Fallstudie'
const DESCRIPTION =
    'Markenentwicklung und Screendesign für eine Segelyacht, deren Anspruch nicht Tempo ist, sondern Stimmigkeit.'

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: '/projekte/marevo' },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: `${SITE_URL}/projekte/marevo`,
        images: [`${SITE_URL}/images/case-marevo-hero.webp`],
        type: 'article',
    },
}

const I = (d: JSX.Element) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {d}
    </svg>
)

/* Aus dem Screendesign, Abschnitt „Every load has a language":
   Weight where it works · Control within reach · Energy, quietly gathered. */
const PILLARS = [
    {
        label: 'Gewicht, wo es trägt',
        text: 'Masse sitzt dort, wo sie die Yacht ruhiger macht – nicht dort, wo sie am wenigsten stört.',
        icon: I(<><path d="M12 3v18" /><path d="M5 8h14" /><path d="M7 8l-3 7h6l-3-7z" /><path d="M17 8l-3 7h6l-3-7z" /></>),
    },
    {
        label: 'Kontrolle in Reichweite',
        text: 'Was gebraucht wird, liegt an der Hand. Der Rest bleibt aus dem Weg.',
        icon: I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>),
    },
    {
        label: 'Energie, leise gesammelt',
        text: 'Gewonnen wird sie im Fahren, nicht im Nachrüsten – ohne dass es jemand hört.',
        icon: I(<><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></>),
    },
]

export default function MarevoPage() {
    return (
        <main className="csx-page">
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            {/* Screendesign: „Take the long way." */}
            <CaseHero
                index="01"
                kicker="Case Study · Markenentwicklung · Screendesign · Bildwelt"
                headline={<>Nimm den<br /><strong>langen Weg.</strong></>}
                meta="Marèvo · Segelyacht im Premium-Segment"
                text="Eine Marke für Menschen, die nicht ankommen wollen, sondern unterwegs sein."
                image="/images/case-marevo-hero.webp"
                alt="Die Yacht liegt bei Sonnenuntergang still auf spiegelglattem Wasser, der Horizont geht in Gold über."
            />

            <CaseChapter
                index="01"
                eyebrow="Die Ausgangslage"
                headline={<>Im Premium-Segment<br />klingt alles<br /><strong>gleich.</strong></>}
                text={[
                    'Yachten in diesem Segment werben mit denselben Argumenten: mehr Länge, mehr Fläche, mehr Tempo. Wer so spricht, wird mit allen anderen verglichen – und muss den Vergleich in Zahlen gewinnen.',
                    'Marèvo brauchte deshalb keine lautere Version dieser Sprache, sondern eine andere. Eine, die nicht behauptet, das Schnellste zu sein, und trotzdem etwas verspricht.',
                ]}
                image="/images/case-marevo-ausgangslage-bg.webp"
                alt=""
                wide
            />

            {/* Screendesign: „Not faster at any cost. Further, because everything aligns." */}
            <CaseChapter
                index="02"
                eyebrow="Die Strategie"
                headline={<>Nicht schneller<br />um jeden Preis.<br /><strong>Weiter, weil alles zusammenpasst.</strong></>}
                text={[
                    'Aus dieser Zeile wurde die Haltung der Marke. Sie verschiebt den Maßstab: Nicht die Höchstgeschwindigkeit entscheidet, sondern wie weit man kommt, ohne sich zu verausgaben – das Schiff nicht und die Crew nicht.',
                    'Alles Weitere folgt daraus. Die Bildsprache bleibt ruhig, die Typografie zurückhaltend, die Zahlen stehen da, ohne sich in den Vordergrund zu drängen.',
                ]}
                image="/images/case-marevo-strategie-bg.webp"
                alt=""
                wide
            >
                <CaseTerms items={['Stimmigkeit', 'Ausdauer', 'Zurückhaltung']} />
                <CaseFocus
                    headline={<>Weiter statt schneller.</>}
                    text="Der Maßstab ist nicht die Spitze, sondern die Strecke, die man ohne Kompromiss zurücklegt."
                />
            </CaseChapter>

            {/* Screendesign: „Every load has a language." und „Form follows the flow." */}
            <CaseChapter
                index="03"
                eyebrow="Die Konstruktion"
                headline={<>Jede Last<br /><strong>hat eine Sprache.</strong></>}
                text={[
                    'Den Unterschied merkt man nicht an Spitzenwerten, sondern am Ende eines langen Tages: wie ruhig das Schiff liegt, wie wenig Kraft ein Manöver kostet, wie selbstverständlich alles zur Hand ist.',
                    'Genau das sollte der Auftritt zeigen – bevor jemand an Bord war. Nicht über Datenblätter, sondern über drei Versprechen, die jede Seglerin und jeder Segler sofort versteht.',
                ]}
                image="/images/case-marevo-konstruktion-bg.webp"
                alt=""
                wide
            >
                <CasePillars items={PILLARS} />
            </CaseChapter>

            {/* Screendesign: „Space, tuned to the horizon." */}
            <CaseChapter
                index="04"
                eyebrow="Das Interieur"
                headline={<>Raum, auf den<br /><strong>Horizont gestimmt.</strong></>}
                text={[
                    'An Bord ist die Atmosphäre nicht das, was nach der Konstruktion dazukommt. Sie ist die Konstruktion – übersetzt in Licht, in Materialien, die man anfassen will, und in einen Ort, an dem der Tag ausklingen darf.',
                    'Deshalb zeigt die Bildstrecke keine ausgeleuchteten Kabinen, sondern Licht zu einer bestimmten Stunde.',
                ]}
                image="/images/case-marevo-interieur-bg-3.webp"
                alt=""
                wide
            >

            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Das Screendesign"
                headline={<>Eine Seite, die<br /><strong>nicht drängt.</strong></>}
                text={[
                    'Der Entwurf führt in langen, ruhigen Abschnitten durch die Yacht: erst die Haltung, dann das Modell, dann Konstruktion, Interieur und Details. Kein Abschnitt will überholen.',
                    'Die Zahlen stehen in einer schlichten Tabelle statt in Kacheln, und der Abschluss lädt nicht zum Kauf ein, sondern zum Kurs: „Beginnen Sie mit einer Peilung.“',
                ]}
                image="/images/case-marevo-screendesign-bg.webp"
                alt=""
                wide
            >
                <CaseFigure
                    src="/images/case-marevo-screen-auftakt.webp"
                    alt="Auftakt des Entwurfs: die Zeile „Take the long way“ über einer Yacht im Abendlicht."
                    caption="Der Auftakt – eine Zeile, ein Bild, sonst nichts."
                />
            </CaseChapter>

            {/* Screendesign: „Begin with a bearing." */}
            <CaseChapter
                index="06"
                eyebrow="Das Ergebnis"
                headline={<>Beginnen Sie<br /><strong>mit einer Peilung.</strong></>}
                text={[
                    'Haltung, Konstruktion und Auftritt erzählen dieselbe Geschichte: dass Stimmigkeit weiter trägt als Tempo. Was bleibt, ist keine Liste von Vorzügen, sondern eine Richtung.',
                ]}
                image="/images/case-marevo-ergebnis-bg.webp"
                alt=""
                wide
            >
                <CaseOutro slug="marevo" />
            </CaseChapter>
        </main>
    )
}
