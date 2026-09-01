/**
 * Feldregeln des Kontaktformulars – eine Quelle für Client und Server.
 *
 * Die Prüfung im Browser ist Komfort (sofortige Rückmeldung, kein Rundweg),
 * die auf dem Server ist die verbindliche: ein POST kann auch ohne unser
 * Formular kommen.
 *
 * Pflicht sind nur drei Felder: Name, E-Mail, Situation. Alles Weitere hilft
 * beim Vorbereiten des Gesprächs, darf aber niemanden aufhalten – jedes
 * zusätzliche Pflichtfeld kostet Anfragen.
 */
export type ContactField = 'name' | 'company' | 'email' | 'topic' | 'message' | 'website'

export type ContactPayload = Record<ContactField, string> & {
    /**
     * Honeypot – muss leer bleiben. Siehe .cf-trap in globals.css.
     *
     * Heißt `betreff` und nicht mehr `website`: Seit das Formular ein echtes,
     * sichtbares Website-Feld hat, wäre der alte Name doppelt belegt gewesen
     * und jede ausgefüllte Website-Angabe als Bot gewertet worden.
     */
    betreff?: string
}

export type ContactErrors = Partial<Record<ContactField, string>>

const LIMITS: Record<ContactField, { min: number; max: number }> = {
    name:    { min: 2,  max: 120 },
    company: { min: 0,  max: 160 },
    email:   { min: 5,  max: 200 },
    topic:   { min: 0,  max: 60  },
    message: { min: 10, max: 5000 },
    website: { min: 0,  max: 200 },
}

/**
 * Bewusst nachsichtig: eine E-Mail-Adresse endgültig zu validieren geht nur
 * durch Zustellen. Diese Prüfung fängt Tippfehler ab (fehlendes @, fehlender
 * Punkt in der Domain), lehnt aber keine ungewöhnlichen, gültigen Adressen ab.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

/**
 * Auswahl im Feld „Wobei können wir helfen?".
 *
 * Reihenfolge wie die Arbeit selbst verläuft – Strategie zuerst, Sichtbarkeit
 * zuletzt. „Noch nicht sicher" steht bewusst als vollwertige Option am Ende:
 * Wer die Frage noch nicht beantworten kann, ist häufig genau der richtige
 * Gesprächspartner und soll nicht raten müssen.
 */
export const CONTACT_TOPICS = [
    'Markenstrategie / Positionierung',
    'Corporate Design',
    'Website / Webdesign',
    'Fotografie / Film',
    '3D / Visualisierung',
    'SEO / Sichtbarkeit',
    'Marketing / Ads',
    'Automatisierung',
    'Noch nicht sicher',
] as const

export function validateContact(data: Partial<ContactPayload>): ContactErrors {
    const errors: ContactErrors = {}
    const value = (f: ContactField) => (data[f] ?? '').trim()

    if (value('name').length < LIMITS.name.min) {
        errors.name = 'Bitte tragen Sie Ihren Namen ein.'
    } else if (value('name').length > LIMITS.name.max) {
        errors.name = 'Das ist etwas zu lang – bitte kürzen.'
    }

    if (value('company').length > LIMITS.company.max) {
        errors.company = 'Das ist etwas zu lang – bitte kürzen.'
    }

    const email = value('email')
    if (!email) {
        errors.email = 'Ohne E-Mail-Adresse können wir nicht antworten.'
    } else if (email.length > LIMITS.email.max || !EMAIL.test(email)) {
        errors.email = 'Diese Adresse sieht nicht vollständig aus.'
    }

    /*
     * Das Thema ist freiwillig. Steht aber etwas drin, das nicht aus der Liste
     * stammt, kommt es nicht aus unserem Formular – dann lieber ablehnen als
     * ungeprueften Text in eine Mail schreiben.
     */
    const topic = value('topic')
    if (topic && !CONTACT_TOPICS.includes(topic as (typeof CONTACT_TOPICS)[number])) {
        errors.topic = 'Bitte wählen Sie einen der angebotenen Punkte.'
    }

    if (value('website').length > LIMITS.website.max) {
        errors.website = 'Das ist etwas zu lang – bitte kürzen.'
    }

    const message = value('message')
    if (message.length < LIMITS.message.min) {
        errors.message = 'Ein, zwei Sätze zu Ihrer Situation genügen.'
    } else if (message.length > LIMITS.message.max) {
        errors.message = 'Das ist etwas zu lang – bitte kürzen.'
    }

    return errors
}

export const CONTACT_FIELDS: {
    name: ContactField
    label: string
    type: 'text' | 'email' | 'url' | 'textarea' | 'select'
    autoComplete: string
    required: boolean
    placeholder?: string
    options?: readonly string[]
}[] = [
    { name: 'name',    label: 'Name',        type: 'text',  autoComplete: 'name',         required: true  },
    { name: 'company', label: 'Unternehmen', type: 'text',  autoComplete: 'organization', required: false },
    { name: 'email',   label: 'E-Mail',      type: 'email', autoComplete: 'email',        required: true  },
    {
        name: 'topic',
        label: 'Wobei können wir helfen?',
        type: 'select',
        autoComplete: 'off',
        required: false,
        options: CONTACT_TOPICS,
    },
    {
        name: 'message',
        label: 'Erzählen Sie kurz von Ihrer Situation',
        type: 'textarea',
        autoComplete: 'off',
        required: true,
        placeholder: 'Was soll sich verändern? Wo stehen Sie gerade?',
    },
    {
        name: 'website',
        label: 'Website',
        type: 'url',
        autoComplete: 'url',
        required: false,
        placeholder: 'https://',
    },
]
