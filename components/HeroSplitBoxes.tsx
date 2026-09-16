'use client'

import useReveal from '@/components/useReveal'

/**
 * Held und Ausgangspunkt als erste zwei Boxen der mobilen Splitscreen-Kette
 * (siehe DescentStack.tsx, wo sie vor den STATIONS eingehaengt werden) –
 * derselbe Text wie die "hero"/"erkenntnis"-Szenen in TextLayer.tsx, dort
 * als fixierte Glas-Karten ueber dem Vollbild. Mobil gibt es kein Vollbild
 * mehr, das Fenster ist nur noch 42vh hoch – die Szenen wandern deshalb als
 * echte Boxen in den unteren Bereich, in derselben dunklen Optik wie die
 * Kette darunter (`.dsc-card`). TextLayer blendet seine Versionen ab 820px
 * aus (`.tl-scene--hero` etc.), damit der Text nicht doppelt steht.
 */
export default function HeroSplitBoxes() {
    const heroRef = useReveal<HTMLElement>({ threshold: 0.3 })
    const erkenntnisRef = useReveal<HTMLElement>({ threshold: 0.3 })
    return (
        <div className="ms-intro-boxes">
            <article ref={heroRef} className="dsc-card reveal ms-hero-card">
                <p className="dsc-kicker">Markenstrategie · Gestaltung · Digitale Umsetzung</p>
                <h1 className="dsc-title">
                    Starke Marken entstehen<br /><strong>nicht an der Oberfläche.</strong>
                </h1>
                <p className="dsc-text">
                    LinderMedia entwickelt Markenauftritte für Unternehmen, deren Leistung
                    nach außen noch nicht klar genug ankommt — von der Positionierung über
                    das Design bis zur digitalen Umsetzung.
                </p>
                <p className="ms-hero-services">
                    Positionierung · Corporate Design · Website · Content · Sichtbarkeit
                </p>
                <div className="ms-hero-ctas">
                    <a className="hero-cta hero-cta--primary" href="#contact">Projekt besprechen</a>
                    <a className="hero-cta ms-hero-cta" href="#projekte">
                        Projekte ansehen <span aria-hidden="true">→</span>
                    </a>
                </div>
                <p className="ms-hero-trust">Strategie, Gestaltung und digitale Umsetzung aus einer Hand.</p>
            </article>

            <article ref={erkenntnisRef} className="dsc-card reveal">
                <p className="dsc-kicker">Der Ausgangspunkt</p>
                <h2 className="dsc-title">
                    Gute Unternehmen brauchen<br /><strong>nicht immer mehr Marketing.</strong>
                </h2>
                <p className="dsc-text">
                    Oft liegt das Problem früher. Wenn Kunden den Unterschied nicht erkennen,
                    Leistungen über den Preis verglichen werden oder Website, Social Media und
                    Werbung jeweils etwas anderes erzählen, fehlt nicht unbedingt Sichtbarkeit.
                </p>
                <p className="dsc-text">
                    Es fehlt eine klare Richtung. Genau dort beginnt unsere Arbeit.
                </p>
                <p className="dsc-schluss">Erst verstehen. Dann gestalten. Dann sichtbar machen.</p>
            </article>
        </div>
    )
}
