'use client'

import { useEffect, useState } from 'react'

/**
 * Transparenzhinweis für KI-generiertes Bildmaterial (EU AI Act, Art. 50:
 * künstlich erzeugte Bild-/Videoinhalte müssen erkennbar gekennzeichnet sein).
 *
 * Zwei Betriebsarten:
 * - Standard (`inline`): sitzt in einer Sektion mit `position: relative`
 *   (z. B. eine Videosektion) und wird mit dieser gescrollt.
 * - `track="iceberg"`: läuft über die gesamte Eisberg-Strecke mit (Abstieg,
 *   Prozessbereich, Aufstieg). Das Canvas dort ist fixiert, der Hinweis also
 *   ebenfalls – er blendet aus, sobald die Strecke vorbei ist und wieder echte
 *   Inhalte darüberliegen.
 *
 * Bewusst klein und ruhig gehalten: dunkles Glas-Pill, das sowohl auf dem
 * hellen Nebel am Anfang als auch auf dunklen Videos lesbar bleibt.
 */
type Props = {
    /** Scroll-Strecke, über die der Hinweis mitläuft. Ohne Angabe: statisch in der Sektion. */
    track?: 'iceberg'
    /**
     * Herkunft des Materials.
     *
     * `ki` – ganz oder teilweise mit KI erzeugt. Traegt `data-ai-generated`,
     * weil der EU AI Act genau das verlangt.
     * `cgi` – am Rechner gebaut, aber ohne generative KI: Renderings, 3D,
     * Compositing. Das ist KEIN KI-Inhalt und wird deshalb bewusst NICHT als
     * solcher ausgezeichnet – eine falsche Kennzeichnung waere so irrefuehrend
     * wie eine fehlende. Der Hinweis steht trotzdem, weil auch computererzeugte
     * Bilder nicht als Fotografie durchgehen sollen.
     */
    art?: 'ki' | 'cgi'
    /** Sichtbarer Text – bewusst kurz, siehe Begründung am Default unten. */
    label?: string
    className?: string
}

const TEXTE = {
    ki: {
        label: 'Visual teilweise KI-generiert',
        title: 'Dieses Bildmaterial wurde ganz oder teilweise mit künstlicher Intelligenz erzeugt.',
    },
    cgi: {
        label: 'Visual CGI-generiert',
        title: 'Dieses Bildmaterial wurde am Rechner erzeugt (CGI/3D), nicht fotografiert.',
    },
} as const

/*
 * Der Text steht bewusst auf Deutsch und benennt das Ausmaß: „teilweise" ist
 * bei diesem Material die zutreffende Aussage, und ein englisches Label mitten
 * in einer deutschen Seite liest sich wie ein Fremdkörper aus dem Werkzeug.
 * Der Hinweis sitzt immer direkt am betroffenen Asset, nie global.
 */
export default function AiBadge({ track, art = 'ki', label, className = '' }: Props) {
    const texte = TEXTE[art]
    const [visible, setVisible] = useState(track !== 'iceberg')

    useEffect(() => {
        if (track !== 'iceberg') return

        let raf: number | null = null

        const update = () => {
            raf = null
            const el = document.getElementById('video-ascent')
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
            className={`ai-badge${track === 'iceberg' ? ' ai-badge--fixed' : ''}${visible ? ' is-on' : ''} ${className}`.trim()}
            {...(art === 'ki' ? { 'data-ai-generated': 'true' } : {})}
            title={texte.title}
        >
            <span className="ai-badge-dot" aria-hidden="true" />
            {label ?? texte.label}
        </span>
    )
}
