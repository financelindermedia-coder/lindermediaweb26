# Hero-Eisberg: Framesequenz aus public/video/ice_crash.mp4 erzeugen (1280 px breit,
# jeder Frame, 193 Stueck bei 8,04 s / 24 fps). TOTAL_FRAMES in components/HeroIceberg.tsx
# und die Frame-Marken der Ebenen (`ab`) dort muessen zum Clip passen.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$ff   = Join-Path $root 'node_modules\ffmpeg-static\ffmpeg.exe'
$out  = Join-Path $root 'public\frames-hero'
if (Test-Path $out) { Remove-Item $out -Recurse -Force }
New-Item -ItemType Directory -Path $out | Out-Null
& $ff -i (Join-Path $root 'public\video\ice_crash.mp4') -fps_mode passthrough -vf 'scale=1280:-2:flags=lanczos' -c:v libwebp -quality 74 -compression_level 5 -an -y -loglevel error (Join-Path $out 'f_%03d.webp')

# Mobil-Variante: 960 px breit, jeder zweite Frame (97 Stueck, Quellframe 0, 2, 4 …).
# HeroIceberg.tsx rechnet den Quellframe auf den Index der Variante um (step = 2).
$outM = Join-Path $root 'public\frames-hero-m'
if (Test-Path $outM) { Remove-Item $outM -Recurse -Force }
New-Item -ItemType Directory -Path $outM | Out-Null
& $ff -i (Join-Path $root 'public\video\ice_crash.mp4') -vf "select='not(mod(n,2))',scale=960:-2:flags=lanczos" -fps_mode passthrough -c:v libwebp -quality 70 -compression_level 6 -an -y -loglevel error (Join-Path $outM 'f_%03d.webp')
