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

const SCENES = {
    hero:           { start: -10,  end: 120  },
    erkenntnis:     { start: 120,  end: 168  },
    wasserlinie:    { start: 195,  end: 272  },
    nebel:          { start: 120,  end: 272  },
    konsistenz:     { start: 272,  end: 340  },
    mission:        { start: 340,  end: 380  },
    vision:         { start: 375,  end: 415  },
    werte:          { start: 415,  end: 455  },
    positionierung: { start: 455,  end: 495  },
    identitaet:     { start: 495,  end: 535  },
    sprache:        { start: 535,  end: 575  },
    vertrauen:      { start: 575,  end: 615  },
    tiefster:       { start: 615,  end: 665  },
    sichtbarkeit:   { start: 720,  end: 810  },
}

const HL: React.CSSProperties = {
    fontSize: 'clamp(2rem, 3.5vw, 4.2rem)',
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
const TS = '0 2px 28px rgba(0,0,0,0.55), 0 0 70px rgba(0,0,0,0.25)'

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
            <div ref={r('hero')} className="text-scene" style={{ position: 'absolute', top: '50%', left: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', opacity: 0, visibility: 'hidden' }}>
                <p style={{ ...EYE, color: 'rgba(12,61,102,0.6)' }}>| 01</p>
                <h1 style={{ ...HL, color: '#0c3d66', textShadow: 'none' }}>
                    Starke Marken entstehen<br />
                    <strong style={{ fontWeight: 900 }}>nicht an der Oberfläche.</strong>
                </h1>
                <p style={{ ...BODY, color: 'rgba(12,61,102,0.85)', maxWidth: '42ch' }}>
                    Viele Unternehmen investieren in Sichtbarkeit.
                    Doch Sichtbarkeit allein schafft keine starke Marke.
                    Starke Marken entstehen dort, wo Strategie, Identität
                    und Kommunikation dieselbe Richtung verfolgen.
                </p>
                <span className="sr-only">Eine starke Marke entsteht nicht durch Werbung allein. Sie entsteht durch Klarheit.</span>
            </div>

            {/* ── 02 ERKENNTNIS ── */}
            <div ref={r('erkenntnis')} className="text-scene" style={{ position: 'absolute', top: '50%', right: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', textAlign: 'right', opacity: 0, visibility: 'hidden' }}>
                <p style={{ ...EYE, color: 'rgba(12,61,102,0.6)' }}>02 |</p>
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
            <div ref={r('wasserlinie')} className="text-scene" style={{ position: 'absolute', top: '50%', left: 'var(--px)', transform: 'translateY(-50%)', maxWidth: 'clamp(320px, 38vw, 600px)', opacity: 0, visibility: 'hidden' }}>
                <p style={{ ...EYE, color: 'rgba(12,61,102,0.6)' }}>| 03 — Schlüsselmoment</p>
                <h2 style={{ ...HL, color: '#0c3d66', textShadow: 'none' }}>
                    90 % der Wirkung<br />
                    <strong style={{ fontWeight: 900 }}>entstehen darunter.</strong>
                </h2>
                <p style={{ ...BODY, color: 'rgba(12,61,102,0.85)', maxWidth: '42ch' }}>
                    Was Menschen wahrnehmen, ist nur das Ergebnis dessen, was darunter liegt.
                    Jede starke Marke folgt einer Architektur.
                    Sichtbar und unsichtbar zugleich.
                </p>
            </div>

            {/* ── KONSISTENZ (an der Wasserlinie) ── */}
            <div ref={r('konsistenz')} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', opacity: 0, visibility: 'hidden' }}>
                <p style={{
                    fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 700,
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: 'rgba(0,212,180,0.85)', marginBottom: '0.8rem',
                    textShadow: TS,
                }}>
                    Sichtbarkeit folgt
                </p>
                <h2 style={{
                    fontSize: 'clamp(4rem, 10vw, 13rem)',
                    fontWeight: 900, lineHeight: 0.9,
                    letterSpacing: '-0.025em', textTransform: 'uppercase',
                    color: '#ffffff', textShadow: TS,
                    marginBottom: '2rem',
                }}>
                    Konsistenz.
                </h2>
                <div style={{ width: '2.5rem', height: '1px', background: 'rgba(0,212,180,0.45)', margin: '0 auto 1.8rem' }} />
                <p style={{ ...BODY, textShadow: TS, maxWidth: '34ch', margin: '0 auto' }}>
                    Die stärksten Marken sind nicht die lautesten.<br />
                    Sie sind die klarsten.
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
                    fontSize: 'clamp(4rem, 10vw, 13rem)',
                    fontWeight: 900, lineHeight: 0.9,
                    letterSpacing: '-0.02em', textTransform: 'uppercase',
                    color: '#ffffff', textShadow: TS,
                }}>
                    Sichtbarkeit.
                </h2>
            </div>

            {/* ── TIEFSTER PUNKT ── */}
            <div ref={r('tiefster')} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', maxWidth: '54vw', opacity: 0, visibility: 'hidden' }}>
                <h2 style={{ ...HL, fontSize: 'clamp(2.4rem, 4.8vw, 5.8rem)', textShadow: TS, marginBottom: '2.4rem' }}>
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
        <div ref={r} style={{
            position: 'absolute', top: '50%',
            ...(right ? { right: 'var(--px)' } : { left: 'var(--px)' }),
            transform: 'translateY(-50%)', maxWidth: '34vw',
            opacity: 0, visibility: 'hidden',
            ...(right ? { textAlign: 'right' } : {}),
        }}>
            <p style={{ fontSize: 'clamp(0.85rem, 1.1vw, 1rem)', fontWeight: 400, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: '0.8rem' }}>
                {right ? `${label} · ${num}` : `${num} · ${label}`}
            </p>
            <h3 style={{ fontSize: 'clamp(2rem, 3.5vw, 4.2rem)', fontWeight: 300, lineHeight: 1.1, color: '#ffffff', letterSpacing: '-0.012em', textShadow: TS, marginBottom: '1.2rem', textTransform: 'uppercase' }}>
                {hl}
            </h3>
            <p style={{ fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400, lineHeight: 1.75, color: 'rgba(255,255,255,0.65)', textShadow: TS, maxWidth: '34ch', ...(right ? { marginLeft: 'auto' } : {}) }}>
                {body}
            </p>
        </div>
    )
}
