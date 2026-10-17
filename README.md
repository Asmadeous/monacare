# MonaCare — monacare.co.uk

Next.js 15 (App Router) + Tailwind v4. Rebrand of monacare.co.uk, built to the MonaCare Visual Identity Guidelines v1.0 (Sept 2026, 9-Sonic).

```bash
npm i && npm run dev   # http://localhost:3000
npm run build && npm start
```

## Structure
Four pages:
- `/` Home: hero, welcome, about preview, programme index, partners (`#partners`), testimonials in scrolling columns (`#reviews`, from `testimonials` in `site.ts`), consultation info (`#consultation`), donate (`#donate`)
- `/services`: the five programmes, one layout each (anchored, e.g. `/services#mindreset`)
- `/about`: story, mission, vision, proposition, values, culture
- `/team`: team members from `team.members` in `site.ts`; the first is featured (`#founder`), anyone added after appears in a grid

Loading screen: on every initial page load (not in-site navigation) a Deep Teal screen reveals the reversed logo piece by piece (symbol, then each letter) while a gold bar tracks real loading progress (above-the-fold images, fonts, window load). Then it opens like neutomni.com's loader: two sheets meeting at the bar's line pull apart, top up and bottom down (1.5 s, cubic-bezier(.55,.055,.675,.19)). Component `src/components/Intro.tsx`.

Booking: every "Book a consultation" link is `href="#book"` and opens one site-wide modal (`src/components/BookingModal.tsx`). Add `data-programme="<programme title>"` to preselect a programme. Visiting any page with `#book` in the URL opens it too.

Motion: every effect is taken from lpas.com or neutomni.com (timings and curves read from their code), built with `motion` and Lenis smooth scrolling:
- Home hero (`home/HomeHero.tsx`, lpas.com HomeHero): office video behind, headline on a Deep Teal panel; on desktop the hero pins and the programme panels travel in from the right, each photo growing and settling, text fading up. Phones: panels stack, photos slide in.
- `home/Statement.tsx` (lpas intro block), `home/OurFocus.tsx` (lpas "Our focus" list), `Partners.tsx` (lpas list rows)
- `home/WaysIn.tsx` (neutomni process cards: each card fills from the bottom with scroll, finishing at 30/45/60/75%)
- `home/ConsultationTicket.tsx` (neutomni package cards: the ticket rises from 860px below while flipping face up)
- `ui/appear.tsx`: `FadeInUp` (lpas fadeInUp: 30px, 0.6 s) and `ImageAppear` (lpas photo reveal: frame opens from 40%, photo settles from 1.5×, 1.2 s, then parallax)
- Page changes: a Deep Teal curtain lifts away (`src/app/template.tsx`; lpas uses swup page transitions)
- Header hides on scroll down and returns on scroll up (neutomni navbar)
- `morphing-dialog` via `BookButton` (booking buttons open the form)
Text on photos always sits on a solid Deep Teal panel (brand guidelines). `MotionProvider` honours the visitor's reduced-motion setting.

Images: the Unsplash placeholders are resized by Unsplash's CDN through a custom `next/image` loader (`src/lib/image-loader.ts`); other images are served as they are.

Code:
- `src/content/site.ts` — **all copy and image URLs** (edit here, not in components)
- `src/app/layout.tsx` — shared header and footer
- `src/components/` — Header, Footer, BookingModal, ConsultationForm, Testimonials, Partners, Intro (loading screen); `src/components/home/` — Home sections
- `src/components/ui/` — shared layout pieces (`index.tsx`), entrance effects (`appear.tsx`) and `testimonials-columns-1.tsx` (21st.dev component, adapted to the brand)
- `src/app/api/consultation/route.ts` — form endpoint; wire `deliver()` to Resend/Postmark/SMTP
- `public/brand/` — vector logos (symbol, wordmark, lockups, light variants)

## Brand tokens (globals.css)
Deep Teal `#0E6679` · Warm Gold `#F4A01E` (accent only, never small text on light) · Soft Off-White `#FAF5DF` · White `#FFFFFF` · Gold tint G40 `#FBD9A5` (small text on teal)
Type: Nunito Sans SemiBold (headlines, names, navigation) + Jost Regular (body, captions, labels), self-hosted via Fontsource. Type scale, buttons (8 px radius), links (always underlined) and focus (3 px teal outline) follow the guidelines' website page.
Gold is used only as a line (the gold thread) or highlight, never as text on light backgrounds.

## Before launch
- Replace Unsplash placeholders in `images` (esp. `founder` → Sharon Gitau's portrait)
- Wire the consultation endpoint and the Donate link
