'use client'

import { useEffect, useRef } from 'react'

/*
 * Akt 1 laeuft ueber ZWEI Scroll-Strecken mit einem Halt dazwischen:
 *
 *   #video-scroll   Abstieg  – Frames 1–171, TOTAL_DESCENT vh
 *   (Prozessbereich „Der Weg zur Wirkung" – Frames 171–215, hebt sich mit)
 *   #video-ascent   Aufstieg – Frames 215–289, TOTAL_ASCENT vh (langsamer als
 *                   der Abstieg: der Durchbruch soll Zeit bekommen)
 *
 * Die Aufteilung muss zu DEEP_FRAME/RISE_FRAME in VideoCanvas.tsx passen. Der
 * Takt ist in beiden Strecken derselbe wie zuvor: rund 4,15 vh pro Frame.
 */
const TOTAL_DESCENT = 710
const TOTAL_ASCENT  = 420

function sceneOpacity(scrollVh: number, start: number, end: number, fadeOutVh?: number): number {
    const dur = end - start
    const fadeIn  = Math.max(dur * 0.08, 4)
    const fadeOut = fadeOutVh ?? Math.max(dur * 0.14, 6)
    if (scrollVh <= start) return 0
    if (scrollVh < start + fadeIn)  return (scrollVh - start) / fadeIn
    if (scrollVh > end) return 0
    if (scrollVh > end - fadeOut)   return (end - scrollVh) / fadeOut
    return 1
}

// ⚠️ Kalibriert auf `public/video/ice.mp4` → 289 Frames (scripts/extract-ice-frames.ps1).
// Arc: Frame 1–45 = heller Nebel, Eisberg über Wasser · 45–72 = die Wasserlinie
// zieht durchs Bild · 75–171 = unter Wasser bis zur Wende ·
// ab ~215 Aufstieg an der Eiswand · ab ~255 wieder aufgetaucht im Tageslicht.
// Frame ≈ scrollVh × 0,2408 auf der Abstiegsstrecke.
//
// Wichtig beim Nachjustieren: bis Frame ~45 ist der Hintergrund hell, danach
// dunkel. Szenen mit dunklem Text (tl-glass--light) müssen davor liegen, alles
// ab der Wasserlinie trägt weißen Text auf dunklem Glas.
const SCENES: Record<string, { start: number; end: number; ascent?: true; fadeOut?: number }> = {
    // Der Scroll-Hinweis steht sofort und geht früh wieder: nach knapp einer
    // halben Bildschirmhöhe hat der Besucher verstanden, dass es weitergeht.
    scrollhint:     { start: -10,  end: 42   },
    hero:           { start: -10,  end: 122  },   // Frames ~1–30  · neblige Oberfläche (dunkler Text)
    erkenntnis:     { start: 134,  end: 196  },   // Frames ~32–47 · Eisberg über Wasser (dunkler Text)
    // Ab hier uebernimmt DescentStack: Problem und die drei Ebenen laufen als
    // verbundene Kette mit dem Bild mit, statt einander zu ueberblenden. Ihre
    // Positionen stehen dort, nicht in dieser Tabelle.

    // Die Auflösung steht erst, wenn der Berg wieder ganz über der Oberfläche
    // steht – ohne Nebel, im Tageslicht. Ab Frame ~263 ist das Bild durchgehend
    // hell, deshalb trägt die Karte hier dunkle Schrift auf hellem Glas wie im
    // Hero: die Reise endet in derselben Tonlage, in der sie begonnen hat.
    // Steht praktisch ab dem ersten Bild der Aufstiegsstrecke und haelt bis in
    // deren Mitte – waehrend des Aufstiegs, aber NOCH UNTER WASSER: der Blick
    // geht an der Eiswand nach oben, die Oberflaeche ist von unten zu sehen. Deshalb auch
    // dunkles Glas mit weisser Schrift – helles Glas mit dunkler Schrift wuerde
    // auf dem tiefblauen Bild nicht lesen. Sie ist weg, bevor der Berg
    // durchbricht (~Frame 250); der Durchbruch und das helle Schlussbild
    // stehen danach frei.
    sichtbarkeit:   { start: -20,  end: 195, ascent: true, fadeOut: 45 },   // Frames ~215–248
}

