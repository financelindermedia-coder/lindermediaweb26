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
 * taucht der Berg auf. Dort endet der Pfad (y=680) und ist davor schon
 * ausgeblendet. Ueber Wasser traegt das Bild allein.
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
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.9" />
                    <stop offset="55%" stopColor="#ff6b35" stopOpacity="0.85" />
                    <stop offset="84%" stopColor="#ff6b35" stopOpacity="0.45" />
                    {/* Wasseroberfläche: hier ist Schluss. */}
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
