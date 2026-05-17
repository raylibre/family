# Test Specs: Landing Page

Framework-agnostic UI behavior specs. Adapt to your testing setup (Vitest, Jest, Playwright, Cypress, etc.).

---

## User Flow Tests

### Flow 1: Navigate to Family Registration

**Scenario:** A family representative arrives on the landing page and clicks "We Need Help".

**Steps:**
1. Render `LandingPage` with `onFamilyRegister` callback
2. User sees button with label "We Need Help" (EN) or "Нам потрібна допомога" (UK)
3. User clicks the button

**Expected Results:**
- [ ] `onFamilyRegister` callback is called once
- [ ] Button is visible and not disabled

---

### Flow 2: Navigate to Donor Browse

**Scenario:** A donor arrives and clicks "I Want to Help".

**Steps:**
1. Render `LandingPage` with `onDonorBrowse` callback
2. User sees button with label "I Want to Help" (EN) or "Я хочу допомогти" (UK)
3. User clicks the button

**Expected Results:**
- [ ] `onDonorBrowse` callback is called once

---

### Flow 3: Toggle Language

**Scenario:** User switches between Ukrainian and English.

**Steps:**
1. Render `LandingPage` with `locale="uk"` and `onLocaleChange` callback
2. User sees language toggle showing "EN"
3. User clicks the toggle

**Expected Results:**
- [ ] `onLocaleChange` is called with `"en"`
- [ ] After re-render with `locale="en"`, toggle shows "UA"
- [ ] Page content switches to English (CTAs, mission text)

---

## Component Interaction Tests

### Hero Section

- [ ] Hero photo renders with the provided `hero.photo` URL
- [ ] Hero name and title display in the active locale
- [ ] Partner logos render for each entry in `partners` array

### Mission Statement

- [ ] `content.uk.missionLine1` and `missionLine2` visible in Ukrainian locale
- [ ] `content.en.missionLine1` and `missionLine2` visible in English locale

### CTA Buttons

- [ ] Both CTA buttons are visible simultaneously
- [ ] "We Need Help" / "I Want to Help" use distinct visual styles (different colors)

---

## Edge Cases

- [ ] Handles missing `hero.photo` gracefully (fallback background shown)
- [ ] Very long partner name doesn't overflow the partner column
- [ ] Page is usable on 375px mobile width (buttons stack or remain tappable)

---

## Sample Test Data

```typescript
const mockHero = {
  name: { uk: 'Михайло Прісяжнюк', en: 'Mykhailo Prisiazhniuk' },
  title: { uk: 'Ветеран', en: 'Veteran' },
  photo: 'https://example.com/hero.jpg',
}

const mockPartners = [
  { id: 'p1', name: { uk: 'Партнер 1', en: 'Partner 1' }, logo: '', url: '#' },
]

const mockContent = {
  uk: {
    missionLine1: 'Ми допомагаємо сім\'ям.',
    missionLine2: 'Лише сім\'ям військових.',
    ctaFamily: 'Нам потрібна допомога',
    ctaDonor: 'Я хочу допомогти',
    languageToggle: 'EN',
  },
  en: {
    missionLine1: 'We support families.',
    missionLine2: 'Military families only.',
    ctaFamily: 'We Need Help',
    ctaDonor: 'I Want to Help',
    languageToggle: 'UA',
  },
}
```
