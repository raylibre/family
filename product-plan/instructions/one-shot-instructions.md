# Family to Family — Complete Implementation Instructions

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

## Testing

Each section includes a `tests.md` file with UI behavior test specs. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

# Family to Family — Product Overview

## Summary

Family to Family is a platform connecting families of Ukrainian military soldiers with donors and support organizations. Families register publicly with their story and specific needs; donors browse and send money directly to family bank accounts — the platform never handles funds. Organizations can also partner for in-kind support. All family profiles and donation records are reviewed by platform administrators before going public.

## Problems & Solutions

- **Families lack visibility** — soldiers' families have no easy way to reach people who want to help. The platform gives every registered family a public profile with their story, photo, and specific needs.
- **Donors can't find verified families** — donors want to help but don't know where to find real, vetted families. The platform maintains a curated, browsable list organized by category.
- **Lack of trust in money handling** — donors hesitate when intermediaries hold funds. All transfers go directly to the family's bank card; the platform facilitates the connection but never touches money.
- **Organizations need flexible options** — charities want to offer in-kind help beyond money. A partnership widget lets organizations contact the platform to arrange custom support packages.

## Sections

1. **Landing Page** — Public entry point with hero, mission statement, and two CTAs: "We Need Help" (families) and "I Want to Help" (donors). Bilingual (UA/EN).

2. **Family Registration & Profiles** — Families select their situation, authenticate via UVR code, then create a Family CV (story, photo, children, needs). Submitted CVs await admin review before appearing in the public list.

3. **Donor Browse & Connect** — Donors browse families by category, select a donation amount, and transfer money directly via their banking app. After sending, they log the donation in the platform for admin approval.

4. **Admin & Verification** — Password-protected portal for platform administrators to review and approve/cancel pending donations.

5. **Organization Support Flow** — A floating partnership widget on every page. NGOs and charities can leave contact details and express interest in providing in-kind support; the platform team follows up.

## Product Entities

- **Family** — Registered military family with story, photo, needs, and donation jar
- **FamilyNeed** — Specific support item (housing, food, medical, etc.) declared by a family
- **Donation** — A direct card-to-card transfer logged by a donor, pending admin approval
- **Admin** — Platform administrator who reviews families and approves donations
- **Organization** — Partner NGO or charity that provides custom in-kind support

## Design System

**Colors:** Ukrainian-soul palette — Ukrainian blue (`oklch(0.42 0.175 260)`), warm coral (`oklch(0.68 0.20 24)`), sunflower gold (`oklch(0.83 0.18 88)`), deep navy (`oklch(0.18 0.055 261)`), warm cream (`oklch(0.985 0.012 75)`).

**Typography:** DM Sans (400–900 weight range) — single font family for all text.

**Per-category colors:** Each of the 4 family situation categories has its own color (blue / coral / teal / gold) used consistently across both donor and family flows.

## Implementation Sequence

1. **Shell** — Design tokens + app shell with navigation header
2. **Landing Page** — Standalone public entry point
3. **Family Registration & Profiles** — Standalone registration + UVR auth + Family CV
4. **Donor Browse & Connect** — In-shell donor-facing section
5. **Admin & Verification** — In-shell admin portal (login + donations review)
6. **Organization Support Flow** — Floating partnership widget (add to root layout)


---


## Goal

Set up the design tokens and application shell — the persistent chrome that wraps the Donor Browse & Connect and Admin & Verification sections.

## What to Implement

### 1. Design Tokens

Configure your styling system with the Ukrainian-soul palette:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for DM Sans Google Fonts setup

**Critical:** Install the `lucide-react` package — it's required by `UserMenu`:
```bash
npm install lucide-react
```

### 2. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — main layout wrapper with sticky header
- `UserMenu.tsx` — avatar dropdown with admin panel link and logout
- `index.ts` — exports

**Wire Up Navigation:**

Connect these callbacks to your router:

| Callback | Navigate To |
|----------|-------------|
| `onNavigateHome` | Landing page (`/`) |
| `onNavigateAdmin` | Admin portal (`/admin`) |

**User Roles:**

The user menu shows an "Admin Panel" link only when `user.role === 'admin'`. Pass a `user` object from your auth system:

