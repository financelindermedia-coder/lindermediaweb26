'use client'

import { useEffect, useRef } from 'react'

/**
 * Anzahl der Frames in public/frames – erzeugt aus public/video/ice.mp4
 * (12,04 s bei 24 fps) mit scripts/extract-ice-frames.ps1. Bei einem neuen
 * Quellvideo das Skript laufen lassen und die dort ausgegebene Zahl hier
 * eintragen; die Szenen-Zeiten in TextLayer.tsx haengen ebenfalls daran.
 */
const TOTAL_FRAMES = 289
const SKIP_FRAMES  = 0
const USE_FRAMES   = TOTAL_FRAMES - SKIP_FRAMES

/**
 * Die Reise laeuft ueber DREI Abschnitte, ohne Stillstand dazwischen:
 *
 *   #video-scroll   Abstieg        Frames 1 → DEEP_FRAME
 *   Prozessbereich  „Der Weg zur Wirkung"  DEEP_FRAME → RISE_FRAME
 *   #video-ascent   Aufstieg       RISE_FRAME → Ende
 *
 * RISE_FRAME liegt tief unter der Wasserlinie: die Aufloesungskarte steht noch
 * unter Wasser (Frames ~222–248), erst danach kommt der Durchbruch an die
 * Oberflaeche (~250–258) – beides frei auf der Aufstiegsstrecke, nicht hinter
 * dem Schleier des Prozessbereichs.
 *
 * Der mittlere Abschnitt hat keinen eigenen Driver: er ist genau die Strecke
 * zwischen den beiden Divs, also die Hoehe des gepinnten Scrollers. Waehrend
 * man dort quer liest, hebt sich das Bild bereits – langsamer als im Abstieg,
 * aber es steht nicht. So bleibt der Eisberg durchgehend in Bewegung und der
 * Weg vor dem Scroller wird kuerzer.
 *
 * DEEP_FRAME liegt bewusst vor dem allertiefsten Kader: die Wende steht am
 * Grund, der Rest der Tiefe wird nicht mehr durchgescrollt. Die Szenenzeiten in
 * TextLayer.tsx und die Kettenpositionen in globals.css (`.dsc`) haengen an
 * derselben Aufteilung – wer hier dreht, misst dort nach.
 */
const DEEP_FRAME = 171
const RISE_FRAME = 215
const DEEP_RATIO = DEEP_FRAME / USE_FRAMES
const RISE_RATIO = RISE_FRAME / USE_FRAMES

/**
 * Auf schmalen Viewports zeichnet ein zweites Canvas eine eigene, kurze
 * Sequenz aus public/frames-mobile-iceberg – 17 Kader, 720px Kante, WebP
 * q72 (zusammen 344 KB). Erzeugt aus dem eigens gedrehten 9:16-Rohmaterial
 * public/video/mobile/iceberg_1.mp4 (lokal, per .gitignore ausgenommen):
 *
 *   ffmpeg -i iceberg_1.mp4 -vf "select='not(mod(n\,12))',scale=720:-2" \
 *     -fps_mode vfr frame_%03d.png
 *   magick frame_%03d.png -quality 72 -define webp:method=6 frame_%03d.webp
 *
 * Das Quellvideo selbst ist eine kurze, nahezu statische Einstellung ohne
 * Kamerafahrt – die 17 Kader liefern nur die leise Umgebungsbewegung
 * (Wolken, Wasser), nicht unterschiedliche Tiefen wie die Desktop-Sequenz.
 * Das Sich-Vertiefen entsteht stattdessen aus einem Zoom+Schwenk-Ausschnitt
 * (siehe MOBILE_ZOOM_*), der pixelgenau in denselben Kader hineinzoomt statt
 * das ganze Element zu skalieren – dieselbe Zuschnitt-Logik wie drawFrame,
 * nur mit einem zusaetzlichen, scroll-gebundenen Zoomfaktor.
 *
 * Die Kader werden nicht hart gewechselt, sondern uebergeblendet (halten,
 * dann ueber MOBILE_FRAME_FADE ineinander verlaufen) – ein Hartschnitt alle
 * paar hundert Millisekunden zwischen fast identischen Fotos las sich wie
 * ein Ruckeln, nicht wie Wasser- oder Wolkenbewegung. Dafuer laeuft ein
 * durchgehender rAF-Loop statt der scroll-getriebenen Einzelzeichnung wie im
 * Desktop-Zweig – bei „weniger Bewegung“ bleibt die Ueberblendung aus, der
 * Zoom (er folgt dem Scroll, ist also keine autonome Animation) bleibt aktiv.
 */
