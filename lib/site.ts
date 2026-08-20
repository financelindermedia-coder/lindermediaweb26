/**
 * Zentrale Stammdaten für SEO und Structured Data. Alle Schema.org-Blöcke,
 * Sitemap und robots.txt ziehen ihre Werte hier heraus – damit NAP-Daten
 * (Name, Adresse, Kontakt) seitenübergreifend identisch sind. Das ist die
 * Voraussetzung dafür, dass Suchmaschinen die Marke als eine Entität erkennen.
 */

/**
 * Produktionsdomain. Einzige Quelle für Canonical, Open Graph, JSON-LD-IDs,
 * Sitemap und den Sitemap-Verweis in der robots.txt.
 *
 * Der Default ist die finale Domain, NICHT die Vercel-Vorschau: würde die
 * Vorschauadresse als Fallback stehenbleiben, verwiesen alle kanonischen URLs
 * nach dem Hostingwechsel weiter auf eine Kopie der Seite. Die Vorschau setzt
 * stattdessen NEXT_PUBLIC_NOINDEX (siehe unten) und wird gar nicht erst
 * indexiert.
 *
 * Überschreibbar per NEXT_PUBLIC_SITE_URL (siehe .env.example).
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lindermedia.de'
).replace(/\/+$/, '')

/**
 * Sperrt die Auslieferung fuer Suchmaschinen und KI-Crawler: robots.txt
 * verbietet dann alles, und jede Seite traegt `noindex, nofollow` im Head.
 *
 * Gedacht fuer die Vorschau unter lindermediaweb26.vercel.app. Ohne die Sperre
 * wuerde die Vorschau indexiert – und die spaetere Live-Domain traete gegen
 * eine bereits indexierte Kopie ihrer selbst an.
 *
 * BEWUSST ALS OPT-OUT: ohne gesetzte Variable ist die Seite indexierbar. Ein
 * Schalter andersherum („nur indexieren, wenn X gesetzt ist") wuerde beim
 * Umzug auf den finalen Server genau einmal vergessen – und die Seite bliebe
 * unsichtbar, ohne dass es jemandem auffaellt. Der Fehlerfall soll die harmlose
 * Richtung haben.
 *
 * Setzen in den Vercel-Projekteinstellungen:  NEXT_PUBLIC_NOINDEX = 1
 * Danach neu deployen – NEXT_PUBLIC_*-Werte werden beim Build eingesetzt.
 */
export const NOINDEX = ['1', 'true'].includes(
    (process.env.NEXT_PUBLIC_NOINDEX ?? '').trim().toLowerCase(),
)

export const BUSINESS = {
    name: 'LinderMedia',
    legalName: 'LinderMedia – Andreas Linder',
    founder: 'Andreas Linder',
    email: 'hello@lindermedia.de',
    telephone: '+4917693177417',
    street: 'Schloßstraße 31',
    postalCode: '56459',
    city: 'Pottum',
    region: 'Rheinland-Pfalz',
    country: 'DE',
    // Ortsmittelpunkt Pottum (Westerwaldkreis) – für lokale Suchanfragen
    latitude: 50.5825,
    longitude: 7.9836,
} as const

/** Einzugsgebiet – für „Werbeagentur in der Nähe"-Anfragen und lokale Relevanz. */
export const AREA_SERVED = [
    'Westerwald',
    'Montabaur',
    'Limburg an der Lahn',
    'Koblenz',
    'Rheinland-Pfalz',
    'Hessen',
    'Deutschland',
]

/**
 * Die drei Hauptbereiche. Speisen den OfferCatalog im Structured Data
 * (app/layout.tsx).
 *
 * ACHTUNG: Seit der Leistungsteaser von der Startseite genommen wurde, stehen
 * diese Texte nirgends mehr sichtbar auf der Seite – ausgezeichnet wird damit
 * mehr, als der Besucher zu lesen bekommt. Entweder kommt ein sichtbarer
 * Leistungsblock zurueck, oder der OfferCatalog geht raus.
 */
export const CORE_SERVICES = [
    {
        name: 'Strategie',
        description:
            'Wir klären, wofür Ihr Unternehmen steht, wen es erreichen soll und welche Botschaft trägt.',
    },
    {
        name: 'Corporate Design',
        description:
            'Wir übersetzen eine klare Position in eine visuelle Identität, die wiedererkennbar bleibt und im Alltag funktioniert.',
    },
    {
        name: 'Webdesign & digitale Umsetzung',
        description:
            'Wir entwickeln digitale Auftritte, die Inhalte verständlich ordnen, Vertrauen aufbauen und den nächsten Schritt erleichtern.',
    },
]

/**
 * Nachgeordnete Kompetenzfelder – sichtbar in der System-Grafik, aber bewusst
 * nicht auf derselben Ebene wie die drei Hauptbereiche und deshalb auch nicht
 * als eigene Offers ausgezeichnet.
 */
export const COMPETENCES = [
    'Fotografie',
    'Film & Video',
    '3D & Visualisierung',
    'Technologie',
    'SEO',
    'Automatisierung',
]

export const SITE_TITLE = 'Markenstrategie, Corporate Design & Webdesign | LinderMedia'
export const SITE_DESCRIPTION =
    'LinderMedia entwickelt Markenauftritte für Unternehmen, deren Leistung nach außen noch nicht klar genug ankommt — von der Positionierung bis zur digitalen Umsetzung.'
