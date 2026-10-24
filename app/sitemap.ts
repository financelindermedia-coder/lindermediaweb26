import type { MetadataRoute } from 'next'
import { FALLSTUDIEN } from '@/lib/cases'
import { SITE_URL } from '@/lib/site'

const SITE_LAST_MODIFIED = '2026-10-24'
const LEGAL_LAST_MODIFIED = '2026-10-24'

/**
 * Sitemap – Startseite, Leistungen, Referenzen, Fallstudien, Rechtsseiten.
 *
 * Die Fallstudien-Liste kommt aus lib/cases, nicht aus einer Kopie hier: Eine
 * zweite Aufzaehlung derselben Slugs laeuft irgendwann auseinander, und der
 * Fehler faellt niemandem auf – eine Seite fehlt dann still im Index.
 *
 * Die neun frueheren Einzelseiten je Disziplin sind zu einer Seite
 * zusammengelegt (app/leistungen/page.tsx) – deshalb hier nur noch ein
 * Eintrag statt einer Schleife ueber lib/leistungen.
 */
export default function sitemap(): MetadataRoute.Sitemap {
    // Feste Daten statt „heute": Suchmaschinen bewerten die Angabe nur, wenn sie
    // stimmt. Beim inhaltlichen Update der Seite das jeweilige Datum anheben.
    const lastModified = new Date(SITE_LAST_MODIFIED)
    const legalModified = new Date(LEGAL_LAST_MODIFIED)

    return [
        { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
        { url: `${SITE_URL}/methode`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/leistungen`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${SITE_URL}/referenzen`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
        ...FALLSTUDIEN.map((f) => ({
            url: `${SITE_URL}/projekte/${f.slug}`,
            lastModified,
            changeFrequency: 'yearly' as const,
            priority: 0.7,
        })),
        { url: `${SITE_URL}/impressum`, lastModified: legalModified, changeFrequency: 'yearly', priority: 0.3 },
        { url: `${SITE_URL}/datenschutz`, lastModified: legalModified, changeFrequency: 'yearly', priority: 0.3 },
    ]
}
