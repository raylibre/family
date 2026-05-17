# Test Specs: Family Registration & Profiles

Framework-agnostic UI behavior specs. Adapt to your testing setup.

---

## User Flow Tests

### Flow 1: Select Category and Open UVR Modal

**Scenario:** User arrives, selects a category, and opens the sign-in modal.

**Steps:**
1. Render `FamilyRegistrationAndProfiles` with 4 categories
2. User sees 4 category cards, each with a title and description
3. "Continue" button is disabled (grayed out)
4. User clicks the first category card
5. Card shows selected state (colored border + radio checkmark)
6. "Continue" button becomes active (coral)
7. User clicks "Continue"

**Expected Results:**
- [ ] UVR modal opens
- [ ] Modal shows two tabs: "Register at UVR" and "Sign In"
- [ ] Register tab is active by default

---

### Flow 2: Sign In with UVR Code

**Scenario:** User switches to Sign In tab and authenticates.

**Steps:**
1. UVR modal is open
2. User clicks the "Sign In" tab
3. User enters email "test@example.com"
4. User enters UVR code "UVR-1234-ABCD"
5. User clicks the submit button

**Expected Results:**
- [ ] `onSignIn` callback called with `("test@example.com", "UVR-1234-ABCD", selectedCategoryId)`
- [ ] After sign-in, modal closes
- [ ] Family dashboard becomes visible

#### Failure Path: Empty Fields

- [ ] Submit button is disabled when either field is empty
- [ ] No callback fired if fields are empty

---

### Flow 3: Submit Family CV

**Scenario:** User fills out the Family CV form and submits.

**Steps:**
1. Family dashboard is visible (user is signed in)
2. User enters family name
3. User enters a story
4. User enters service member name and rank
5. User selects at least one need tag
6. User clicks "Submit for Review"

**Expected Results:**
- [ ] Submitted success state is shown
- [ ] Form is replaced with confirmation message
- [ ] `onSubmit` callback called with the form data

#### Failure Path: Missing Required Fields

- [ ] Submit button remains disabled if family name or story is empty

---

## Component Interaction Tests

### CategoryCard

- [ ] Clicking a card calls `onClick`
- [ ] Selected card shows colored border and checkmark indicator
- [ ] Unselected card returns to default (white + left border) on deselect

### UVRModal

- [ ] Clicking outside the modal calls `onClose`
- [ ] Close (×) button calls `onClose`
- [ ] Switching tabs resets any error state
- [ ] "Register at UVR" tab shows a link to `uvrInfo.url` that opens in new tab

### FamilyDashboard

- [ ] Live preview panel updates as user types family name and story
- [ ] Need tags can be toggled on and off
- [ ] Children can be added and removed dynamically

---

## Empty States

- [ ] No category selected: "Continue" button disabled and visually muted
- [ ] CV submitted: success card shown instead of form; edit button re-opens form in edit mode

---

## Edge Cases

- [ ] Very long family story truncates gracefully in the live preview
- [ ] Photo URL field: if empty, preview shows a fallback gradient with initials
- [ ] Modal is full-screen on 375px mobile viewport

---

## Sample Test Data

```typescript
const mockCategories = [
  {
    id: 'disability',
    title: { uk: 'Поранення / інвалідність', en: 'Injury / disability' },
    description: { uk: 'Опис', en: 'Description' },
  },
  {
    id: 'died',
    title: { uk: 'Загиблий воїн', en: 'Fallen soldier' },
    description: { uk: 'Опис', en: 'Description' },
  },
]

const mockUvrInfo = {
  url: 'https://uvr.org.ua',
  registerTab: { uk: 'Реєстрація', en: 'Register' },
  signInTab: { uk: 'Увійти', en: 'Sign In' },
  registerHeading: { uk: 'Крок 1', en: 'Step 1' },
  registerBody: { uk: 'Зареєструйтесь на УВР', en: 'Register at UVR' },
  registerCTA: { uk: 'Перейти на УВР', en: 'Go to UVR' },
  signInHeading: { uk: 'Увійдіть', en: 'Sign In' },
  signInBody: { uk: 'Введіть email та код', en: 'Enter email and code' },
  emailLabel: { uk: 'Email', en: 'Email' },
  codeLabel: { uk: 'УВР-код', en: 'UVR Code' },
  submitLabel: { uk: 'Увійти', en: 'Sign In' },
  errorMessage: { uk: 'Помилка', en: 'Invalid credentials' },
}
```
