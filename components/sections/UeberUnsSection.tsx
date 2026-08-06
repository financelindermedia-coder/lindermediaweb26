'use client'

/**
 * „Über uns" als eigenständige Sektion (aus MenschenFaqSection herausgelöst):
 * Frosted-Glass-Panel, Headline oben, Gründer-Text direkt darunter – einspaltig.
 * Der Showreel-Platzhalter ist entfernt; ein Hintergrundvideo kann später über
 * `.mfx-bg` wieder ergänzt werden. Anker #ueber-uns für die Navigation.
 */
export default function UeberUnsSection() {
    return (
        <section id="ueber-uns" className="mfx mfx-about-section" style={{ fontFamily: 'var(--font-barlow), sans-serif' }}>
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
