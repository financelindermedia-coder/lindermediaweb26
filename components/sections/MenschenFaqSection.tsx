'use client'

import { useState } from 'react'

/**
 * „Über uns" + FAQ zusammengefasst in EINER Sektion mit Fullscreen-
 * Hintergrundvideo. Links die Menschen-Story (wer & warum), rechts die
 * FAQ als frosted-glass „Steps", die sich beim Klick aufklappen. Der Anker
 * #ueber-uns liegt auf der Sektion, #faq auf dem FAQ-Block – die Navigation
 * funktioniert weiter.
 */

const FAQ = [
    {
        q: 'Woran erkenne ich, dass meine Marke ein Klarheitsproblem hat?',
        a: 'Die Symptome zeigen sich meist an anderer Stelle: Angebote werden über den Preis verglichen, Kunden verstehen die Unterschiede zum Wettbewerb nicht, Marketing erzeugt Aufmerksamkeit, aber keine Wirkung. Oft ist nicht die Leistung das Problem – sondern die Wahrnehmung.',
    },
    {
        q: 'Was kostet fehlende Klarheit?',
        a: 'Die interessantere Frage als „Was kostet Markenentwicklung?" ist: Was kostet fehlende Klarheit? Wenn Kunden Unterschiede nicht erkennen und Marketing ständig neu ansetzen muss, entstehen Kosten, die selten auf einer Rechnung stehen – aber täglich spürbar sind.',
    },
    {
        q: 'Ist meine Marke wirklich das Problem?',
        a: 'Vielleicht. Vielleicht auch nicht. Deshalb beginnen wir mit Fragen statt mit Lösungen. Manchmal liegt die Ursache in der Positionierung, manchmal in der Kommunikation, manchmal in der Sichtbarkeit. Erst wenn klar ist, wo die Herausforderung liegt, sprechen wir über Maßnahmen.',
    },
    {
        q: 'Wie läuft die Zusammenarbeit ab?',
        a: 'Sie sprechen direkt mit der Person, die Ihre Strategie entwickelt und umsetzt – keine Account-Manager, keine langen Übergaben. Wir klären zuerst das Fundament (Positionierung, Botschaft, Zielgruppe) und bauen darauf die sichtbaren Maßnahmen: Website, SEO, Content, Ads, Automatisierung.',
    },
    {
        q: 'Für wen ist LinderMedia gedacht?',
        a: 'Für Unternehmen, die in ihrer Sache wirklich gut sind – und trotzdem nicht so wahrgenommen werden, wie sie es verdienen. Ob Handwerk, Beratung oder Dienstleistung: Wenn Ihre Stärke nach außen nicht ankommt, liegt das selten am Angebot, sondern an fehlender Klarheit.',
    },
]

export default function MenschenFaqSection() {
    const [open, setOpen] = useState<number | null>(0)

    return (
        <section id="ueber-uns" className="mfx" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            {/* Fullscreen-Hintergrundvideo + Abdunkelung */}
            <div className="mfx-bg" aria-hidden="true">
                <video
                    className="mfx-video"
                    autoPlay muted loop playsInline
                    poster="/images/IB__S3.png"
                >
                    <source src="/video/ib-t2.mp4" type="video/mp4" />
                </video>
                <span className="mfx-veil" />
            </div>

            <div className="mfx-inner">
                {/* ── Menschen-Story ── */}
                <div className="mfx-about">
                    <p className="mfx-eye">| Hinter LinderMedia</p>
                    <h2 className="mfx-headline">
                        Die Menschen<br /><span>hinter der Arbeit.</span>
                    </h2>

                    <div className="mfx-showreel">
                        <button type="button" className="mfx-play" aria-label="Showreel abspielen">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                        <span className="mfx-showreel-label">Showreel · 01:24</span>
                    </div>

                    <p className="mfx-name">Andreas Linder <span>· Gründer</span></p>
                    <p className="mfx-about-p">
                        Kein Konzern mit Account-Managern. Sie sprechen direkt mit der Person, die
                        Ihre Website baut, Ihre Strategie entwickelt, Ihre Kampagnen schaltet.
                    </p>
                    <p className="mfx-about-p mfx-about-strong">
                        Gute Unternehmen verdienen gute Sichtbarkeit. Nicht mehr Lärm – mehr Klarheit.
                    </p>
                </div>

                {/* ── FAQ als frosted-glass Steps ── */}
                <div className="mfx-faq" id="faq">
                    <p className="mfx-eye">| Häufige Fragen</p>
                    <h2 className="mfx-headline mfx-headline-sm">
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
            </div>
        </section>
    )
}
