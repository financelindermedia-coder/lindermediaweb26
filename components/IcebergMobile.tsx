'use client'

import { useEffect, useRef, type RefObject } from 'react'

/**
 * Mobiler Splitscreen fuer den Eisberg, von der ersten Sekunde an: oben ein
 * feststehendes Kaderfenster (sticky), unten alle Boxen im normalen Fluss
 * (Held, Ausgangspunkt, DescentStack-Kette, AufloesungCard). Ersetzt die
 * fruehere eigene 9:16-Kaderserie mit Zoom-Krop – die zeigte auf schmalen
 * Screens zu wenig vom Berg (siehe Git-Historie VideoCanvas.tsx). Genutzt
 * wird stattdessen dieselbe Kamerafahrt wie am Desktop, nur aus
 * `public/frames-m`: jeder zweite Kader der 289er-Sequenz, halbe Aufloesung
 * (960x540, 2,6 MB gesamt statt 14 MB) – fuer ein Handy reicht das.
 *
 * Zwei Fenster teilen sich denselben Kader-Cache, sind aber sonst eigene,
 * einfache Komponenten – kein Teilen mit VideoCanvas.tsx (Desktop bleibt ein
 * eigener Zweig, siehe Kommentar dort: gemeinsame Abstraktion haette staendige
 * Fallunterscheidungen im heissen Pfad bedeutet, fuer zwei Dinge, die sich nur
 * das Rechenmodell teilen, nicht den Code drumherum).
 *
 *   Abstiegsfenster (Splitscreen, oben)  Frames 0 → DEEP_FRAME
 *   Aufstiegsfenster (Splitscreen, oben) Frames RISE_FRAME → letzter Kader
 *
 * DEEP_FRAME/RISE_FRAME muessen zu VideoCanvas.tsx passen (dort dieselben
 * Werte fuer den Desktop-Zweig) – wer dort dreht, dreht auch hier.
 */
const NARROW_QUERY = '(max-width: 820px)'
const TOTAL_FRAMES = 289
const DEEP_FRAME = 171
const RISE_FRAME = 215
const LAST_FRAME = TOTAL_FRAMES - 1

/** Wie viel Kaderbreite mindestens im Bild stehen bleiben muss – siehe
 *  ausfuehrliche Begruendung bei MIN_BILDBREITE in VideoCanvas.tsx. */
const MIN_BILDBREITE = 0.66

function frameFileNum(index0: number): number {
    // frames-m enthaelt nur ungerade 1-basierte Nummern (1,3,…,289) – jeder
    // zweite Desktop-Kader.
    const n = index0 + 1
    return n % 2 === 1 ? n : Math.max(1, n - 1)
}

const frameCache = new Map<number, HTMLImageElement>()
let preloadStarted = false

/** Laedt die ganze (kleine) Mobil-Sequenz einmal vor – gemeinsam fuer alle
 *  drei Fenster, damit kein Kader doppelt angefragt wird. */
function preloadAll() {
    if (preloadStarted) return
    preloadStarted = true
    for (let n = 1; n <= TOTAL_FRAMES; n += 2) {
        const img = new Image()
        img.decoding = 'async'
        img.src = `/frames-m/frame_${String(n).padStart(4, '0')}.webp`
        frameCache.set(n, img)
    }
}

function getFrame(index0: number): HTMLImageElement {
    const n = frameFileNum(index0)
    let img = frameCache.get(n)
    if (!img) {
        img = new Image()
        img.decoding = 'async'
        img.src = `/frames-m/frame_${String(n).padStart(4, '0')}.webp`
        frameCache.set(n, img)
    }
    return img
}

/*
 * Derselbe Zuschnitt wie am Desktop (`drawFrame`/`zieheRand` in
 * VideoCanvas.tsx): formatfuellend, aber nie schmaler als MIN_BILDBREITE der
 * Kaderbreite, freie Raender werden als Verlauf ausgezogen statt hart
 * abgeschnitten. Eigene, kleine Kopie statt geteilter Funktion – siehe
 * Kommentar oben.
 */
let randBuf: HTMLCanvasElement | null = null
function zieheRand(
    ctx: CanvasRenderingContext2D, frame: HTMLImageElement,
    sy: number, sh: number, sw: number,
    dx: number, dy: number, dw: number, dh: number,
): string {
    if (!randBuf) {
        randBuf = document.createElement('canvas')
        randBuf.width = 8
        randBuf.height = 2
    }
    const randCtx = randBuf.getContext('2d')
    if (!randCtx || dh <= 0) return '32,52,68'
    randCtx.clearRect(0, 0, randBuf.width, randBuf.height)
    randCtx.drawImage(frame, 0, sy, sw, sh, 0, 0, randBuf.width, randBuf.height)
    ctx.drawImage(randBuf, 0, 0, randBuf.width, randBuf.height, dx, dy, dw, dh)
    const p = randCtx.getImageData(4, 0, 1, 1).data
    return `${p[0]},${p[1]},${p[2]}`
}

