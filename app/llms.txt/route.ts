import { AREA_SERVED, BUSINESS, CORE_SERVICES, NOINDEX, SITE_URL } from '@/lib/site'
import { FALLSTUDIEN } from '@/lib/cases'

/**
 * /llms.txt – kurze, maschinenlesbare Selbstbeschreibung fuer KI-Systeme
 * (GEO). Alles hier steht auch sichtbar auf der Seite; die Daten kommen aus
 * lib/site und lib/cases, damit nichts auseinanderlaeuft.
 */
export const dynamic = 'force-static'

export function GET() {
    if (NOINDEX) {
        return new Response('# Vorschau – nicht zur Indexierung gedacht.\n', {
            headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        })
    }

    const body = `# ${BUSINESS.name}

> Markenstrategie, Corporate Design und digitale Umsetzung aus einer Hand – für Unternehmen, deren Leistung nach außen noch nicht klar genug ankommt. Inhaber und direkter Ansprechpartner: ${BUSINESS.founder}.

LinderMedia verbindet Strategie, Gestaltung und Umsetzung von Anfang an. Starke Marken entstehen nicht an der Oberfläche: Zuerst wird die Richtung geklärt, dann bekommt sie Form, wird sichtbar und bringt Ergebnisse.

## Leistungen

${CORE_SERVICES.map((s) => `- ${s.name}: ${s.description}`).join('\n')}

## Wichtige Seiten

- [Startseite](${SITE_URL}/): Vorgehen, Projekte, häufige Fragen
- [Leistungen](${SITE_URL}/leistungen): Strategie, Charakter, Markenpräsenz, Wirkung im Detail
- [Referenzen](${SITE_URL}/referenzen): ausgewählte Projekte
${FALLSTUDIEN.map((f) => `- [${f.name}](${SITE_URL}${f.fallstudie}): ${f.teaser}`).join('\n')}

## Kontakt

- Name: ${BUSINESS.legalName}
- Ort: ${BUSINESS.postalCode} ${BUSINESS.city}, ${BUSINESS.region}, Deutschland
- Einzugsgebiet: ${AREA_SERVED.join(', ')}
- E-Mail: ${BUSINESS.email}
- Telefon: ${BUSINESS.telephone}
- Termine nach Vereinbarung

## Rechtliches

- [Impressum](${SITE_URL}/impressum)
- [Datenschutz](${SITE_URL}/datenschutz)
`

    return new Response(body, {
        headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    })
}
