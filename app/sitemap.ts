import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/site'

/**
 * Sitemap – One-Pager plus Rechtsseiten und die Fallstudien.
 *
 * Alle sechs Fallstudien stehen drin: Seit die Materialplaetze raus sind, traegt
 * jede Seite nur noch fertigen Inhalt. Reihenfolge wie in lib/cases.ts.
 */
const FALLSTUDIEN = [
    'solar-impact-yacht',
    'novodex',
    'wellenwind',
    'marevo',
    'lubrican',
    'schaaf-tender',
]

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return [
        { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
        ...FALLSTUDIEN.map((slug) => ({
            url: `${SITE_URL}/projekte/${slug}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        })),
        { url: `${SITE_URL}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${SITE_URL}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ]
}
