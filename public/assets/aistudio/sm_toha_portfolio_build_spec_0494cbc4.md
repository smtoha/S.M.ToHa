# S.M. Toha Portfolio — Full Build Specification

## 1. Product goal

Build a polished, responsive personal portfolio for S.M. Toha with an editorial cream-and-espresso visual system. The website should feel like a premium software engineer portfolio, not an admin dashboard.

**Primary goals**
- Communicate identity and value quickly.
- Showcase selected software projects with direct source/demo links.
- Explain skills, experience, services, and research interests.
- Pull accurate public repository information from GitHub user `toha129`.
- Make contact and CV access obvious.
- Work well on desktop, tablet, and mobile.

**Recommended stack**
- Next.js (App Router) + TypeScript
- Tailwind CSS for styling (or CSS Modules if preferred)
- Lucide icons
- Framer Motion for restrained transitions (CSS animations are enough for a lighter build)
- GitHub REST API for public profile and repositories
- Vercel for deployment
- Optional: Resend or Formspree for contact form delivery

Do not put a GitHub personal access token in browser code. Public repository data can be fetched without a token; if a token is ever needed, keep it server-side in environment variables.

## 2. Visual direction

### Palette
Use these as CSS variables and keep them consistent:
- `--cream: #F4EEE5` — main page background
- `--paper: #FBF7F0` — cards and header
- `--ink: #171512` — main text / dark sections
- `--espresso: #211B17` — deep brown-black surfaces
- `--brown: #6E452F` — headings and emphasis
- `--copper: #BD875D` — accent, active navigation, small details
- `--muted: #716B64` — secondary text
- `--line: rgba(69,48,34,.12)` — subtle separators
- `--green: #438A60` — availability indicator only

### Design rules
- Use generous whitespace and a consistent spacing scale (8px base).
- Prefer section spacing and background changes over heavy borders.
- Use rounded cards sparingly (12–18px); avoid excessive pills.
- Cream areas should have a very subtle grain texture only if it remains accessible and low contrast.
- Dark sections use solid charcoal or a faint radial gradient—not a large landscape background.
- Use copper accents sparingly.
- Avoid decorative handwritten text if it competes with the content.
- Use high-quality project screenshots, not generic placeholder illustrations, for production.
- Respect `prefers-reduced-motion`.

### Typography
Suggested pairing:
- Headings: `Manrope` or `Inter`, weight 700–900, tight tracking.
- Body: `Inter`, weight 400–500.
- Optional serif italic for one small editorial accent, never for body copy.
- Hero name: very large, tight line-height, responsive clamp.

## 3. Page layout / section order

### A. Sticky header
**Elements**
- Compact `T.` logo/monogram linked to Home.
- Links: Home, About, Projects, Experience, Research, Contact.
- Availability pill (“Available for opportunities”) only if accurate.
- Mobile menu button and accessible collapsible menu.

**Behavior**
- Sticky with translucent cream background and blur.
- Active section underline on scroll.
- Smooth scroll to sections.
- Mobile menu closes after choosing a link.

### B. Hero
Desktop: 3 visual zones within one hero row:
1. **Left identity zone:** eyebrow `CSE STUDENT · DEVELOPER · RESEARCHER`, large `S.M. TOHA`, concise value statement, `View My Work`, `Download CV`, social links.
2. **Center portrait zone:** use the user's supplied professional portrait. Crop with `object-fit: cover`, preserve the face, and use a warm circular/abstract background shape behind it.
3. **Right value zone:** `ENGINEERING · AI · IOT`, headline `Turning ideas into impactful solutions.`, short explanation, and three compact stats such as projects, technologies, years learning. Only show numbers that are truthful and verifiable.

**Suggested copy**
- Headline: `S.M. TOHA`
- Intro: `I build modern web applications, AI solutions and IoT systems that solve real-world problems.`
- Primary CTA: `View My Work`
- Secondary CTA: `Download CV`
- Value headline: `Turning ideas into impactful solutions.`
- Supporting text: `Focused on web development, automation, IoT and artificial intelligence to solve real-world problems and create meaningful impact.`

