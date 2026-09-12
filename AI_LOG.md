# AI Log

## Introduction

In this exam, I tried to use AI as a supportive tool. I made a effort to avoid asking for direct answers to problems, instead  asking for mentoring, teaching or discussions.
This document tries to show the discussions, decisions, and bugs encountered while building Holidaze, and how AI assistance played a role in resolving them.

## How AI Was Used

The AI tool I worked with was Claude. I used it primarily for explanations, architectural feedback, code review, and debugging support. A part of the work was letting AI read my code and asking for reviewes against specific criteria like: HTML semantics, accessibility, React best practices and DRY principles.

Ai did help with planning. Giving me different customer booking flows before I reflected and settled on one, AI assisted in breaking down some sprints into a Gantt/Kanban structure, and helped me evaluate timelines and what was worth building, given the project's actual scope and timeline.

## Discussions, Options, Decisions, Errors and Bugs

**Folder structure and architecture.** I discussed with AI the feature-based architecture — organizing by features/venues, venue-management, bookings and profile. The challenge was determining where the landing page should fit, as it wasn’t owned by any single feature? AI's input wanted it in a feature but I reasoned through this myself, searching the web for articles, blog posts and I then made the call to have the landing page outside of features and structured the project accordingly.

**Booking flow.** Before building the booking UI, I read online and I asked AI to help generate a few different possible user flows for how a customer would move from browsing to booking, which gave me options to compare rather than having the AI decide. I picked the flow that made the most sense for this app based on my researc and AI input.

**Venue detail page redesign.** At one point the venue detail page felt off, to many steps to "Book Now". I asked AI to help diagnose what specifically was off, and it generated different redesign directions. I reviewed them and chose the booking sidebar pattern. I also decided the booking widget should be persistent and always visible, rather than hidden behind a popover until dates were picked — we discussed why a popover added an unnecessary extra click to the single most important action on the page, and I chose to remove it in favor of an always-visible calendar.

**Venue card content.** I asked what was worth showing on a venue card in the search results. AI gave me a broad prioritized list (image, name, location, price, rating, capacity, amenities, save button, etc.). I pushed back on that list, since a lot of that detail already belongs on the venue's own detail page — we agreed the card should only carry what actually drives a "should I click this?" decision: image, name, location, price, rating, and guest capacity, with everything else deferred to the detail page. I asked for five different visual layout examples (Classic Vertical, Horizontal List, Compact with Badge, Minimal with Overlay, Gallery Card) to compare before picking a direction.

**Search implementation.** I discussed how to implement search-as-you-type without hammering the API on every keystroke. AI explained debouncing and helped me think through the pieces needed: a generic `useDebounce<T>` hook, a `useVenueSearch` hook with an empty-query guard and its own loading state, and a controlled `SearchBar` component. We also discussed an "active-flag" cleanup pattern to prevent a slow, stale request from overwriting a newer one if requests resolved out of order, and I applied that to distinguish a genuinely idle search from a search that returned zero results.

**Where search/sort state should live.** I weighed local component state against storing query and sort state in the URL. I decided on the URL (`useSearchParams`), since it makes the current search/sort shareable and lets it survive a page refresh — a plain `useState` wouldn't give me that.

**Calendar library choice.** I compared `react-day-picker`, shadcn's `<Calendar>` wrapper around it, FullCalendar, and building a calendar by hand. I chose `react-day-picker` (via shadcn) with a `useBookedDates` helper to convert existing bookings into disabled date ranges. This surfaced a real type bug along the way — bookings aren't present on the base venue type by default, they only arrive when a venue is fetched with `?_bookings=true` — which I fixed once AI helped me trace where the mismatch actually was.

**Date formatting consistency.** Ai pointed out that the date picker, the booking confirmation page, and the bookings list were each formatting dates slightly differently and suggested different approches. I decided to centralize this into a single shared date formatter.

**Filtering vs. sorting.** After a user testing session, a user wanted to filter venues by amenities, price, and guest count . I asked AI to help me think through the trade-offs, pros and cons while working on it I found the Noroff API doesn't support server-side filtering on these fields, so rather than building a half-correct client-side filter that would only apply to the currently loaded page I disided not to given the short deadline.

