import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { BUSINESS } from '@/lib/site'
import { validateContact, type ContactPayload } from '@/lib/contact'

/**
 * Kontaktformular-Endpunkt.
 *
 * Nimmt den POST des Formulars entgegen, prueft ihn serverseitig (die Pruefung
 * im Browser ist nur Komfort – ein POST kann auch ohne unser Formular kommen)
 * und stellt die Anfrage per SMTP zu.
 *
 * Zugangsdaten kommen ausschliesslich aus der Umgebung, siehe .env.example.
 * Fehlt die Konfiguration, antwortet die Route mit 503 statt die Anfrage still
 * zu verschlucken – eine verlorene Kontaktanfrage faellt sonst niemandem auf.
 */
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Einfache Mengenbegrenzung pro IP – haelt stumpfe Fluten vom Postfach fern. */
const WINDOW_MS = 10 * 60 * 1000
const MAX_PER_WINDOW = 5
const hits = new Map<string, number[]>()

function rateLimited(ip: string): boolean {
    const now = Date.now()
    const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS)
    recent.push(now)
    hits.set(ip, recent)

    // Der Prozess lebt lange – ohne diesen Kehraus waechst die Map unbegrenzt.
    if (hits.size > 5000) {
        for (const [key, times] of hits) {
            if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key)
        }
    }
    return recent.length > MAX_PER_WINDOW
}

function smtpConfig() {
    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env
    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null

    const port = Number(SMTP_PORT ?? 587)
    return {
        host: SMTP_HOST,
        port,
        // 465 ist implizit TLS, 587 startet unverschluesselt und wechselt per STARTTLS.
        secure: port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
    }
}

/** Zeilenumbrueche in Kopfzeilen ermoeglichen Header-Injection. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim()

export async function POST(request: Request) {
    const ip =
        request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
        request.headers.get('x-real-ip') ??
        'unknown'

    if (rateLimited(ip)) {
        return NextResponse.json(
            { ok: false, message: 'Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später noch einmal.' },
            { status: 429 },
        )
    }

    let data: Partial<ContactPayload>
    try {
        data = (await request.json()) as Partial<ContactPayload>
    } catch {
        return NextResponse.json({ ok: false, message: 'Anfrage konnte nicht gelesen werden.' }, { status: 400 })
    }

    /*
     * Honeypot: ein fuer Menschen unsichtbares Feld. Ist es ausgefuellt, war
     * ein Bot am Werk. Wir antworten bewusst mit 200 – wer eine Ablehnung
     * sieht, probiert es anders herum noch einmal.
     */
    if ((data.website ?? '').trim() !== '') {
        return NextResponse.json({ ok: true, message: 'Vielen Dank. Wir melden uns in Kürze.' })
    }

    const errors = validateContact(data)
    if (Object.keys(errors).length > 0) {
        return NextResponse.json(
            { ok: false, message: 'Bitte prüfen Sie die markierten Felder.', errors },
            { status: 422 },
        )
    }

    const config = smtpConfig()
    if (!config) {
        console.error('[contact] SMTP nicht konfiguriert – siehe .env.example (SMTP_HOST, SMTP_USER, SMTP_PASS).')
        return NextResponse.json(
            {
                ok: false,
                message: `Der Versand ist gerade nicht möglich. Schreiben Sie uns bitte direkt an ${BUSINESS.email}.`,
            },
            { status: 503 },
        )
    }

    const name = oneLine((data.name ?? '').trim())
    const company = oneLine((data.company ?? '').trim())
    const email = oneLine((data.email ?? '').trim())
    const message = (data.message ?? '').trim()

    const to = process.env.CONTACT_TO ?? BUSINESS.email
    // Der Absender muss zur eigenen Domain gehoeren, sonst scheitert SPF/DKIM.
    // Die Adresse des Absenders steht deshalb nur im Reply-To.
    const from = process.env.CONTACT_FROM ?? `LinderMedia Website <${BUSINESS.email}>`

    const lines = [
        `Name:        ${name}`,
        `Unternehmen: ${company || '—'}`,
        `E-Mail:      ${email}`,
        '',
        message,
    ]

    try {
        await nodemailer.createTransport(config).sendMail({
            from,
            to,
            replyTo: `${name} <${email}>`,
            subject: `Kontaktanfrage über lindermedia.de — ${name}${company ? `, ${company}` : ''}`,
            text: lines.join('\n'),
        })
    } catch (error) {
        console.error('[contact] Versand fehlgeschlagen:', error)
        return NextResponse.json(
            {
                ok: false,
                message: `Der Versand hat nicht geklappt. Schreiben Sie uns bitte direkt an ${BUSINESS.email}.`,
            },
            { status: 502 },
        )
    }

    return NextResponse.json({ ok: true, message: 'Vielen Dank. Wir melden uns in Kürze.' })
}
