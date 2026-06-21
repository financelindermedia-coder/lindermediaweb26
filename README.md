# Eisberg der Marke - Scrollytelling Website

Eine emotionale, interaktive Website, die die Markenarchitektur anhand der Eisberg-Metapher erklärt.

## Features

- **Scrollytelling Design**: Immersive scroll-basierte Erzählweise mit GSAP ScrollTrigger
- **"Blue Ice" Ästhetik**: Modernes, helles Design mit blau-türkisen Unterwassertönen
- **Glassmorphism Effekte**: Elegante transparente Elemente mit Blur-Effekten
- **Responsive Design**: Optimiert für alle Bildschirmgrößen
- **Horizontal Scrolling**: Interaktive Strategie-Elemente mit horizontalem Scroll
- **Animierte Elemente**: Floating Elements, Blasen-Animationen und Übergänge
- **TypeScript Support**: Vollständig typsicher Code
- **SEO optimiert**: Semantisches HTML und Meta-Tags

## Projekt-Struktur

```
├── app/
│   ├── page.tsx          # Hauptseite
│   ├── layout.tsx        # Root Layout
│   └── globals.css       # Globale Styles
├── components/
│   ├── sections/         # Section Components
│   │   ├── IntroSection.tsx
│   │   ├── TransitionSection.tsx
│   │   ├── FoundationSection.tsx
│   │   ├── StructureSection.tsx
│   │   ├── CraftSection.tsx
│   │   ├── EcosystemSection.tsx
│   │   ├── RiseSection.tsx
│   │   └── ContactSection.tsx
│   └── Footer.tsx        # Footer Component
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

## Abschnitte

1. **Einleitung (Intro)**: Die sichtbare Essenz - Eisberg-Spitze im Nebel
2. **Übergang (Transition)**: Eintauchen in die Tiefe - Übergang unter Wasser
3. **Fundament (Foundation)**: Die Wurzeln der Identität - Werte und Vision
4. **Struktur (Structure)**: Strategie und Ausrichtung - Horizontales Scrolling
5. **Handwerk (Craft)**: Form und Ausdruck - Design-Elemente
6. **Ökosystem (Ecosystem)**: Leben und Entwicklung - Dynamische Elemente
7. **Aufstieg (Rise)**: Wirkung und Sichtbarkeit - Rückkehr zur Oberfläche
8. **Kontakt (Contact)**: Der nächste Schritt - Kontaktformular

## Technologie-Stack

- **Framework**: Next.js 14 mit React 18
- **Styling**: Tailwind CSS 3
- **Animationen**: GSAP (GreenSock Animation Platform)
- **Language**: TypeScript
- **Build**: Next.js Compiler

## Installation

```bash
# Dependencies installieren
npm install

# Oder mit yarn
yarn install
```

## Entwicklung

```bash
# Dev-Server starten (http://localhost:3000)
npm run dev

# Oder mit yarn
yarn dev
```

## Build

```bash
# Production Build
npm run build

# Production starten
npm start
```

## Konfiguration

### Tailwind Colors
Erweiterte Farben für "Blue Ice" Ästhetik:
- `blue-ice-50` bis `blue-ice-900`
- `turquoise-50` bis `turquoise-900`

### Animationen
Vordefinierte Animationen:
- `animate-float`: Sanfte vertikale Bewegung
- `animate-bubble`: Aufsteigende Blasen

## Browser-Unterstützung

- Chrome/Edge: Letzte 2 Versionen
- Firefox: Letzte 2 Versionen
- Safari: Letzte 2 Versionen
- Mobile: iOS Safari 12+, Chrome Android

## Bild- und Video-Assets

Platzhalter für folgende Assets sind vorbereitet:
- Eisberg-Visualisierungen
- Animations-Sequenzen von Higgsfield
- Hintergrund-Videos/Sequenzen

_Hinweis: Diese müssen mit den tatsächlichen Assets von Higgsfield ersetzt werden._

## Performance-Optimierungen

- Image Optimization durch Next.js
- Code Splitting durch Dynamic Imports
- Lazy Loading für Off-Screen Assets
- GSAP ScrollTrigger für optimierte Scroll-Animationen

## Lizenz

© 2024 LinderMedia. Alle Rechte vorbehalten.

## Kontakt

hello@lindermedia.de
