'use client'

import { useRef, useState } from 'react'
import { BUSINESS } from '@/lib/site'
import {
    CONTACT_FIELDS,
    validateContact,
    type ContactErrors,
    type ContactField,
} from '@/lib/contact'

type Status =
    | { state: 'idle' }
    | { state: 'sending' }
    | { state: 'sent'; message: string }
    | { state: 'failed'; message: string }

const EMPTY: Record<ContactField, string> = {
    name: '', company: '', email: '', topic: '', message: '', website: '',
}

export default function ContactSection() {
    const [values, setValues] = useState<Record<ContactField, string>>(EMPTY)
    const [errors, setErrors] = useState<ContactErrors>({})
    const [status, setStatus] = useState<Status>({ state: 'idle' })
    /** Honeypot – siehe .cf-trap in globals.css und die Route unter /api/contact. */
    const trapRef = useRef<HTMLInputElement>(null)

    const set = (field: ContactField, value: string) => {
        setValues((v) => ({ ...v, [field]: value }))
        // Fehler verschwindet beim Tippen, nicht erst beim nächsten Absenden.
        if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (status.state === 'sending') return

        const found = validateContact(values)
        setErrors(found)
        if (Object.keys(found).length > 0) {
            // Fokus auf das erste beanstandete Feld – sonst muss man suchen.
            const first = CONTACT_FIELDS.find((f) => found[f.name])
            if (first) document.getElementById(`cf-${first.name}`)?.focus()
            setStatus({ state: 'failed', message: 'Bitte prüfen Sie die markierten Felder.' })
            return
        }

        setStatus({ state: 'sending' })
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...values, betreff: trapRef.current?.value ?? '' }),
            })
            const body = (await response.json().catch(() => ({}))) as {
                ok?: boolean
                message?: string
                errors?: ContactErrors
            }

            if (response.ok && body.ok) {
                setStatus({ state: 'sent', message: body.message ?? 'Vielen Dank. Wir melden uns in Kürze.' })
                setValues(EMPTY)
                return
            }

            if (body.errors) setErrors(body.errors)
            setStatus({
                state: 'failed',
                message:
                    body.message ??
                    `Der Versand hat nicht geklappt. Schreiben Sie uns bitte direkt an ${BUSINESS.email}.`,
            })
        } catch {
            setStatus({
                state: 'failed',
                message: `Die Verbindung kam nicht zustande. Schreiben Sie uns bitte direkt an ${BUSINESS.email}.`,
            })
        }
    }

    return (
        <section
            id="contact"
            style={{
                background: 'transparent',
                padding: '10rem var(--px) 7rem',
                fontFamily: 'var(--font-barlow), sans-serif',
            }}
        >
            <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Left — text */}
                <div>
                    <p style={{
                        fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(255,107,53,0.95)',
                        marginBottom: '1rem',
                    }}>
                        | Kontakt
                    </p>
                    <h2 style={{
                        fontSize: 'var(--h2)', fontWeight: 300,
                        lineHeight: 1.05, letterSpacing: '-0.012em',
                        color: '#ffffff', marginBottom: '1.6rem',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                    }}>
                        Ein klarer Kurs<br />
                        <strong style={{ fontWeight: 900 }}>für Ihre Marke.</strong>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.82)',
                        marginBottom: '1.8rem', textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                    }}>
                        Erzählen Sie uns, wo Ihr Unternehmen heute steht.
                    </p>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                        textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                    }}>
                        In einem ersten Gespräch – ohne Verkaufsdruck – finden wir
                        gemeinsam heraus, wo die Arbeit wirklich beginnen sollte.
                    </p>
                </div>

                {/* Right — form */}
                <div>
                    {status.state === 'sent' ? (
                        <div className="cf-done" role="status" aria-live="polite">
                            {/* Die Bestätigung sagt zuerst, dass es geklappt hat, und
                                erst danach, wie es weitergeht – in dieser Reihenfolge
                                wird sie gelesen. */}
                            <p className="cf-done-head">Anfrage angekommen.</p>
                            <p>
                                Vielen Dank für Ihre Nachricht. Wir schauen uns Ihre
                                Situation an und melden uns persönlich bei Ihnen.
                            </p>
                            <p>
                                Wenn es eilt, erreichen Sie uns auch direkt unter{' '}
                                <a href={`mailto:${BUSINESS.email}`} style={{ color: '#ffffff' }}>{BUSINESS.email}</a>.
                            </p>
                        </div>
                    ) : (
                        <form className="cf" onSubmit={handleSubmit} noValidate>
                            {CONTACT_FIELDS.map((field) => {
                                const id = `cf-${field.name}`
                                const error = errors[field.name]
                                const shared = {
                                    id,
                                    name: field.name,
                                    className: 'cf-input',
                                    value: values[field.name],
                                    autoComplete: field.autoComplete,
                                    required: field.required,
                                    'aria-required': field.required,
                                    'aria-invalid': error ? true : undefined,
                                    'aria-describedby': error ? `${id}-error` : undefined,
                                }

                                return (
                                    <div key={field.name} className="cf-field">
                                        <label className="cf-label" htmlFor={id}>
                                            {field.label}
                                            {!field.required && ' (optional)'}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                {...shared}
                                                rows={4}
                                                placeholder={field.placeholder}
                                                onChange={(e) => set(field.name, e.currentTarget.value)}
                                            />
                                        ) : field.type === 'select' ? (
                                            /* Ohne Vorauswahl: Eine gesetzte Voreinstellung
                                               wird mitgeschickt, auch wenn sie niemand
                                               bewusst gewaehlt hat – und faerbt dann die
                                               Vorbereitung des Gespraechs falsch ein. */
                                            <select
                                                {...shared}
                                                /* Solange nichts gewaehlt ist, soll das Feld
                                                   aussehen wie die leeren Textfelder daneben –
                                                   sonst liest sich „Bitte waehlen" als bereits
                                                   getroffene Wahl. `:invalid` greift dafuer
                                                   nicht: Das Feld ist optional. */
                                                className={`cf-input cf-select${values[field.name] === '' ? ' cf-select--leer' : ''}`}
                                                onChange={(e) => set(field.name, e.currentTarget.value)}
                                            >
                                                <option value="">Bitte wählen</option>
                                                {field.options?.map((o) => (
                                                    <option key={o} value={o}>{o}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                {...shared}
                                                type={field.type}
                                                placeholder={field.placeholder}
                                                onChange={(e) => set(field.name, e.currentTarget.value)}
                                            />
                                        )}
                                        {error && (
                                            <p className="cf-error" id={`${id}-error`}>{error}</p>
                                        )}
                                    </div>
                                )
                            })}

                            {/* Honeypot – bleibt leer, ausser ein Bot fuellt ihn aus.
                                Heisst `betreff`: `website` ist seit der Erweiterung ein
                                echtes, sichtbares Feld. */}
                            <div className="cf-trap" aria-hidden="true">
                                <label htmlFor="cf-betreff">Betreff (bitte frei lassen)</label>
                                <input id="cf-betreff" name="betreff" type="text" ref={trapRef} tabIndex={-1} autoComplete="off" />
                            </div>

                            <button className="cf-submit" type="submit" disabled={status.state === 'sending'}>
                                {status.state === 'sending' ? 'Wird gesendet …' : 'Projekt besprechen'}
                            </button>

                            {/* Live-Region: bleibt im DOM, damit Screenreader die
                                Aenderung ueberhaupt mitbekommen. */}
                            <div role="alert" aria-live="assertive">
                                {status.state === 'failed' && (
                                    <p className="cf-status cf-status--fail">{status.message}</p>
                                )}
                            </div>

                            <p className="cf-note">Kostenfrei und unverbindlich.</p>
                            {/* Hinweis nach Art. 13 DSGVO: Wofuer die Angaben verwendet
                                werden, steht vor dem Absenden – nicht erst danach. */}
                            <p className="cf-privacy">
                                Ihre Angaben verwenden wir ausschließlich, um Ihre Anfrage
                                zu beantworten. Näheres in der{' '}
                                <a href="/datenschutz">Datenschutzerklärung</a>.
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
