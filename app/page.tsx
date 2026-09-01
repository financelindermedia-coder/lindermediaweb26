'use client'

import LenisProvider from '@/components/LenisProvider'
import VideoCanvas from '@/components/VideoCanvas'
import TextLayer from '@/components/TextLayer'
import SectionConnector from '@/components/SectionConnector'
import Navbar from '@/components/Navbar'
import ScrollFortschritt from '@/components/ScrollFortschritt'
import MethodeSection from '@/components/sections/MethodeSection'
import Akt2VideoSection from '@/components/sections/Akt2VideoSection'
import UspSection from '@/components/sections/UspSection'
import LeistungenSection from '@/components/sections/LeistungenSection'
import LeistungenLinks from '@/components/sections/LeistungenLinks'
import CasesSection from '@/components/sections/CasesSection'
import StatementSection from '@/components/sections/StatementSection'
import StimmenSection from '@/components/sections/StimmenSection'
import UeberUnsSection from '@/components/sections/UeberUnsSection'
import ZielgruppeSection from '@/components/sections/ZielgruppeSection'
import FragenSection from '@/components/sections/FragenSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import AiBadge from '@/components/AiBadge'
import LazyVideo from '@/components/LazyVideo'
import DescentStack from '@/components/DescentStack'
import AufstiegsPfad from '@/components/AufstiegsPfad'
import { FAQ } from '@/lib/faq'
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '@/lib/site'

/**
 * Structured Data der Startseite: die FAQ als FAQPage (identisch zum sichtbaren
 * Text in FragenSection) und die Seite selbst als WebPage der Marken-Entität.
 * Ergänzt den Organization-/Person-Graph aus app/layout.tsx.
 *
 * Die FAQ-Auszeichnung kommt aus lib/faq – derselben Quelle, aus der auch die
 * sichtbare Sektion liest. Damit kann keine Antwort ausgezeichnet werden, die
 * auf der Seite nicht steht.
 */
const pageJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'WebPage',
            '@id': `${SITE_URL}/#webpage`,
            url: `${SITE_URL}/`,
            name: SITE_TITLE,
            description: SITE_DESCRIPTION,
            inLanguage: 'de-DE',
            isPartOf: { '@id': `${SITE_URL}/#website` },
            about: { '@id': `${SITE_URL}/#organization` },
            primaryImageOfPage: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/images/og-lindermedia.jpg`,
                width: 1200,
                height: 630,
            },
        },
        {
            '@type': 'FAQPage',
            '@id': `${SITE_URL}/#faq`,
            isPartOf: { '@id': `${SITE_URL}/#webpage` },
            mainEntity: FAQ.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a },
            })),
        },
    ],
}

// Akt-2-Videos zentral. Angegeben wird die Desktop-Fassung; useVideoSource
// waehlt auf schmalen Viewports die Datei mit `-m`-Endung daneben
// (erzeugt von scripts/to-web-video.sh aus public/video/_src/).
//
// Video 03 „Orientierung" (Drohnenflug mit Kompass-Overlay) ist auf Wunsch
// entfallen. Die Datei `orientierung-flight.mp4` und ihr Poster liegen weiter
// in public/video, werden aber nirgends mehr eingebunden.
const AKT2_VIDEOS = {
    v1: '/video/vid-lm-1.mp4',  // „Aus Strategie wird Wirklichkeit"
    v2: '/video/vid-lm-2.mp4',  // „Aus Ideen werden Erlebnisse"
}

