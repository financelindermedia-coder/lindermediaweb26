'use client'

import { useState } from 'react'

export default function ContactSection() {
    const [sent, setSent] = useState(false)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        // Placeholder — wire up backend/Formspree here
        setSent(true)
    }

    return (
        <section
            id="contact"
            style={{
                background: 'rgba(2, 8, 16, 0.5)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                padding: '9rem var(--px)',
                fontFamily: 'var(--font-barlow), sans-serif',
            }}
        >
            <div className="contact-grid" style={{ maxWidth: '1100px', margin: '0 auto' }}>

                {/* Left — text */}
                <div>
                    <p style={{
                        fontSize: 'clamp(0.68rem, 0.8vw, 0.78rem)', fontWeight: 400, letterSpacing: '0.2em',
                        textTransform: 'uppercase', color: 'rgba(0,212,180,0.7)',
                        marginBottom: '1rem',
                    }}>
                        | Kontakt
                    </p>
                    <h2 style={{
                        fontSize: 'clamp(2rem, 3.5vw, 4.2rem)', fontWeight: 300,
                        lineHeight: 1.05, letterSpacing: '-0.012em',
                        color: '#ffffff', marginBottom: '1.6rem',
                        textTransform: 'uppercase',
                    }}>
                        Was steckt unter<br />
                        <strong style={{ fontWeight: 900 }}>der Oberfläche?</strong>
                    </h2>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.55)',
                        marginBottom: '1.8rem',
                    }}>
                        Nicht jedes Unternehmen braucht mehr Marketing.<br />
                        Manchmal braucht es die richtige Richtung.
                    </p>
                    <p style={{
                        fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)', fontWeight: 400,
                        lineHeight: 1.75, color: 'rgba(255,255,255,0.4)',
                    }}>
                        Erzählen Sie uns, wo Ihr Unternehmen heute steht.<br />
                        In einem ersten Gespräch – ohne Agenda, ohne Verkaufsdruck –<br />
                        finden wir gemeinsam heraus, wo die Arbeit wirklich beginnen sollte.
                    </p>
                </div>

                {/* Right — form */}
                <div>
                    {sent ? (
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', fontWeight: 300, lineHeight: 1.8 }}>
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
                                    <label style={{ fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                                        {field.label}
                                    </label>
                                    <input
                                        name={field.name} type={field.type} required
                                        style={{
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.12)',
                                            borderRadius: '2px', padding: '0.85rem 1rem',
                                            color: '#ffffff', fontFamily: 'inherit',
                                            fontSize: '0.95rem', fontWeight: 300,
                                            outline: 'none',
                                        }}
                                        onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                                        onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                                    />
                                </div>
                            ))}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                                <label style={{ fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)' }}>
                                    Ihre Situation
                                </label>
                                <textarea
                                    name="message" rows={4} required
                                    style={{
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.12)',
                                        borderRadius: '2px', padding: '0.85rem 1rem',
                                        color: '#ffffff', fontFamily: 'inherit',
                                        fontSize: '0.95rem', fontWeight: 300,
                                        outline: 'none', resize: 'vertical',
                                    }}
                                    onFocus={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)' }}
                                    onBlur={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
                                />
                            </div>
                            <button
                                type="submit"
                                style={{
                                    alignSelf: 'flex-start',
                                    background: '#ffffff', color: '#020810',
                                    border: 'none', borderRadius: '2px',
                                    padding: '0.9rem 2.4rem',
                                    fontSize: '0.7rem', fontWeight: 700,
                                    letterSpacing: '0.2em', textTransform: 'uppercase',
                                    cursor: 'pointer', fontFamily: 'inherit',
                                    marginTop: '0.4rem',
                                    transition: 'opacity 0.2s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
                            >
                                Gespräch beginnen
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    )
}
