import type { MetadataRoute } from 'next'
import { FALLSTUDIEN } from '@/lib/cases'
import { LEISTUNGEN } from '@/lib/leistungen'
import { SITE_URL } from '@/lib/site'

/**
 * Sitemap – Startseite, Leistungsseiten, Fallstudien, Rechtsseiten.
 *
 * Die Listen kommen aus lib/cases und lib/leistungen, nicht aus einer Kopie
 * hier: Eine zweite Aufzaehlung derselben Slugs laeuft irgendwann auseinander,
 * und der Fehler faellt niemandem auf – eine Seite fehlt dann still im Index.
 *
 * Die Leistungsseiten stehen vor den Fallstudien und hoeher gewichtet: Sie sind
 * die Einstiege aus der Suche, die Fallstudien der Beleg dahinter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return [
        { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
        ...LEISTUNGEN.map((l) => ({
            url: `${SITE_URL}/leistungen/${l.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.8,
        })),
        ...FALLSTUDIEN.map((f) => ({
            url: `${SITE_URL}/projekte/${f.slug}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        })),
        { url: `${SITE_URL}/impressum`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${SITE_URL}/datenschutz`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    ]
}
