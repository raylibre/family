# Test Specs: Admin & Verification

Framework-agnostic UI behavior specs. Adapt to your testing setup.

---

## User Flow Tests

### Flow 1: Admin Login

**Scenario:** Admin navigates to the admin portal and signs in.

**Steps:**
1. Render `AdminPortal` — login screen is shown
2. Admin sees email and password fields
3. Admin enters valid credentials
4. Admin clicks "Sign in"

**Expected Results:**
- [ ] `onLogin` callback called with `(email, password)`
- [ ] After sign-in, donations review page is shown
- [ ] Login form is no longer visible

#### Failure Path: Empty Fields

- [ ] "Sign in" button is disabled when either field is empty
- [ ] No callback fired when fields are empty

---

### Flow 2: Approve a Donation

**Scenario:** Admin reviews a pending donation and approves it.

**Steps:**
1. DonationsReview is showing, filter on "Pending"
2. Admin sees a donation card with Approve and Cancel buttons
3. Admin clicks "Approve"

**Expected Results:**
- [ ] Processing spinner briefly shown on the card
- [ ] Donation status updates to "Approved" (green badge)
- [ ] `onApproveDonation` callback called with the donation's `id`
- [ ] Card moves out of "Pending" filter view (if "Pending" tab is active)
- [ ] Pending count in the filter tab decreases by 1
- [ ] Approved count increases by 1

---

### Flow 3: Cancel a Donation

**Scenario:** Admin cancels a suspicious donation.

**Steps:**
1. DonationsReview is showing
2. Admin clicks "Cancel" on a pending donation card

**Expected Results:**
- [ ] Donation status updates to "Cancelled" (coral badge)
- [ ] `onCancelDonation` callback called with the donation's `id`
- [ ] Cancel and Approve buttons no longer shown for this donation

---

### Flow 4: View Proof Screenshot

**Scenario:** Admin views the proof screenshot uploaded by a donor.

**Steps:**
1. Admin sees a donation card with a proof screenshot thumbnail
2. Admin clicks the thumbnail

**Expected Results:**
- [ ] Lightbox opens showing the full-size screenshot
- [ ] Clicking outside the lightbox (or the × button) closes it

#### No Screenshot Case

- [ ] When `proofScreenshot` is empty, a placeholder icon is shown instead of a thumbnail
- [ ] No click action on the placeholder

---

## Component Interaction Tests

### Filter Tabs

- [ ] "All" tab shows `donations.length` count
- [ ] "Pending" tab shows count of donations with `status === 'pending'`
- [ ] Clicking a tab filters the list to only matching donations
- [ ] Active tab is visually distinct (white background, shadow)

### Donation Card — Pending State

- [ ] Amount displayed prominently on the left
- [ ] "PENDING" badge shown in gold
- [ ] Family name is bold/prominent
- [ ] Donor name + email visible
- [ ] Formatted submission date visible
- [ ] Quoted note shown if `donation.note` is non-empty
- [ ] Approve (green) and Cancel (coral) buttons visible

### Donation Card — Processed State (Approved / Cancelled)

- [ ] Status badge shown (green for approved, coral for cancelled)
- [ ] Approve/Cancel buttons NOT shown
- [ ] Amount color: green for approved, muted for cancelled

---

## Empty States

- [ ] When no donations match the active filter, empty state shown ("No pending donations")
- [ ] Empty state includes an icon and descriptive text

---

## Edge Cases

- [ ] Approving the last pending donation: "Pending" tab shows count of 0
- [ ] Very long donor names: truncated with ellipsis, layout doesn't break
- [ ] Long donation note: shown in a contained quote block, not overflowing card

---

## Sample Test Data

```typescript
const mockDonation = {
  id: 'don-001',
  familyId: 'fam-005',
  familyName: 'Родина Петренко',
  donorName: 'Марія Соколова',
  donorEmail: 'sokolova@gmail.com',
  amount: 50,
  currency: 'USD',
  status: 'pending' as const,
  submittedAt: '2026-05-15T08:30:00Z',
  note: 'Сподіваюся допомогти.',
  proofScreenshot: 'https://example.com/proof.jpg',
}

const mockApprovedDonation = { ...mockDonation, id: 'don-002', status: 'approved' as const, proofScreenshot: '' }

const mockAdminUser = {
  id: 'admin-001',
  name: 'Олена Бондаренко',
  email: 'admin@familytofamily.org',
  role: 'admin' as const,
  avatarInitials: 'ОБ',
}
```
