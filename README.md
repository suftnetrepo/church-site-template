# Church site template

Next.js 15 (App Router) + TypeScript + Tailwind CSS. A reusable starting point for a church's
website, built on a shared backend (Jerur). **This is a template, not a live site** — every value
in it is a placeholder, on purpose.

Winners Chapel International Peterborough does **not** run on this template. Their site is its own
separate, already-live repository. This template exists so the *next* church that asks for a site
doesn't start from an empty Next.js project — it starts from a working one with the boring parts
(Jerur integration, forms, the SWR data pattern, the page architecture) already solved.

## Spinning up a new church's site

1. Clone this repo into a new one for the new church.
2. Edit `church.config.ts` — name, tagline, address, theme colors, font choices (from the
   pre-approved list in that file), and which of the four optional features they actually have
   (`wofbi`, `bfc`, `freeTransport`, `foodBank` — all default to `false`; only turn one on once
   that church confirms they actually run it).
3. Replace the placeholder copy — grep for `[Replace` and bracketed placeholders like `[phone
   number]` across the repo, starting with `app/about/page.tsx` (their real story, not a
   placeholder), `app/contact/contact-info.tsx`, and any feature pages you turned on in step 2.
4. Add real logo/photos to `/public` and swap the placeholder SVG mark in
   `components/layout/navbar.tsx` / `components/layout/footer.tsx`, and the plain gradient hero
   background in `components/home/hero.tsx`, for real assets (see the comments at each swap point).
5. Copy `.env.example` to `.env.local` and fill in that church's own Jerur key and Brevo
   credentials — not shared with any other church's deployment.
6. `npm install && npm run dev`.

## Environment variables

See `.env.example`. Two separate integrations:

- **Jerur backend** (`JERUR_NEXT_BASE_URL`, `JERUR_NEXT_API_KEY`) — the external service that owns
  church settings, sliders, events, fellowship groups, and regular service times. `JERUR_NEXT_API_KEY`
  is *this specific church's* key (an encrypted identifier, not a shared secret — see the comment in
  `lib/api-client.ts` for why that distinction matters). This app only reads from Jerur via the proxy
  routes under `app/api/*`.
- **Brevo** (`BREVO_API_KEY`, `USER_NAME`, `CHURCH_INBOX_EMAIL`, `TEAM`) — sends the contact, prayer
  request, and testimony form submissions (and WOFBI registration, if that feature is on) as email to
  this church's own inbox.

Without real values the site still runs — API calls fail gracefully and pages fall back to empty
states rather than crashing, which is useful while you're still filling in step 2–5 above.

## Feature flags (`lib/features.ts`)

Every church-specific *program* — as opposed to core pages every church gets (Home, Events, Give,
Fellowship, Service Times, Contact, New Here, About) — is gated behind a flag in `church.config.ts`.
`requireFeature()` is a real guard: a disabled feature's route returns an actual 404, not just a
hidden nav link that's still reachable by URL. `hasFeature()` is the read-only check used to
conditionally render nav links and homepage cards.

WOFBI and BFC (under `app/resources/`) ship with their real Winners Chapel Peterborough content
still inside them, deliberately — they're 404-gated off by default, but left as complete, real
worked examples of what a church-specific program page looks like end to end, rather than stripped
down to a content-free skeleton. Use them as a reference when building a new church's actual program
pages; don't just flip their flag to `true` and rename things.

## Known gaps, inherited from the live Winners Chapel site this was extracted from

- **No public Jerur endpoint for contact/prayer-request/testimony submissions** — these go through
  this site's own Brevo integration (`lib/handle-submission.ts`), which is genuinely fine for a
  bespoke, one-church-per-deployment site like this template produces. It would be a real problem
  in a shared multi-tenant deployment, which is exactly why this template is *not* that — see the
  top of this README.
- **No caching layer for the 6 Jerur read routes without `lib/route-cache.ts`.** It's included and
  wired in here — don't remove it. Every SWR revalidation (window focus, reconnect) would otherwise
  hit Jerur directly with zero caching in between, which is what caused a real 429 rate-limit
  incident on the live Winners Chapel site.

## Project structure

```
church.config.ts      The one file a new church's site actually edits — theme, features, identity
app/                   Pages (App Router) and API routes
  api/                Proxy routes to Jerur + email submission routes
  resources/           Feature-gated example program pages (WOFBI, BFC) — off by default
components/
  layout/              Navbar, footer, announcement bar, page header
  home/                Hero, quick access, welcome, get involved, testimony band
  illustrations/       Hand-built SVG illustrations (fellowship, events, food bank) — brand-agnostic
  forms/               Shared submission form used by contact/prayer/testimony
  faq/                 Accordion used on the New Here page
  ui/                  Button
hooks/                 SWR data hooks + form submission hooks
lib/                   axios client, error handling, email sending/templates, feature flags, utils
types/                 Shared TypeScript types
```
# church-site-template
