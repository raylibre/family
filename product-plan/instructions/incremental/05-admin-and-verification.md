# Milestone 5: Admin & Verification

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1–4 complete

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

Implement the admin portal — login and donation review with approve/cancel actions.

## Overview

Platform administrators log in with admin credentials, then review pending donation records submitted by donors. Approving a donation counts it toward the family's jar total; cancelling it has no effect on the jar. The portal is accessible inside the app shell.

**Key Functionality:**
- Admin login screen (email + password)
- Donations list with filter tabs: All / Pending / Approved / Cancelled
- Each donation card shows full details: family, donor, amount, date, note, proof screenshot
- Proof screenshot expands in a lightbox on click
- Approve and Cancel actions with optimistic state updates
- Counts update in real time as actions are taken

## Components Provided

Copy from `product-plan/sections/admin-and-verification/components/`:

- `AdminPortal.tsx` — orchestrator (login → donations review)
- `AdminLogin.tsx` — login form
- `DonationsReview.tsx` — full donations review page

## Props Reference

```typescript
interface AdminAndVerificationProps {
  adminUser: AdminUser
  dashboardStats: DashboardStats
  families: FamilyRecord[]
  donations: DonationRecord[]
  categories: Category[]
  onLogin?: (email: string, password: string) => void
  onApproveDonation?: (donationId: string) => void
  onCancelDonation?: (donationId: string) => void
  // (additional callbacks for family management — future use)
}
```

## Expected User Flows

### Flow 1: Admin Login

1. Admin navigates to `/admin`
2. Login screen is shown (dark navy background, white card)
3. Admin enters email + password, clicks "Sign in"
4. **Outcome:** `onLogin(email, password)` fires; your backend verifies credentials; on success, render `DonationsReview`

### Flow 2: Approve a Donation

1. Admin is on donations review, "Pending" tab active
2. Admin sees a donation card with proof screenshot thumbnail (if uploaded)
3. Admin clicks the thumbnail — lightbox opens; admin verifies the transfer
4. Admin clicks "Approve"
5. **Outcome:** `onApproveDonation(donationId)` fires; your backend updates the donation status to `approved` and adds the amount to `family.currentlyFunded`; UI updates optimistically

### Flow 3: Cancel a Donation

1. Admin clicks "Cancel" on a suspicious pending donation
2. **Outcome:** `onCancelDonation(donationId)` fires; your backend sets status to `cancelled`; jar total unchanged

## Integration Notes

- The component applies optimistic state updates locally. Your backend should match this — update the donation record status synchronously and return the updated value.
- When a donation is approved, increment `family.currentlyFunded` by `donation.amount` in your backend.
- The admin portal renders inside the app shell. Protect the `/admin` route — only users with `role: 'admin'` should access it.

## Testing

See `product-plan/sections/admin-and-verification/tests.md` for test specs.

## Files to Reference

- `product-plan/sections/admin-and-verification/README.md`
- `product-plan/sections/admin-and-verification/tests.md`
- `product-plan/sections/admin-and-verification/components/`
- `product-plan/sections/admin-and-verification/types.ts`
- `product-plan/sections/admin-and-verification/sample-data.json`

## Done When

- [ ] `/admin` route is protected (admin role only)
- [ ] Login screen renders; `onLogin` fires with credentials
- [ ] After login, donations review page is shown
- [ ] Filter tabs work (All / Pending / Approved / Cancelled)
- [ ] Donation cards show all details including proof screenshot thumbnail
- [ ] Screenshot lightbox opens and closes correctly
- [ ] Approve action fires callback and updates status to approved
- [ ] Cancel action fires callback and updates status to cancelled
- [ ] Counts in filter tabs update in real time
- [ ] Approved donations increment family jar totals in the backend
