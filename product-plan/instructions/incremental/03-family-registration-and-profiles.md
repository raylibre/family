# Milestone 3: Family Registration & Profiles

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1–2 complete

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

Implement the family registration flow — UVR-authenticated sign-in followed by Family CV creation.

## Overview

Families of Ukrainian soldiers arrive via the "We Need Help" CTA. They select their family situation (disability, fallen soldier, missing, or active service), authenticate using a UVR code from their personal cabinet at uvr.org.ua, then fill out a Family CV that goes to admin review before appearing publicly. The CV includes their story, photo, service member details, children's ages, and specific needs.

**Key Functionality:**
- Four category cards (single column, full-width) with per-category brand colors
- "Continue" button activates only after a category is selected
- UVR modal with two tabs: Register (3-step instructions + link to uvr.org.ua) and Sign In (email + UVR code)
- Family dashboard with CV form: family name, photo URL, story, service member details, children, needs
- Live preview panel showing exactly how the card will appear to donors
- Submitted CV goes into "pending admin review" state

## Components Provided

Copy from `product-plan/sections/family-registration-and-profiles/components/`:

- `FamilyRegistrationAndProfiles.tsx` — main orchestrator
- `CategoryCard.tsx` — individual category selection card
- `UVRModal.tsx` — two-tab authentication modal
- `FamilyDashboard.tsx` — Family CV form with live preview

## Props Reference

**Callback Props:**

| Callback | Triggered When |
|----------|----------------|
| `onSignIn(email, uvrCode, categoryId)` | User submits UVR sign-in form |
| `onNavigateToUVR()` | User clicks link to uvr.org.ua |
| `onLocaleChange(locale)` | Language toggle clicked |

See `types.ts` for the full `FamilyRegistrationAndProfilesProps` interface.

## Expected User Flows

### Flow 1: Select Category and Open Modal

1. User arrives at `/register`
2. User sees 4 category cards stacked vertically
3. User clicks a category card — it highlights; "Continue" activates
4. User clicks "Continue"
5. **Outcome:** UVR modal opens on the Register tab

### Flow 2: Sign In with UVR Code

1. User switches to "Sign In" tab in the modal
2. User enters email + UVR code from their uvr.org.ua personal cabinet
3. User clicks submit
4. **Outcome:** `onSignIn` fires; your backend verifies the credentials; on success, navigate to the family dashboard view

### Flow 3: Submit Family CV

1. User fills out the CV form (family name, story, service member, children, needs)
2. User sees live preview updating as they type
3. User clicks "Submit for Review"
4. **Outcome:** `onSubmit` fires with all form data; your backend stores the CV with status `pending`; success confirmation shown

## Integration Notes

- The UVR code verification must happen on your backend — the component fires `onSignIn(email, uvrCode, categoryId)` and expects you to handle validation.
- After successful sign-in, the component transitions to the dashboard view internally. You may also persist the session on your end.
- The live preview panel uses the same visual design as the public family cards on the donor browse page.

## Testing

See `product-plan/sections/family-registration-and-profiles/tests.md` for test specs.

## Files to Reference

- `product-plan/sections/family-registration-and-profiles/README.md`
- `product-plan/sections/family-registration-and-profiles/tests.md`
- `product-plan/sections/family-registration-and-profiles/components/`
- `product-plan/sections/family-registration-and-profiles/types.ts`
- `product-plan/sections/family-registration-and-profiles/sample-data.json`

## Done When

- [ ] `/register` route renders the category selection
- [ ] Category cards are selectable; "Continue" activates correctly
- [ ] UVR modal opens with Register and Sign In tabs
- [ ] Register tab shows 3-step instructions and link to uvr.org.ua
- [ ] Sign In form fires `onSignIn` callback with correct arguments
- [ ] After sign-in, family dashboard is shown
- [ ] CV form fields all work; live preview updates in real time
- [ ] Submit fires `onSubmit` and shows confirmation state
- [ ] Bilingual (UA/EN) throughout
- [ ] Responsive on mobile
