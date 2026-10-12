# MonaCare — monacare.co.uk

Next.js 15 (App Router) + Tailwind v4. Rebrand of monacare.co.uk, built to the MonaCare Visual Identity Guidelines v1.0 (Sept 2026, 9-Sonic).

```bash
npm i && npm run dev   # http://localhost:3000
npm run build && npm start
```

## Structure
Four pages:
- `/` Home: hero, welcome, about preview, programme index, partners (`#partners`), testimonials slider (`#reviews`), consultation info (`#consultation`), donate (`#donate`)
- `/services`: the five programmes, one layout each (anchored, e.g. `/services#mindreset`)
- `/about`: story, mission, vision, proposition, values, culture
- `/team`: team members from `team.members` in `site.ts`; the first is featured (`#founder`), anyone added after appears in a grid

Loading screen: on every initial page load (not in-site navigation) a Deep Teal screen shows the reversed logo and a gold loading bar that tracks real progress (above-the-fold images, fonts, window load), then fades into the site. Component `src/components/Intro.tsx`.

Booking: every "Book a consultation" link is `href="#book"` and opens one site-wide modal (`src/components/BookingModal.tsx`). Add `data-programme="<programme title>"` to preselect a programme. Visiting any page with `#book` in the URL opens it too.

Code:
- `src/content/site.ts` — **all copy and image URLs** (edit here, not in components)
- `src/app/layout.tsx` — shared header and footer
- `src/components/` — Header, Footer, ui (page header, labels, programme index, consultation band), Testimonials, ConsultationForm, Ornaments (frond field and frond line from the brand graphic language)
- `src/app/api/consultation/route.ts` — form endpoint; wire `deliver()` to Resend/Postmark/SMTP
- `public/brand/` — vector logos (symbol, wordmark, lockups, light variants)

## Brand tokens (globals.css)
Deep Teal `#0E6679` · Warm Gold `#F4A01E` (accent only, never small text on light) · Soft Off-White `#FAF5DF` · White `#FFFFFF` · Gold tint G40 `#FBD9A5` (small text on teal)
Type: Nunito Sans SemiBold (headlines, names, navigation) + Jost Regular (body, captions, labels), self-hosted via Fontsource. Type scale, buttons (8 px radius), links (always underlined) and focus (3 px teal outline) follow the guidelines' website page.
Gold is used only as a line (the gold thread) or highlight, never as text on light backgrounds.

## Before launch
- Replace Unsplash placeholders in `images` (esp. `founder` → Sharon Gitau's portrait)
- Wire the consultation endpoint and the Donate link
