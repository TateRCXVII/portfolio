# Portfolio Website Design Spec — Tate Reynolds

**Date:** 2026-03-30
**Stack:** Next.js 15 (App Router) + Tailwind CSS 4 + Framer Motion + React Three Fiber
**Persona:** Tate Reynolds, Software Engineer
**Content:** Placeholder/customizable

---

## 1. Architecture

### Routes

| Route | Page | Theme |
|---|---|---|
| `/` | Dashboard (landing) | Dark |
| `/projects` | Project gallery (grid/list) | Light |
| `/projects/[slug]` | Expanded project detail | Light |
| `/case-study` | 3D Book library | Light |
| `/case-study/[slug]` | PDF-style case study reader | Light |
| `/profile` | My Profile / About | Light |

### Shared Layout

- **Top nav:** "TATE REYNOLDS" logo left, pill-style nav center (Dashboard, Project, Case Study), minimize icon + logo right
- **Nav pill animation:** Active pill has filled background with spring transition on route change; hover scales 1.05 with background glow
- **Page transitions:** Framer Motion `AnimatePresence` — pages fade/slide in with staggered children (cards animate in sequence, 50ms delay each)
- **Scroll animations:** Elements fade up on viewport entry via intersection observer + Framer `whileInView`

### Key Libraries

| Purpose | Library |
|---|---|
| Framework | Next.js 15 (App Router, SSG) |
| Styling | Tailwind CSS 4 |
| Animations | Framer Motion |
| 3D Books | CSS 3D transforms |
| Charts (radar, gauge) | Custom SVG + D3.js |
| World map | Custom SVG dot matrix |
| Terminal | Custom React component |
| Icons | Lucide React |
| Fonts | Google Fonts (monospace + sans-serif) |

### Data Layer

All project/case-study data lives in TypeScript files under `src/data/`:
- `projects.ts` — project metadata, descriptions, categories, status
- `case-studies.ts` — case study content, table of contents, sections
- `profile.ts` — bio, skills, tools, experience, testimonials
- `terminal-commands.ts` — command registry for terminal

This makes content easily editable without touching components.

---

## 2. Dashboard (Landing Page) — Dark Theme

### Layout
Bento grid with 5 cards. CSS Grid with explicit areas.

### Cards

**2.1 Hero Card — "Hello Stranger" (top-left, large)**
- Matrix/ASCII rain animation background (canvas or CSS)
- Large monospace "Hello Stranger" text
- Subtext: `let stranger = user.current(); > The terminal is open. Type nothing. Just explore._`
- **Hover:** Matrix rain speeds up, text gets glow pulse, card lifts with `translateZ(20px)`, shadow deepens
- **Click:** Card scales to fill screen (shared layout animation) → terminal overlay opens
- **Idle:** Slow matrix rain

**2.2 Design Time Spent Card (top-center)**
- Large counter: "14,238 Hours" (odometer-style number)
- Animated gauge arc below (pink → green gradient) with dot indicator
- Timeline: "2020 BOSTON ... SAN FRANCISCO 2025" with dots on arc
- **Hover:** Counter does rapid count-up animation, gauge needle animates with spring physics
- **Click:** Gauge does full sweep and settles
- **Idle:** Subtle pulse glow on gauge gradient

**2.3 Skill Matrix Card (top-right)**
- Header: "DESIGN SKILL MATRIX"
- Left column: Skills list (Platform Design, Website Design, UI UX Design, etc.) with score badges
- Right column: Tools list (Figma, Prototype, Framer, JavaScript, HTML, CSS, etc.)
- Bottom: Colored skill bar (stacked colored segments)
- Comment text: `// skill scores are self-assessed (total = 100)` and `// always iterating, always improving`
- **Hover on skill:** Score badge fills with color, corresponding bottom bar segment highlights
- **Hover on tool:** Subtle glow highlight
- **Card hover:** All scores do staggered count-up from 0
- **Click skill:** Tooltip popup with details

**2.4 3D Room / Work Showcase Card (bottom-left, large)**
- CSS 3D perspective room (nested frames creating depth)
- Floating project images/screenshots at various depths
- "Who are you?" chat bubble in center
- **Hover:** Room perspective shifts following mouse (parallax via `onMouseMove`), project images bob more actively
- **Click "Who are you?":** Chat typing animation
- **Hover project images:** Image scales with glow border

