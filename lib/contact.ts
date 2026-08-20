/**
 * Feldregeln des Kontaktformulars – eine Quelle für Client und Server.
 *
 * Die Prüfung im Browser ist Komfort (sofortige Rückmeldung, kein Rundweg),
 * die auf dem Server ist die verbindliche: ein POST kann auch ohne unser
 * Formular kommen.
 */
export type ContactField = 'name' | 'company' | 'email' | 'message'

export type ContactPayload = Record<ContactField, string> & {
    /** Honeypot – muss leer bleiben. Siehe .cf-trap in globals.css. */
    website?: string
}

export type ContactErrors = Partial<Record<ContactField, string>>

const LIMITS: Record<ContactField, { min: number; max: number }> = {
    name:    { min: 2, max: 120 },
    company: { min: 0, max: 160 },
    email:   { min: 5, max: 200 },
    message: { min: 10, max: 5000 },
}

/**
 * Bewusst nachsichtig: eine E-Mail-Adresse endgültig zu validieren geht nur
 * durch Zustellen. Diese Prüfung fängt Tippfehler ab (fehlendes @, fehlender
 * Punkt in der Domain), lehnt aber keine ungewöhnlichen, gültigen Adressen ab.
 */
const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/

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
    type: 'text' | 'email' | 'textarea'
    autoComplete: string
    required: boolean
}[] = [
    { name: 'name',    label: 'Name',          type: 'text',     autoComplete: 'name',         required: true  },
    { name: 'company', label: 'Unternehmen',   type: 'text',     autoComplete: 'organization', required: false },
    { name: 'email',   label: 'E-Mail',        type: 'email',    autoComplete: 'email',        required: true  },
    { name: 'message', label: 'Ihre Situation', type: 'textarea', autoComplete: 'off',          required: true  },
]