**Portrait**
- Use the supplied file as `/public/images/toha-portrait.png` (or `.webp` after optimization).
- Do not use a generated replacement portrait.
- Use responsive image sizing, meaningful alt text, and a face-safe crop.
- If you want the original image fully preserved, avoid aggressive filters. A subtle warm tone is fine.

### C. Selected Projects
Show 4 featured projects on desktop, 2 columns on tablet, 1 column on small phones.
Each card should have:
- Real screenshot/thumbnail
- Project title
- One or two sentence description
- Stack tags
- GitHub source link
- Live demo link only when it exists
- Optional star/fork info from GitHub

**Potential featured projects to verify**
1. ShopixxoBD — multi-vendor e-commerce platform
2. TradingSpark — trading strategy generation/backtesting
3. Tender Package Builder — tender/PDF package generation
4. IoT Energy Monitor — ESP32 monitoring dashboard
5. Synapse — student productivity/study app
6. Banglish Compiler — language/compiler project

Important: these names/descriptions came from the portfolio concept and prior project context. Verify that each repository exists and that the public repository actually supports the description before publishing. If a repository is private, don't pretend it is public; use a clearly labeled case study only if appropriate.

### D. About
Suggested copy:
`I’m a Computer Science and Engineering student at Daffodil International University, interested in building practical digital products across web development, AI, automation, and IoT. I enjoy turning problems into useful systems and learning through hands-on projects.`

Show four principles:
- Clean & scalable code — Maintainable solutions
- Real-world impact — Build for actual needs
- Continuous learning — Always exploring new tech
- Open collaboration — Projects and opportunities

Avoid inflated claims; keep the copy factual.

### E. Experience & Education
Use a minimal vertical timeline.
Suggested entries, verify dates and labels:
- CSE Student — Daffodil International University — current
- Independent / Freelance Developer — current or relevant dates
- Research & Personal Projects — ongoing

Only show paid work as employment if it was paid employment. Otherwise use `Independent Projects` or `Project Experience`.

### F. Services / What I Build
Four service items:
- Web Applications — responsive apps, dashboards, APIs, e-commerce
- Automation Solutions — workflow automation, bots, data processing
- IoT & Embedded Systems — ESP32 prototypes, sensors, monitoring dashboards
- AI & Data Solutions — applied AI features, experiments, data analysis

Treat these as capabilities, not guarantees. Add a service only if you are comfortable delivering it.

### G. Technical Toolkit
Group skills into categories:
- Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS
- Backend: Node.js, Express, Python, PHP/Laravel, FastAPI
- Databases: MongoDB, MySQL, PostgreSQL, SQL
- AI & Data: machine learning fundamentals, data analysis, model APIs, automation
- Embedded & Tools: ESP32, Git/GitHub, Linux, Docker

Only list tools you can discuss and demonstrate. Don't use progress bars unless they are backed by a clear, meaningful measure.

### H. Research Interests
Use 3 compact research cards:
- Non-Intrusive Load Monitoring (NILM) — appliance-level energy estimation from aggregate power data
- Smart Agricultural Storage — sensor-based environmental monitoring
- Device-Free Presence Sensing — exploring changes in wireless signals

Label these as `Research interest`, `In progress`, or `Publication` accurately. Do not imply peer-reviewed publication unless one exists.

### I. GitHub Activity
Use live GitHub public data from `toha129`.
Display:
- Avatar, username, bio
- Public repository count
- Followers
- Total stars across fetched repositories
- Top 4–5 repositories sorted by a transparent ranking
- Repository name, description, language, stars, and link
- Optional contribution calendar only if sourced from a reliable endpoint or GitHub's public profile; do not fabricate contribution data.

**API endpoints**
- `https://api.github.com/users/toha129`
- `https://api.github.com/users/toha129/repos?per_page=100&sort=updated`

The public API has rate limits and can fail. Add loading, empty, and error states. A manual link to `https://github.com/toha129?tab=repositories` must always remain visible.

**Ranking suggestion**
- Prefer non-fork, non-archived repositories.
- Use stars, forks, description presence, and relevance as tie-breakers.
- Don't claim “strongest” purely from stars; curator choice should combine code quality, completeness, documentation, and relevance.

