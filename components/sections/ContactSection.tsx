'use client'

import { useState } from 'react'
import { BUSINESS } from '@/lib/site'

export default function ContactSection() {
    const [sent, setSent] = useState(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Placeholder — wire up backend/Formspree here
        setSent(true)
    }

    const fieldStyle: React.CSSProperties = {
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.16)',
        borderRadius: '4px', padding: '0.9rem 1.05rem',
        color: '#ffffff', fontFamily: 'inherit',
        fontSize: '0.95rem', fontWeight: 300,
        outline: 'none',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
    }

    return (
        <section
            id="contact"
            style={{
                background: 'transparent',
                padding: '10rem var(--px) 7rem',
                fontFamily: 'var(--font-barlow), sans-serif',
            }}
        >
            <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Left — text */}
                <div>
                    <p style={{
                        fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(255,107,53,0.95)',
                        marginBottom: '1rem',
                    }}>
                        | Kontakt
                    </p>
                    <h2 style={{
                        fontSize: 'var(--h2)', fontWeight: 300,
                        lineHeight: 1.05, letterSpacing: '-0.012em',
                        color: '#ffffff', marginBottom: '1.6rem',
                        textTransform: 'uppercase',
                        textShadow: '0 2px 24px rgba(0,0,0,0.5)',
                    }}>
                        Was steckt unter<br />
                        <strong style={{ fontWeight: 900 }}>der Oberfläche?</strong>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.82)',
                        marginBottom: '1.8rem', textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                    }}>
                        Nicht jedes Unternehmen braucht mehr Marketing.<br />
                        Manchmal braucht es die richtige Richtung.
                    </p>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.6)',
                        textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                    }}>
                        Erzählen Sie uns, wo Ihr Unternehmen heute steht.<br />
                        In einem ersten Gespräch – ohne Agenda, ohne Verkaufsdruck –<br />
                        finden wir gemeinsam heraus, wo die Arbeit wirklich beginnen sollte.
                    </p>

                    {/* Direkter Weg neben dem Formular – manche schreiben lieber selbst. */}
                    <p style={{
                        marginTop: '2rem',
                        fontSize: '0.7rem', fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)',
                        marginBottom: '0.5rem',
                    }}>
                        Oder direkt
                    </p>
                    <a
                        href={`mailto:${BUSINESS.email}`}
                        style={{
                            fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                            lineHeight: 1.75, color: '#ffffff', textDecoration: 'none',
                            borderBottom: '1px solid rgba(255,107,53,0.6)',
                            textShadow: '0 1px 12px rgba(0,0,0,0.4)',
                        }}
                    >
                        {BUSINESS.email}
                    </a>
                </div>

                {/* Right — form */}
                <div>
                    {sent ? (
                        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.8 }}>
                            Vielen Dank. Wir melden uns in Kürze.
                        </p>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                            {[
                                { name: 'name',    label: 'Name',           type: 'text' },
                                { name: 'company', label: 'Unternehmen',    type: 'text' },
                                { name: 'email',   label: 'E-Mail',         type: 'email' },
                            ].map(field => (
                                <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                    <label style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        name={field.name} type={field.type} required
                                        style={fieldStyle}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.7)' }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
                                    />
                                </div>
                            ))}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.65rem', fontWeight: 400, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
                                    Ihre Situation
                                </label>
                                <textarea
                                    name="message" rows={4} required
                                    style={{ ...fieldStyle, resize: 'vertical' }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,107,53,0.7)' }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.16)' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    alignSelf: 'flex-start',
                                    background: '#ff6b35', color: '#0b1820',
                                    border: 'none', borderRadius: '999px',
                                    padding: '0.95rem 2.4rem',
                                    fontSize: '0.7rem', fontWeight: 700,
                                    letterSpacing: '0.2em', textTransform: 'uppercase',
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    marginTop: '0.4rem',
                                    boxShadow: '0 0 30px rgba(255,107,53,0.4)',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                            >
                                Jetzt Gespräch anfragen
                            </button>
                            <p style={{
                                marginTop: '0.8rem',
                                fontSize: '0.72rem', fontWeight: 400,
                                letterSpacing: '0.12em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.4)',
                            }}>
                                Kostenfrei und unverbindlich
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
