# Video-Originale in die ausgelieferten Web-Fassungen umrechnen.
#
# Ersetzt scripts/to-web-video.sh: gleiche Logik, aber mit dem ffmpeg aus
# node_modules – ohne ffmpeg auf dem PATH und ohne bash.
#
# Pro Quelle entstehen drei Dateien:
#   name.mp4     Desktop – volle Aufloesung
#   name-m.mp4   Mobil   – schmalere Kante, hoeheres CRF
#   poster-*.webp Standbild (steht bis zum Laden und bei „weniger Bewegung")
#
# Welche der beiden MP4s geladen wird, entscheidet die Komponente zur Laufzeit
# anhand der Viewport-Breite (components/useVideoSource.ts).
#
# Zwei Dinge sparen hier am meisten:
#   * -an  – die Hintergrundvideos laufen stumm. Ausnahme sind die Promo-Filme
#     der Referenzen (aud = $true): die behalten ihre Tonspur, weil man sie im
#     Projektrahmen zuschalten kann. Abgespielt wird trotzdem stumm, erst der
#     Lautsprecher-Schalter macht den Ton auf (CasesSection.tsx).
#   * -crf statt der Bitrate der Originale. Die Quellen kommen mit 17–41 Mbit/s
#     aus dem Schnittprogramm; fuer flaechige Hintergrundbewegung ist das weit
#     mehr, als am Bildschirm ankommt.
#
# Die Originale liegen in public/video und sind per .gitignore vom Deployment
# ausgenommen.
#
# Aufruf aus dem Projektwurzelverzeichnis:
#   powershell -File scripts/encode-web-videos.ps1
#   powershell -File scripts/encode-web-videos.ps1 -Only vid-lm-2
param([string]$Only = '')

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$ff   = Join-Path $root 'node_modules\ffmpeg-static\ffmpeg.exe'
$dir  = Join-Path $root 'public\video'

# quelle, ziel-basisname, desktop-crf, mobil-breite, mobil-crf, fps, poster-sekunde,
# aud = Tonspur behalten (nur die Promo-Filme der Referenzen)
$JOBS = @(
    @{ src = 'Vid_LM_1.mp4'; out = 'vid-lm-1';            crf = 24; mw = 854;  mcrf = 28; fps = 30; poster = 'poster-lm-1';        at = 1 }
    @{ src = 'Vid_LM_2.mp4'; out = 'vid-lm-2';            crf = 26; mw = 1280; mcrf = 28; fps = 30; poster = 'poster-lm-2';        at = 1 }
    # Einziger Master in 1080p. Der Projektrahmen ist am breitesten Bildschirm
    # keine 1200px breit – in voller Aufloesung waere die Datei doppelt so
    # schwer, ohne dass davon etwas ankommt. Und dieses Projekt steht als
    # erstes und laedt damit bei jedem Besuch.
    @{ src = 'N_swath.mp4';  out = 'case-solarimpact';    crf = 30; dw = 1280; mw = 800;  mcrf = 32; fps = 24; poster = 'poster-solarimpact'; at = 6; aud = $true }
    # Diese Originale liegen schon in 800x450 vor – deshalb niedrigeres CRF als
    # bei den grossen Quellen, sonst franst die ohnehin knappe Aufloesung aus.
    # Wellenwind bringt zwar eine Tonspur mit, die ist aber digital still
    # (-91 dB) – die kann raus, statt sie mitzuschleppen.
    @{ src = 'ww_promo.mp4'; out = 'case-wellenwind';     crf = 26; mw = 640;  mcrf = 30; fps = 30; poster = 'poster-wellenwind';  at = 2 }
    @{ src = 'lc_promo.mp4'; out = 'case-lubrican';       crf = 26; mw = 640;  mcrf = 30; fps = 30; poster = 'poster-lubrican';   at = 2; aud = $true }
    # Mit 5:11 der laengste Film – eine CRF-Stufe hoeher, sonst wiegt die
    # Desktop-Fassung mehr als alle uebrigen Case-Videos zusammen.
    @{ src = 're.mp4';       out = 'case-rainer-engel';   crf = 28; mw = 640;  mcrf = 31; fps = 30; poster = 'poster-rainer-engel'; at = 4; aud = $true }
)

# Gemeinsam fuer beide Fassungen: yuv420p (sonst spielt Safari nicht ab),
# moov-Atom nach vorn, damit die Wiedergabe startet, bevor die Datei
# vollstaendig geladen ist.
$common = @('-c:v','libx264','-preset','slow','-profile:v','high','-pix_fmt','yuv420p','-movflags','+faststart','-y','-loglevel','error')

foreach ($job in $JOBS) {
    if ($Only -and $job.out -ne $Only) { continue }

    $src = Join-Path $dir $job.src
    if (-not (Test-Path $src)) {
        Write-Host ("uebersprungen (Original fehlt): {0}" -f $job.src)
        continue
    }

    # Ton nur, wo er gebraucht wird – und auf dem Telefon eine Stufe sparsamer.
    #
    # Die [string[]]-Casts sind noetig: PowerShell packt ein einelementiges
    # Array beim Zuweisen aus, aus @('-an') wird der String '-an'. Beim
    # Splatten zerfaellt der dann in seine Zeichen und ffmpeg bekommt '-' als
    # Ausgabedatei zu sehen.
    $aDesk = [string[]]$(if ($job.aud) { '-c:a','aac','-b:a','128k','-ac','2' } else { '-an' })
    $aMob  = [string[]]$(if ($job.aud) { '-c:a','aac','-b:a','96k','-ac','2'  } else { '-an' })

    # dw ist optional: ohne Angabe bleibt die Desktop-Fassung in Originalgroesse.
    $vDesk = [string[]]$(if ($job.dw) { '-vf', "scale=$($job.dw):-2" } else { @() })

    Write-Host ("{0} -> {1} ..." -f $job.src, $job.out)
    & $ff -i $src -r $job.fps @vDesk -crf $job.crf @aDesk @common (Join-Path $dir "$($job.out).mp4")
    & $ff -i $src -r $job.fps -vf "scale=$($job.mw):-2" -crf $job.mcrf @aMob @common (Join-Path $dir "$($job.out)-m.mp4")
    & $ff -ss $job.at -i $src -frames:v 1 -vf 'scale=1280:-2' -q:v 72 -y -loglevel error (Join-Path $dir "$($job.poster).webp")

    foreach ($f in "$($job.out).mp4", "$($job.out)-m.mp4", "$($job.poster).webp") {
        '  {0,-28} {1,8} KB' -f $f, [math]::Round((Get-Item (Join-Path $dir $f)).Length / 1KB)
    }
}