**2.5 Experience Map Card (bottom-right)**
- Header: "MY EXPERIENCE"
- Dot-matrix world map (custom SVG — dots arranged as world continents)
- Location pins with coordinate labels (42.3601° N, 71.0589° W etc.)
- Connected path line between cities (animated)
- **Hover:** Path line draws with SVG stroke-dashoffset animation, dots pulse at locations
- **Hover pin:** Coordinate label fades in with scale spring, connecting line glows
- **Click pin:** Zooms into region

---

## 3. Project Gallery (`/projects`)

### Header
- "Project" title (large)
- Filter pills: All (14), Dashboard (5), App (1), Website (4), Visual (2), 4 Fun (2)
- View toggle: grid icon / list icon (top-right)

### Filter Pills
- **Hover:** Background fill slides in from left (clip-path), count badge bounces
- **Click:** Active pill springs in, grid re-layouts with Framer `layout` animation (cards shuffle/resize smoothly)

### View Toggle
- **Click:** Smooth morph — cards compress to rows or expand to grid via `layoutId` shared animations

### Grid View
Bento-style layout — one large featured card (2-col span) + medium cards in responsive grid.

Each card:
- Dark background with category label top-left, company badge top-right
- Screenshot/preview image (center)
- Project name bottom-left, "Discover" button bottom-right
- **Hover:** Card lifts (`translateY(-8px)`), shadow expands, screenshot scales 1.03 (overflow hidden), "Discover" slides up from below card edge, category label slides in from left
- **Click:** Shared layout animation — screenshot morphs into project detail page

### List View
Table layout with columns: PROJECT | PREVIEW | CATEGORY | STATUS | UPDATED TIME

Each row:
- Thumbnail preview, category with icon, status with colored dot (green=Shipped, pink=Concept, yellow=Live Demo)
- **Hover:** Row background highlights, thumbnail scales slightly, row shifts right 4px
- **Click:** Same shared layout transition to project detail

---

## 4. Expanded Project (`/projects/[slug]`)

### Top Section (3-column grid)

**Left column — Project Info:**
- Back arrow + project name (large heading)
- Description paragraph (bold key phrases)
- Overview table: TYPE, ROLE, TOOL, CONTRIBUTION (icon + label → value)

**Center column — Project Snapshot:**
- Tab switcher: GOAL | CHALLENGE | OUTCOME
- Active tab indicator slides with spring animation, content crossfades
- Description text for active tab
- **Tab hover:** Text brightens

**Right column — Design Focus:**
- Header: "DESIGN FOCUS" with Current (yellow dot) / Target (green dot) legend
- Scale rows: Clarity Level Low→High, Technical-Only→Accessible, Static→Dynamic, Fragmented→Connected, Black Box→Transparent
- Each scale has a positioned current dot and target dot
- **Hover scale row:** Dots pulse, labels brighten
- **Page load:** Dots animate from center to positions with staggered spring
- **Idle:** Subtle breathing on dots

### Bottom Section — Analogous Experiences
Side-by-side cards:
- Screenshot (dark frame with traffic light dots)
- Title, Pros list, Cons list
- **Hover:** Card lifts, screenshot zooms, Pros gets green left border fade-in, Cons gets red
- **Click screenshot:** Lightbox expand

### Sticky Bottom Bar
Go Back link, project name, nav links (Dashboard, Project, Case Study, My Profile), list/scroll icons, "Live" green indicator
- **Nav hover:** Icon bounces, underline draws in from center
- **"Live" indicator:** Continuous green pulse

---

## 5. Case Study Library (`/case-study`)

### 3D Book Shelf
4-5 books standing upright using CSS 3D transforms. Each book is a `div` with 6 faces (front, back, spine, top, bottom, pages).

Each book:
- Distinct color scheme: red/pink, black/white, blue, yellow/pink
- Vertical title text on spine
- Cover art/illustrations on front face
- Page-edge texture on right side

**Idle:** Books sway 1-2deg on Y axis continuously (breathing animation)

