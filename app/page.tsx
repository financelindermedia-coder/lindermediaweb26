'use client'

import LenisProvider from '@/components/LenisProvider'
import VideoCanvas from '@/components/VideoCanvas'
import TextLayer from '@/components/TextLayer'
import GlowLayer from '@/components/GlowLayer'
import SectionConnector from '@/components/SectionConnector'
import Navbar from '@/components/Navbar'
import ProblemSection from '@/components/sections/ProblemSection'
import MethodeSection from '@/components/sections/MethodeSection'
import LeistungenSection from '@/components/sections/LeistungenSection'
import CasesSection from '@/components/sections/CasesSection'
import StimmenSection from '@/components/sections/StimmenSection'
import MenschenFaqSection from '@/components/sections/MenschenFaqSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

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
                    <ProblemSection />
                    <SectionConnector />
                    <MethodeSection />
                    <SectionConnector flip />
                    <LeistungenSection />
                    <SectionConnector />
                    <CasesSection />
                    <SectionConnector flip />
                    <MenschenFaqSection />
                    <SectionConnector />
                    <StimmenSection />
                    <SectionConnector flip />
                    <div className="site-closing">
                        <ContactSection />
                        <Footer />
                    </div>
                </div>
            </main>
        </>
    )
}
