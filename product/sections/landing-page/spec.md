# Landing Page Specification

## Overview
A minimal, public-facing landing page introducing Family to Family to two audiences: military families who need support, and donors or organizations who want to help. The page leads with a trust-building hero featuring Mykhailo Prisiazhniuk and three partner logos, followed by a brief mission statement and two clear CTAs. The entire page is available in Ukrainian and English.

## User Flows
- Visitor arrives and sees the hero section with Mykhailo Prisiazhniuk's photo and the three partner logos (Children-Victims of the War charity, UVR, Family to Family)
- Visitor reads a two-sentence mission statement clarifying that the platform helps only military families whose father, mother, or son served on the front line ("zero zone")
- Visitor clicks "We Need Help" and is taken to the family registration flow
- Visitor clicks "I Want to Help" and is taken to the donor browse page
- Visitor toggles the language switcher (UA / EN) in the top-right corner to switch all page content between Ukrainian and English

## UI Requirements
- Standalone full-page layout with its own minimal header (not the app shell)
- Header: Family to Family logo (left) + language toggle UA/EN (right)
- Hero row: three columns in 3:1:1 proportion (full viewport height on desktop)
  - Column 1 (3 parts): large photo of Mykhailo Prisiazhniuk, object-cover, with name/title overlay at the bottom
  - Column 2 (1 part): "Children-Victims of the War" charitable foundation logo, centered
  - Column 3 (1 part): UVR (Ukrainian Military Movement) logo, centered
  - Family to Family logo has moved to the page header — not in the hero row
- Two-sentence mission statement centered below the hero row
- Two large CTA buttons side by side: "We Need Help" (family registration) and "I Want to Help" (donor browse)
- Mobile: hero photo spans full width, two logos appear side by side below it

## Configuration
- shell: false
