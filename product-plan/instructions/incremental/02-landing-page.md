# Milestone 2: Landing Page

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Shell) complete

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

Implement the public landing page — the first thing visitors see when they arrive at the platform.

## Overview

The landing page introduces Family to Family to two audiences: military families seeking help and donors wanting to support them. It features a striking 3:1:1 hero layout with a real family photo and partner logos, a two-sentence mission statement that filters for the right audience, and two large CTAs leading to the two main flows. Fully bilingual (UA/EN).

**Key Functionality:**
- Hero section with real photo and partner logos (Children's charity, UVR)
- Mission statement confirming the platform is for front-line military families only
- "We Need Help" CTA → family registration flow
- "I Want to Help" CTA → donor browse flow
- Language toggle (UA/EN) in the header

## Components Provided

Copy from `product-plan/sections/landing-page/components/`:

- `LandingPage.tsx` — complete standalone page component

## Props Reference

```typescript
interface LandingPageProps {
  hero: Hero           // photo URL + bilingual name/title
  partners: Partner[]  // array of partner logos and URLs
  content: Content     // all UI copy in uk/en
  locale?: Locale      // 'uk' | 'en'
  onFamilyRegister?: () => void  // "We Need Help" clicked
  onDonorBrowse?: () => void     // "I Want to Help" clicked
  onLocaleChange?: (locale) => void
}
```

See `types.ts` for full interface definitions.

## Expected User Flows

### Flow 1: Navigate to Family Registration

1. Visitor arrives at the landing page
2. Visitor sees hero photo + mission statement
3. Visitor clicks "We Need Help" (or "Нам потрібна допомога")
4. **Outcome:** Navigated to `/register` (family registration flow)

### Flow 2: Navigate to Donor Browse

1. Visitor clicks "I Want to Help" (or "Я хочу допомогти")
2. **Outcome:** Navigated to `/browse` (donor browse page)

### Flow 3: Toggle Language

1. Visitor clicks language toggle (shows "EN" when in Ukrainian mode)
2. **Outcome:** All page copy switches to English; toggle now shows "UA"

## Testing

See `product-plan/sections/landing-page/tests.md` for UI behavior test specs.

## Files to Reference

- `product-plan/sections/landing-page/README.md` — Design intent
- `product-plan/sections/landing-page/tests.md` — Test specs
- `product-plan/sections/landing-page/components/` — React components
- `product-plan/sections/landing-page/types.ts` — TypeScript interfaces
- `product-plan/sections/landing-page/sample-data.json` — Content and partner data

## Done When

- [ ] Landing page renders at the root route (`/`)
- [ ] Hero photo, name, and partner logos display correctly
- [ ] Mission statement visible in both languages
- [ ] "We Need Help" navigates to family registration
- [ ] "I Want to Help" navigates to donor browse
- [ ] Language toggle switches all copy between UA and EN
- [ ] Responsive: hero and CTAs work on mobile
