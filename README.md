# Arthoken — website

The first Arthoken site: an AI-native software engineering and consulting company.
Next.js (App Router) + TypeScript, no UI framework, no Tailwind — a small
Arthoken-specific design system built on modern CSS.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

Node 20+ is required.

## Design system

A light, printable page with dark instruments set into it. Anything that is a
diagram — plus the closing panel, the footer and the mobile menu — carries
`data-panel="dark"`, and the entire token set flips inside it. That single
attribute is the whole theming mechanism; there is no second stylesheet.

**Surfaces**

| Token | Light | Inside `data-panel="dark"` |
| --- | --- | --- |
| `--bg` | `#faf9f6` warm paper | `#080d0f` |
| `--bg-raised` | `#f2f1ec` banded sections | `#0a1114` |
| `--bg-panel` | `#ffffff` cards | `#0d161a` |
| `--fg` / `--fg-2` / `--fg-3` | `#0c1215` / `#4b565c` / `#606a70` | `#edf2f3` / `#a5b3b8` / `#7c8b91` |
| `--accent` | `#00767f` — the logo teal, deepened to pass AA as text | `#2dd8e0` |
| `--line` / `--line-2` / `--line-3` | ink at 10% / 16% / 30% | white at 9% / 17% / 28% |

Four contextual paints flip with the panel too, so components never need to
know which ground they are on: `--wash` (hover and inset fills), `--grid-line`
(backdrop grids), `--tint` (the one teal glow), and `--solid-bg` /
`--solid-fg` (the filled button, which inverts automatically inside a dark
panel).

Depth on light comes from a white panel on the warm ground, a hairline border
and a soft shadow. Depth on dark comes from `--sheen` and a hairline. A five
percent paper tooth sits over the whole page in `body::after`.

**Type** — self-hosted from `public/fonts` via `next/font/local`, no
third-party font requests. Schibsted Grotesk Variable for everything visible,
IBM Plex Mono for labels, indices and diagram annotation. Display weight is
600 with tight tracking; sizes are fluid `clamp()` ramps topping out at 76px.

**Radii** by function: `--r-control` 4px, `--r-panel` and `--r-card` 6px,
`--r-pill` for chips only.

**Motion** — `--e-out`, `--e-inout`, four durations. Three reveal behaviours,
opted into with a data attribute and driven by one document-level observer
(`components/ui/RevealRoot.tsx`): `mask` unclips headings, `fade` lifts
supporting copy 10px, `line` draws rules out from the left. Diagrams animate a
single travelling dash. Everything respects `prefers-reduced-motion`.

## The diagrams

The visual weight of the site is carried by drawings of how Arthoken actually
builds, not by stock imagery. All geometry is computed on the server, so the
browser receives finished paths.

- `components/motif/LayerStack.tsx` — the hero, sitting in a dark panel on the
  light page. Five planes of a working system in the same 30° projection as the
  mark, with signal moving between them, and capped pointer parallax
  (`PointerParallax`, pointer only).
- `components/motif/ArchitectureDiagram.tsx` — on `/capabilities`. A reference
  architecture for AI in production. The argument of the drawing: the model does language work,
  the decision stays in ordinary code, a person approves what matters, and
  evaluation, tracing and guardrails run underneath.
- `components/motif/StranglerDiagram.tsx` — how a system that cannot be
  switched off gets replaced: façade in front, capabilities extracted one at a
  time, both sides replayed and compared, traffic shifted on evidence.
- `components/motif/TileArt.tsx` — five small isometric constructions, one per
  capability tile.

The two wide diagrams share `Diagram.module.css` and scroll horizontally below
860px rather than shrinking their labels into illegibility.

## What the homepage is doing

Arthoken sells to a business or operations leader and has no client references
yet. The site answers both facts with one offer: **you see it working before
you pay anything.**

1. **Hero** — the offer, stated plainly. Tell us the problem in meeting one,
   click something we built in meeting two, pay nothing until you want it.
2. **"Which of these sounds like your year?"** — four sentences in the buyer's
   own words. This is the "that's me" moment.
