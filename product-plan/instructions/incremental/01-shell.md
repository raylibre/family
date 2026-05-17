# Milestone 1: Shell

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

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
