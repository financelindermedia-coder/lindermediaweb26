'use client'

import VideoCanvas from '@/components/VideoCanvas'
import TextLayer from '@/components/TextLayer'
import SichtbarkeitOverlay from '@/components/SichtbarkeitOverlay'
import Navbar from '@/components/Navbar'
import ErkenntnisSection from '@/components/sections/ErkenntnisSection'
import FAQSection from '@/components/sections/FAQSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
    return (
        <>
            <VideoCanvas />
            <Navbar />
            <TextLayer />
            <SichtbarkeitOverlay />

            <main style={{ position: 'relative' }}>
                <div id="video-scroll" style={{ height: '1200vh' }} />

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <ErkenntnisSection />
                    <FAQSection />
                    <ContactSection />
                    <Footer />
                </div>
            </main>
        </>
    )
}
