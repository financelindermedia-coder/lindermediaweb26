import type { Metadata } from 'next'
import Link from 'next/link'
import CaseChapter, {
    CaseFigure,
    CaseFocus,
    CaseHero,
    CaseOutro,
    CasePillars,
    CaseTerms,
    CaseTodo,
} from '@/components/sections/CaseChapter'
import CaseSchema from '@/components/CaseSchema'
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

const TITLE =
    'Marèvo – Premium-Markenentwicklung & Screendesign | LinderMedia'
const DESCRIPTION =
    'Markenidee, Bildwelt und Screendesign-Entwurf für eine Premium-Segelyacht: weiter statt schneller.'

/*
 * Eigene Metadaten je Fallstudie: Titel und Beschreibung sind das, was in der
 * Suche steht – sie benennen deshalb Projekt UND Disziplinen, nicht nur den
 * Projektnamen. `title` steht als `absolute`, weil das Layout sonst noch einmal
 * „— LinderMedia" anhängen würde.
 */
export const metadata: Metadata = {
    title: { absolute: TITLE },
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
        text: 'Das Versprechen zur Gewichtsverteilung, wie der Entwurf es formuliert.',
        icon: I(<><path d="M12 3v18" /><path d="M5 8h14" /><path d="M7 8l-3 7h6l-3-7z" /><path d="M17 8l-3 7h6l-3-7z" /></>),
    },
    {
        label: 'Kontrolle in Reichweite',
        text: 'Das Versprechen zur Bedienbarkeit, wie der Entwurf es formuliert.',
        icon: I(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2.5" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" /></>),
    },
    {
        label: 'Energie, leise gesammelt',
        text: 'Das Versprechen zur Energie an Bord, wie der Entwurf es formuliert.',
        icon: I(<><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" /></>),
    },
]

export default function MarevoPage() {
    return (
        <main className="csx-page">
            {/* Article + BreadcrumbList – siehe components/CaseSchema.tsx */}
            <CaseSchema
                slug="marevo"
                titel={TITLE}
                beschreibung={DESCRIPTION}
                bild="/images/case-marevo-hero.webp"
            />
            <div className="csx-topbar">
                <Link href="/#projekte" className="csx-back">← Alle Projekte</Link>
            </div>

            <CaseHero
                index="01"
                kicker="Case Study · Markenentwicklung · Leitidee · Bildwelt · Screendesign"
                headline={<>Weiter<br /><strong>statt schneller.</strong></>}
                meta="Marèvo · Segelyacht im Premium-Segment"
                text="Marèvo wird hier als Segelyacht im Premium-Segment vorgestellt. Die Fallstudie rückt Stimmigkeit, Ausdauer und Zurückhaltung in den Mittelpunkt – statt des üblichen Vergleichs über Länge, Fläche und Tempo."
                note="Gestalterischer Entwurf: Markenidee, Bildwelt und Screendesign."
                image="/images/case-marevo-hero.webp"
                alt="Die Yacht liegt bei Sonnenuntergang still auf spiegelglattem Wasser, der Horizont geht in Gold über."
            />

            <CaseChapter
                index="02"
                eyebrow="Die Ausgangslage"
                headline={<>Wenn alle mit denselben<br /><strong>Zahlen werben.</strong></>}
                text={[
                    'In diesem Segment sind Länge, Fläche und Tempo die üblichen Vergleichsgrößen. Marèvo sollte darin nicht einfach lauter mitbieten, sondern einen anderen Maßstab setzen.',
                ]}
                wide
            >
                <CaseTodo items={['Markt- oder Wettbewerbsanalyse, falls dies als recherchierte Ausgangslage statt als strategische Setzung dargestellt werden soll.']} />
            </CaseChapter>

            <CaseChapter
                index="03"
                eyebrow="Der strategische Gedanke"
                headline={<>Nicht schneller um jeden Preis.<br /><strong>Weiter, weil alles zusammenpasst.</strong></>}
                text={[
                    'Die Leitidee verschiebt die Frage von „Wie schnell?“ zu „Wie weit, ohne sich zu verausgaben?“. Die Haltung fasst sich in drei Begriffen: Stimmigkeit, Ausdauer und Zurückhaltung.',
                ]}
                wide
            >
                <CaseTerms items={['Stimmigkeit', 'Ausdauer', 'Zurückhaltung']} />
                <CaseFocus
                    headline={<>Weiter statt schneller.</>}
                    text="Der Maßstab ist nicht die Spitze, sondern die Strecke, die man ohne Kompromiss zurücklegt."
                />
            </CaseChapter>

            <CaseChapter
                index="04"
                eyebrow="Die Umsetzung"
                headline={<>Eine Haltung,<br /><strong>übersetzt in einen Auftritt.</strong></>}
                text={[
                    'Der Umfang: Markenentwicklung, Leitidee, Bildwelt und Screendesign. Der Entwurf führt in ruhigen Abschnitten durch Strategie, Konstruktion und Gestaltung. Drei Versprechen gliedern den Konstruktionsabschnitt.',
                ]}
                image="/images/case-marevo-konstruktion-bg.webp"
                alt=""
                wide
            >
                <CasePillars items={PILLARS} />
                <CaseFigure
                    src="/images/case-marevo-screen-auftakt.webp"
                    alt="Auftakt des Entwurfs: die Zeile „Take the long way“ über einer Yacht im Abendlicht."
                    caption="Screendesign-Entwurf: der Auftakt mit der Leitzeile „Take the long way“."
                />
                <CaseTodo items={[
                    'Bestätigung, welche Leistungen tatsächlich beauftragt und umgesetzt wurden.',
                    'Technische Freigabe der drei Versprechen (Gewicht, Kontrolle, Energiegewinnung während der Fahrt) – bis dahin als Entwurfsversprechen zu lesen.',
                    'Konstruktionsmotiv nur als Konzeptvisualisierung kennzeichnen und freigeben.',
                ]} />
            </CaseChapter>

            <CaseChapter
                index="05"
                eyebrow="Ergebnis und Beleg"
                headline={<>Sichtbar ist<br /><strong>der Entwurf.</strong></>}
                text={[
                    'Die Leitidee ist in Bild- und Screendesign-Motiven umgesetzt. Das dokumentiert einen gestalterischen Ansatz, aber keine gemessene Veränderung der Markenwahrnehmung oder des Geschäftsergebnisses.',
                ]}
                wide
            >
                <CaseTodo items={[
                    'Klären, ob Marèvo ein reales Kundenprojekt, eine Konzeptstudie oder ein Designentwurf ist; Name, Marke, Bilder und Veröffentlichung freigeben lassen.',
                    'Freigegebener finaler Auftritt oder Vorher/Nachher-Beleg; sonst bleibt das Ergebnis „Entwurf“.',
                    'Das entfernte Motiv mit „MARÈVO 62 / Design Study / 2026 / Private Viewing“ erst nach Klärung von Status, Jahr, Produktbezug und Freigabe wieder einsetzen.',
                    'Rechte für Hero, Renderings, Entwürfe, Marke und Gestaltung.',
                ]} />
                <CaseOutro
                    slug="marevo"
                    frage="Sie möchten Ihrer Marke eine klare Richtung geben?"
                    ctaLabel="Projekt besprechen"
                />
            </CaseChapter>
        </main>
    )
}
