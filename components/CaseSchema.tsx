import { FALLSTUDIEN } from '@/lib/cases'
import { BUSINESS, SITE_URL } from '@/lib/site'

/**
 * Structured Data der Fallstudien-Seiten.
 *
 * Zwei Angaben, die Google und KI-Systeme aus dem Fließtext sonst raten müssen:
 * wo die Seite in der Struktur hängt (BreadcrumbList) und dass sie ein Beitrag
 * dieser Marke über ein bestimmtes Projekt ist (Article).
 *
 * Der Autor verweist auf dieselbe `@id` wie der Graph im Layout – so bleibt es
 * EINE Entität „LinderMedia" und nicht auf jeder Unterseite eine neue.
 *
 * BEWUSST OHNE: `aggregateRating`, `review`, Kennzahlen. Für keines der
 * Projekte liegen belegte Werte vor; ausgezeichnet wird nur, was auf der Seite
 * sichtbar steht (siehe auch CaseImpact).
 *
 * Server-Component: das Skript gehört ins ausgelieferte HTML, nicht in ein
 * Bundle, das erst im Browser läuft.
 */
export default function CaseSchema({
    slug,
    titel,
    beschreibung,
    bild,
}: {
    /** Slug der Fallstudie, wie in lib/cases.ts. */
    slug: string
    titel: string
    beschreibung: string
    /** Absoluter Pfad des Key-Visuals, z. B. `/images/case-…webp`. */
    bild: string
}) {
    const name = FALLSTUDIEN.find((f) => f.slug === slug)?.name ?? slug
    const url = `${SITE_URL}/projekte/${slug}`

    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Article',
                '@id': `${url}/#article`,
                headline: titel,
                description: beschreibung,
                image: `${SITE_URL}${bild}`,
                inLanguage: 'de-DE',
                mainEntityOfPage: url,
                author: { '@id': `${SITE_URL}/#andreas-linder` },
                publisher: { '@id': `${SITE_URL}/#organization` },
                about: name,
            },
            {
                '@type': 'BreadcrumbList',
                '@id': `${url}/#breadcrumb`,
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: BUSINESS.name, item: SITE_URL },
                    {
                        '@type': 'ListItem',
                        position: 2,
                        name: 'Projekte',
                        item: `${SITE_URL}/#projekte`,
                    },
                    { '@type': 'ListItem', position: 3, name, item: url },
                ],
            },
        ],
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
