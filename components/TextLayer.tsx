'use client'

import { useEffect, useRef } from 'react'

const TOTAL_VH = 1200

function sceneOpacity(scrollVh: number, start: number, end: number): number {
    const dur = end - start
    const fadeIn  = Math.max(dur * 0.08, 4)
    const fadeOut = Math.max(dur * 0.14, 6)
    if (scrollVh <= start) return 0
    if (scrollVh < start + fadeIn)  return (scrollVh - start) / fadeIn
    if (scrollVh > end) return 0
    if (scrollVh > end - fadeOut)   return (end - scrollVh) / fadeOut
    return 1
}

// ⚠️ Kalibriert auf `public/video/ice.mp4` → 289 Frames (scripts/extract-ice-frames.ps1).
// Arc: Frame 1–45 = heller Nebel, Eisberg über Wasser · 45–72 = die Wasserlinie
// zieht durchs Bild · 75–200 = unter Wasser, zum tiefsten und dunkelsten Punkt ·
// ab ~215 Aufstieg an der Eiswand · ab ~255 wieder aufgetaucht im Tageslicht.
// Frame ≈ scrollVh × 0,2408  (bzw. scrollVh ≈ Frame × 4,15).
//
// Wichtig beim Nachjustieren: bis Frame ~45 ist der Hintergrund hell, danach
// dunkel. Szenen mit dunklem Text (tl-glass--light) müssen davor liegen, alles
// ab der Wasserlinie trägt weißen Text auf dunklem Glas.
const SCENES = {
    hero:           { start: -10,  end: 122  },   // Frames ~1–30  · neblige Oberfläche (dunkler Text)
    erkenntnis:     { start: 134,  end: 196  },   // Frames ~33–48 · Eisberg über Wasser (dunkler Text)
    wasserlinie:    { start: 212,  end: 300  },   // Frames ~52–73 · Wasserlinie zieht durchs Bild (weißer Text)
    // Stationen unter Wasser (weißer Text) · Frames ~80–184
    mission:        { start: 330,  end: 385  },
    vision:         { start: 393,  end: 448  },
    werte:          { start: 456,  end: 511  },
    positionierung: { start: 519,  end: 574  },
    identitaet:     { start: 582,  end: 637  },
    sprache:        { start: 645,  end: 700  },
    vertrauen:      { start: 708,  end: 763  },
    tiefster:       { start: 790,  end: 880  },   // Frames ~191–212 · tiefster Punkt, Eis füllt das Bild
    sichtbarkeit:   { start: 900,  end: 1010 },   // Frames ~218–244 · beim Aufstieg an der Eiswand
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
        function update() {
            const scrollEl = document.getElementById('video-scroll')
            const driverH  = scrollEl ? scrollEl.offsetHeight : window.innerHeight * TOTAL_VH
            const scrollVh = (window.scrollY / driverH) * TOTAL_VH
            for (const [id, scene] of Object.entries(SCENES)) {
                const el = refs.current[id]
                if (!el) continue
                const op = sceneOpacity(scrollVh, scene.start, scene.end)
                el.style.opacity    = String(op)
                el.style.visibility = op === 0 ? 'hidden' : 'visible'
            }
        }
        window.addEventListener('scroll', update, { passive: true })
        update()
        return () => window.removeEventListener('scroll', update)
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

            {/* ── 03 WASSERLINIE ── */}
            {/* Genau hier zieht die Wasserlinie durchs Bild – ab diesem Moment
                ist der Hintergrund dunkel, deshalb dunkles Glas mit weißem Text. */}
            <div ref={r('wasserlinie')} className="text-scene tl-glass tl-glass--dark" style={{ position: 'absolute', top: '50%', left: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', opacity: 0, visibility: 'hidden' }}>
                <p style={{ ...EYE, textShadow: TS }}>| Schlüsselmoment</p>
                <h2 style={{ ...HL, textShadow: TS }}>
                    90 % der Wirkung<br />
                    <strong style={{ fontWeight: 900 }}>entstehen darunter.</strong>
                </h2>
                <p style={{ ...BODY, color: 'rgba(255,255,255,0.88)', textShadow: TS, maxWidth: '42ch' }}>
                    Was Menschen wahrnehmen, ist nur das Ergebnis dessen, was darunter liegt.
                    Jede starke Marke folgt einer Architektur.
                    Sichtbar und unsichtbar zugleich.
                </p>
            </div>

            {/* ── STATIONEN 01–07 ── */}
            <Station r={r('mission')}         num="01" label="Mission"         align="left"
                hl={<>Der Antrieb<br /><strong style={{fontWeight:900}}>der Marke.</strong></>}
                body="Die Mission beantwortet die Frage, warum ein Unternehmen existiert. Sie beschreibt den Beitrag, den eine Marke für ihre Kunden leisten möchte, und gibt Entscheidungen eine klare Richtung." />

            <Station r={r('vision')}          num="02" label="Vision"          align="right"
                hl={<>Das Ziel<br /><strong style={{fontWeight:900}}>am Horizont.</strong></>}
                body="Die Vision beschreibt die Zukunft, die eine Marke erreichen möchte. Sie schafft langfristige Richtung, motiviert intern und macht strategische Entscheidungen nachvollziehbar." />

            <Station r={r('werte')}           num="03" label="Werte"           align="left"
                hl={<>Der<br /><strong style={{fontWeight:900}}>Kompass.</strong></>}
                body="Werte bestimmen, wie Entscheidungen getroffen werden. Sie schaffen Verlässlichkeit nach innen und außen — und sorgen dafür, dass Verhalten und Kommunikation glaubwürdig zusammenpassen." />

            <Station r={r('positionierung')}  num="04" label="Positionierung"  align="right"
                hl={<>Der Platz<br /><strong style={{fontWeight:900}}>im Markt.</strong></>}
                body="Positionierung beschreibt den Platz, den eine Marke im Bewusstsein ihrer Zielgruppe einnehmen möchte. Sie macht Unterschiede sichtbar, schafft Relevanz und schärft das Profil." />

            <Station r={r('identitaet')}      num="05" label="Identität"       align="left"
                hl={<>Das Gesicht<br /><strong style={{fontWeight:900}}>der Marke.</strong></>}
                body="Identität macht eine Marke erkennbar. Sie verbindet Gestaltung, Wirkung und Wiedererkennung zu einem konsistenten Erscheinungsbild, das auf allen Kanälen trägt." />

            <Station r={r('sprache')}         num="06" label="Sprache"         align="right"
                hl={<>Die Stimme<br /><strong style={{fontWeight:900}}>der Marke.</strong></>}
                body="Sprache macht Haltung hörbar. Sie entscheidet darüber, wie Menschen eine Marke wahrnehmen, ob Kommunikation glaubwürdig wirkt und ob sie im Gedächtnis bleibt." />

            <Station r={r('vertrauen')}       num="07" label="Vertrauen"       align="left"
                hl={<>Das Band<br /><strong style={{fontWeight:900}}>der Konsistenz.</strong></>}
                body="Vertrauen entsteht dort, wo Versprechen und Erlebnisse übereinstimmen. Je konsistenter eine Marke handelt, desto stärker und dauerhafter wird die Bindung zu ihren Kunden." />

            {/* ── SICHTBARKEIT HEADLINE ── */}
            <div ref={r('sichtbarkeit')} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', opacity: 0, visibility: 'hidden' }}>
                <h2 style={{
                    fontSize: 'clamp(2.2rem, 8vw, 8rem)',
                    fontWeight: 900, lineHeight: 0.9,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', textShadow: TS,
                    maxWidth: '92vw',
                }}>
                    Sichtbarkeit.
                </h2>
            </div>

            {/* ── TIEFSTER PUNKT ── */}
            <div ref={r('tiefster')} className="tl-glass tl-glass--dark" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', maxWidth: 'min(54vw, 760px)', opacity: 0, visibility: 'hidden' }}>
                <h2 style={{ ...HL, fontSize: 'var(--h2)', textShadow: TS, marginBottom: '2.4rem' }}>
                    Das ist das Fundament,<br />
                    <strong style={{ fontWeight: 900 }}>das alles trägt.</strong>
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    {[
                        ['Bevor Sichtbarkeit entsteht,', 'muss Klarheit entstehen.'],
                        ['Bevor Menschen vertrauen,', 'muss Identität entstehen.'],
                        ['Bevor Wachstum entsteht,', 'braucht es ein Fundament.'],
                    ].map(([a, b], i) => (
                        <p key={i} style={{ ...BODY, fontSize: 'clamp(1.1rem, 1.6vw, 1.55rem)', textShadow: TS, lineHeight: 1.5 }}>
                            <span style={{ color: 'rgba(255,255,255,0.42)' }}>{a}</span>{' '}
                            <span style={{ color: 'rgba(255,255,255,0.92)', fontWeight: 600 }}>{b}</span>
                        </p>
                    ))}
                </div>
            </div>

        </div>
    )
}

interface StationProps {
    r: (el: HTMLDivElement | null) => void
    num: string; label: string; hl: React.ReactNode; body: string; align: 'left' | 'right'
}

function Station({ r, num, label, hl, body, align }: StationProps) {
    const right = align === 'right'
    return (
        <div ref={r} className={`station-scene tl-glass tl-glass--dark${right ? ' tl-glass--right' : ''}`} style={{
            position: 'absolute', top: '50%',
            ...(right ? { right: 'var(--px)' } : { left: 'var(--px)' }),
            transform: 'translateY(-50%)', maxWidth: 'clamp(280px, 34vw, 460px)',
            opacity: 0, visibility: 'hidden',
            ...(right ? { textAlign: 'right' } : {}),
        }}>
            <p style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', textShadow: TS, marginBottom: '0.8rem' }}>
                {right ? `${label} · ${num}` : `${num} · ${label}`}
            </p>
            <h3 style={{ fontSize: 'var(--h2)', fontWeight: 300, lineHeight: 1.1, color: '#ffffff', letterSpacing: '-0.012em', textShadow: TS, marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                {hl}
            </h3>
            <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.88)', textShadow: TS, maxWidth: '34ch', ...(right ? { marginLeft: 'auto' } : {}) }}>
                {body}
            </p>
        </div>
    )
}