**Wording on auth pages.** I discussed the wording for login/register — "log in" vs "sign in," "register" vs "sign up", also reading articles and blog post about the usage. AI pointed out that code-level naming (`RegisterPage`, `useRegister`) didn't need to match the user-facing copy ("Sign up"), since the two serve different audiences.

**Text content.** I asked AI to help generate initial text content for the landing page (hero copy, the "Top Destinations" section). AI was used in making both markdown files in this project For this AI_LOG i give it my notes collected thru the sessions and summaries of AI chats, so it could structure it and format it.

**Session-expiry message on a wrong password.** During manual testing sprint, entering a wrong password on login showed "Your session expired. Please log in again". I described the symptom to AI, which helped me trace the cause: a shared API response handler treated every `401` status as an expired session, regardless of which endpoint caused it, including login itself. 

**Netlify build failed on file casing.** The local build passed, but Netlify failed with "cannot find module" for `Footer` and `useCarousel`. The cause: macOS's filesystem is case-insensitive, so git had never actually recorded the rename from `footer.tsx`/`UseCarousel.ts` to their new capitalization — it looked renamed locally but wasn't tracked as such. AI diagnosed the case-sensitivity mismatch from the build log and gave me the exact `git mv` sequence needed to force git to record the casing change properly. 

**TypeScript project reference errors.** I hit a `Cannot find name 'process'` error in my Playwright config, and separately a deprecated `baseUrl` warning. AI helped me understand how TypeScript's project references (`tsconfig.app.json` vs `tsconfig.node.json`) each scope different files, and why a config file needs `"node"` in its `types` array to recognize Node globals. 

**Accessibility** I ran WAVE and axe DevTools against the deployed site and got several flags I didn't fully understand at first — a broken `aria-labelledby` reference, an "empty form label," redundant alt text on venue images. For each one, I asked AI to explain why the tool flagged it before fixing it, rather than just applying a suggested fix blindly. This mattered in practice: my first attempt at fixing "redundant alt text" (falling back to the venue name when no alt text existed) accidentally caused a new axe error, because an image-only link lost its accessible name once its image became decorative. Understanding the underlying rule, rather than pattern-matching a fix, was what let me catch that and fix it properly the second time.

**Code Review and Cleanup** Throughout the project, I pasted components for structured review against specific standards — HTML semantics, accessibility, React/Tailwind best practices, and consistency with patterns already established elsewhere in the app. I did this feature by feature (bookings, profile, venue management, venues, landing page) rather than all at once. This caught several real bugs I wouldn't have noticed on my own, including:

- An invalid `<dl>` nested where a `<dt>` belonged in a booking summary
- A Grid-only CSS property (`justify-items-center`) used inside a Flexbox container, silently doing nothing
- Missing `aria-describedby` links between form fields and their error/hint text
- A reversed Cancel/destructive button styling in a confirmation modal
- A missing `return` statement in an error branch that silently swallowed a real error message

**Documentation** AI helped me think through when JSDoc actually adds value in a typed codebase versus when it's just repeating what TypeScript already shows. I decided to only document the handful of functions with I thought needed it, instead of adding comments everywhere. 

## Reflection on AI Usage

I'm aware of the risk of leaning on AI for code I don't understand. I tried to guard against that by asking for reasoning before resulting to a fix when needed and testing things manually before assuming they worked, and pushing back or asking follow-up questions when an explanation didn't fully make sense to me. Which happened more than once and I think usually led to a better, more precise fix than the first suggestion.
Using AI for me is allways filled with doubts and thoughts. Should I learn without? Some say you learn better without. But then again it is being implemented heavy in the workforce and I feel that you need to have some knowlegde about using AI. 
Anyways, I think I found a good middel ground for using AI in a learning enviorment. I feel that AI worked well in this project as a debugging partner, a code reviewer, and a sounding board for scope decisions, and I think that use has shaped a more solid understanding of the technologies involved than if I'd used it to generate the features outright.