export default function Home() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
            />
            <LenisProvider />
            <VideoCanvas />
            <Navbar />
            <ScrollFortschritt />
            <TextLayer />
            {/* Kennzeichnung für die Eisberg-Strecke – läuft mit und blendet danach
                aus. Der Text benennt, was das Material ist: eine
                Konzeptvisualisierung, kein aufgenommenes Bild. Das ist die
                zutreffende Angabe und zugleich die leiseste – ein breites
                „KI-generiert“ über der ganzen Strecke las sich wie eine Warnung. */}
            <AiBadge track="iceberg" label="Konzeptvisualisierung · KI-generiert" />

            <main style={{ position: 'relative' }}>
                {/* Akt 1 – Abstieg: Eisberg → Wasserlinie → Problem →
                    Markenpräsenz · Design · Strategie → tiefster Punkt */}
                <div id="video-scroll" style={{ height: '710vh', position: 'relative', zIndex: 1 }}>
                    <DescentStack />
                </div>

                {/* Der Prozessbereich sitzt am tiefsten Punkt, noch vollständig
                    unter Wasser: der Eisberg läuft dahinter weiter und hebt sich
                    dabei schon – die Strecke zwischen den beiden Drivern ist der
                    mittlere Abschnitt der Bildsequenz (siehe VideoCanvas). */}
                <div style={{ position: 'relative', zIndex: 2 }}>
                    <MethodeSection />
                </div>

                {/* Akt 1 – Wiederaufstieg: Wasser und Licht werden heller, der
                    Berg steht wieder über der Oberfläche, jetzt ohne Nebel. */}
                {/* Der Weg laeuft weiter: von unten aus der Tiefe bis zur
                    Wasserlinie, wo der Berg wieder auftaucht. */}
                <div id="video-ascent" style={{ height: '420vh', position: 'relative', zIndex: 1 }}>
                    <AufstiegsPfad />
                </div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    {/* ── Akt 2 · Phase 1: Verstehen ── */}
                    {/* Hier bewusst OHNE SectionConnector: der Strichpfeil sass
                        genau auf der Kante zwischen Eisbergbild und Videosektion
                        und hat den Uebergang zerschnitten. */}
                    <Akt2VideoSection
                        id="strategie-wirklichkeit"
                        index="01"
                        kicker="Warum Klarheit zuerst kommt"
                        chapter="Strategie & Fundament"
                        videoSrc={AKT2_VIDEOS.v1}
                        poster="/video/poster-lm-1.webp"
                        headline="Aus Strategie wird Wirklichkeit."
                        text={[
                            'Eine Marke beginnt nicht mit Gestaltung. Sie beginnt mit Klarheit.',
                            'Erst wenn Zusammenhänge sichtbar werden, kann Gestaltung ihre Wirkung entfalten.',
                        ]}
                        ctaLabel="Weiter entdecken"
                        ctaHref="#usp"
                    />
                    {/* Der Anker #leistungen sitzt seit dem Wegfall des
                        Drei-Bereiche-Teasers an diesem Block: Arbeitsweise und
                        Einzeldisziplinen sind jetzt das, was unter „Leistungen"
                        aus Navigation und Fußzeile angesteuert wird. */}
                    <div className="a2-duo" id="leistungen">
                        <div className="a2-duo-grid">
                            <UspSection />
                            <LeistungenSection />
                        </div>
                        {/* Die Grafik zeigt den Zusammenhang der drei Ebenen,
                            diese Zeile die einzelnen Disziplinen – sie ist der
                            einzige Weg von der Startseite auf alle neun
                            Leistungsseiten. */}
                        <LeistungenLinks />
                    </div>

                    {/* ── Akt 2 · Phase 2: Erleben ── */}
                    <SectionConnector flip />
                    <Akt2VideoSection
                        id="ideen-erlebnisse"
                        index="02"
                        kicker="Wie aus Konzept Gestaltung wird"
                        chapter="Kreation & Umsetzung"
                        cgiGenerated
                        videoSrc={AKT2_VIDEOS.v2}
                        poster="/video/poster-lm-2.webp"
                        headline="Aus Ideen werden Erlebnisse."
                        text={[
                            'Strategie, Gestaltung und Umsetzung greifen ineinander.',
                            'Was danach kommt, sind keine Einzelmaßnahmen mehr.',
                        ]}
                        ctaLabel="Projekte ansehen"
                        ctaHref="#projekte"
                    />
                    <CasesSection />
                    {/* Beweiskette: erst die Arbeit (Cases), direkt danach die Stimmen dazu */}
                    <StimmenSection />

                    {/* Vertrauen in die Person, dann die Frage „Bin ich gemeint?“,
                        zuletzt die verbleibenden Einwände (FAQ). */}
                    <UeberUnsSection />
                    <ZielgruppeSection />
                    <FragenSection />

                    {/* ── Akt 2 · Phase 3: Vertrauen ── */}
                    <SectionConnector />
                    <StatementSection />

                    {/* ── Abschluss: Kontakt (Leuchtturm-Hintergrund bleibt) ── */}
                    <div className="site-closing">
                        <LazyVideo
                            className="site-closing-video"
                            src="/video/lighthouse_vid.mp4"
                            poster="/images/lighthouse.webp"
                            aiGenerated
                            pauseControl
                            pauseControlClassName="site-closing-pause"
                        />
                        {/* KI-generiertes Leuchtturm-Material → Kennzeichnung */}
                        <AiBadge className="site-closing-ai" label="Konzeptvisualisierung · KI-generiert" />
                        <ContactSection />
                        <Footer />
                    </div>
                </div>
            </main>
        </>
    )
}
