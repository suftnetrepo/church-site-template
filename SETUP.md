# New church setup checklist

Quick-reference for spinning up a new church's site from this template.
See `README.md` for the full context and reasoning behind each step.

## Before you start

- [ ] Confirm the church's Jerur account is live and you have their `JERUR_NEXT_API_KEY`
- [ ] Confirm they have a Brevo account (or you're setting one up for them) and you have the API key
- [ ] Get their brand assets: logo file, primary/accent colours (hex), preferred font if they have one
- [ ] Get their real venue name and address
- [ ] Get their real email address for form submissions
- [ ] Confirm which of the 4 optional features they actually run: WOFBI / BFC / Free Transport / Food Bank

---

## Step 1 — Clone and rename

```bash
git clone <this-template-repo-url> <new-church-slug>
cd <new-church-slug>
git remote remove origin
git remote add origin <new-church-repo-url>
```

## Step 2 — Fill in `church.config.ts`

- `name` — full legal/display name
- `shortName` — used in the nav, footer brand line
- `tagline` — one sentence, shown in page metadata and the hero subtext
- `address.line1` / `address.line2` — venue name and town/postcode
- `heroPhoto` — set to `'/hero.jpg'` once you drop their photo in `/public`; leave `null` for now
- `logoPath` — set to `'/logo.png'` once you drop their logo in `/public`; leave `null` for now
- `theme` — swap every hex value for their real brand colours
- `theme.fontDisplay` / `theme.fontSans` — pick from the pre-approved list in that file
- `features` — set each to `true` only for programs they actually run; everything defaults to `false`

## Step 3 — Drop assets into `/public`

| File | What it is |
|------|-----------|
| `/public/logo.png` | Church logo (PNG with transparency preferred) |
| `/public/hero.jpg` | Full-bleed hero background photo — congregation/worship shot |
| `/public/blank.png` | Generic silhouette for team-member placeholders — keep as-is |

After adding assets, update `church.config.ts`:
```ts
heroPhoto: '/hero.jpg',
logoPath: '/logo.png',
```

## Step 4 — Replace placeholder copy

Search the codebase for `[Replace` — every bracketed placeholder will show up:

```bash
grep -rn "\[Replace\|\[Add\|\[phone\|\[Venue\|\[Town" app/ components/ --include="*.tsx"
```

Key files:
- `app/about/page.tsx` — the church's real story (2–3 paragraphs)
- `app/contact/contact-info.tsx` — populated automatically from Jerur settings; fallback strings here
- Any feature pages you turned on in step 2 (`app/resources/wofbi/page.tsx`, etc.)

## Step 5 — Environment variables

```bash
cp .env.example .env.local
```

Fill in:
```
JERUR_NEXT_BASE_URL=       # from Jerur account
JERUR_NEXT_API_KEY=        # this church's own key
BREVO_API_KEY=             # from Brevo account
USER_NAME=                 # the "from" email address in Brevo
CHURCH_INBOX_EMAIL=        # where contact/prayer/testimony emails go
TEAM=                      # optional team label used in email templates
```

## Step 6 — Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.
The site loads without env vars — data calls fail gracefully and fall back to
empty states, so you can check layout/fonts/colours before the backend is wired.

## Step 7 — Deploy

Push to a new Git repo. Deploy on Render (same setup as Winners Chapel):
- Build command: `npm run build`
- Start command: `npm start`
- Add the 5 env vars from step 5 in the Render dashboard
- Point the church's domain at the Render service

---

## What's already done (don't redo)

- Jerur proxy routes with 5-minute caching — no 429s
- SWR data pattern with server-side fallback seeding
- Feature flag system — disabled features 404 at the route level, not just hidden in the nav
- Responsive layout across all pages
- Contact, prayer request, and testimony form → Brevo email routing
- Real event registration → Jerur directly
- About page team grid → live from `settings.contacts`
- Service times, fellowship, events, prayer times → all live from Jerur
