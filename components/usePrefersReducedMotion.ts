'use client'

import { useEffect, useState } from 'react'

/**
 * Meldet, ob das System „weniger Bewegung" verlangt.
 *
 * Gedacht fuer die Hintergrundvideos: bei `prefers-reduced-motion: reduce`
 * setzen die Komponenten die Quelle gar nicht erst, sodass das Poster als
 * Standbild stehen bleibt. Das spart nebenbei die komplette Videodatei – wer
 * die Einstellung setzt, sitzt oft auch an einem schwaecheren Geraet.
 *
 * Startwert ist `false`: Server-Render und erster Client-Render muessen
 * uebereinstimmen, gemessen wird erst im Effekt. Die Aenderung wird
 * mitgehoert, damit ein Umschalten im Betriebssystem sofort greift.
 */
export default function usePrefersReducedMotion(): boolean {
    const [reduced, setReduced] = useState(false)

    useEffect(() => {
        const query = window.matchMedia('(prefers-reduced-motion: reduce)')
        const sync = () => setReduced(query.matches)

        sync()
        query.addEventListener('change', sync)
        return () => query.removeEventListener('change', sync)
    }, [])

    return reduced
}