function drawCover(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, frame: HTMLImageElement) {
    const sw = frame.naturalWidth || 1920
    const sh = frame.naturalHeight || 1080
    const cover = Math.max(canvas.width / sw, canvas.height / sh)
    const fit = canvas.width / sw
    const scale = Math.min(cover, fit / MIN_BILDBREITE)

    const dw = sw * scale
    const dh = sh * scale
    const dx = (canvas.width - dw) / 2
    const dy = (canvas.height - dh) / 2
    ctx.drawImage(frame, dx, dy, dw, dh)

    const gapTop = dy
    const gapBottom = canvas.height - (dy + dh)
    const band = Math.min(24, sh)

    if (gapTop > 0.5) {
        const topColor = zieheRand(ctx, frame, 0, band, sw, dx, 0, dw, gapTop + 1)
        const feather = Math.min(56, gapTop, dh * 0.18)
        if (feather > 6) {
            const fadeTop = ctx.createLinearGradient(0, gapTop, 0, gapTop + feather)
            fadeTop.addColorStop(0, `rgba(${topColor}, 0.8)`)
            fadeTop.addColorStop(1, `rgba(${topColor}, 0)`)
            ctx.fillStyle = fadeTop
            ctx.fillRect(dx, gapTop, dw, feather)
        }
    }
    if (gapBottom > 0.5) {
        const bottomColor = zieheRand(ctx, frame, sh - band, band, sw, dx, dy + dh - 1, dw, gapBottom + 1)
        const feather = Math.min(56, gapBottom, dh * 0.18)
        if (feather > 6) {
            const fadeBottom = ctx.createLinearGradient(0, dy + dh - feather, 0, dy + dh)
            fadeBottom.addColorStop(0, `rgba(${bottomColor}, 0)`)
            fadeBottom.addColorStop(1, `rgba(${bottomColor}, 0.8)`)
            ctx.fillStyle = fadeBottom
            ctx.fillRect(dx, dy + dh - feather, dw, feather)
        }
    }
}

const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

/** Fortschritt des Abstiegsfensters: die ganze Strecke `#video-scroll`, vom
 *  Held bis zur Wende am Ende der Kartenkette. */
function descentSplitProgress(): number {
    const driver = document.getElementById('video-scroll')
    if (!driver) return 0
    return clamp01((window.scrollY - driver.offsetTop) / (driver.offsetHeight || 1))
}

/** Fortschritt des Aufstiegsfensters: die ganze Strecke `#video-ascent`. */
function ascentSplitProgress(): number {
    const driver = document.getElementById('video-ascent')
    if (!driver) return 0
    return clamp01((window.scrollY - driver.offsetTop) / (driver.offsetHeight || 1))
}

function usePane(
    canvasRef: RefObject<HTMLCanvasElement | null>,
    getProgress: () => number,
    frameFrom: number,
    frameTo: number,
) {
    const rafRef = useRef<number | null>(null)

    useEffect(() => {
        if (!window.matchMedia(NARROW_QUERY).matches) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        preloadAll()

        function setSize() {
            if (!canvas) return
            const b = canvas.getBoundingClientRect()
            const w = Math.max(1, Math.round(b.width))
            const h = Math.max(1, Math.round(b.height))
            if (canvas.width === w && canvas.height === h) return
            canvas.width = w
            canvas.height = h
        }
        setSize()

        let currentIdx = -1
        function draw(idx: number) {
            if (!ctx || !canvas) return
            const img = getFrame(idx)
            if (!img.complete || img.naturalWidth === 0) {
                img.onload = () => { if (currentIdx === idx) draw(idx) }
                // Schlaegt eine Anfrage fehl (Netz weg, Server neu gestartet),
                // bleibt das Fenster sonst dauerhaft leer, weil `onload` nie
                // feuert – ein Versuch mit frischer URL statt Totalausfall.
                img.onerror = () => {
                    if (currentIdx !== idx) return
                    const retry = new Image()
                    retry.decoding = 'async'
                    retry.onload = () => { if (currentIdx === idx) draw(idx) }
                    retry.src = `${img.src.split('?')[0]}?retry=${Date.now()}`
                    frameCache.set(frameFileNum(idx), retry)
                }
                return
            }
            drawCover(ctx, canvas, img)
        }

        function update() {
            rafRef.current = null
            const progress = clamp01(getProgress())
            const idx = Math.min(frameTo, frameFrom + Math.round(progress * (frameTo - frameFrom)))
            if (idx !== currentIdx) {
                currentIdx = idx
                draw(idx)
            }
        }
        update()

        function onScroll() {
            if (rafRef.current !== null) return
            rafRef.current = requestAnimationFrame(update)
        }
        function onResize() { setSize(); update() }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        const ro = new ResizeObserver(onResize)
        ro.observe(document.body)

        return () => {
            ro.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
}

export function IcebergDescentCanvas() {
    const ref = useRef<HTMLCanvasElement>(null)
    usePane(ref, descentSplitProgress, 0, DEEP_FRAME)
    return <canvas ref={ref} aria-hidden="true" data-ai-generated="true" className="ms-split-canvas" />
}

export function IcebergAscentCanvas() {
    const ref = useRef<HTMLCanvasElement>(null)
    usePane(ref, ascentSplitProgress, RISE_FRAME, LAST_FRAME)
    return <canvas ref={ref} aria-hidden="true" data-ai-generated="true" className="ms-split-canvas" />
}
