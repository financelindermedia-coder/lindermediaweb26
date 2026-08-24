/**
 * Der Weg auf der Aufstiegsstrecke: setzt direkt hinter dem Seitwaerts-Scroller
 * an und endet an der Wasseroberflaeche.
 *
 * ACHTUNG BEI DER RICHTUNG: In der viewBox ist y=0 der ANFANG der Strecke
 * (tief unter Wasser, gleich nach dem Prozessbereich) und y=1000 ihr ENDE, wenn
 * der Berg laengst ueber der Oberfläche steht. Der Weg gehoert also in die
 * obere Haelfte der viewBox, nicht in die untere – andersherum laeuft er quer
 * ueber den Eisberg.
 *
 * Wo die Oberfläche durchbrochen wird, ist gemessen: Bei rund 70 % der Strecke
 * taucht der Berg auf. Der Pfad laeuft zeichnerisch bis y=680, ist aber schon
 * bei y=585 vollstaendig ausgeblendet – er endet also nicht AN der Wasserlinie,
 * sondern verliert sich davor. Ueber Wasser traegt das Bild allein.
 *
 * Am Anfang derselbe Auslauf wie im Abstieg (`Pfad` in DescentStack.tsx): erst
 * unsichtbar, dann eingeblendet. Sonst steht direkt hinter dem Seitwaerts-
 * Scroller eine harte Linienkante im Bild.
 *
 * Der Maeander ist flacher als im Abstieg – auf dieser Laenge wirkt derselbe
 * Ausschlag unruhig, und die Strecke soll ruhiger werden, nicht bewegter.
 */
export default function AufstiegsPfad() {
    return (
        <svg
            className="aufpfad"
            viewBox="0 0 100 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
        >
            <defs>
                {/* `userSpaceOnUse`: Der Verlauf haengt an festen viewBox-Werten,
                    nicht an der Pfadlaenge – sonst wandert das Ausblenden mit,
                    sobald man den Pfad kuerzt. */}
                <linearGradient
                    id="aufpfad-verlauf"
                    gradientUnits="userSpaceOnUse"
                    x1="0" y1="0" x2="0" y2="680"
                >
                    {/* Anfang wie im Abstieg: Der Weg setzt nicht mit einer
                        Kante ein, sondern taucht aus dem Wasser auf. Ohne das
                        beginnt direkt hinter dem Scroller eine harte Linie. */}
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
                    <stop offset="7%" stopColor="#ff6b35" stopOpacity="0.9" />
                    <stop offset="52%" stopColor="#ff6b35" stopOpacity="0.85" />
                    <stop offset="72%" stopColor="#ff6b35" stopOpacity="0.35" />
                    {/* Ausgeblendet, BEVOR die Oberfläche kommt: Der Weg endet
                        nicht an der Wasserlinie, er verliert sich davor. Bei
                        y=585 ist nichts mehr zu sehen, der Durchbruch bei y=680
                        gehoert dann allein dem Bild. */}
                    <stop offset="86%" stopColor="#ff6b35" stopOpacity="0" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                </linearGradient>
            </defs>
            <path
                d="M50,0 Q42,120 50,240 Q58,360 50,480 Q44,580 50,680"
                fill="none"
                stroke="url(#aufpfad-verlauf)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
            />
        </svg>
    )
}
