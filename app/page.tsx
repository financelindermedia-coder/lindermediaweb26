'use client'

import LenisProvider from '@/components/LenisProvider'
import VideoCanvas from '@/components/VideoCanvas'
import TextLayer from '@/components/TextLayer'
import GlowLayer from '@/components/GlowLayer'
import SectionConnector from '@/components/SectionConnector'
import Navbar from '@/components/Navbar'
import ProblemSection from '@/components/sections/ProblemSection'
import MethodeSection from '@/components/sections/MethodeSection'
import Akt2VideoSection from '@/components/sections/Akt2VideoSection'
import UspSection from '@/components/sections/UspSection'
import LeistungenSection from '@/components/sections/LeistungenSection'
import CasesSection from '@/components/sections/CasesSection'
import StatementSection from '@/components/sections/StatementSection'
import StimmenSection from '@/components/sections/StimmenSection'
import UeberUnsSection from '@/components/sections/UeberUnsSection'
import FragenSection from '@/components/sections/FragenSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'
import AiBadge from '@/components/AiBadge'
import LazyVideo from '@/components/LazyVideo'
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
const AKT2_VIDEOS = {
    v1: '/video/vid-lm-1.mp4',  // „Aus Strategie wird Wirklichkeit"
    v2: '/video/vid-lm-2.mp4',  // „Aus Ideen werden Erlebnisse"
    v3: '/video/orientierung-flight.mp4',  // „Orientierung" (Drohnenflug S1→S2→S3 mit Kompass-Overlay)
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
            <TextLayer />
            <GlowLayer />
            {/* Kennzeichnung für die KI-generierte Eisberg-/Glow-Strecke – läuft mit und blendet danach aus */}
            <AiBadge track="glow" />

            <main style={{ position: 'relative' }}>
                {/* Akt 1 – Markenarchitektur (Eisberg → Unterwasser) */}
                <div id="video-scroll" style={{ height: '1200vh' }} />
                {/* Akt 2 – Glow-Pfad-Landschaft → Gipfel → White-Fade */}
                <div id="glow-scroll" style={{ height: '900vh' }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    {/* ── Ende Akt 1: Problemerkennung + So arbeiten wir ── */}
                    <ProblemSection />
                    <SectionConnector />
                    <MethodeSection />

                    {/* ── Akt 2 · Phase 1: Verstehen ── */}
                    <SectionConnector flip />
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
                    </div>

                    {/* ── Akt 2 · Phase 2: Erleben ── */}
                    <SectionConnector flip />
                    <Akt2VideoSection
                        id="ideen-erlebnisse"
                        index="02"
                        kicker="Wie aus Konzept Gestaltung wird"
                        chapter="Kreation & Umsetzung"
                        videoSrc={AKT2_VIDEOS.v2}
                        poster="/video/poster-lm-2.webp"
                        headline="Aus einer klaren Richtung entsteht ein Auftritt, der funktioniert."
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

                    {/* Vertrauen in die Person, danach die letzten Einwände (FAQ) */}
                    <UeberUnsSection />
                    <FragenSection />

                    {/* ── Akt 2 · Phase 3: Vertrauen ── */}
                    <SectionConnector />
                    <StatementSection />
                    <Akt2VideoSection
                        id="orientierung"
                        index="03"
                        kicker="Was am Ende bleibt"
                        chapter="Haltung & Orientierung"
                        videoSrc={AKT2_VIDEOS.v3}
                        poster="/video/poster-orientierung.webp"
                        aiGenerated
                        compassOverlay
                        cornerPlayButton
                        endHoldSeconds={5}
                        headline="Orientierung."
                        text={[
                            'Die besten Marken geben Orientierung.',
                            'Nicht, weil sie lauter sind. Sondern, weil sie klarer sind.',
                        ]}
                        ctaLabel="Gespräch anfragen"
                        ctaHref="#contact"
                    />

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
                        {/* gleiches Leuchtturm-Material wie Video 03 → gleiche Kennzeichnung */}
                        <AiBadge className="site-closing-ai" />
                        <ContactSection />
                        <Footer />
                    </div>
                </div>
            </main>
        </>
    )
}
