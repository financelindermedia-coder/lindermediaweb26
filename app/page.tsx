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

// Akt-2-Videos zentral (Platzhalter — echte Dateien später unter gleichem Pfad ablegen)
const AKT2_VIDEOS = {
    v1: '/video/lindermedia_gedanken.mp4',  // „Aus Strategie wird Wirklichkeit"
    v2: '/video/lighthouse_vid.mp4',  // TODO: „Aus Ideen werden Erlebnisse" (Dummy: Lighthouse)
    v3: '/video/lighthouse_vid.mp4',  // „Orientierung" (Leuchtturm)
}

export default function Home() {
    return (
        <>
            <LenisProvider />
            <VideoCanvas />
            <Navbar />
            <TextLayer />
            <GlowLayer />

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
                        kicker="Fullscreen Video 01"
                        chapter="Von der Strategie zur Wirkung"
                        videoSrc={AKT2_VIDEOS.v1}
                        poster="/video/IB__S3.png"
                        headline="Aus Strategie wird Wirklichkeit."
                        text={[
                            'Eine Marke beginnt nicht mit Gestaltung. Sie beginnt mit Klarheit.',
                            'Erst wenn Zusammenhänge sichtbar werden, kann Gestaltung ihre Wirkung entfalten.',
                        ]}
                        ctaLabel="Weiter entdecken"
                        ctaHref="#usp"
                    />
                    <div id="leistungen" className="a2-duo">
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
                        kicker="Fullscreen Video 02"
                        chapter="Der kreative Prozess"
                        videoSrc={AKT2_VIDEOS.v2}
                        poster="/images/lighthouse.jpg"
                        headline="Aus Ideen werden Erlebnisse."
                        text={[
                            'Strategie. Design. Technologie.',
                            'Ein Zusammenspiel für Marken, die man spürt.',
                        ]}
                        ctaLabel="Projekte ansehen"
                        ctaHref="#projekte"
                    />
                    <CasesSection />

                    {/* ── vorerst behalten (finale Platzierung offen) ── */}
                    <UeberUnsSection />
                    <FragenSection />
                    <StimmenSection />

                    {/* ── Akt 2 · Phase 3: Vertrauen ── */}
                    <SectionConnector />
                    <StatementSection />
                    <Akt2VideoSection
                        id="orientierung"
                        index="03"
                        kicker="Fullscreen Video 03"
                        chapter="Orientierung"
                        videoSrc={AKT2_VIDEOS.v3}
                        poster="/images/lighthouse.jpg"
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
                        <video
                            className="site-closing-video"
                            src="/video/lighthouse_vid.mp4"
                            poster="/images/lighthouse.jpg"
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                        />
                        <ContactSection />
                        <Footer />
                    </div>
                </div>
            </main>
        </>
    )
}
