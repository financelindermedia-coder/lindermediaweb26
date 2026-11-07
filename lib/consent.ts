/**
 * Einwilligungsverwaltung (Cookie-Banner).
 *
 * Gespeichert wird in localStorage – es wird bewusst kein Cookie gesetzt: die
 * Entscheidung selbst ist technisch erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG) und
 * braucht keinen Server-Abgleich. Ohne Entscheidung gilt: nichts Nicht-
 * Notwendiges wird geladen.
 *
 * Neue Dienste: eine Kategorie in KATEGORIEN ergänzen, den Dienst nur laden,
 * wenn `hatEinwilligung('<id>')` wahr ist, und den Abschnitt „Cookies“ in
 * app/datenschutz/page.tsx anpassen.
 */

/** Messung-ID von Google Analytics 4 (G-XXXXXXXXXX). Leer = Analytics ist aus. */
export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID ?? '').trim()

/**
 * Banner nur dort, wo es etwas zu entscheiden gibt: sobald ein einwilligungs-
 * pflichtiger Dienst konfiguriert ist, in der Entwicklung (zum Gestalten) oder
 * mit NEXT_PUBLIC_CONSENT_PREVIEW=1 (Vorschau-Instanz). Ein Banner ohne
 * Dienste dahinter wäre irreführend.
 */
export const CONSENT_AKTIV =
    GA_ID !== '' ||
    process.env.NEXT_PUBLIC_CONSENT_PREVIEW === '1' ||
    process.env.NODE_ENV === 'development'

/**
 * Sendet ein GA4-Ereignis – aber nur, wenn Analytics tatsächlich geladen ist
 * (also nach Einwilligung). Ohne Einwilligung ist das ein stiller No-Op.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
    if (typeof window === 'undefined' || !GA_ID) return
    const g = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag
    if (typeof g === 'function') g('event', name, params)
}

export type KategorieId = 'statistik'

export const KATEGORIEN: { id: KategorieId; titel: string; text: string }[] = [
    {
        id: 'statistik',
        titel: 'Statistik',
        text:
            'Google Analytics 4 zeigt uns anonymisiert, welche Seiten gelesen werden und wie Besucher auf die Website finden. Anbieter: Google Ireland Limited. Es werden keine Daten für Werbezwecke genutzt.',
    },
]

const KEY = 'lm-consent'
/** Nach dieser Zeit wird erneut gefragt (Empfehlung der Aufsichtsbehörden: spätestens nach 12 Monaten). */
const GUELTIG_MS = 365 * 24 * 60 * 60 * 1000
const VERSION = 1

export const EVENT_AENDERUNG = 'lm-consent-change'
export const EVENT_OEFFNEN = 'lm-consent-open'
/** Sperrt/entsperrt das Scrollen (detail: boolean) – vom Banner an den Smooth-Scroll gemeldet. */
export const EVENT_SPERRE = 'lm-scroll-lock'

export type Entscheidung = { v: number; t: number } & Record<KategorieId, boolean>

export function leseEntscheidung(): Entscheidung | null {
    try {
        const raw = window.localStorage.getItem(KEY)
        if (!raw) return null
        const e = JSON.parse(raw) as Entscheidung
        if (e.v !== VERSION || typeof e.t !== 'number' || Date.now() - e.t > GUELTIG_MS) return null
        return e
    } catch {
        return null
    }
}

export function speichereEntscheidung(auswahl: Record<KategorieId, boolean>) {
    const e: Entscheidung = { v: VERSION, t: Date.now(), ...auswahl }
    try {
        window.localStorage.setItem(KEY, JSON.stringify(e))
    } catch {
        /* Speicher gesperrt (z. B. privater Modus): Entscheidung gilt nur für diese Sitzung */
    }
    window.dispatchEvent(new CustomEvent(EVENT_AENDERUNG, { detail: e }))
}

export function hatEinwilligung(id: KategorieId): boolean {
    return leseEntscheidung()?.[id] === true
}

/** Öffnet das Banner erneut (Footer-Link „Cookie-Einstellungen“). */
export function oeffneCookieEinstellungen() {
    window.dispatchEvent(new Event(EVENT_OEFFNEN))
}
