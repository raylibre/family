# Donor Browse & Connect

## Overview

The main donor-facing section inside the app shell. Donors browse families by situation category and donate directly via their banking app — the platform never handles funds. After completing the transfer, donors log it in the platform; it awaits admin approval before the family's jar updates.

## User Flows

1. Donor sees 4 category pillars with monthly support amounts
2. Donor selects a category → "Browse Families" button activates
3. Donor clicks "Browse Families" → family card grid filtered by category
4. Alternatively, "View all families" → unfiltered list
5. Donor selects a donation amount ($10 / $50 / Fill the jar)
6. Donor clicks "Donate" → DonationModal opens
7. **Step 1** — copy the family's bank card number, transfer money via own banking app
8. **Step 2** — come back, confirm amount, upload optional screenshot/note
9. **Step 3** — success message; donation is pending admin review

## Design Decisions

- **Donation jar** — SVG jar that fills proportionally based on `currentlyFunded / monthlyTarget`. Color changes: faint blue (0–24%) → gold (25–59%) → Ukrainian blue (60–99%) → emerald (100%).
- **Per-category color palettes** — same 4-color system as family registration for visual consistency.
- **Photo-bleed cards** — family photo spans to card top edge (no padding), creating a magazine-style feel.
- **Direct transfer model** — the platform shows a demo card number; real card numbers come from the backend per family.
- **Shell: true** — renders inside AppShell.

## Components

- `DonorBrowseAndConnect` — main orchestrator (category selection → family list)
- `CategorySelectionView` — 4-pillar category selection grid
- `DonorCategoryCard` — individual category pillar
- `FamilyListView` — filterable family card grid
- `FamilyCard` — individual family card with donation jar and amount buttons
- `DonationJar` — SVG donation jar visualization
- `DonationModal` — 3-step donation flow (instructions → confirm → success)

## Callback Props

| Callback | Triggered When |
|----------|----------------|
| `onDonate` | Donor confirms a donation (amount + family) |
| `onLocaleChange` | User toggles language |
