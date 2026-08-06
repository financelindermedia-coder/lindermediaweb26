'use client'

import { useState } from 'react'
import { FAQ } from '@/lib/faq'

/**
 * FAQ als eigenständige Sektion (aus MenschenFaqSection herausgelöst): ruhiger
 * dunkler Hintergrund, zentriert begrenzte Breite, frosted-glass „Steps", die
 * beim Klick aufklappen. Anker #faq für die Navigation.
 *
 * Inhalte kommen aus lib/faq – dieselbe Quelle speist das FAQPage-Structured-Data
 * auf der Startseite.
 */

export default function FragenSection() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section id="faq" className="mfx mfx-faq-section" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="mfx-inner mfx-inner-faq">
                <p className="mfx-eye">| Häufige Fragen</p>
                <h2 className="mfx-headline">
                    Noch <span>Fragen?</span>
                </h2>

                <div className="mfx-steps">
                    {FAQ.map((item, i) => {
                        const on = open === i
                        return (
                            <div key={i} className={`mfx-step${on ? ' open' : ''}`}>
                                <button
                                    type="button"
                                    className="mfx-step-q"
                                    onClick={() => setOpen(on ? null : i)}
                                    aria-expanded={on}
                                >
                                    <span className="mfx-step-num">{String(i + 1).padStart(2, '0')}</span>
                                    <span className="mfx-step-label">{item.q}</span>
                                    <span className="mfx-step-plus">+</span>
                                </button>
                                <div className="mfx-step-a" style={{ maxHeight: on ? '460px' : '0' }}>
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
