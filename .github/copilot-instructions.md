# Eisberg der Marke - Project Setup Instructions

## Project Overview
A modern scrollytelling website implementing the "Eisberg der Marke" (Brand Architecture Iceberg) metaphor using Next.js, TypeScript, Tailwind CSS, and GSAP ScrollTrigger.

## Completed Setup Steps

### 1. Project Structure ✓
- Next.js 14 with React 18
- TypeScript support with full type safety
- Tailwind CSS 3 with custom "Blue Ice" color palette
- GSAP with ScrollTrigger for scroll-based animations

### 2. Configuration Files ✓
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Design system and custom colors
- `postcss.config.js` - PostCSS with Tailwind
- `next.config.js` - Next.js configuration
- `.eslintrc.json` - ESLint rules

### 3. Global Styling ✓
- `app/globals.css` - Global styles, glassmorphism base classes
- Custom animations (float, bubble)
- Enhanced color palette (blue-ice, turquoise)

### 4. Layout & Pages ✓
- `app/layout.tsx` - Root layout with metadata
- `app/page.tsx` - Main page with ScrollTrigger setup

### 5. Components Created ✓
Eight section components with scroll animations:
- `IntroSection.tsx` - Surface level (Blue Ice aesthetic)
- `TransitionSection.tsx` - Entering the underwater world
- `FoundationSection.tsx` - Core values and vision
- `StructureSection.tsx` - Horizontal scrolling strategies
- `CraftSection.tsx` - Design elements and craft
- `EcosystemSection.tsx` - Living, evolving brand
- `RiseSection.tsx` - Ascent to surface with clarity
- `ContactSection.tsx` - Contact form and call-to-action
- `Footer.tsx` - Footer with navigation and info

### 6. Documentation ✓
- `README.md` - Complete project documentation
- Project structure documented
- Technology stack explained
- Setup and build instructions provided

## Next Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Visit http://localhost:3000

3. **Add Visual Assets**
   - Replace iceberg SVG placeholders with Higgsfield assets
   - Add background videos/images for each section
   - Integrate animation sequences

4. **Customize Content**
   - Update company name and email in components
   - Modify wording if needed (German text is pre-filled)
   - Adjust colors via Tailwind config if needed

5. **Setup Environment**
   Create `.env.local` for any API endpoints:
   ```
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
   ```

## Key Technical Features

- **ScrollTrigger Integration**: All scroll animations use GSAP ScrollTrigger
- **Glassmorphism**: `.glass` and `.glass-dark` classes for frosted glass effects
- **Responsive Grid**: Mobile-first responsive design
- **TypeScript**: Full type safety throughout
- **Lazy Loading**: Components only animate when triggered by scroll
- **Performance**: Optimized animations and smooth 60fps scroll

## Customization Points

1. **Colors**: Edit `tailwind.config.js` colors section
2. **Animations**: Modify duration/easing in component useEffect hooks
3. **Content**: Edit text in each section component
4. **Typography**: Modify font sizes and weights in components
5. **Spacing**: Adjust padding/margins via Tailwind classes

## Build & Deployment

```bash
# Build for production
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## Notes for Implementation

- All components use 'use client' directive for client-side scroll effects
- GSAP ScrollTrigger is properly registered in each component
- Animations are hardware-accelerated with CSS transforms
- Form submission is handled with state management
- Footer year updates automatically

---

**Project Status**: Ready for development and visual asset integration
**Last Updated**: 2024-12-19