**Individual book hover:**
- Rotates from spine view (~30deg Y) to near-flat cover view (~5deg Y) with spring physics
- Scales to 1.15
- Adjacent books slide apart (translateX) with easing
- Shadow deepens and spreads
- Shine sweep on cover (CSS gradient overlay animating across)

**Book click:**
- Cover rotates open (rotateY 0 → -180deg)
- Page behind revealed, morphs into reader view (shared layout transition)

**Book hover-off:** Rotates back to spine, neighbors return, all spring-animated

---

## 6. Case Study Reader (`/case-study/[slug]`)

### Layout
Split-pane, full viewport height.

**Left pane:**
- Title in large decorative typography (colored highlight on key phrases)
- Decorative illustration at bottom
- **Page load:** Slides in from left

**Right pane:**
- Cover illustration at top
- Table of contents with numbered sections:
  - 01 CONTEXT → 01.1 Background, 01.2 Metric
  - 02 PROCESS → 02.1 Define the Problem, 02.2 Design Audit, 02.3 Design Process
  - 03 RESULT → 03.1 User Flow Improvement, 03.2 Web Experience, 03.3 Impact, 03.4 Takeaway
- Page numbers right-aligned
- **Page load:** Slides in from right

**TOC item hover:** Page number slides right, dotted leader line animates in
**TOC item click:** Smooth scroll to section, header flashes briefly

**Section content:** Scrollable within the reader. Each section has headings, body text, images, and callouts.

### Header
Page number indicator (00.0) + "CONTENTS" label centered

### Sticky Bottom Bar
Same pattern as project detail — Go Back, case study name, nav links, "Live" indicator

---

## 7. My Profile (`/profile`)

### Top Row — Identity Cards (4 columns)
Each card:
- Icon top-left
- Description paragraph
- Skill/interest tags (pill badges)
- Label at bottom ("Inspired by Art", "Curiosity = Dev", "Product Designer", "People")

Interactions:
- **Hover:** Card lifts, icon rotates 15deg, tags stagger-scale with color fill
- **Click:** Card flips 180deg to show more detail on back
- **Scroll-in:** Cards stagger in from bottom, 100ms delay each

### Bottom Row (3 columns)

**7.1 User Persona Card (left)**
- Radar/spider chart with 5 axes: Empathetic, Adaptable, Creative, Curious, Detail-focused
- Scale labels (0, 20, 40, 60, 80, 100)
- "GOAL" section below with text
- "Flip me" button
- **Viewport enter:** Chart draws from center outward, axes extend sequentially
- **Hover axis:** Value highlights, label brightens, value appears
- **"Flip me" hover:** Scale 1.05 with shadow; **Click:** Card 3D flip (rotateY 180deg)

**7.2 My Experience Map (center, large)**
- Same dot-matrix world map as dashboard, larger
- Location pins with coordinates and connecting path
- **Viewport enter:** Dots fade in as wave from left to right
- **Mouse move:** Subtle parallax
- **Pin hover/click:** Same as dashboard version

**7.3 Testimonials (right)**
- Stacked cards with: company logo (grayscale), person's name + title, quote text
- **Hover:** Card lifts, quote marks enlarge, logo gains color
- **Idle:** Auto-scroll/cycle if idle, pauses on hover
- **Click:** Expands to full testimonial

---

## 8. Terminal Feature

### Architecture
Plugin-style command registry for extensibility.

```
src/
  components/terminal/
    Terminal.tsx          — main component (overlay)
    TerminalInput.tsx     — input line with cursor
    TerminalOutput.tsx    — output display with typing effect
    TerminalEngine.ts     — command parser, history, tab completion
  commands/
    registry.ts           — registerCommand() + command map
    about.ts              — /about → bio text
    work.ts               — /work → project list
    skills.ts             — /skills → skill table
    help.ts               — /help → command list
    contact.ts            — /contact → links
    clear.ts              — /clear → clear output
```

### MVP Features (Medium)
- Typing animation for responses (25-50ms per char, slight randomness)
- Command history (up/down arrows)
- Tab completion (ghost text appears dimmed, Tab commits with flash)
- Blinking cursor (530ms interval)
- Welcome message on open with ASCII art name
- Error handling for unknown commands

