# Milestone 4: Donor Browse & Connect

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1–3 complete

---

## About This Handoff

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Product requirements and user flow specifications
- Design system tokens (colors, typography)
- Sample data showing the shape of data components expect
- Test specs focused on user-facing behavior

**Your job:**
- Integrate these components into your application
- Wire up callback props to your routing and business logic
- Replace sample data with real data from your backend
- Implement loading, error, and empty states

The components are props-based — they accept data and fire callbacks. How you architect the backend, data layer, and business logic is up to you.

---

## Goal

Implement the donor-facing section — category selection, family browsing, and the donation logging flow.

## Overview

Donors browse approved family profiles filtered by situation category. They select a donation amount, then complete a direct bank card transfer using their own banking app. After transferring, they log the donation in the platform (with optional proof screenshot) for admin approval. The platform **never holds funds** — it facilitates the connection only.

**Key Functionality:**
- 4-pillar category selection with monthly support amounts
- Family card grid filtered by selected category (or "all families")
- Donation jar visualization (fills proportionally, color changes by fill level)
- $10 / $50 / "Fill the jar" amount selection per family card
- DonationModal: 3-step flow (copy card number → transfer → confirm)
- Donation confirmation stored as pending; jar updates only after admin approval

## Components Provided

Copy from `product-plan/sections/donor-browse-and-connect/components/`:

- `DonorBrowseAndConnect.tsx` — main orchestrator
- `CategorySelectionView.tsx` — 4-pillar category grid
- `DonorCategoryCard.tsx` — individual category pillar
- `FamilyListView.tsx` — filterable family card grid
- `FamilyCard.tsx` — family card with donation jar + amount buttons
- `DonationJar.tsx` — SVG jar visualization component
- `DonationModal.tsx` — 3-step donation flow modal

## Props Reference

```typescript
interface DonorBrowseAndConnectProps {
  categories: DonorCategory[]   // 4 categories with monthly amounts
  families: Family[]            // approved families (all categories)
  content: Content              // bilingual UI copy
  locale?: Locale
  onDonate?: (familyId: string, amount: number) => void
  onLocaleChange?: (locale: Locale) => void
}
```

**Important:** Pass only **approved** families to this component. Pending, rejected, and archived families should be filtered out before passing as props.

## Expected User Flows

### Flow 1: Select Category and Browse Families

1. Donor arrives at `/browse` (inside app shell)
2. Donor sees 4 category pillars with monthly amounts
3. Donor clicks a category — "Browse Families" activates
4. Donor clicks "Browse Families"
5. **Outcome:** Family list shows cards for families in that category

### Flow 2: Donate to a Family

1. Donor sees a family card with donation jar not yet at 100%
2. Donor clicks "$50" → button shows selected state
3. Donor clicks "Donate $50"
4. DonationModal opens: card number visible with Copy button
5. Donor copies card number, transfers money via their banking app
6. Donor returns, clicks "I've sent the money →"
7. Donor confirms amount (pre-filled), optionally uploads screenshot/note
8. Donor clicks "Submit confirmation"
9. **Outcome:** `onDonate(familyId, amount)` fires; success screen shown; your backend stores donation as pending

## Integration Notes

- The `DonationModal` displays a `DEMO_CARD` placeholder number. In production, replace this with a real family bank card number fetched from your backend per family.
- Donation jar `currentlyFunded` must reflect **only admin-approved** donations. Filter on your backend before passing data.
- The `onDonate` callback fires when the donor submits the confirmation form. At that point, create a `Donation` record with `status: 'pending'` in your database.

## Testing

See `product-plan/sections/donor-browse-and-connect/tests.md` for test specs.

## Files to Reference

- `product-plan/sections/donor-browse-and-connect/README.md`
- `product-plan/sections/donor-browse-and-connect/tests.md`
- `product-plan/sections/donor-browse-and-connect/components/`
- `product-plan/sections/donor-browse-and-connect/types.ts`
- `product-plan/sections/donor-browse-and-connect/sample-data.json`

## Done When

- [ ] `/browse` renders inside the app shell
- [ ] Category pillars display with correct monthly amounts
- [ ] "Browse Families" activates after category selection
- [ ] "View all families" shows all approved families
- [ ] Family cards display photo, story, needs, and donation jar
- [ ] Jar fill percentage matches `currentlyFunded / monthlyTarget`
- [ ] Amount buttons work; "Fill the jar" calculates remaining correctly
- [ ] DonationModal opens and completes the 3-step flow
- [ ] `onDonate` fires after confirmation; donation stored as pending
- [ ] Fully funded families show "✓ Fully covered this month"
- [ ] Responsive card grid (3 → 2 → 1 column)
