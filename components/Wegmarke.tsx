/**
 * Ein kurzes Stueck Weg, senkrecht, als Anschluss an eine Aussage.
 *
 * Dritte Erscheinungsform desselben Motivs: senkrecht durch den Abstieg
 * (`Pfad` in DescentStack.tsx), waagerecht zwischen den Prozess-Panels
 * (`Wegstueck` in MethodeSection.tsx) und hier als kurzer Anschluss ueber
 * einer Szene. Immer dieselbe Farbe, dieselbe Staerke, derselbe Schwung –
 * das haelt die Strecke visuell zusammen.
 *
 * `richtung` bestimmt, wohin die Kurve ausholt, damit sie sich an die
 * Nachbarschaft anlegen kaesst statt immer gleich auszuschlagen.
 */
export default function Wegmarke({
    richtung = 'links',
    className,
}: {
    richtung?: 'links' | 'rechts'
    className?: string
}) {
    const d =
        richtung === 'links'
            ? 'M20,0 Q4,30 20,60 Q36,90 20,120'
            : 'M20,0 Q36,30 20,60 Q4,90 20,120'

    return (
        <svg
            className={className ? `wegmarke ${className}` : 'wegmarke'}
            viewBox="0 0 40 120"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
        >
            <defs>
                {/* Oben aus dem Nichts kommend, unten voll – der Weg endet an
                    der Aussage, statt an ihr vorbeizulaufen. */}
                <linearGradient id="wegmarke-verlauf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
                    <stop offset="55%" stopColor="#ff6b35" stopOpacity="0.75" />
                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="1" />
                </linearGradient>
            </defs>
            <path
                d={d}
                fill="none"
                stroke="url(#wegmarke-verlauf)"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
                strokeLinecap="round"
            />
        </svg>
    )
}
