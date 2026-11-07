# Deployment auf Hetzner (Docker + nginx)

Hauptdomain: `lindermedia.de` (ohne www). Server-IP: `178.104.215.216`.

## 0. Voraussetzungen
- DNS: `@` und `www` zeigen per A-Record auf `178.104.215.216` (im Panel, auf das die Nameserver zeigen).
- E-Mail: Postfach `hello@lindermedia.de` existiert, MX/SPF/DKIM passen zum Mail-Anbieter.

## 1. Server vorbereiten (einmalig)
```bash
apt update && apt install -y docker.io docker-compose-plugin nginx certbot git
mkdir -p /var/www/certbot
git clone https://github.com/financelindermedia-coder/lindermediaweb26.git /opt/lindermedia
cd /opt/lindermedia
```

## 2. Konfiguration `.env` (nur auf dem Server, nie ins Repo)
```
NEXT_PUBLIC_SITE_URL=https://lindermedia.de
NEXT_PUBLIC_GA_ID=G-G9CSNRWEBG
SMTP_HOST=<SMTP-Server des Postfachs>
SMTP_PORT=587
SMTP_USER=hello@lindermedia.de
SMTP_PASS=<Passwort>
CONTACT_TO=hello@lindermedia.de
CONTACT_FROM=LinderMedia Website <hello@lindermedia.de>
```
`NEXT_PUBLIC_*` wird beim Build eingesetzt: nach jeder Aenderung neu bauen.

## 3. Starten
```bash
cd /opt/lindermedia
docker compose up -d --build
curl -I http://127.0.0.1:3000
```

## 4. nginx und Zertifikat
1. In `nginx.conf` zuerst nur den ersten Server-Block (Port 80) nach `/etc/nginx/conf.d/lindermedia.conf` kopieren, `nginx -t && systemctl reload nginx`.
2. `certbot certonly --webroot -w /var/www/certbot -d lindermedia.de -d www.lindermedia.de`
3. Die kompletten Bloecke aus `nginx.conf` einsetzen, `nginx -t && systemctl reload nginx`.
4. Pruefen: `curl -I http://lindermedia.de` (301 auf https), `curl -I https://www.lindermedia.de` (301 auf Hauptdomain).

## 5. Livegang (Indexierung freigeben)
1. `lib/prelaunch.json` auf `{ "preLaunch": false }` setzen, committen, pushen.
2. Auf dem Server: `git pull && docker compose up -d --build`.
3. Pruefen: `https://lindermedia.de/robots.txt` (Sitemap-Verweis, kein `Disallow: /`) und kein `X-Robots-Tag: noindex` im Header.
4. Search Console: Domain verifizieren, `https://lindermedia.de/sitemap.xml` einreichen.

## 6. Tests nach dem Start
- Kontaktformular von extern absenden, Eingang im Postfach pruefen.
- Cookie-Banner: Statistik zustimmen, in GA4 unter Echtzeit erscheint der Besuch; ohne Zustimmung keine Anfrage an googletagmanager.com.
- Events `generate_lead`, `click_email`, `click_phone` in GA4 pruefen.

## 7. Updates und Backup
- Update: `cd /opt/lindermedia && git pull && docker compose up -d --build`
- Backup: Hetzner-Snapshot des Servers vor jedem groesseren Update; `.env` zusaetzlich sicher ablegen.
- Zertifikat erneuert Certbot automatisch (`certbot renew --dry-run` zum Testen).

## Hinweis Videos
Alle im Code verwendeten Videos liegen im Git (geprueft). Nicht im Git sind nur Quell-Originale (z. B. `N_swath.mp4`), die nur in Kommentaren/Skripten vorkommen und nicht ausgeliefert werden.
