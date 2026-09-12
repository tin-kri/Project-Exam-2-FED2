# Project-Exam-2-FED2 Holidaze

A venue booking site built with the [Noroff Holidaze API](https://docs.noroff.dev/docs/v2), where customers can browse and book venues. Venue managers can list and manage their own venues. To register use a @stud.noroff.no email address.

**Live site:** [https://holidaze-venue-finder.netlify.app](https://holidaze-venue-finder.netlify.app)

## Table of Contents

- Description
- User Stories
- Built With
- Technology Choices and Rewarding Parts
- Features
- Getting Started
- API Integration
- Testing
- Known Limitations
- Deployment
- Required Links

---

## Description

Holidaze has a two-sided booking platform. A customer facing side for browsing and booking venues, and a venue manager facing side for venue managers to create venues and see bookings for the venue and update, delete their venues. Built for Project Exam 2 in Noroff's Front-End Development course.

## User Stories

The client specified the following requirements:

1. A user may view a list of Venues
2. A user may search for a specific Venue
3. A user may view a specific Venue page by id
4. A user may view a calendar with available dates for a Venue
5. A user with a `stud.noroff.no` email may register as a customer
6. A registered customer may create a booking at a Venue
7. A registered customer may view their upcoming bookings
8. A user with a `stud.noroff.no` email may register as a Venue manager
9. A registered Venue manager may create a Venue
10. A registered Venue manager may update a Venue they manage
11. A registered Venue manager may delete a Venue they manage
12. A registered Venue manager may view bookings for a Venue they manage
13. A registered user may login
14. A registered user may update their avatar
15. A registered user may logout

## Built With

- React + TypeScript
- Vite
- React Router
- Tailwind
- Shadcn/ui, React Day Picker, Embla 
- Zustand for auth state, persist to localStorage
- Zod for schema validation
- Vitest
- Playwright 

### Resources Used

- Hosting: Netlify
- Design Application: Figma
- Planning Application: GitHub Projects

## Technology Choices and Rewarding Parts

I've used Next.js on a previous project and wanted this one to go the other direction, to see what's underneath the abstractions Next.js normally handles — routing, data fetching, the build pipeline. Choosing Vite and React Router meant setting that up myself, which gave me a clearer picture of what's actually happening under the hood.

For auth state, I chose Zustand over Redux, since Redux felt disproportionate to what I actually needed. Zustand gave me persistence (to localStorage, via zustand/middleware) without the extra boilerplate.The venue creation and editing form needed runtime validation, so I used Zod — it was already familiar to me, and it let me validate and type the same schema in one place instead of maintaining two.

I wanted the design to feel intentional, and Tailwind let me build toward that. Rather than installing a full component library, I used shadcn's model of copying component source directly into the project. This let me own the code and modify it when needed. It also made building for accessibility easier for me, since a lot of the groundwork is already handled by the underlying primitives.

Accessibility was the most rewarding part of the project to work on. Rather than treating it as a checklist pass at the end, I tried to think it through as I went. Choosing the correct semantic HTML for the situation, and applying the principle that *no ARIA is better than bad ARIA*. Running WAVE and axe DevTools against the finished site later proved I am not an accessibility expert, but it did help me to look closely at findings I didn't fully understand at first, and to learn from fixing them rather than just making the warnings disappear.

## Features

- Browse and search venues, with sorting by price, rating, or newest
- View a venue's details, including an availability calendar with already-booked dates disabled
- Register as a customer (`@stud.noroff.no` email required)
- Create a booking (date range + guest count, validated against the venue's capacity)
- View upcoming and previous bookings
- Register as a venue manager
- Create, edit, and delete venues
- View bookings made on venues they manage
- Login / logout, with session persisted across page reloads
- Update profile avatar

---

## Getting Started

### Prerequisites

- Node.js 22+
- A `@stud.noroff.no` student email address 

### Installation

```bash
git clone https://github.com/tin-kri/Project-Exam-2-FED2.git
cd Project-Exam-2-FED2/holidaze
npm install
```

### Creating an account and API key

The app talks directly to the Noroff v2 API, which requires both a user account and an API key tied to that account.

1. **Register a user** — through this app's own `/register` page once it's running, or directly via the [Noroff API docs](https://docs.noroff.dev/docs/v2/auth/register). An email ending in `@stud.noroff.no` is required.
2. **Log in and create an API key** — once registered, generate a key via the [Noroff API key endpoint](https://docs.noroff.dev/docs/v2/auth/api-key) or the [Swagger UI](https://v2.api.noroff.dev/docs) (`POST /auth/create-api-key`, using your access token).
3. Copy the key into `.env` (below). It's required on every request except `auth/register` and `auth/login` themselves.

### Environment Variables

Create a `.env` file in the `holidaze/` directory:

```
VITE_API_KEY=your-noroff-api-key
```

For the Playwright E2E suite, also add a real registered test account:

```
TEST_USER_EMAIL=your-test-account@stud.noroff.no
TEST_USER_PASSWORD=your-test-account-password
```

### Run the dev server

```bash
npm run dev
```

Visit `http://localhost:5173`.

### Build for production

```bash
npm run build
npm run preview
```

## API Integration

Built against the Noroff Holidaze API v2

## Testing

Two complementary layers, covering different concerns rather than duplicating each other:

### Unit tests (Vitest)

```bash
npm run test
```

Covers business logic in isolation — booking date/price calculations (including a DST-boundary edge case), and the venue creation Zod schema (validation rules, coercion, defaults).

### End-to-end tests (Playwright)

```bash
npx playwright test
```

Covers that the pieces are correctly wired together in the real app — login (happy path, validation errors, wrong-password handling), venue browsing. Chromium and Firefox only; WebKit currently has a known Playwright compatibility issue unrelated to this project.

It is split this way because unit tests give fast, exhaustive coverage of edge cases in logic that doesn't need a browser; E2E tests confirm the real user-facing flow actually works end-to-end.

---

## Known Limitations 

- **Bundle size** (~630kB minified, single chunk) — route-based code splitting (`React.lazy`) is the fix but avoided changing working routing code so close to delivery.
- **WebKit E2E tests excluded** — a Playwright/WebKit protocol compatibility issue unrelated to application code.
- HTML was validated against the W3C Nu Html Checker using the text output rather than the live URL, since the live Netlify URL includes a platform-injected script that is outside this project's control that the validator can't parse past.

## Deployment

Hosted on Netlify, deploying from `main`.

- Base directory: `holidaze`
- Build command: `npm run build`
- Publish directory: `holidaze/dist`
- SPA routing handled via `netlify.toml` redirect rule

## Required Links

- **Gantt chart:** [link]
- **Design prototype:** [link]
- **Style guide:** [link]
- **Kanban board:** [link]
- **Repository:** [https://github.com/tin-kri/Project-Exam-2-FED2](https://github.com/tin-kri/Project-Exam-2-FED2)
- **Hosted demo:** [https://holidaze-venue-finder.netlify.app](https://holidaze-venue-finder.netlify.app)

---

**Course:** Front-End Development
**Institution:** Noroff School of Technology and Digital Media
**Year:** 2026