const NARROW_QUERY = '(max-width: 820px)'
const MOBILE_FRAME_COUNT = 17
/** Wie lange ein Kader ruhig steht, bevor zum naechsten uebergeblendet wird (ms). */
const MOBILE_FRAME_HOLD = 900
/** Dauer der Ueberblendung selbst (ms) – weich statt Hartschnitt. */
const MOBILE_FRAME_FADE = 700
/** Ausschnittgroesse bei voller Tiefe, als Anteil der Kaderflaeche (≈2,1x Zoom). */
const MOBILE_ZOOM_MIN = 0.48
/** Fokuspunkt (Anteil der Bildhoehe) an der Oberflaeche … */
const MOBILE_FOCUS_NEAR = 0.30
/** … und in der Tiefe – der Zoom wandert von einem zum anderen. */
const MOBILE_FOCUS_DEEP = 0.70
/** Ease-in-out statt linear – der Zoom setzt sanfter ein und aus, nicht wie
 *  an einem Schalter. Kubisch, symmetrisch um die Mitte. */
function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/**
 * Wie viel Kaderbreite mindestens im Bild stehen bleiben muss.
 *
 * Der Eisberg nimmt rund 62 % der Breite ein. Formatfuellend (`cover`) ist das
 * auf einem Rechner kein Problem, auf einem hochkanten Handy aber schon: Bei
 * 390x844 zeigt `cover` nur noch 26 % der Breite – zu sehen ist blaue Textur,
 * nicht der Berg. Damit geht mobil die ganze Erzaehlung verloren, denn der
 * Abstieg lebt davon, dass man sieht, wie viel unter der Oberflaeche liegt.
 *
 * Deshalb wird auf solchen Formaten so weit herausgezoomt, dass mindestens
 * dieser Anteil der Breite steht. Der Kader fuellt die Hoehe dann nicht mehr;
 * was frei bleibt, wird mit der Randzone des Kaders weitergezogen (siehe
 * drawFrame). Auf Rechnern und im Querformat aendert sich nichts.
 */
const MIN_BILDBREITE = 0.66

