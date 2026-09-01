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
                        Eine Person. Kurze Wege.<br /><span>Klare Verantwortung.</span>
                    </h2>
                </div>

                <div className="mfx-about-text">
                    <p className="mfx-about-p">
                        LinderMedia ist keine Agentur mit mehreren Ebenen zwischen Idee und
                        Umsetzung. Sie sprechen direkt mit Andreas Linder – von der ersten
                        strategischen Frage bis zur fertigen Website, Kampagne oder visuellen
                        Umsetzung.
                    </p>
                    <p className="mfx-about-p">
                        Das bedeutet weniger Übergaben, weniger Abstimmungsschleifen und vor
                        allem: eine Person, die den Zusammenhang des gesamten Projekts kennt.
                    </p>
                    {/* Wechsel in die erste Person: Ab hier spricht Andreas selbst –
                        der Abschnitt soll persönlich enden, nicht als Firmenprofil. */}
                    <p className="mfx-about-p">
                        Ich verbinde Markenstrategie, Gestaltung, Fotografie, Film, 3D und
                        digitale Umsetzung, weil gute Kommunikation selten an einer einzelnen
                        Disziplin scheitert. Sie scheitert häufiger daran, dass die einzelnen
                        Teile keine gemeinsame Richtung haben.
                    </p>
                    <p className="mfx-about-p mfx-about-strong">
                        Gute Unternehmen verdienen gute Sichtbarkeit. Nicht mehr Lärm – mehr Klarheit.
                    </p>
                    <p className="mfx-name">Andreas Linder <span>· Gründer · LinderMedia</span></p>
                </div>
            </div>
        </section>
    )
}
