#!/usr/bin/env bash
# Mobil-Fassung der Eisberg-Framesequenz erzeugen (public/frames -> public/frames-m).
#
# Die Sequenz ist das Erste, was ein Besucher sieht, und damit auch das Erste,
# was auf einer Mobilverbindung geladen wird: 303 Frames in 1920x1080 sind rund
# 17 MB. Auf einem Telefon ist beides ueberdimensioniert – die Aufloesung
# ohnehin, und bei 1200vh Scrollweg faellt jeder zweite Frame nicht auf.
#
# Das Mobil-Set enthaelt deshalb nur die ungeraden Frame-Nummern (1, 3, 5, ...)
# in halber Kantenlaenge. Die Dateinamen bleiben identisch, damit VideoCanvas
# nur Verzeichnis und Schrittweite tauschen muss.
#
# Voraussetzung: ImageMagick 7 (`magick`).
# Aufruf aus dem Projektwurzelverzeichnis:  bash scripts/to-mobile-frames.sh
set -euo pipefail
cd "$(dirname "$0")/../public"

WIDTH=960
QUALITY=72

rm -rf frames-m
mkdir -p frames-m

n=0
for src in frames/frame_*.webp; do
    num=${src##*frame_}; num=${num%.webp}
    # 10# erzwingt Dezimal – fuehrende Nullen waeren sonst oktal.
    if (( 10#$num % 2 == 0 )); then continue; fi
    magick "$src" -resize "${WIDTH}x>" -quality "$QUALITY" -define webp:method=6 "frames-m/frame_$num.webp"
    n=$((n+1))
done

o=$(du -sk frames   | cut -f1)
m=$(du -sk frames-m | cut -f1)
printf "%s Frames -> %s Frames    %sK -> %sK  (-%d%%)\n" \
    "$(ls frames | wc -l)" "$n" "$o" "$m" $(( (o-m)*100/o ))
