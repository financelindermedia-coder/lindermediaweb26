import type { Metadata } from 'next'
import { Barlow } from 'next/font/google'
import './globals.css'

const barlow = Barlow({
    subsets: ['latin'],
    weight: ['300', '400', '600', '700', '800', '900'],
    variable: '--font-barlow',
    display: 'swap',
})

export const metadata: Metadata = {
    title: 'LinderMedia — Markenarchitektur & Sichtbarkeit',
    description: 'Starke Marken entstehen nicht an der Oberfläche. Wir entwickeln Markenarchitektur, die Strategie, Identität und Kommunikation verbindet — für nachhaltige Sichtbarkeit.',
    keywords: ['Markenarchitektur', 'Markenstrategie', 'Sichtbarkeit', 'Positionierung', 'Corporate Identity', 'Branding', 'Marketing', 'LinderMedia'],
    authors: [{ name: 'LinderMedia' }],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'LinderMedia — Markenarchitektur & Sichtbarkeit',
        description: 'Starke Marken entstehen nicht an der Oberfläche. Wir entwickeln die Architektur, die alles trägt.',
        type: 'website',
        locale: 'de_DE',
        siteName: 'LinderMedia',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinderMedia — Markenarchitektur & Sichtbarkeit',
        description: 'Starke Marken entstehen nicht an der Oberfläche.',
    },
}

const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'LinderMedia',
    description: 'Markenarchitektur, Markenstrategie und Sichtbarkeit für Unternehmen.',
    serviceType: ['Markenarchitektur', 'Markenstrategie', 'Corporate Identity', 'SEO', 'Web Design'],
    areaServed: { '@type': 'Country', name: 'Deutschland' },
    inLanguage: 'de',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="de" className={barlow.variable}>
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body>{children}</body>
        </html>
    )
}
