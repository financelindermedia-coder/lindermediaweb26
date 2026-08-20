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
            {/* Das Portrait liegt gestalterisch im Hintergrund, ist aber kein
                Dekor: es zeigt die Person, um die es in diesem Abschnitt geht.
                Deshalb ein echter Alternativtext – nur der Verlaufs-Schleier
                darüber bleibt vom Vorlesen ausgenommen. */}
            <div className="mfx-bg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    className="mfx-portrait"
                    src="/images/andi.webp"
                    alt="Andreas Linder, Gründer von LinderMedia — Portrait"
                    width={2800}
                    height={853}
                    loading="lazy"
                    decoding="async"
                />
                <span className="mfx-veil" aria-hidden="true" />
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
