'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import usePrefersReducedMotion from '@/components/usePrefersReducedMotion'
import './HeroIceberg.css'

/**
 * Hero-Scrollytelling: der Eisberg aus public/video/ice_crash.mp4
 * (1920x1080, 24 fps, 8,04 s) als Bildsequenz in public/frames-hero.
 *
 * Warum Bilder statt `video.currentTime`: Safari/iOS seekt ein <video> beim
 * Touch-Scroll nicht zuverlaessig und ruckelt; die Bildsequenz auf dem Canvas
 * laeuft auf jedem Geraet gleich. Neu erzeugen mit scripts/extract-hero-frames.ps1.
 *
 * Aufbau: eine hohe Strecke (`.hi-pin`) mit einer sticky Buehne darin. Das
 * Dokument scrollt normal – es gibt weder Scroll-Hijacking noch einen eigenen
 * Scrollbalken. Der Fortschritt in der Strecke waehlt den Frame; am Ende der
 * Strecke loest sich die Buehne und die Seite laeuft weiter.
 *
 * Der Einstieg und die Erklaerungen der vier Ebenen (frueher die Sektion
 * „Wir arbeiten unter der Oberflaeche") stehen am selben Platz links: die
 * Headline wird nacheinander zu Strategie, Charakter, Markenpraesenz, Wirkung.
 *
 * Die Kurzmarken liegen auf den vier Unterwasser-Segmenten des Berges (von
 * oben nach unten). Ihre Position (`x`/`y`, Anteile am Bild) stammt aus dem
 * letzten Frame; `ab` ist der Frame, ab dem die jeweilige Trennung im Clip
 * abgeschlossen ist. Wer den Clip tauscht, misst beides (und KEYS) nach.
 */
const TOTAL_FRAMES = 193
const FRAME_URL = (i: number) => `/frames-hero/f_${String(i + 1).padStart(3, '0')}.webp`

/**
 * Scroll-Fortschritt (0–1 der Strecke) → Frame. Stuetzpunkte statt einer
 * Geraden: waehrend eine Ebene erklaert wird, laeuft der Clip nur leicht
 * weiter, die Trennung zur naechsten Ebene spielt dazwischen.
 */
const KEYS: [number, number][] = [
    [0, 0], [0.06, 0], [0.16, 62], [0.32, 68],
    [0.4, 105], [0.54, 111],
    [0.62, 140], [0.76, 146],
    [0.82, 168], [0.93, 176],
    [0.96, 192], [1, 192],
]
/** Ab diesem Anteil der Strecke steht der Abschluss. */
const END_AT = 0.955

function frameAt(p: number): number {
    for (let i = 1; i < KEYS.length; i++) {
        const [p1, f1] = KEYS[i]
        if (p <= p1) {
            const [p0, f0] = KEYS[i - 1]
            return f0 + ((p - p0) / Math.max(p1 - p0, 1e-6)) * (f1 - f0)
        }
    }
    return KEYS[KEYS.length - 1][1]
}

const LAYERS = [
    {
        id: 'strategie',
        name: 'Strategie',
        role: 'gibt Richtung.',
        intro: 'Wofür Sie stehen. Wen Sie erreichen. Warum Sie gewählt werden.',
        text: 'Wir schärfen Positionierung, Zielgruppe, Botschaft und Markenarchitektur – nicht als theoretisches Konzept, sondern als Grundlage für alles, was danach sichtbar wird.',
        services: 'Positionierung · Zielgruppen · Botschaften · Markenarchitektur',
        href: '/leistungen#klarheit',
        linkLabel: 'Mehr über Markenstrategie',
        x: 0.52, y: 0.42, ab: 62,
    },
    {
        id: 'charakter',
        name: 'Charakter',
        role: 'gibt Form.',
        intro: 'Eine erkennbare Form für Haltung, Sprache und Bildwelt.',
        text: 'Aus der strategischen Richtung entsteht eine visuelle Identität, die wiedererkennbar ist und über alle Berührungspunkte funktioniert.',
        services: 'Corporate Design · Art Direction · Sprache · Bildwelt',
        href: '/leistungen#charakter',
        linkLabel: 'Mehr über Corporate Design',
        x: 0.53, y: 0.555, ab: 105,
    },
    {
        id: 'markenpraesenz',
        name: 'Markenpräsenz',
        role: 'macht sichtbar.',
        intro: 'Die Marke muss nicht nur existieren. Sie muss sichtbar werden.',
        text: 'Websites, Fotografie, Film, Video und 3D übersetzen die Marke in konkrete Erlebnisse – digital, räumlich und visuell.',
        services: 'Website · Fotografie · Film & Video · 3D · Content',
        href: '/leistungen#praesenz',
        linkLabel: 'Mehr über digitale Präsenz',
        x: 0.56, y: 0.675, ab: 140,
    },
    {
        id: 'wirkung',
        name: 'Wirkung',
        role: 'bringt Ergebnisse.',
        intro: 'Die richtige Botschaft muss die richtigen Menschen erreichen.',
        text: 'Wenn Fundament und Auftritt stimmen, können Marketing, SEO, Content, Ads und Automatisierung darauf aufbauen.',
        services: 'SEO · Marketing · Ads · Automatisierung',
        href: '/leistungen#wirkung',
        linkLabel: 'Mehr über Sichtbarkeit',
        x: 0.605, y: 0.8, ab: 168,
    },
]

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

