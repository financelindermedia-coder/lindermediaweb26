'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'
import { EVENT_AENDERUNG, GA_ID, hatEinwilligung } from '@/lib/consent'

type Gtag = (...args: unknown[]) => void
declare global {
    interface Window {
        dataLayer: unknown[]
        gtag: Gtag
        [key: `ga-disable-${string}`]: boolean | undefined
    }
}

/** Entfernt die Analytics-Cookies (_ga, _ga_<ID>) auf Domain und Oberdomain. */
function loescheAnalyticsCookies() {
    const host = window.location.hostname
    const domains = [host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`]
    document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim()
        if (name !== '_ga' && !name.startsWith('_ga_') && name !== '_gid') return
        domains.forEach((d) => {
            document.cookie = `${name}=; Max-Age=0; path=/; domain=${d}`
        })
        document.cookie = `${name}=; Max-Age=0; path=/`
    })
}

/**
 * Google Analytics 4 – erst nach Einwilligung in „Statistik“.
 *
 * Vor der Einwilligung wird weder das Skript geladen noch eine Verbindung zu
 * Google aufgebaut. Widerruft jemand später, wird die Messung abgeschaltet
 * (Consent Mode „denied“, ga-disable) und es werden die Cookies gelöscht.
 * Werbe-Signale bleiben immer aus. Ohne NEXT_PUBLIC_GA_ID rendert die
 * Komponente nichts.
 */
export default function GoogleAnalytics() {
    const [erlaubt, setErlaubt] = useState(false)

    useEffect(() => {
        if (!GA_ID) return
        const sync = () => {
            const ok = hatEinwilligung('statistik')
            setErlaubt(ok)
            window[`ga-disable-${GA_ID}`] = !ok
            if (typeof window.gtag === 'function') {
                window.gtag('consent', 'update', { analytics_storage: ok ? 'granted' : 'denied' })
            }
            if (!ok) loescheAnalyticsCookies()
        }
        sync()
        window.addEventListener(EVENT_AENDERUNG, sync)
        return () => window.removeEventListener(EVENT_AENDERUNG, sync)
    }, [])

    if (!GA_ID || !erlaubt) return null

    return (
        <>
            <Script
                id="ga-loader"
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`}
            />
            <Script id="ga-init" strategy="afterInteractive">
                {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', ${JSON.stringify(GA_ID)}, { allow_google_signals: false, allow_ad_personalization_signals: false });
`}
            </Script>
        </>
    )
}
