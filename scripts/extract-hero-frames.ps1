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