const Arrow = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
)

export default function HeroIceberg() {
    const reduced = usePrefersReducedMotion()
    const pinRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    /** 0 = Einstieg, 1–4 = Ebene, 5 = Abschluss. Nur fuer den Text – der Frame laeuft ohne React. */
    const [step, setStep] = useState(0)

    useEffect(() => {
        const canvas = canvasRef.current
        const pin = pinRef.current
        if (!canvas || !pin) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const frames: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null)
        let current = -1
        let wanted = reduced ? TOTAL_FRAMES - 1 : 0
        let cancelled = false

        function draw(idx: number) {
            // Der gewuenschte Frame ist evtl. noch nicht geladen: nimm den
            // naechsten davor, statt ein leeres Bild zu zeigen.
            for (let i = idx; i >= 0; i--) {
                const img = frames[i]
                if (img) {
                    if (i !== current) {
                        ctx!.drawImage(img, 0, 0, canvas!.width, canvas!.height)
                        current = i
                    }
                    return
                }
            }
        }

        function load(i: number): Promise<void> {
            return new Promise((resolve) => {
                const img = new Image()
                img.decoding = 'async'
                img.onload = () => {
                    frames[i] = img
                    if (i <= wanted) draw(wanted)
                    resolve()
                }
                img.onerror = () => resolve()
                img.src = FRAME_URL(i)
            })
        }

        async function preload() {
            // Reduzierte Bewegung: nur das Schlussbild, die Sequenz ist unnoetig.
            if (reduced) { await load(TOTAL_FRAMES - 1); return }
            await load(0)
            // Den Rest erst nach dem ersten Bild und im Leerlauf laden, damit
            // Text und erstes Bild nicht mit 190 Frames um die Leitung konkurrieren.
            await new Promise<void>((resolve) => {
                const ric = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback
                if (ric) ric(() => resolve(), { timeout: 1500 })
                else setTimeout(resolve, 600)
            })
            if (cancelled) return
            const order: number[] = []
            for (let i = 1; i < TOTAL_FRAMES; i++) order.push(i)
            let cursor = 0
            const worker = async () => {
                while (!cancelled && cursor < order.length) await load(order[cursor++])
            }
            await Promise.all(Array.from({ length: 5 }, worker))
        }
        void preload()

        if (reduced) {
            setStep(5)
            return () => { cancelled = true }
        }

        let raf = 0
        function update() {
            raf = 0
            const rect = pin!.getBoundingClientRect()
            const span = Math.max(pin!.offsetHeight - window.innerHeight, 1)
            const p = clamp01(-rect.top / span)

            wanted = Math.min(Math.round(frameAt(p)), TOTAL_FRAMES - 1)
            draw(wanted)

            let s = 0
            if (p >= END_AT) s = 5
            else for (let k = 0; k < LAYERS.length; k++) if (wanted >= LAYERS[k].ab) s = k + 1
            setStep((prev) => (prev === s ? prev : s))
        }
        const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

        update()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)
        return () => {
            cancelled = true
            if (raf) cancelAnimationFrame(raf)
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [reduced])

    // Waehrend des Abschlusses bleiben alle vier Kurzmarken am Berg stehen.
    const layerStep = Math.min(step, 4)
    const ended = step === 5

    return (
        <section
            id="methode"
            className={`hi${reduced ? ' hi--static' : ''}`}
            data-step={step}
            aria-label="Einstieg"
        >
            <div className="hi-pin" ref={pinRef}>
                <div className="hi-stage">
                    <div className="hi-frame">
                        {/* Erstes Bild als normales <img>: steht sofort, auch bevor das
                            Script laeuft; das Canvas zeichnet danach darueber. */}
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="hi-poster" src={FRAME_URL(0)} alt="" aria-hidden="true" width={1280} height={720} fetchPriority="high" decoding="async" />
                        <canvas
                            ref={canvasRef}
                            width={1280}
                            height={720}
                            className="hi-canvas"
                            aria-hidden="true"
                            data-ai-generated="true"
                        />
                        {/* Kurzmarke am Segment; die Erklaerung steht im Textfeld links. */}
                        <ul className="hi-tags" aria-label="Die vier Ebenen einer Marke">
                            {LAYERS.map((l, i) => (
                                <li
                                    key={l.id}
                                    className={`hi-tag${layerStep > i || ended ? ' is-on' : ''}${layerStep === i + 1 && !ended ? ' is-active' : ''}`}
                                    style={{ left: `${l.x * 100}%`, top: `${l.y * 100}%` }}
                                >
                                    <span className="hi-tag-name"><i>{String(i + 1).padStart(2, '0')}</i> {l.name}</span>
                                    <span className="hi-tag-line" aria-hidden="true" />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="hi-shade" aria-hidden="true" />

                    <div className="hi-copy">
                        <div className="hi-intro">
                            <p className="hi-kicker">Markenstrategie · Gestaltung · Digitale Umsetzung</p>
                            <h1 className="hi-h1">
                                Starke Marken entstehen<br />
                                <strong>nicht an der Oberfläche.</strong>
                            </h1>
                            <p className="hi-lead">
                                LinderMedia entwickelt Markenauftritte für Unternehmen, deren Leistung
                                nach außen noch nicht klar genug ankommt – von der Positionierung über
                                das Design bis zur digitalen Umsetzung.
                            </p>
                            <div className="hero-ctas hi-ctas">
                                <a className="hero-cta hero-cta--primary" href="#contact">Projekt besprechen</a>
                                <a className="hero-cta" href="#projekte">
                                    Projekte ansehen <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>

                        {/* Eine Erklaerung pro Ebene am selben Platz wie der Einstieg:
                            die Headline wird nacheinander zu Strategie, Charakter … */}
                        {LAYERS.map((l, i) => (
                            <div key={l.id} className={`hi-panel${layerStep === i + 1 && !ended ? ' is-active' : ''}`}>
                                <p className="hi-panel-nr">{String(i + 1).padStart(2, '0')} / 04</p>
                                <h2 className="hi-panel-h">
                                    {l.name}<br /><strong>{l.role}</strong>
                                </h2>
                                <p className="hi-panel-intro">{l.intro}</p>
                                <p className="hi-panel-text">{l.text}</p>
                                <p className="hi-panel-services">{l.services}</p>
                                <Link className="hi-panel-link" href={l.href}>
                                    <span>{l.linkLabel}</span><Arrow />
                                </Link>
                            </div>
                        ))}

                        <div className={`hi-panel hi-end${ended ? ' is-active' : ''}`}>
                            <p className="hi-panel-nr">Ein System, kein Zufall.</p>
                            <h2 className="hi-panel-h">
                                Eine Strategie,<br />ein System,<br /><strong>eine Handschrift.</strong>
                            </h2>
                            <p className="hi-panel-text">
                                Strategie, Design und Markenpräsenz greifen ineinander. Was später
                                sichtbar wird, beginnt mit Entscheidungen, die vorher getroffen werden.
                            </p>
                            <a className="hi-panel-link" href="#leistungen">
                                <span>Die Lösung</span><Arrow />
                            </a>
                        </div>
                    </div>

                    <p className="hi-hint" aria-hidden="true">
                        <span>Scrollen</span><i />
                    </p>
                    <p className="hi-badge">Konzeptvisualisierung · KI-generiert</p>
                </div>
            </div>
        </section>
    )
}