```tsx
<AppShell
  user={{ name: 'Олена', email: 'admin@familytofamily.org', role: 'admin' }}
  locale="uk"
  onLocaleChange={setLocale}
  onNavigateHome={() => router.push('/')}
  onNavigateAdmin={() => router.push('/admin')}
  onLogout={signOut}
>
  {children}
</AppShell>
```

**Language Toggle:**

The shell manages locale state externally. Store `locale` in your app state and pass it down.

## Files to Reference

- `product-plan/design-system/` — Design tokens and font setup
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] DM Sans font is loaded and applied globally
- [ ] Design tokens (oklch colors) are available in CSS
- [ ] Shell renders with sticky header on all in-shell pages
- [ ] Logo click navigates to landing page
- [ ] Language toggle works (locale state updates)
- [ ] User menu shows avatar, name, and email
- [ ] Admin users see "Admin Panel" option in the dropdown
- [ ] Logout callback fires when "Logout" is clicked
- [ ] Responsive: user menu accessible on mobile

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

---


## Goal

Add the floating partnership widget to every page of the platform.

## Overview

NGOs, charities, and support organizations can express interest in partnering with Family to Family directly from any page. The widget is a floating blue pill button in the bottom-right corner. Clicking it opens a modal where the organization leaves their contact details and a description of what support they can offer. On submit, they receive an email confirmation and the platform team follows up.

**Key Functionality:**
- Floating button with subtle pulse animation — visible on all pages
- Partnership modal with brief pitch + contact form
- Form fields: org name, contact person, email, support type chips (multi-select), free-text message
- Submit → success state + email confirmation sent to the organization
- Standalone widget — not tied to any specific page or route

## Components Provided

Copy from `product-plan/sections/organization-support-flow/components/`:

- `PartnershipWidget.tsx` — complete floating button + modal + form + success state

## Props Reference

```typescript
interface OrganizationSupportFlowProps {
  supportTypes: SupportType[]   // predefined support categories (food, medical, etc.)
  content: WidgetContent        // all bilingual UI copy
  locale?: Locale               // 'uk' | 'en'
  onSubmit?: (inquiry: Omit<PartnershipInquiry, 'id' | 'submittedAt'>) => void
  onLocaleChange?: (locale: Locale) => void
}
```

## Expected User Flows

### Flow 1: Submit Partnership Inquiry

1. Organization rep sees the blue "Become a partner" button floating on any page
2. Rep clicks the button — modal opens
3. Rep fills out: org name, contact person, email, support types (multi-select), message
4. Rep clicks "Send inquiry"
5. **Outcome:** `onSubmit(inquiry)` fires; your backend stores the inquiry and sends a confirmation email to the provided address; success state shown in the modal

## Integration Notes

- The widget renders absolutely positioned. Add it to your **root layout** (outside any page wrappers) so it appears on every page:

```tsx
// Root layout (e.g., layout.tsx in Next.js)
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <PartnershipWidget
          supportTypes={supportTypes}
          content={widgetContent}
          locale={locale}
          onSubmit={handlePartnershipInquiry}
        />
      </body>
    </html>
  )
}
```

- The `onSubmit` callback receives the inquiry data. Store it in your database and trigger an email (e.g., via SendGrid, Resend, or similar) to the organization's provided email address.
- The `supportTypes` and `content` can be fetched from your CMS or hardcoded from `sample-data.json`.

## Testing

See `product-plan/sections/organization-support-flow/tests.md` for test specs.

## Files to Reference

- `product-plan/sections/organization-support-flow/README.md`
- `product-plan/sections/organization-support-flow/tests.md`
- `product-plan/sections/organization-support-flow/components/`
- `product-plan/sections/organization-support-flow/types.ts`
- `product-plan/sections/organization-support-flow/sample-data.json`

## Done When

- [ ] Partnership button is visible on every page (fixed position, bottom-right)
- [ ] Button pulse animation is subtle and not distracting
- [ ] Modal opens on button click with partnership pitch text
- [ ] Form: all 4 fields work; support type chips toggle correctly
- [ ] Submit button is disabled until required fields (name, contact, email) are filled
- [ ] `onSubmit` fires with complete inquiry data
- [ ] Confirmation email is sent to the provided email address
- [ ] Success state shown after submission
- [ ] Modal closes and resets after success
- [ ] Mobile-friendly (modal is full-screen on small viewports)

---