### Interactions
- **Open:** Backdrop blurs in, terminal scales up from hero card position (spring)
- **Close:** Escape or click outside — shrinks back to card
- **Command input:** Green blinking cursor, text appears as typed
- **Response:** Typewriter effect with timing randomness
- **History nav:** Command text swaps with subtle fade
- **Tab completion:** Ghost text dimmed, Tab commits with flash

### Extensibility
- `registerCommand(name, handler, options)` pattern
- Each command is a standalone file exporting name, description, handler
- Handler receives args array, returns string or JSX
- Future: `/themes` for color scheme changes, `/easter-eggs`, conversational mode

---

## 9. Data Schema

### Project
```ts
interface Project {
  slug: string;
  name: string;
  category: 'dashboard' | 'app' | 'website' | 'visual' | 'fun';
  company?: string;
  status: 'shipped' | 'concept' | 'live-demo';
  updatedAt: string;
  description: string;
  thumbnail: string;
  images: string[];
  overview: { type: string; role: string; tool: string; contribution: string };
  snapshot: { goal: string; challenge: string; outcome: string };
  designFocus: { label: string; leftLabel: string; rightLabel: string; current: number; target: number }[];
  analogous?: { title: string; image: string; pros: string; cons: string }[];
}
```

### CaseStudy
```ts
interface CaseStudy {
  slug: string;
  title: string;
  subtitle?: string;
  bookColor: { spine: string; cover: string; accent: string };
  coverImage?: string;
  toc: { section: string; title: string; subsections: { id: string; title: string; page: number }[] }[];
  content: { id: string; heading: string; body: string; images?: string[] }[];
}
```

### Profile
```ts
interface Profile {
  name: string;
  title: string;
  identityCards: { icon: string; description: string; tags: string[]; label: string }[];
  persona: { axis: string; value: number }[];
  goals: string[];
  experience: { city: string; lat: number; lng: number; label: string }[];
  testimonials: { name: string; title: string; company: string; logo?: string; quote: string }[];
  skills: { name: string; score: number }[];
  tools: string[];
  hoursSpent: number;
}
```

---

## 10. File Structure

```
src/
  app/
    layout.tsx                — root layout, nav, fonts
    page.tsx                  — dashboard
    projects/
      page.tsx                — project gallery
      [slug]/page.tsx         — expanded project
    case-study/
      page.tsx                — book library
      [slug]/page.tsx         — case study reader
    profile/
      page.tsx                — my profile
  components/
    nav/
      Navbar.tsx
      NavPill.tsx
    dashboard/
      HeroCard.tsx
      TimeSpentCard.tsx
      SkillMatrixCard.tsx
      WorkShowcaseCard.tsx
      ExperienceMapCard.tsx
    projects/
      FilterPills.tsx
      ViewToggle.tsx
      ProjectGrid.tsx
      ProjectList.tsx
      ProjectCard.tsx
      ProjectDetail.tsx
      DesignFocusCard.tsx
      SnapshotTabs.tsx
    case-study/
      BookShelf.tsx
      Book3D.tsx
      CaseStudyReader.tsx
      TableOfContents.tsx
    profile/
      IdentityCard.tsx
      RadarChart.tsx
      WorldMap.tsx
      TestimonialCard.tsx
    terminal/
      Terminal.tsx
      TerminalInput.tsx
      TerminalOutput.tsx
      TerminalEngine.ts
    shared/
      StickyFooter.tsx
      AnimatedCounter.tsx
      DotMatrixMap.tsx
  commands/
    registry.ts
    about.ts
    work.ts
    skills.ts
    help.ts
    contact.ts
    clear.ts
  data/
    projects.ts
    case-studies.ts
    profile.ts
  lib/
    animations.ts             — shared animation variants
    utils.ts
  styles/
    globals.css               — Tailwind imports, custom properties
```

---

## 11. Deployment

- **Platform:** Vercel (zero-config Next.js)
- **Build:** Static generation (SSG) for all pages
- **Images:** Next.js Image component with optimization
- **Fonts:** `next/font` for Google Fonts (self-hosted)
