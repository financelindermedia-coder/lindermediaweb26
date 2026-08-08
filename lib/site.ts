/**
 * Zentrale Stammdaten für SEO, Structured Data und GEO (Generative Engine
 * Optimization). Alle Schema.org-Blöcke, Sitemap, robots.txt und llms.txt
 * ziehen ihre Werte hier heraus – damit NAP-Daten (Name, Adresse, Kontakt)
 * seitenübergreifend identisch sind. Das ist die Voraussetzung dafür, dass
 * Suchmaschinen und KI-Systeme die Marke als eine Entität erkennen.
 *
 * Domain per NEXT_PUBLIC_SITE_URL überschreibbar (z. B. eigene Domain in Vercel).
 */
export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ?? 'https://lindermediaweb26.vercel.app'
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

/** Leistungen – Reihenfolge entspricht LeistungskartenSection. */
export const SERVICES = [
    { name: 'Markenstrategie', description: 'Klarheit über Position, Botschaft und Ziel – das Fundament jeder Marke.' },
    { name: 'Corporate Design', description: 'Eine visuelle Identität, die auf jedem Kanal wiedererkennbar bleibt.' },
    { name: 'Fotografie', description: 'Bilder mit Haltung – die die Marke authentisch spürbar machen.' },
    { name: 'Filmproduktion', description: 'Bewegtbild, das Emotion transportiert und Geschichten verdichtet.' },
    { name: 'CGI & 3D-Visualisierung', description: 'Produkte und Welten fotorealistisch inszeniert – ohne Grenzen der Realität.' },
    { name: 'Webdesign & Websites', description: 'Digitale Auftritte, die führen, überzeugen und konvertieren.' },
    { name: 'SEO', description: 'Sichtbarkeit dort, wo Kunden aktiv suchen – nachhaltig aufgebaut.' },
    { name: 'KI-Visualisierung', description: 'Ideen sofort sichtbar – mit KI vom Gedanken zum Bild.' },
    { name: 'Automatisierung', description: 'Prozesse intelligent verbinden – mehr Wirkung bei weniger Aufwand.' },
]

export const SITE_TITLE = 'LinderMedia — Markenstrategie, Design & Sichtbarkeit aus einer Hand'
export const SITE_DESCRIPTION =
    'LinderMedia entwickelt Marken vom Fundament aus: Strategie, Corporate Design, Film, Webdesign und SEO als ein System. Inhabergeführt aus dem Westerwald – Andreas Linder. Jetzt Strategiegespräch anfragen.'
