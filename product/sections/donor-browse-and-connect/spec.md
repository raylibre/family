# Donor Browse & Connect Specification

## Overview
The main donor-facing section where supporters browse families by situation category and donate directly to them. The platform never handles money — all transfers are direct from donor's bank card to the family's card. After completing the transfer externally, the donor logs it in the platform so it can be reviewed and approved by an admin. Once approved, the family's donation jar updates to reflect the new contribution.

## User Flows
- Donor arrives at the category selection view inside the app shell
- Donor sees 4 vertical category pillars; above each pillar is the approximate monthly support amount (~$X / month) for one family in that category
- Donor selects a category — pillar highlights and "Browse Families" button activates
- Donor clicks "Browse Families" → transitions to the family list filtered by that category
- Alternatively, donor clicks a small secondary "View all families" link/button → family list with no category filter, showing all registered families
- On the family list: donor sees cards for each family in the selected category (or all)
- Each family card shows: photo, family name, short story, specific needs, and a donation jar
- The donation jar visually fills to show how much of the monthly target is already covered (e.g., 60% filled = $180 of $300/month covered), counting only admin-approved donations
- Below the jar: three donation amount buttons — $10, $50, and "Fill the jar" (= the exact remaining amount to reach 100%)
- Donor selects an amount and clicks "Donate" → a panel or modal opens with the family's bank card number and transfer instructions
- Donor completes the transfer independently (via their own banking app)
- After sending, donor returns and confirms the donation in the platform: submits amount + optional screenshot/note as proof
- The donation is stored in the database with status "pending" and awaits admin approval
- A small "← Change category" link at the top of the family list returns to category selection

## UI Requirements
- Inside the app shell (shell: true)
- **Category selection view:**
  - 4 vertical pillar columns (same grid as family registration section)
  - Each pillar has a money label above it: "~$X / month"
  - Selected pillar highlights with teal top accent and gradient background
  - "Browse Families" primary button — disabled until a category is selected
  - Small secondary "View all families" button always visible and active
  - Bilingual (UA / EN)
- **Family list view:**
  - Active filter shown at top: category name (or "All families") + "← Change category" link
  - Responsive card grid: 3 columns on desktop, 2 on tablet, 1 on mobile
  - Each family card:
    - Family photo (top, object-cover)
    - Family name and short story
    - Specific needs (short tags or bullet list)
    - Donation jar: circular or vertical visual that fills proportionally (approvedDonations / monthlyTarget)
    - Percentage label inside or below the jar (e.g., "64% covered")
    - Three donation buttons: $10 / $50 / Fill the jar (auto-calculates remaining)
    - "Donate" action button
- **Donation flow panel/modal (after clicking Donate):**
  - Family's bank card number displayed clearly with a copy button
  - Step-by-step instructions: transfer money via your banking app, then return here to confirm
  - Confirmation form: amount field (pre-filled with selected amount), optional file upload for screenshot, optional note
  - Submit button: "I've sent the money"
  - After submit: success message explaining the donation is pending admin review and the jar will update once approved

## Notes
- The platform never receives or holds funds — card-to-card transfer is fully external
- Donation jar totals reflect only admin-approved donations
- Pending donations are stored in DB with: donorId (optional/anonymous), familyId, amount, proof (file/note), status (pending/approved/rejected), timestamp

## Configuration
- shell: true
