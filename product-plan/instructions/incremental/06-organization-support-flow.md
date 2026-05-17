# Milestone 6: Organization Support Flow

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestones 1–5 complete (or add at any point after the shell is set up)

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
