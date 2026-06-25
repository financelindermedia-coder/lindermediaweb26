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
    title: 'LinderMedia — Strategische Markenarchitektur & performantes Marketing',
    description: 'Markenstrategie, Website, Google Ads und Leadgenerierung aus einer Hand. LinderMedia entwickelt Systeme, die messbar wirken. Jetzt Strategiegespräch anfragen.',
    keywords: ['Markenstrategie', 'Leadgenerierung', 'Website Design', 'Google Ads', 'Positionierung', 'Corporate Identity', 'Markenarchitektur', 'LinderMedia'],
    authors: [{ name: 'LinderMedia' }],
    robots: { index: true, follow: true },
    openGraph: {
        title: 'LinderMedia — Strategische Markenarchitektur & performantes Marketing',
        description: 'Markenstrategie, Website, Ads und Automatisierung – ein System, das messbar wirkt.',
        type: 'website',
        locale: 'de_DE',
        siteName: 'LinderMedia',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LinderMedia — Strategische Markenarchitektur & performantes Marketing',
        description: 'Markenstrategie, Website, Ads und Automatisierung – ein System, das messbar wirkt.',
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
