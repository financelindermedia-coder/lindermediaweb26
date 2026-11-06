'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import {
    CONSENT_AKTIV,
    EVENT_OEFFNEN,
    EVENT_SPERRE,
    KATEGORIEN,
    leseEntscheidung,
    speichereEntscheidung,
    type KategorieId,
} from '@/lib/consent'

type Auswahl = Record<KategorieId, boolean>
const ALLE_AUS: Auswahl = { statistik: false }
const ALLE_AN: Auswahl = { statistik: true }

/**
 * Cookie-Banner nach TDDDG/DSGVO.
 *
 * – Ohne Entscheidung wird nichts Nicht-Notwendiges geladen.
 * – „Alle akzeptieren“ und „Nur notwendige“ sind gleich groß und gleich
 *   auffällig; Ablehnen ist genauso einfach wie Zustimmen.
 * – Keine vorausgewählten Häkchen, keine Dark Patterns.
 * – Die Entscheidung lässt sich jederzeit über den Footer-Link ändern.
 */
export default function CookieConsent() {
    const [offen, setOffen] = useState(false)
    const [detail, setDetail] = useState(false)
    const [auswahl, setAuswahl] = useState<Auswahl>(ALLE_AUS)
    const karte = useRef<HTMLDivElement>(null)
    const fokusNoetig = useRef(false)
    const pfad = usePathname()
    /** Erstbesuch: die Seite steht still, bis entschieden ist. Auf Datenschutz und Impressum nie – dort muss man lesen können. */
    const [erstEntscheidung, setErstEntscheidung] = useState(false)
    const sperren = offen && erstEntscheidung && pfad !== '/datenschutz' && pfad !== '/impressum'

    useEffect(() => {
        if (!CONSENT_AKTIV) return
        const bestehend = leseEntscheidung()
        if (bestehend) setAuswahl({ statistik: bestehend.statistik })
        else { setOffen(true); setErstEntscheidung(true) }

        const oeffnen = () => {
            const e = leseEntscheidung()
            setAuswahl(e ? { statistik: e.statistik } : ALLE_AUS)
            setDetail(true)
            fokusNoetig.current = true
            setOffen(true)
        }
        window.addEventListener(EVENT_OEFFNEN, oeffnen)
        return () => window.removeEventListener(EVENT_OEFFNEN, oeffnen)
    }, [])

    /* Wurde das Banner bewusst geöffnet (Footer), landet der Fokus darin. */
    useEffect(() => {
        if (offen && fokusNoetig.current) {
            fokusNoetig.current = false
            karte.current?.focus()
        }
    }, [offen])

    const speichern = useCallback((a: Auswahl) => {
        setErstEntscheidung(false)
        speichereEntscheidung(a)
        setAuswahl(a)
        setOffen(false)
        setDetail(false)
    }, [])

    /* Esc schließt nur, wenn schon eine Entscheidung vorliegt – sonst bliebe sie offen. */
    useEffect(() => {
        if (!offen) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && leseEntscheidung()) setOffen(false)
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [offen])

    /* Scrollsperre: html-Klasse für natives Scrollen, Ereignis für den Smooth-Scroll (Lenis). */
    useEffect(() => {
        document.documentElement.classList.toggle('ck-lock', sperren)
        window.dispatchEvent(new CustomEvent(EVENT_SPERRE, { detail: sperren }))
        return () => {
            document.documentElement.classList.remove('ck-lock')
            window.dispatchEvent(new CustomEvent(EVENT_SPERRE, { detail: false }))
        }
    }, [sperren])

    if (!CONSENT_AKTIV || !offen) return null

    return (
        <div className={`ck-back${sperren ? ' is-lock' : ''}`}>
        <div
            className="ck"
            role="dialog"
            aria-labelledby="ck-titel"
            aria-describedby="ck-text"
            tabIndex={-1}
            ref={karte}
        >
            <p className="ck-eye">| Datenschutz</p>
            <h2 className="ck-titel" id="ck-titel">Ihre <strong>Privatsphäre.</strong></h2>
            <p className="ck-text" id="ck-text">
                Wir nutzen nur, was die Seite zum Funktionieren braucht. Mit Ihrer Zustimmung
                messen wir zusätzlich anonymisiert, welche Inhalte gelesen werden. Sie können
                das jederzeit ändern.
            </p>

            {detail && (
                <div className="ck-detail">
                    <div className="ck-row">
                        <div>
                            <p className="ck-row-h">Notwendig</p>
                            <p className="ck-row-t">
                                Speichert Ihre Cookie-Entscheidung und sorgt dafür, dass die Seite
                                sicher und fehlerfrei läuft. Immer aktiv.
                            </p>
                        </div>
                        <span className="ck-switch is-locked" aria-hidden="true"><i /></span>
                    </div>
                    {KATEGORIEN.map((k) => (
                        <label className="ck-row" key={k.id}>
                            <div>
                                <p className="ck-row-h">{k.titel}</p>
                                <p className="ck-row-t">{k.text}</p>
                            </div>
                            <input
                                type="checkbox"
                                className="ck-check"
                                checked={auswahl[k.id]}
                                onChange={(e) => setAuswahl({ ...auswahl, [k.id]: e.target.checked })}
                            />
                            <span className={`ck-switch${auswahl[k.id] ? ' is-on' : ''}`} aria-hidden="true"><i /></span>
                        </label>
                    ))}
                </div>
            )}

            <div className="ck-actions">
                <button type="button" className="ck-btn ck-btn--primary" onClick={() => speichern(ALLE_AN)}>
                    Alle akzeptieren
                </button>
                <button type="button" className="ck-btn" onClick={() => speichern(ALLE_AUS)}>
                    Nur notwendige
                </button>
            </div>
            <div className="ck-foot">
                {detail ? (
                    <button type="button" className="ck-link" onClick={() => speichern(auswahl)}>
                        Auswahl speichern
                    </button>
                ) : (
                    <button type="button" className="ck-link" onClick={() => setDetail(true)} aria-expanded={false}>
                        Einstellungen
                    </button>
                )}
                <span className="ck-legal">
                    <a href="/datenschutz">Datenschutz</a>
                    <a href="/impressum">Impressum</a>
                </span>
            </div>
        </div>
        </div>
    )
}