### J. Contact / Footer
Use a dark charcoal footer with minimal copper details (no busy background photo).
Include:
- `Have a project in mind?`
- Short invitation for collaborations/internships/freelance
- Email button (real email address required)
- GitHub and LinkedIn links
- Resume link
- Copyright year
- Back-to-top link

A contact form needs a real delivery mechanism (server action + email provider, Formspree, or another service). A front-end-only form does not send messages.

## 4. Suggested project folder structure

```text
toha-portfolio/
├── public/
│   ├── images/
│   │   ├── toha-portrait.webp
│   │   ├── projects/
│   │   │   ├── shopixxo.webp
│   │   │   ├── tradingspark.webp
│   │   │   ├── tender-package-builder.webp
│   │   │   └── iot-energy-monitor.webp
│   │   └── og-portfolio.png
│   ├── files/
│   │   └── sm-toha-cv.pdf
│   └── favicon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── api/
│   │       ├── github/route.ts
│   │       └── contact/route.ts
│   ├── components/
│   │   ├── site-header.tsx
│   │   ├── mobile-navigation.tsx
│   │   ├── hero-section.tsx
│   │   ├── project-grid.tsx
│   │   ├── project-card.tsx
│   │   ├── about-section.tsx
│   │   ├── experience-timeline.tsx
│   │   ├── services-grid.tsx
│   │   ├── skills-section.tsx
│   │   ├── research-grid.tsx
│   │   ├── github-activity.tsx
│   │   ├── contact-section.tsx
│   │   ├── site-footer.tsx
│   │   ├── section-heading.tsx
│   │   └── reveal.tsx
│   ├── lib/
│   │   ├── github.ts
│   │   ├── project-ranking.ts
│   │   ├── site-data.ts
│   │   ├── validators.ts
│   │   └── utils.ts
│   └── types/
│       ├── github.ts
│       └── project.ts
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

For a small first version, a single-page HTML/CSS/JS implementation is also valid. Next.js is recommended for maintainability and future growth.

## 5. Suggested data model

Keep content separate from UI in `src/lib/site-data.ts`.

```ts
export type Project = {
  name: string;
  description: string;
  repoUrl: string;
  demoUrl?: string;
  image: string;
  tags: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    name: "ShopixxoBD",
    description: "Multi-vendor e-commerce platform.",
    repoUrl: "https://github.com/toha129",
    image: "/images/projects/shopixxo.webp",
    tags: ["React", "Node.js", "MongoDB"],
    featured: true
  }
];
```

Replace the example repository URL with the exact repository URL only after verifying it exists. Keep all project names, descriptions, dates, and statistics editable in one place.

## 6. GitHub implementation

Use a server-side route or server-side fetch for resilience and caching. Public endpoints do not require a token, but unauthenticated rate limits apply.

Expected `GitHubRepo` fields:
- `name`
- `html_url`
- `description`
- `language`
- `stargazers_count`
- `forks_count`
- `updated_at`
- `fork`
- `archived`
- `topics` (may require additional endpoint/header behavior)

Implementation requirements:
1. Validate the HTTP response before parsing JSON.
2. Handle GitHub rate limits (`403`/`429`) gracefully.
3. Cache responses for a short period.
4. Never expose private repositories or credentials.
5. Escape or safely render remote text; React's normal text rendering is safe.
6. Keep a visible fallback link to the profile.

## 7. Motion and interaction

Use motion sparingly:
- Hero text: staggered fade-up, 500–700ms.
- Portrait: subtle fade/scale reveal, no dramatic movement.
- Section reveals: fade-up 12–20px as sections enter viewport.
- Project cards: 2–4px hover lift and subtle image zoom.
- Navigation: active underline transition.
- Buttons: slight translate and shadow on hover.
- Optional decorative orbit line behind portrait: slow, low-contrast CSS rotation.

Accessibility:
- Respect `prefers-reduced-motion`.
- Use visible keyboard focus.
- Keep links and buttons large enough on mobile.
- Don't make hover the only way to reveal information.
- Avoid parallax that causes motion discomfort.

## 8. Responsive behavior

### Desktop (≥ 1100px)
- Header full-width.
- Hero uses identity / portrait / value zones.
- Four project cards in one row where space permits.
- Lower sections can use 2- or 3-column grids.
- GitHub panel can be horizontal.

### Tablet (700–1099px)
- Hero becomes two columns or portrait moves below text.
- Project cards use two columns.
- Skills use three columns.
- Timeline and services stack as needed.

### Mobile (< 700px)
- Compact header with accessible menu.
- Hero stacks: identity, portrait, value statement.
- One project card per row.
- No tiny text or squeezed stats.
- Skills use two columns or simple lists.
- GitHub panel stacks.
- Contact actions become full-width or wrap naturally.
- Ensure no horizontal overflow.

## 9. SEO, accessibility, and quality

- Set page title and meta description.
- Add Open Graph image and social preview metadata.
- Use semantic `header`, `nav`, `main`, `section`, and `footer`.
- Use one H1 and a logical H2/H3 hierarchy.
- Add meaningful image alt text.
- Provide keyboard focus styles and contrast.
- Optimize portrait/project images to WebP/AVIF.
- Avoid layout shift by specifying image dimensions.
- Test on real mobile viewport sizes.
- Test all links, CV download, menu, and contact delivery.
- Run Lighthouse and aim for good performance/accessibility; measure rather than invent scores.

## 10. Build phases

### Phase 1 — Foundation
- Create Next.js TypeScript app.
- Add fonts, CSS variables, global reset, and header/footer.
- Add the supplied portrait and a real CV PDF.

### Phase 2 — Static page
- Build hero, projects, about, timeline, services, skills, research, GitHub placeholder, contact.
- Match spacing and hierarchy before adding animation.

### Phase 3 — Real project data
- Verify repositories and project descriptions.
- Add real project screenshots and links.
- Curate 4 strong projects manually, then show dynamic GitHub repositories separately.

### Phase 4 — GitHub integration
- Fetch public profile and repositories.
- Add loading, error, and fallback states.
- Cache API responses and avoid fabricated contribution data.

### Phase 5 — Motion and responsive polish
- Add reduced-motion-aware reveals and hover states.
- Test phone, tablet, laptop, and wide desktop layouts.
- Check keyboard navigation and contrast.

### Phase 6 — Contact and deployment
- Connect contact form to a real service.
- Add resume PDF and metadata.
- Deploy to Vercel and connect a custom domain if desired.
- Verify production URLs and analytics/privacy choices.

## 11. Pre-launch checklist

- [ ] Portrait image is present at the expected path.
- [ ] CV PDF is real and downloadable.
- [ ] GitHub username and links are correct.
- [ ] Every featured repository exists and is public or clearly labeled.
- [ ] Project descriptions reflect actual functionality.
- [ ] All dates, stats, and availability claims are accurate.
- [ ] No fake star counts or fabricated contribution calendar.
- [ ] Contact form actually delivers messages.
- [ ] Mobile menu works and no horizontal overflow exists.
- [ ] Reduced-motion mode works.
- [ ] Metadata, social preview, favicon, and page title are set.
- [ ] Build and lint pass without errors.

## 12. Master implementation prompt

Build a production-quality, responsive personal portfolio for S.M. Toha using Next.js App Router, TypeScript, and Tailwind CSS. Follow an editorial cream/espresso/copper design system with a clean sticky header, oversized S.M. TOHA hero typography, the supplied professional portrait, a right-side engineering value statement, four curated project cards, About, Experience & Education, Services, Technical Toolkit, Research Interests, live public GitHub profile/repository data for `toha129`, and a restrained dark contact footer. Avoid heavy borders, dashboard-like card overload, and busy background photos. Use real repository data, honest project claims, a real CV asset, and a real contact delivery mechanism. Add subtle fade-up reveals, small hover lifts, active navigation, and mobile navigation; honor reduced-motion preferences and keyboard accessibility. Build responsive layouts for desktop, tablet, and phone. Add proper metadata, loading/error states, image optimization, and deployment instructions. Do not invent project links, stars, contributions, work history, or publications. First create the complete file structure and implement the static responsive layout; then integrate GitHub and contact functionality, test it, and document any values/assets that still need the owner's input.
