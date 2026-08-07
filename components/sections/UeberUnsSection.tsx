'use client'

/**
 * „Über uns" als eigenständige Sektion (aus MenschenFaqSection herausgelöst):
 * Portrait als Hintergrund, darüber ein Verlaufs-Schleier, damit der Text links
 * ruhig lesbar bleibt und das Gesicht rechts frei steht. Headline oben,
 * Gründer-Text direkt darunter – einspaltig. Anker #ueber-uns für die Navigation.
 */
export default function UeberUnsSection() {
    return (
        <section id="ueber-uns" className="mfx mfx-about-section" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
            <div className="mfx-bg" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mfx-portrait"
                    src="/images/andi.webp"
                    alt=""
                    width={2800}
                    height={853}
                    loading="lazy"
                    decoding="async"
                />
                <span className="mfx-veil" />
            </div>

            <div className="mfx-inner mfx-inner-about">
                <div className="mfx-about-head">
                    <p className="mfx-eye">| Hinter LinderMedia</p>
                    <h2 className="mfx-headline">
                        Die Menschen<br /><span>hinter der Arbeit.</span>
                    </h2>
                </div>

                <div className="mfx-about-text">
                    <p className="mfx-name">Andreas Linder <span>· Gründer</span></p>
                    <p className="mfx-about-p">
                        Kein Konzern mit Account-Managern. Sie sprechen direkt mit der Person, die
                        Ihre Website baut, Ihre Strategie entwickelt, Ihre Kampagnen schaltet.
                    </p>
                    <p className="mfx-about-p mfx-about-strong">
                        Gute Unternehmen verdienen gute Sichtbarkeit. Nicht mehr Lärm – mehr Klarheit.
                    </p>
                </div>
            </div>
        </section>
    )
}
