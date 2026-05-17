# Landing Page

## Overview

The public entry point for Family to Family. A standalone full-page layout introducing the platform to two audiences: military families seeking help, and donors or organizations wanting to support them. Available in Ukrainian and English.

## User Flows

- Visitor arrives and sees the hero with Mykhailo Prisiazhniuk's photo and partner logos
- Visitor reads the two-sentence mission statement about supporting front-line military families
- Visitor clicks "We Need Help" → navigates to family registration
- Visitor clicks "I Want to Help" → navigates to donor browse
- Visitor toggles language switcher (UA/EN) in the header

## Design Decisions

- **3:1:1 hero layout** — large photo column takes 3/5 width; two partner columns (colored backgrounds) take 1/5 each. This creates a strong visual rhythm that draws attention to real families.
- **Decorative SVGs** — sunflower motifs and dot grids are defined inline (no external assets needed). These add warmth and Ukrainian cultural context.
- **Wave divider** between hero and mission creates visual flow without a hard edge.
- **Standalone (no shell)** — has its own minimal header matching the family registration page.

## Components

- `LandingPage` — complete page component, self-contained

## Callback Props

| Callback | Triggered When |
|----------|----------------|
| `onFamilyRegister` | User clicks "We Need Help" CTA |
| `onDonorBrowse` | User clicks "I Want to Help" CTA |
| `onLocaleChange` | User toggles language switcher |

## Data Shapes

- `hero` — photo URL + name/title (bilingual)
- `partners` — array of partner logos with names and URLs
- `content` — all UI copy in uk/en
