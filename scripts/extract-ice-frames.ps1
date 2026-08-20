# Eisberg-Scrollytelling: Framesequenz aus public/video/ice.mp4 erzeugen.
#
# Ersetzt scripts/extract-frames.mjs (zeigte noch auf einen alten Pfad) und
# scripts/to-mobile-frames.sh (brauchte ImageMagick). Beides laeuft jetzt mit
# dem ffmpeg aus node_modules – ohne weitere Werkzeuge auf dem Rechner.
#
# Erzeugt:
#   public/frames    volle Kantenlaenge (1920x1080), jeder Frame
#   public/frames-m  halbe Kantenlaenge (960x540), nur die ungeraden Frames
#
# Die Dateinamen sind in beiden Verzeichnissen identisch – VideoCanvas tauscht
# nur Verzeichnis und Schrittweite (siehe NARROW_QUERY dort).
#
# Aufruf aus dem Projektwurzelverzeichnis:
#   powershell -File scripts/extract-ice-frames.ps1
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$ff   = Join-Path $root 'node_modules\ffmpeg-static\ffmpeg.exe'
$src  = Join-Path $root 'public\video\ice.mp4'

$full   = Join-Path $root 'public\frames'
$mobile = Join-Path $root 'public\frames-m'
$tmp    = Join-Path $env:TEMP 'lm-frames-mobile'

foreach ($d in $full, $mobile, $tmp) {
    if (Test-Path $d) { Remove-Item $d -Recurse -Force }
    New-Item -ItemType Directory -Path $d | Out-Null
}

# -vsync 0 / -fps_mode passthrough: jeden Quellframe genau einmal ausgeben,
# statt auf eine Wunsch-Bildrate zu resampeln (das dupliziert sonst Frames).
Write-Host 'Vollbild-Sequenz (1920x1080) ...'
& $ff -i $src -fps_mode passthrough -c:v libwebp -quality 78 -compression_level 4 -an -y -loglevel error (Join-Path $full 'frame_%04d.webp')

Write-Host 'Mobil-Sequenz (960x540) ...'
& $ff -i $src -fps_mode passthrough -vf 'scale=960:-2:flags=lanczos' -c:v libwebp -quality 72 -compression_level 6 -an -y -loglevel error (Join-Path $tmp 'frame_%04d.webp')

# Nur die ungeraden Frames uebernehmen – bei 1200vh Scrollweg faellt jeder
# zweite Frame am Telefon nicht auf, halbiert aber die erste Ladung der Seite.
$kept = 0
foreach ($f in Get-ChildItem $tmp -Filter 'frame_*.webp' | Sort-Object Name) {
    $num = [int]($f.BaseName -replace '\D', '')
    if ($num % 2 -eq 1) { Copy-Item $f.FullName (Join-Path $mobile $f.Name); $kept++ }
}
Remove-Item $tmp -Recurse -Force

$fc = Get-ChildItem $full   -File
$mc = Get-ChildItem $mobile -File
'{0,-10} {1,4} Frames  {2,6} MB' -f 'frames',   $fc.Count, [math]::Round(($fc | Measure-Object Length -Sum).Sum / 1MB, 1)
'{0,-10} {1,4} Frames  {2,6} MB' -f 'frames-m', $kept,     [math]::Round(($mc | Measure-Object Length -Sum).Sum / 1MB, 1)
''
"VideoCanvas.tsx:  const TOTAL_FRAMES = $($fc.Count)"
