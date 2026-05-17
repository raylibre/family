# Test Specs: Donor Browse & Connect

Framework-agnostic UI behavior specs. Adapt to your testing setup.

---

## User Flow Tests

### Flow 1: Select Category and Browse Families

**Scenario:** Donor selects a category and views filtered family cards.

**Steps:**
1. Render `DonorBrowseAndConnect` with categories and families
2. User sees 4 category pillars, each with a monthly amount and title
3. "Browse Families" button is disabled
4. User clicks a category pillar
5. Pillar highlights; "Browse Families" activates
6. User clicks "Browse Families"

**Expected Results:**
- [ ] Family list view is shown
- [ ] Only families matching the selected `categoryId` are visible
- [ ] Active filter label shows the category name
- [ ] "← Change category" link is visible

---

### Flow 2: View All Families

**Scenario:** Donor skips category selection and views all families.

**Steps:**
1. User clicks "View all families" link (always active)

**Expected Results:**
- [ ] Family list shows all families regardless of category
- [ ] Filter label shows "All families" (or locale equivalent)

---

### Flow 3: Select Amount and Open Donation Modal

**Scenario:** Donor selects a donation amount and begins the donation flow.

**Steps:**
1. Family list is visible with at least one unfunded family card
2. User clicks "$50" amount button on a family card
3. Button shows selected state (navy background)
4. User clicks "Donate $50" button

**Expected Results:**
- [ ] `DonationModal` opens for the correct family
- [ ] Amount is pre-filled as $50

#### Failure Path: No Amount Selected

- [ ] "Donate" button is disabled (muted) when no amount is selected
- [ ] Clicking disabled button has no effect

---

### Flow 4: Complete Donation Flow

**Scenario:** Donor completes all three steps of the donation modal.

**Steps:**
1. DonationModal is open at "instructions" step
2. User sees card number with Copy button
3. User clicks Copy → toast shows "✓ Copied"
4. User clicks "I've sent the money →"
5. Confirmation form shown: amount (pre-filled), optional screenshot upload, optional note
6. User clicks "Submit confirmation"

**Expected Results:**
- [ ] Success screen shown ("Thank you for your support!")
- [ ] `onConfirm` called with `(familyId, amount, note?)`
- [ ] "Close" button dismisses modal

#### Back Navigation

- [ ] "← Back" button on confirmation form returns to instructions step
- [ ] Amount is preserved when navigating back

---

### Flow 5: Fully Funded Family

**Scenario:** A family has reached 100% of their monthly target.

**Setup:** Family with `currentlyFunded >= monthlyTarget`

**Expected Results:**
- [ ] "✓ Fully covered this month" banner shown instead of amount buttons
- [ ] No donation buttons are visible
- [ ] Donation jar shows 100% fill (emerald/green color)

---

## Component Interaction Tests

### DonationJar

- [ ] Jar fill level matches `pct` prop (0–100)
- [ ] Color changes: faint (0–24%) → gold (25–59%) → blue (60–99%) → green (100%)
- [ ] Percentage label is visible inside/below jar

### FamilyCard

- [ ] Family photo renders; fallback gradient shown if `photo` is empty or errors
- [ ] Category badge overlay appears bottom-left of photo
- [ ] Need tags render for each item in `family.needs`
- [ ] "Fill the jar" button shows the exact remaining amount `(monthlyTarget - currentlyFunded)`

---

## Empty States

- [ ] No families in selected category: empty state message visible
- [ ] Family with no needs: need tags section hidden (not an empty tags row)

---

## Edge Cases

- [ ] Family name longer than 30 chars truncates without layout break
- [ ] `currentlyFunded > monthlyTarget` (over-funded): jar shows 100%, "Fully covered" shown
- [ ] Single family in list: card grid shows 1 card without stretching

---

## Sample Test Data

```typescript
const mockFamily = {
  id: 'fam-001',
  name: 'Родина Ковальчук',
  photo: '',
  categoryId: 'disability',
  monthlyTarget: 350,
  currentlyFunded: 185,
  story: {
    uk: 'Коротка історія родини.',
    en: 'Short family story.',
  },
  needs: [
    { id: 'housing', label: { uk: 'Оренда житла', en: 'Housing rent' } },
    { id: 'medical', label: { uk: 'Медична допомога', en: 'Medical care' } },
  ],
}

const mockFullyFundedFamily = {
  ...mockFamily,
  id: 'fam-full',
  currentlyFunded: 350,
}

const mockCategory = {
  id: 'disability',
  monthlyAmount: 350,
  title: { uk: 'Поранення / інвалідність', en: 'Injury / disability' },
  description: { uk: 'Опис', en: 'Description' },
}
```
