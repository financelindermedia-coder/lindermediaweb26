'use client'

import type { CSSProperties } from 'react'
import { CONSENT_AKTIV, oeffneCookieEinstellungen } from '@/lib/consent'

/** Footer-Link, der das Cookie-Banner erneut öffnet (Widerruf muss so einfach sein wie die Einwilligung). */
export default function CookieSettingsLink({ style }: { style?: CSSProperties }) {
    if (!CONSENT_AKTIV) return null
    return (
        <button
            type="button"
            onClick={oeffneCookieEinstellungen}
            style={{ background: 'none', border: 0, padding: 0, cursor: 'pointer', font: 'inherit', ...style }}
        >
            Cookie-Einstellungen
        </button>
    )
}
