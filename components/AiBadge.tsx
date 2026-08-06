'use client'

import { useEffect, useState } from 'react'

/**
 * Transparenzhinweis für KI-generiertes Bildmaterial (EU AI Act, Art. 50:
 * künstlich erzeugte Bild-/Videoinhalte müssen erkennbar gekennzeichnet sein).
 *
 * Zwei Betriebsarten:
 * - Standard (`inline`): sitzt in einer Sektion mit `position: relative`
 *   (z. B. eine Videosektion) und wird mit dieser gescrollt.
 * - `track="glow"`: läuft über die gesamte gepinnte Eisberg-/Glow-Strecke mit.
 *   Das Canvas dort ist fixiert, der Hinweis also ebenfalls – er blendet aus,
 *   sobald die Strecke vorbei ist und wieder echte Inhalte darüberliegen.
 *
 * Bewusst klein und ruhig gehalten: dunkles Glas-Pill, das sowohl auf dem
 * hellen Nebel am Anfang als auch auf dunklen Videos lesbar bleibt.
 */
type Props = {
    /** Scroll-Strecke, über die der Hinweis mitläuft. Ohne Angabe: statisch in der Sektion. */
    track?: 'glow'
    /** Sichtbarer Text – bewusst kurz. */
    label?: string
    className?: string
}

export default function AiBadge({ track, label = 'AI generated', className = '' }: Props) {
    const [visible, setVisible] = useState(track !== 'glow')

    useEffect(() => {
        if (track !== 'glow') return

        let raf: number | null = null

        const update = () => {
            raf = null
            const el = document.getElementById('glow-scroll')
            if (!el) return
            // Ende der Canvas-Strecke: danach schieben sich die Sektionen darüber.
            const end = el.offsetTop + el.offsetHeight - window.innerHeight * 0.35
            setVisible(window.scrollY < end)
        }

        const onScroll = () => {
            if (raf !== null) return
            raf = requestAnimationFrame(update)
        }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
            if (raf !== null) cancelAnimationFrame(raf)
        }
    }, [track])

    return (
        <span
            className={`ai-badge${track === 'glow' ? ' ai-badge--fixed' : ''}${visible ? ' is-on' : ''} ${className}`.trim()}
            data-ai-generated="true"
            title="Dieses Bildmaterial wurde ganz oder teilweise mit künstlicher Intelligenz erzeugt."
        >
            <span className="ai-badge-dot" aria-hidden="true" />
            {label}
        </span>
    )
}