const HL: React.CSSProperties = {
    fontSize: 'var(--h2)',
    fontWeight: 300,
    lineHeight: 1.05,
    color: '#ffffff',
    letterSpacing: '-0.012em',
    textTransform: 'uppercase',
    marginBottom: '1.2rem',
}
const BODY: React.CSSProperties = {
    fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
    fontWeight: 400,
    lineHeight: 1.75,
    color: 'rgba(255,255,255,0.68)',
}
const EYE: React.CSSProperties = {
    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)',
    fontWeight: 400,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.55)',
    marginBottom: '0.9rem',
}
// Enge, glyph-nahe Schatten für Lesbarkeit auf hellem Eis – KEIN Box-Overlay,
// sondern ein dunkler Saum direkt um die Buchstaben.
const TS = '0 1px 3px rgba(0,0,0,0.92), 0 2px 16px rgba(0,0,0,0.72), 0 0 60px rgba(0,0,0,0.45)'

export default function TextLayer() {
    const refs = useRef<Record<string, HTMLDivElement | null>>({})

    useEffect(() => {
        // Beide Strecken einmal vermessen statt bei jedem Scroll-Ereignis:
        // offsetTop/offsetHeight erzwingen ein Layout.
        let dTop = 0, dH = 1, aTop = 0, aH = 1
        function measure() {
            const d = document.getElementById('video-scroll')
            const a = document.getElementById('video-ascent')
            if (d) { dTop = d.offsetTop; dH = d.offsetHeight || 1 }
            if (a) { aTop = a.offsetTop; aH = a.offsetHeight || 1 }
        }

        function update() {
            const y = window.scrollY
            const descentVh = ((y - dTop) / dH) * TOTAL_DESCENT
            const ascentVh  = ((y - aTop) / aH) * TOTAL_ASCENT
            for (const [id, scene] of Object.entries(SCENES)) {
                const el = refs.current[id]
                if (!el) continue
                const op = sceneOpacity(scene.ascent ? ascentVh : descentVh, scene.start, scene.end, scene.fadeOut)
                el.style.opacity    = String(op)
                el.style.visibility = op === 0 ? 'hidden' : 'visible'
            }
        }

        function onResize() { measure(); update() }

        measure()
        update()
        window.addEventListener('scroll', update, { passive: true })
        window.addEventListener('resize', onResize)
        // Die Aufstiegsstrecke verschiebt sich, sobald MethodeSection die Hoehe
        // ihres Pins gesetzt hat – danach noch einmal vermessen.
        const ro = new ResizeObserver(onResize)
        ro.observe(document.body)
        return () => {
            ro.disconnect()
            window.removeEventListener('scroll', update)
            window.removeEventListener('resize', onResize)
        }
    }, [])

    const r = (id: string) => (el: HTMLDivElement | null) => { refs.current[id] = el }

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none', fontFamily: 'var(--font-barlow), sans-serif' }}>

            {/* ── NEBEL WASSERLINIE ── */}
            <div ref={r('nebel')} style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '38%', opacity: 0, visibility: 'hidden',
                background: 'linear-gradient(to top, rgba(220,230,240,0.72) 0%, rgba(210,225,238,0.45) 30%, rgba(200,218,235,0.15) 65%, transparent 100%)',
                backdropFilter: 'blur(2px)',
                WebkitBackdropFilter: 'blur(2px)',
                maskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to top, black 0%, black 40%, transparent 100%)',
            }} />

            {/* ── 01 HERO ── */}
            <div ref={r('hero')} className="text-scene tl-glass tl-glass--light" style={{ position: 'absolute', top: '50%', left: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', opacity: 0, visibility: 'hidden' }}>
                <p className="hero-kicker" style={{ ...EYE, color: 'rgba(12,61,102,0.62)' }}>
                    Markenstrategie · Gestaltung · Digitale Umsetzung
                </p>
                <h1 style={{ ...HL, color: '#0c3d66', textShadow: 'none' }}>
                    Starke Marken entstehen<br />
                    <strong style={{ fontWeight: 900 }}>nicht an der Oberfläche.</strong>
                </h1>
                {/* Der Lead ordnet ein, was die Headline nur andeutet: wer hier
                    arbeitet, für wen – und wie weit die Arbeit reicht. Bewusst
                    ohne harte Umbrüche, damit er mobil natürlich umläuft. */}
                <p style={{ ...BODY, color: 'rgba(12,61,102,0.85)', maxWidth: '44ch' }}>
                    LinderMedia entwickelt Markenauftritte für Unternehmen, deren Leistung
                    nach außen noch nicht klar genug ankommt — von der Positionierung bis
                    zur digitalen Umsetzung.
                </p>
                <p className="hero-services">Strategie · Corporate Design · Website</p>
                {/* Nur diese Zeile nimmt Klicks an – die Karte selbst bleibt
                    durchlässig, damit sie das Scrollen nicht abfängt. */}
                <div className="hero-ctas">
                    <a className="hero-cta hero-cta--primary" href="#contact">Gespräch anfragen</a>
                    <a className="hero-cta" href="#projekte">
                        Projekte ansehen <span aria-hidden="true">→</span>
                    </a>
                </div>
                <span className="sr-only">Eine starke Marke entsteht nicht durch Werbung allein. Sie entsteht durch Klarheit.</span>
            </div>

            {/* ── SCROLL-HINWEIS ──
                Die Seite beginnt mit einem stehenden Bild; ohne diesen Hinweis
                ist nicht zu sehen, dass die Reise beim Scrollen weitergeht.
                Steht unten mittig, weil die Hero-Karte links sitzt, und in der
                dunklen Hero-Schrift – der Nebel darunter ist hell. */}
            <div ref={r('scrollhint')} className="tl-hint" style={{
                position: 'absolute', left: '50%', bottom: 'clamp(1.4rem, 5vh, 3.2rem)',
                transform: 'translateX(-50%)', opacity: 0, visibility: 'hidden',
            }}>
                <p className="tl-hint-text">Scrollen<br />und tiefer schauen</p>
                <span className="tl-hint-line" aria-hidden="true"><i /></span>
            </div>

            {/* ── 02 ERKENNTNIS ── */}
            <div ref={r('erkenntnis')} className="text-scene tl-glass tl-glass--light tl-glass--right" style={{ position: 'absolute', top: '50%', right: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', textAlign: 'right', opacity: 0, visibility: 'hidden' }}>
                <p style={{ ...EYE, color: 'rgba(12,61,102,0.6)' }}>Die Wahrnehmung |</p>
                <h2 style={{ ...HL, color: '#0c3d66', textShadow: 'none' }}>
                    Die meisten sehen<br />
                    <strong style={{ fontWeight: 900 }}>nur die Spitze.</strong>
                </h2>
                <p style={{ ...BODY, color: 'rgba(12,61,102,0.85)', maxWidth: '42ch' }}>
                    Websites. Logos. Kampagnen. Social Media.
                    All das ist sichtbar. Doch es ist nur ein kleiner Teil
                    dessen, was eine Marke tatsächlich trägt.
                </p>
            </div>

            {/* ── AUFLÖSUNG (Aufstieg) ── */}
            {/* Steht auf der Aufstiegsstrecke, unter Wasser, kurz bevor der Berg über
                der Oberfläche steht – jetzt ohne Nebel. Mittig, weil der Satz die
                ganze Reise zusammenfasst und keine Seite mehr bevorzugt. */}
            <div ref={r('sichtbarkeit')} className="text-scene tl-glass tl-glass--dark" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', maxWidth: 'min(760px, 86vw)', opacity: 0, visibility: 'hidden' }}>
                <h2 style={{ ...HL, textShadow: TS, marginBottom: '1.6rem' }}>
                    Was darunter trägt,<br />
                    <strong style={{ fontWeight: 900 }}>wird darüber sichtbar.</strong>
                </h2>
                <p style={{ ...BODY, color: 'rgba(255,255,255,0.88)', textShadow: TS, maxWidth: '52ch', margin: '0 auto' }}>
                    Wenn Strategie, Design und Markenpräsenz zusammenarbeiten,
                    entsteht ein Auftritt mit Klarheit, Charakter und Wirkung.
                </p>
            </div>

        </div>
    )
}
