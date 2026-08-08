#!/usr/bin/env bash
# Video-Originale in die ausgelieferten Web-Fassungen umrechnen.
#
# Pro Quelle entstehen zwei Dateien:
#   name.mp4     Desktop  – volle Aufloesung
#   name-m.mp4   Mobil    – schmalere Kante, hoeheres CRF
# Welche der beiden geladen wird, entscheidet die Komponente zur Laufzeit
# anhand der Viewport-Breite (siehe components/useVideoSource.ts).
#
# Zwei Dinge sparen hier am meisten:
#   * `-an` – saemtliche Hintergrundvideos laufen stumm. Die Tonspur des
#     Drohnenflugs allein wog 1,3 MB, die nie jemand hoert.
#   * `-crf` statt der Bitrate der Originale. Die Quellen kommen mit 3,5–5,6
#     Mbit/s aus dem Schnittprogramm; fuer flaechige Hintergrundbewegung ist
#     das weit mehr, als am Bildschirm ankommt.
#
# Die Originale liegen unter public/video/_src/ und sind per .gitignore vom
# Deployment ausgenommen.
#
# Voraussetzung: ffmpeg auf dem PATH.
# Aufruf aus dem Projektwurzelverzeichnis:  bash scripts/to-web-video.sh
set -euo pipefail
cd "$(dirname "$0")/../public/video"

SRC=_src

# quelle, ziel-basisname, desktop-crf, mobil-breite, mobil-crf, [fps-cap]
enc() {
    local src="$SRC/$1" out="$2" crf="$3" mw="$4" mcrf="$5" fps="${6:-}"
    if [ ! -f "$src" ]; then
        echo "  uebersprungen (Original fehlt): $src"
        return
    fi
    local rate=()
    [ -n "$fps" ] && rate=(-r "$fps")

    # Gemeinsam fuer beide Fassungen: keine Tonspur, yuv420p (sonst spielt
    # Safari nicht ab), moov-Atom nach vorn, damit die Wiedergabe startet,
    # bevor die Datei vollstaendig geladen ist.
    local common=(-an -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p
                  -movflags +faststart -y -loglevel error)

    ffmpeg -i "$src" "${rate[@]}" -crf "$crf" "${common[@]}" "$out.mp4"
    ffmpeg -i "$src" "${rate[@]}" -vf "scale=$mw:-2" -crf "$mcrf" "${common[@]}" "$out-m.mp4"

    local d m
    d=$(stat -c%s "$out.mp4"); m=$(stat -c%s "$out-m.mp4")
    printf "%-26s desktop %6sK   mobil %6sK\n" "$out" $((d/1024)) $((m/1024))
}

# Die beiden 1080p-Quellen laufen mit CRF 26 statt 24: bei flaechiger
# Hintergrundbewegung ist der Unterschied am Bildschirm nicht auszumachen, die
# Datei aber rund ein Fuenftel kleiner (vid-lm-2: 21,6 -> 16,8 MB). Die
# 720p-Quellen bleiben bei 24, dort geht es ohnehin nur um wenige hundert KB.
#
#   quelle                    ziel                 crf  mobil-breite  crf  fps
enc Vid_LM_1.mp4              vid-lm-1              24   854          28
enc Vid_LM_2.mp4              vid-lm-2              26  1280          28   30
enc orientierung-flight.mp4   orientierung-flight   26  1280          28
enc lighthouse_vid.mp4        lighthouse_vid        24   854          28

echo
echo "Fertig. Desktop-Dateien behalten ihren Namen, Mobil-Fassungen enden auf -m.mp4."
