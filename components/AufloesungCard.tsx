'use client'

import useReveal from '@/components/useReveal'

/**
 * Der Aufloesungs-Moment als eigene Box im mobilen Splitscreen-Fenster des
 * Aufstiegs – Text identisch zur "sichtbarkeit"-Szene in TextLayer.tsx (dort
 * fuer Desktop als zentrierte Vollbild-Ueberlagerung), hier als Karte im
 * unteren Fensterbereich, in der Optik von DescentStack (`.dsc-card`). Nur
 * auf schmalen Viewports sichtbar (siehe `.ms-aufloesung` in globals.css) –
 * am Desktop bleibt die TextLayer-Version die einzige Instanz dieses Texts
 * (dort per `.tl-scene--sichtbarkeit` ab derselben Breite ausgeblendet).
 */
export default function AufloesungCard() {
    const ref = useReveal<HTMLElement>({ threshold: 0.3 })
    return (
        <div className="ms-aufloesung">
            <article ref={ref} className="dsc-card reveal">
                <p className="dsc-kicker">Schlüsselmoment</p>
                <h2 className="dsc-title">
                    Was darunter trägt,<br /><strong>wird darüber sichtbar.</strong>
                </h2>
                <p className="dsc-text">
                    Strategie gibt Richtung. Design gibt ihr eine erkennbare Form.
                    Website, Fotografie, Film und digitale Kommunikation bringen diese
                    Richtung nach außen.
                </p>
                <p className="dsc-text">
                    So entsteht kein Nebeneinander einzelner Maßnahmen, sondern ein
                    Auftritt, der sich überall nach derselben Marke anfühlt.
                </p>
            </article>
        </div>
    )
}