3. **How this works** — the engagement loop, with a diagram that draws the
   commercial line: everything left of it costs nothing. Five steps, and the
   small print, so the free offer reads as confidence and not as a trick.
4. **Where AI sits** — a two-lane pipeline showing what the model drafts and
   what a person decides, with a gate on every crossing. This is the argument
   that separates Arthoken from firms who treat AI as magic and never get past
   a prototype.
5. **What a demo is missing** — the same system twice, demo on the left and
   the handover on the right. It also explains the economics: the right-hand
   side is where the money goes, which is why the left-hand side can be free.
6. **What it costs** — the payment schedule drawn to scale, with the first
   stretch empty on purpose. Fixed price per phase, founding-client rates, full
   IP ownership, optional support.
7. **What we do**, deliberately demoted, then **"We're new, that's exactly why
   the first version is free"** said plainly and turned into an argument.

The reference architecture and the migration pattern live on `/capabilities`,
where a technical evaluator will reach them.

### On the writing

The copy is meant to sound like a person wrote it. Short sentences next to long
ones, contractions, specifics instead of adjectives, and almost no em-dashes.
If you edit `lib/content.ts`, keep that. Avoid "leverage", "seamless",
"robust", "empower", "unlock", and any sentence of the form "It's not just X,
it's Y."

## Structure

```
app/
  layout.tsx            fonts, metadata, header/footer, reveal observer
  page.tsx              the homepage narrative
  work|capabilities|insights|company|contact/
  sitemap.ts robots.ts not-found.tsx icon.png
components/
  site/                 Header, Footer, PageHeader, ContactForm
  ui/                   Button, TextLink, SectionHead, RevealRoot
  motif/                LayerStack, ArchitectureDiagram, StranglerDiagram,
                        TileArt, PointerParallax
  sections/             one file per homepage movement
lib/
  content.ts            all copy, typed
public/
  brand/                mark, wordmarks, OG image (derived from assets/)
  fonts/                self-hosted woff2
```

All prose lives in `lib/content.ts` so copy can be edited without touching
layout.

## Contact form

`components/site/ContactForm.tsx` validates client-side and then either

1. POSTs JSON to `NEXT_PUBLIC_CONTACT_ENDPOINT` if that variable is set, or
2. falls back to opening a prefilled `mailto:` to `site.email`.

Point it at a form endpoint or a route handler when one exists:

```bash
# .env.local
NEXT_PUBLIC_CONTACT_ENDPOINT=https://…
```

## Content honesty

The site contains no invented clients, no logos we do not own and no fabricated
metrics. The engagements in `lib/content.ts` are labelled *Representative
engagement* and described as illustrative composites of a problem class.
Insights are marked *Forthcoming* until something is actually published.

## Before launch

- Replace `hello@arthoken.com` and `https://arthoken.com` in `lib/content.ts`.
- Wire the contact endpoint (above).
- Add real engagements as they become referenceable, and remove the disclosure
  line for any that are.
- Consider an `SVG` version of the mark if one exists — `public/brand/mark.png`
  is derived from `assets/ArthokenLogo3.png`.
- The three services named in the migration diagram (Orders, Pricing, Billing)
  are illustrative. Swap them for real ones once there is a real engagement to
  point at.
- Pricing lives in `lib/content.ts` under `pricing`. No figure is published
  yet. When you have a range you are happy to show, set `pricing.range` and it
  renders beside the section heading; leave it unset and the site simply omits
  it. The 40 / 40 / 20 schedule and the founding-client terms are already
  written and can be edited there.
- The biggest remaining gap is that no human appears anywhere. When you are
  ready to be named, a founder section with a real track record will do more
  for trust than any further visual work.

## Accessibility

Targets WCAG 2.2 AA: semantic landmarks and heading order, keyboard-operable
navigation with a focus-trapped mobile menu, visible accent focus rings,
AA-checked text contrast, reduced-motion support, and a written description on
every diagram so the architecture is available to screen readers rather than
being locked inside a picture.
