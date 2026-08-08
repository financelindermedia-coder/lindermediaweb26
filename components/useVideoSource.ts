'use client'

import { useEffect, useState } from 'react'

/**
 * Bis hierher gilt ein Viewport als „schmal“. Deckt Telefone im Hoch- und
 * Querformat ab; ein iPad im Hochformat (768px) bekommt bewusst noch die
 * Mobil-Fassung, weil das Video dort ebenfalls nur Hintergrund ist.
 */
const NARROW_QUERY = '(max-width: 820px)'

/**
 * Pfad der Mobil-Fassung zu einer Desktop-Quelle.
 * `/video/vid-lm-2.mp4` → `/video/vid-lm-2-m.mp4` (siehe scripts/to-web-video.sh).
 */
function mobileVariant(src: string) {
    return src.replace(/\.mp4$/, '-m.mp4')
}

/**
 * Waehlt zwischen Desktop- und Mobil-Fassung eines Hintergrundvideos.
 *
 * Die Mobil-Dateien wiegen rund ein Viertel: der Drohnenflug 3,7 statt 14 MB.
 * Auf einem Telefon ist der Unterschied am Bildschirm nicht zu sehen, in der
 * Ladezeit sehr wohl.
 *
 * Gemessen wird einmal beim Mounten, nicht laufend. Ein Wechsel der Quelle
 * mitten in der Wiedergabe – etwa beim Drehen des Geraets – wuerde das Video
 * neu laden und von vorn beginnen lassen; das faellt deutlicher auf als die
 * paar gesparten Kilobyte.
 *
 * Solange nicht gemessen wurde (Server-Render und erster Client-Render) kommt
 * `null` zurueck. Aufrufer setzen dann noch keine `src` – so laedt nie die
 * falsche Fassung, bloss weil die Messung einen Tick spaeter kam.
 */
export default function useVideoSource(src: string): string | null {
    const [resolved, setResolved] = useState<string | null>(null)

    useEffect(() => {
        const narrow = window.matchMedia(NARROW_QUERY).matches

        /*
         * Ein ausdruecklicher Datensparmodus oder eine langsame Verbindung
         * bekommen die kleine Fassung auch am grossen Bildschirm. Die API gibt
         * es nicht in jedem Browser, deshalb defensiv abgefragt.
         */
        const conn = (navigator as Navigator & {
            connection?: { saveData?: boolean; effectiveType?: string }
        }).connection
        const thrifty =
            conn?.saveData === true ||
            (conn?.effectiveType !== undefined && /^(slow-)?2g$|^3g$/.test(conn.effectiveType))

        setResolved(narrow || thrifty ? mobileVariant(src) : src)
    }, [src])

    return resolved
}
