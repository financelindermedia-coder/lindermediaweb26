'use client'

import LenisProvider from '@/components/LenisProvider'
import SectionConnector from '@/components/SectionConnector'
import Navbar from '@/components/Navbar'
import HeroIceberg from '@/components/HeroIceberg'
import ChaosCharakter from '@/components/sections/ChaosCharakter'
import ScrollFortschritt from '@/components/ScrollFortschritt'
import Akt2VideoSection from '@/components/sections/Akt2VideoSection'
import CasesSection from '@/components/sections/CasesSection'
import StimmenSection from '@/components/sections/StimmenSection'
import VorgehenSection from '@/components/sections/VorgehenSection'
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
            <Navbar />
            <ScrollFortschritt />
            <main style={{ position: 'relative' }}>
                {/* Hero: scrollgesteuerter Eisberg (ice_crash.mp4), nur hier gibt es
                    eine Scroll-Inszenierung. Danach laeuft die Seite normal. */}
                <HeroIceberg />

                {/* „Von Chaos zu Charakter“ – die Erklaerung der vier Ebenen (frueher
                    „Wir arbeiten unter der Oberflaeche“) steht jetzt im Hero. */}
                <ChaosCharakter />

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
                        ctaHref="#leistungen"
                    />
                    {/* Der Anker #leistungen liegt auf VorgehenSection. */}
                    <VorgehenSection />

                    {/* ── Akt 2 · Phase 2: Erleben ── */}
                    <SectionConnector flip />
                    <Akt2VideoSection
                        id="ideen-erlebnisse"
                        index="02"
                        kicker="Weniger Lärm. Mehr Wirkung."
                        chapter="Kreation & Umsetzung"
                        cgiGenerated
                        videoSrc={AKT2_VIDEOS.v2}
                        poster="/video/poster-lm-2.webp"
                        headline="Aus einer klaren Richtung wird ein Auftritt, der trägt."
                        text={[
                            'Bild, Bewegung und Sprache erzählen dieselbe Geschichte – und machen sichtbar, was eine Marke besonders macht.',
                        ]}
                        ctaLabel="Projekte ansehen"
                        ctaHref="#projekte"
                    />
                    <CasesSection />
                    {/* Beweiskette: erst die Arbeit (Cases), direkt danach die Stimmen dazu */}
                    <StimmenSection />

                    {/* Vertrauen in die Person, zuletzt die verbleibenden Einwände (FAQ). */}
                    <UeberUnsSection />
                    <FragenSection />

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