export default function VideoCanvas() {
    const canvasRef       = useRef<HTMLCanvasElement>(null)
    const mobileCanvasRef = useRef<HTMLCanvasElement>(null)
    const framesRef       = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null))
    const currentFrameRef = useRef(-1)
    const rafRef          = useRef<number | null>(null)

    /*
     * Mobil und Desktop laufen vollstaendig getrennt: eigener Zweig, eigenes
     * Aufraeumen, kein gemeinsamer Zustand. Die Frame-Sequenz ist fuer eine
     * Kamerafahrt gebaut (289 verschiedene Kader); das Mobil-Video ist eine
     * kurze, nahezu statische Schleife – beide ueber denselben Code zu
     * fahren, haette staendige Fallunterscheidungen mitten im heissen Pfad
     * bedeutet, fuer zwei Dinge, die inhaltlich nichts teilen.
     */
    useEffect(() => {
        const narrow = window.matchMedia(NARROW_QUERY).matches

        if (narrow) {
            const canvas = mobileCanvasRef.current
            if (!canvas) return
            const ctx = canvas.getContext('2d')
            if (!ctx) return

            function setSize() {
                if (!canvas) return
                const b = canvas.getBoundingClientRect()
                const w = Math.max(1, Math.round(b.width))
                const h = Math.max(1, Math.round(b.height))
                if (canvas.width === w && canvas.height === h) return
                canvas.width  = w
                canvas.height = h
            }
            setSize()

            const frames: (HTMLImageElement | null)[] = new Array(MOBILE_FRAME_COUNT).fill(null)
            let cancelled = false
            // Ueberblend-Zustand: `fromIdx` liegt voll deckend unten, `toIdx`
            // blendet mit `blend` (0→1) darueber ein. Bei `weniger Bewegung`
            // bleiben beide bei 0, `blend` bei 0 – ein einzelnes Standbild.
            let fromIdx = 0, toIdx = 0, blend = 0

            function loadFrame(i: number): Promise<void> {
                return new Promise((resolve) => {
                    const img = new Image()
                    img.decoding = 'async'
                    img.src = `/frames-mobile-iceberg/frame_${String(i + 1).padStart(3, '0')}.webp`
                    img.onload = () => {
                        frames[i] = img
                        if (i === 0) draw()
                        resolve()
                    }
                    img.onerror = () => resolve()
                })
            }

            let descentTop = 0, descentH = 1, ascentTop = 0, ascentH = 1, hasAscent = false
            function measure() {
                const d = document.getElementById('video-scroll')
                const a = document.getElementById('video-ascent')
                if (d) { descentTop = d.offsetTop; descentH = d.offsetHeight || 1 }
                hasAscent = !!a
                if (a) { ascentTop = a.offsetTop; ascentH = a.offsetHeight || 1 }
            }
            measure()

            const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)
            /** Fortschritt ueber alle drei Abschnitte hinweg, wie im Desktop-Zweig. */
            function progressOf(): number {
                const y = window.scrollY
                if (!hasAscent) return clamp01((y - descentTop) / descentH)
                const descentEnd = descentTop + descentH
                if (y <= descentEnd) return clamp01((y - descentTop) / descentH) * DEEP_RATIO
                if (y < ascentTop) {
                    const span = Math.max(ascentTop - descentEnd, 1)
                    return DEEP_RATIO + clamp01((y - descentEnd) / span) * (RISE_RATIO - DEEP_RATIO)
                }
                return RISE_RATIO + clamp01((y - ascentTop) / ascentH) * (1 - RISE_RATIO)
            }

            /**
             * Zuschnitt fuer EIN Bild: ein Ausschnitt, der mit der Tiefe
             * kleiner wird und von der Wasserlinie (MOBILE_FOCUS_NEAR) zum
             * Unterwasserteil (MOBILE_FOCUS_DEEP) wandert – echtes
             * Hineinzoomen in den Kader, keine Elementskalierung. `cw`/`ch`
             * behalten dabei immer das Seitenverhaeltnis der Canvas-Flaeche,
             * deshalb deckt der Ausschnitt sie luecken- und verzerrungsfrei.
             * Die Ease-Kurve laesst den Zoom sanft an- und auslaufen statt
             * linear mitzuscrollen.
             */
            function cropFor(sw: number, sh: number) {
                if (!canvas) return { cx: 0, cy: 0, cw: sw, ch: sh }
                const coverScale = Math.max(canvas.width / sw, canvas.height / sh)
                const sw0 = canvas.width / coverScale
                const sh0 = canvas.height / coverScale
                const sx0 = (sw - sw0) / 2
                const sy0 = (sh - sh0) / 2

                const progress = progressOf()
                // 0→1 im Abstieg, haelt bei 1 im Prozessbereich, 1→0 im Aufstieg.
                let zoomT: number
                if (progress <= DEEP_RATIO) zoomT = easeInOutCubic(progress / DEEP_RATIO)
                else if (progress <= RISE_RATIO) zoomT = 1
                else zoomT = easeInOutCubic(1 - (progress - RISE_RATIO) / (1 - RISE_RATIO))

                const z = 1 - zoomT * (1 - MOBILE_ZOOM_MIN)
                const cw = sw0 * z
                const ch = sh0 * z
                const focusY = MOBILE_FOCUS_NEAR + zoomT * (MOBILE_FOCUS_DEEP - MOBILE_FOCUS_NEAR)
                const cx = Math.min(Math.max(sx0 + sw0 / 2 - cw / 2, sx0), sx0 + sw0 - cw)
                const cy = Math.min(Math.max(sy0 + sh0 * focusY - ch / 2, sy0), sy0 + sh0 - ch)
                return { cx, cy, cw, ch }
            }

            function draw() {
                if (!ctx || !canvas) return
                const base = frames[fromIdx] ?? frames[0]
                if (!base) return
                const c1 = cropFor(base.naturalWidth, base.naturalHeight)
                ctx.drawImage(base, c1.cx, c1.cy, c1.cw, c1.ch, 0, 0, canvas.width, canvas.height)

                if (blend > 0) {
                    const top = frames[toIdx]
                    if (top) {
                        const c2 = cropFor(top.naturalWidth, top.naturalHeight)
                        ctx.globalAlpha = blend
                        ctx.drawImage(top, c2.cx, c2.cy, c2.cw, c2.ch, 0, 0, canvas.width, canvas.height)
                        ctx.globalAlpha = 1
                    }
                }
            }

            async function preload() {
                await loadFrame(0)
                if (cancelled) return
                await Promise.all(
                    Array.from({ length: MOBILE_FRAME_COUNT - 1 }, (_, k) => loadFrame(k + 1)),
                )
            }
            void preload()

            function onResize() { setSize(); measure(); draw() }
            window.addEventListener('resize', onResize)
            const ro = new ResizeObserver(() => { measure(); draw() })
            ro.observe(document.body)

            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            let onScroll: (() => void) | null = null

            if (reducedMotion) {
                // Keine autonome Bewegung – der Zoom folgt dem Scroll (das ist
                // Inhalt, keine Animation), nur eben ereignisgetrieben statt
                // im Dauerlauf. Bleibt bei fromIdx=toIdx=0, blend=0: ein Kader.
                onScroll = () => {
                    if (rafRef.current !== null) return
                    rafRef.current = requestAnimationFrame(() => { rafRef.current = null; draw() })
                }
                window.addEventListener('scroll', onScroll, { passive: true })
            } else {
                // Durchgehender rAF-Loop: haelt ein Kader MOBILE_FRAME_HOLD ms,
                // blendet dann ueber MOBILE_FRAME_FADE ms zum naechsten – laeuft
                // auch im Stillstand weiter, sonst wirkt der Hintergrund tot,
                // sobald man aufhoert zu scrollen.
                let holdStart = performance.now()
                const tick = (now: number) => {
                    const elapsed = now - holdStart
                    if (elapsed < MOBILE_FRAME_HOLD) {
                        blend = 0
                    } else {
                        const fadeT = (elapsed - MOBILE_FRAME_HOLD) / MOBILE_FRAME_FADE
                        if (fadeT >= 1) {
                            fromIdx = toIdx
                            toIdx = (toIdx + 1) % MOBILE_FRAME_COUNT
                            holdStart = now
                            blend = 0
                        } else {
                            blend = fadeT
                        }
                    }
                    draw()
                    rafRef.current = requestAnimationFrame(tick)
                }
                rafRef.current = requestAnimationFrame(tick)
            }

            return () => {
                cancelled = true
                ro.disconnect()
                if (onScroll) window.removeEventListener('scroll', onScroll)
                window.removeEventListener('resize', onResize)
                if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
            }
        }

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return

        /*
         * Winziger Zwischenpuffer fuer die ausgezogenen Raender.
         *
         * Die Randzone direkt aufzuziehen schmiert jedes Detail zu senkrechten
         * Streifen – im Wasser unter dem Berg ist das deutlich zu sehen. Der
         * Umweg ueber 8x2 Pixel wirft dieses Detail vorher weg: Was bleibt, ist
         * die Farbe der Zone als weicher Verlauf. Das ist ein Weichzeichner zum
         * Nulltarif, ohne `ctx.filter`, das auf Handys teuer ist.
         */
        const rand = document.createElement('canvas')
        rand.width = 8
        rand.height = 2
        const randCtx = rand.getContext('2d')

        /**
         * Eine Randzone des Kaders als Verlauf in die freie Flaeche ziehen.
         * Gibt die gemittelte Randfarbe zurueck (fuer die weiche Naht unten) –
         * kostet nur einen 1x1-Pixel-Read auf dem 8x2-Zwischenpuffer.
         */
        function zieheRand(
            frame: HTMLImageElement,
            sy: number, sh: number, sw: number,
            dx: number, dy: number, dw: number, dh: number,
        ): string {
            if (!randCtx || !ctx || dh <= 0) return '32,52,68'
            randCtx.clearRect(0, 0, rand.width, rand.height)
            randCtx.drawImage(frame, 0, sy, sw, sh, 0, 0, rand.width, rand.height)
            ctx.drawImage(rand, 0, 0, rand.width, rand.height, dx, dy, dw, dh)
            const p = randCtx.getImageData(4, 0, 1, 1).data
            return `${p[0]},${p[1]},${p[2]}`
        }

        function setSize() {
            if (!canvas) return
            /*
             * Die Groesse kommt aus dem ELEMENT, nicht aus dem Fenster.
             *
             * Das Canvas ist per CSS so gross wie die Ansicht. Auf Handys ist
             * `100vh` aber die GROSSE Ansichtshoehe – gerechnet, als waere die
             * Adressleiste eingeklappt –, waehrend `window.innerHeight` die
             * gerade sichtbare Hoehe liefert. Beides ist auf einem Telefon
             * verschieden, oft um 100px und mehr.
             *
             * Die Folge war eine zu kleine Bitmap, die der Browser in die
             * groessere Flaeche zog: Der Eisberg war senkrecht gestreckt, und
             * die Zuschnitts-Rechnung in drawFrame lief gegen eine Hoehe, die
             * es auf dem Schirm gar nicht gab. Aus dem Element gelesen stimmen
             * Bitmap und Flaeche immer ueberein – egal, welche Einheit das CSS
             * gerade aufloest und wie weit die Adressleiste eingefahren ist.
             */
            const b = canvas.getBoundingClientRect()
            const w = Math.max(1, Math.round(b.width))
            const h = Math.max(1, Math.round(b.height))
            // width/height zu setzen loescht die Flaeche – nur bei echter
            // Aenderung anfassen, sonst blitzt es bei jedem Scroll-Resize.
            if (canvas.width === w && canvas.height === h) return
            canvas.width  = w
            canvas.height = h
        }
        setSize()

        // Light fog placeholder until first real frame loads
        ctx.fillStyle = '#c8d8e8'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        function drawFrame(fileIdx: number) {
            const frame = framesRef.current[fileIdx]
            if (!frame || !ctx || !canvas) return

            // Aus dem Bild selbst, nicht fest verdrahtet: /frames liefert 1920x1080.
            const sw = frame.naturalWidth || 1920
            const sh = frame.naturalHeight || 1080

            const cover = Math.max(canvas.width / sw, canvas.height / sh)
            const fit   = canvas.width / sw
            // `cover` laesst `fit / cover` der Breite stehen. Faellt das unter
            // die Grenze, wird nur so weit gezoomt, dass die Grenze haelt.
            const scale = Math.min(cover, fit / MIN_BILDBREITE)

            const dw = sw * scale
            const dh = sh * scale
            const dx = (canvas.width - dw) / 2
            const dy = (canvas.height - dh) / 2

            ctx.drawImage(frame, dx, dy, dw, dh)

            // Die Breite ist immer gedeckt (scale >= fit), frei bleiben kann nur
            // oben und unten. Dort wird die aeusserste Zone des Kaders
            // ausgezogen: Nebel oben, Wasser unten sind waagerecht nahezu
            // einfarbig, die Naht ist deshalb nicht zu sehen. Ein Band statt
            // einer einzelnen Zeile, damit ein Verlauf entsteht und keine Kante.
            if (dy > 0) {
                const band = Math.min(24, sh)
                // Die eine Pixelzeile Ueberlappung verhindert eine Haarlinie
                // an der Naht, wenn dy auf einem halben Geraetepixel landet.
                const topColor = zieheRand(frame, 0, band, sw, dx, 0, dw, dy + 1)
                const bottomColor = zieheRand(
                    frame, sh - band, band, sw,
                    dx, dy + dh - 1, dw, canvas.height - (dy + dh) + 1,
                )

                /*
                 * Auf schmalen, hohen Screens ist der Verlauf oft mehr als die
                 * Haelfte der Flaeche (bei 390x844 bleiben nur rund 40% echtes
                 * Bild) – der Schnitt von scharfer Eistextur zu flaechiger Farbe
                 * war dort als harte Kante zu sehen. Ein zweiter, durchsichtiger
                 * Anstrich in genau der Verlauffarbe legt sich ueber die
                 * aeussersten Pixel des echten Bildes und nimmt dort Kontrast
                 * heraus – aus der Kante wird ein Verblassen. Nur Gradient +
                 * fillRect, kein ctx.filter (siehe zieheRand oben).
                 */
                const feather = Math.min(56, dy, dh * 0.18)
                if (feather > 6) {
                    const fadeTop = ctx.createLinearGradient(0, dy, 0, dy + feather)
                    fadeTop.addColorStop(0, `rgba(${topColor}, 0.8)`)
                    fadeTop.addColorStop(1, `rgba(${topColor}, 0)`)
                    ctx.fillStyle = fadeTop
                    ctx.fillRect(dx, dy, dw, feather)

                    const fadeBottom = ctx.createLinearGradient(0, dy + dh - feather, 0, dy + dh)
                    fadeBottom.addColorStop(0, `rgba(${bottomColor}, 0)`)
                    fadeBottom.addColorStop(1, `rgba(${bottomColor}, 0.8)`)
                    ctx.fillStyle = fadeBottom
                    ctx.fillRect(dx, dy + dh - feather, dw, feather)
                }
            }
        }

        /**
         * Frames gestaffelt laden statt alle auf einmal.
         *
         * Vorher wurden beim Mount alle Requests gleichzeitig abgesetzt (rund
         * 13 MB). Das saettigt die Verbindung und verzoegert genau das Bild,
         * das der Nutzer als erstes sieht. Jetzt: zuerst das Startbild allein,
         * danach der Rest ueber eine kleine Anzahl paralleler Arbeiter – die
         * Reihenfolge bleibt die Abspielreihenfolge, also ist der naechste
         * benoetigte Frame in aller Regel schon da, bevor er gebraucht wird.
         */
        const CONCURRENCY = 6
        let cancelled = false

        function loadFrame(i: number): Promise<void> {
            return new Promise((resolve) => {
                const img = new Image()
                img.decoding = 'async'
                img.src = `/frames/frame_${String(i + 1).padStart(4, '0')}.webp`
                const done = () => resolve()
                img.onload = () => {
                    framesRef.current[i] = img
                    // Startbild zeichnen, sobald es da ist
                    if (i === SKIP_FRAMES && currentFrameRef.current === -1) {
                        currentFrameRef.current = SKIP_FRAMES
                        drawFrame(SKIP_FRAMES)
                    }
                    done()
                }
                img.onerror = done
            })
        }

        async function preloadFrames() {
            await loadFrame(SKIP_FRAMES)
            if (cancelled) return

            const queue: number[] = []
            for (let i = 0; i < TOTAL_FRAMES; i++) if (i !== SKIP_FRAMES) queue.push(i)

            let cursor = 0
            const worker = async () => {
                while (!cancelled && cursor < queue.length) {
                    await loadFrame(queue[cursor++])
                }
            }
            await Promise.all(Array.from({ length: CONCURRENCY }, worker))
        }
        void preloadFrames()

        /*
         * Masse der beiden Strecken einmal merken statt pro Bild abfragen:
         * `offsetTop`/`offsetHeight` erzwingen jeweils ein Layout. Geaendert
         * werden koennen sie nur durch ein Resize.
         */
        let descentTop = 0, descentH = 1, ascentTop = 0, ascentH = 1, hasAscent = false
        function measure() {
            const d = document.getElementById('video-scroll')
            const a = document.getElementById('video-ascent')
            if (d) { descentTop = d.offsetTop; descentH = d.offsetHeight || 1 }
            hasAscent = !!a
            if (a) { ascentTop = a.offsetTop; ascentH = a.offsetHeight || 1 }
        }
        measure()

        const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1)

        /** Fortschritt ueber alle drei Abschnitte hinweg. */
        function progressOf(): number {
            const y = window.scrollY
            if (!hasAscent) return clamp01((y - descentTop) / descentH)
            const descentEnd = descentTop + descentH
            if (y <= descentEnd) return clamp01((y - descentTop) / descentH) * DEEP_RATIO
            if (y < ascentTop) {
                // Prozessbereich: das Bild hebt sich waehrend des Querlaufs.
                const span = Math.max(ascentTop - descentEnd, 1)
                return DEEP_RATIO + clamp01((y - descentEnd) / span) * (RISE_RATIO - DEEP_RATIO)
            }
            return RISE_RATIO + clamp01((y - ascentTop) / ascentH) * (1 - RISE_RATIO)
        }

        function updateFrame() {
            rafRef.current = null
            const progress = progressOf()
            // Map progress to the usable frame range starting at SKIP_FRAMES
            const offset  = Math.min(Math.floor(progress * USE_FRAMES), USE_FRAMES - 1)
            const fileIdx = SKIP_FRAMES + offset
            if (fileIdx !== currentFrameRef.current) {
                currentFrameRef.current = fileIdx
                drawFrame(fileIdx)
            }
        }

        function onScroll() {
            if (rafRef.current !== null) return
            rafRef.current = requestAnimationFrame(updateFrame)
        }

        function onResize() {
            setSize()
            measure()
            if (currentFrameRef.current >= 0) drawFrame(currentFrameRef.current)
            updateFrame()
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)

        /*
         * Die Laenge des mittleren Abschnitts haengt an der Pin-Hoehe, die
         * MethodeSection erst in ihrem eigenen Effekt setzt. Ohne dieses
         * Nachmessen bliebe die Aufteilung beim ersten Bild stehen.
         */
        const ro = new ResizeObserver(() => { measure(); updateFrame() })
        ro.observe(document.body)

        return () => {
            cancelled = true
            ro.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
        }
    }, [])

    return (
        <>
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                data-ai-generated="true"
                className="vcv-canvas"
                style={{ position: 'fixed', inset: 0, width: '100%', height: '100vh', zIndex: 0 }}
            />
            {/* Nur auf schmalen Viewports sichtbar (siehe .vcv-mobile-canvas
                in globals.css) – die Frames werden erst im Effekt geladen,
                damit Desktop nie danach fragt. */}
            <canvas
                ref={mobileCanvasRef}
                aria-hidden="true"
                data-ai-generated="true"
                className="vcv-mobile-canvas"
                style={{ position: 'fixed', inset: 0, width: '100%', height: '100vh', zIndex: 0 }}
            />
        </>
    )
}
