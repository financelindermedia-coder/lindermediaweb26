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
conv images/case-solarimpact-desk.jpg 82
conv video/poster-lm-1.jpg 78
conv video/poster-lm-2.jpg 78

echo
echo "Fertig. Referenzen im Code zeigen auf die .webp-Dateien."
