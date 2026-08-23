#!/usr/bin/env bash
# Bild-Originale nach WebP konvertieren.
#
# Ausgeliefert werden ausschliesslich die .webp-Dateien; die Originale liegen
# lokal daneben und sind per .gitignore vom Deployment ausgenommen. Dieses
# Skript stellt sie aus den Originalen wieder her, wenn sich etwas aendert.
#
# Voraussetzung: ImageMagick 7 (`magick`).
# Aufruf aus dem Projektwurzelverzeichnis:  bash scripts/to-webp.sh
set -euo pipefail
cd "$(dirname "$0")/../public"

# datei, qualitaet, optionale-max-kantenlaenge
conv() {
    local src="$1" q="$2" max="${3:-}" out
    out="${src%.*}.webp"
    if [ ! -f "$src" ]; then
        echo "  uebersprungen (Original fehlt): $src"
        return
    fi
    if [ -n "$max" ]; then
        magick "$src" -resize "${max}x${max}>" -quality "$q" -define webp:method=6 "$out"
    else
        magick "$src" -quality "$q" -define webp:method=6 "$out"
    fi
    local o n
    o=$(stat -c%s "$src"); n=$(stat -c%s "$out")
    printf "%-40s %7sK -> %6sK  (-%d%%)\n" "$src" $((o/1024)) $((n/1024)) $(( (o-n)*100/o ))
}

# IB__S4 lag als 2480x3312-PNG vor und dient nur als Sektions-Hintergrund bei
# 42% Deckkraft – die volle Aufloesung war dort nie sichtbar.
conv images/IB__S4.png 76 1900
conv images/IB__S3.png 82          # Hintergrund des Glow-Canvas
conv images/andi.jpg   80 2800     # Portrait-Panorama, Ueber uns
conv images/marevo.jpg 80
conv images/wellenwind.jpg 80
conv images/Novodex.jpg 80
conv images/RE.jpg 80
conv images/lubrican.jpg 80
conv images/lighthouse.jpg 80
# solarimpact.jpg bleibt JPG: WebP kam bei jeder Stufe groesser heraus.
# Standbilder der Fallstudie Solar Impact, aus dem Schnitt-Master
# video/N_swath.mp4 gezogen (Sekunde im Kommentar). Der Master liegt nur lokal
# und ist per .gitignore vom Deployment ausgenommen, die Standbilder ebenso –
# ausgeliefert werden allein die .webp-Fassungen.
conv images/case-solarimpact-hero-2.jpg        80   # 25s  Yacht in der Daemmerung
conv images/case-solarimpact-technologie.jpg 80   # 62s  SWATH-Ruempfe unter Wasser
conv images/case-solarimpact-fundament.jpg   80   # 105s Yacht ueber der Felskante
conv images/case-solarimpact-identitaet.jpg  80   # 35s  Heck im Gegenlicht
conv images/case-solarimpact-umsetzung.jpg   80   # 90s  Navigations-Interface an Bord
conv images/case-solarimpact-ergebnis-2.jpg    80   # 118s Sonnenuntergang, Yacht klein
# Kein Standbild, sondern eine Aufnahme der Geschaeftsausstattung von Andreas.
conv images/case-solarimpact-anwendung.jpg   82
# Aus dem Projektarchiv (Sessions/edit/SI), keine Standbilder:
# vergleich = die drei SWATH-Vergleichsgrafiken nebeneinander montiert,
# system = transparente Schnittdarstellung, ergebnis = Rendering 4000x2400.
conv images/case-solarimpact-vergleich.jpg   84
conv images/case-solarimpact-system.jpg      84 2400
# Fallstudie Schaaf: Originale aus Sessions/edit/schaaf, keine Standbilder mehr.
# Die Broschuerenfotos liegen nur 1024x1024 vor – nicht hochskalieren.
conv images/case-schaaf-hero-2.jpg           78 2000   # IMG_2645
conv images/case-schaaf-ausgangslage-2.jpg   78 2000   # DSC02225kopie
conv images/case-schaaf-ergebnis-2.jpg       78 2000   # DSC01917
conv images/case-schaaf-cockpit-2.jpg        82 2400   # DSC01043
conv images/case-schaaf-print-cover-2.jpg    84        # Ebene-2-2
conv images/case-schaaf-print-innen-2.jpg    84        # Ebene-3-3

# Standbilder LubriCan, aus video/lc_promo.mp4 (Master nur 800x450).
conv images/case-lubrican-ausgangslage.jpg 82   # 20s Kolben und Pleuel
conv images/case-lubrican-strategie.jpg    82   # 16s Zahnraeder im Detail
conv images/case-lubrican-produkt.jpg      82   # 36s Flaschen neben Motorblock
conv images/case-lubrican-digital.jpg      82   # 48s Shop-Ansicht Fahrzeugkategorie
conv images/case-lubrican-ergebnis.jpg     82   # 76s Wortmarke als Leuchtschrift
# Standbilder Wellenwind, aus video/ww_promo.mp4 (Master nur 800x450). Bewusst
# Momente ohne die eingebrannten Kampagnen-Schriftzuege.
conv images/case-wellenwind-ausgangslage-2.jpg 82 # 6s  Segelyacht im Gegenlicht
conv images/case-wellenwind-strategie-2.jpg    82 # 26s Hafenpromenade, weite Einstellung
conv images/case-wellenwind-bildwelt-2.jpg     82 # 73s Hoodies im Materialdetail
conv images/case-wellenwind-kampagne-2.jpg     82 # 68s Kampagnenraster und Shop
conv images/case-wellenwind-ergebnis-2.jpg     82 # 42s Paar im Sonnenuntergang
conv video/poster-lm-1.jpg 78
conv video/poster-lm-2.jpg 78
conv video/poster-orientierung.jpg 78

echo
echo "Fertig. Referenzen im Code zeigen auf die .webp-Dateien."
