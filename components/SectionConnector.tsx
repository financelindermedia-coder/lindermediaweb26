'use client'

/**
 * Übergreifender Reise-Pfad zwischen zwei Sektionen.
 *
 * Eine geschwungene Strichellinie (Reise-Route), die aus der oberen Sektion
 * herausschwingt und mit einer Pfeilspitze in die untere „hinüberführt". Über
 * alle Übergänge alternierend gespiegelt (`flip`) entsteht ein Zickzack den
 * Seitenverlauf hinab – die Seite wirkt wie eine einzige, zusammenhängende
 * Reise (aus einem Guss).
 */
export default function SectionConnector({ flip = false }: { flip?: boolean }) {
    return (
        <div className={`sconn${flip ? ' sconn-flip' : ''}`} aria-hidden="true">
            <svg className="sconn-svg" viewBox="0 0 1200 210" fill="none" preserveAspectRatio="xMidYMid meet">
                {/* geschwungene Strichellinie (Reise-Route) */}
                <path className="sconn-path" d="M 1150 14 C 1250 150 730 176 474 180" />
                {/* offene Pfeilspitze am Ende */}
                <path className="sconn-tip" d="M 506 160 L 470 180 L 506 200" />
            </svg>
        </div>
    )
}
