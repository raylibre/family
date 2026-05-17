# Application Shell

## Overview

The app shell is the persistent navigation chrome that wraps the Donor Browse & Connect and Admin & Verification sections. It provides a sticky header with the Family to Family logo, a language toggle (UA/EN), and a user menu.

## When to Use

Sections with `shell: true` in their spec should render inside `AppShell`. Currently:
- **Donor Browse & Connect** — main donor-facing section
- **Admin & Verification** — admin portal

Standalone sections (landing page, family registration, partnership widget) manage their own headers.

## Components

- `AppShell.tsx` — main layout wrapper with sticky header and content area
- `UserMenu.tsx` — user avatar dropdown with admin panel link and logout

## Props

```tsx
interface AppShellProps {
  children: React.ReactNode
  user?: UserMenuUser          // If provided, shows user menu
  locale?: 'uk' | 'en'        // Current language
  onLocaleChange?: (locale) => void
  onNavigateHome?: () => void  // Logo click
  onNavigateAdmin?: () => void // Admin panel link (admin role only)
  onLogout?: () => void
}

interface UserMenuUser {
  name: string
  email?: string
  avatarUrl?: string
  role?: 'admin' | 'family' | 'donor'
}
```

## Dependency

`UserMenu` uses `lucide-react` for icons. Install it:
```bash
npm install lucide-react
```

## Design

- Sticky header, 60px height
- 2.5px Ukrainian blue bottom border
- Logo: blue rounded icon + "Family to Family" wordmark
- Language toggle: blue pill outline button
- User avatar: blue circle with initials, or photo if `avatarUrl` provided
- Admin users see an "Admin Panel" option in the dropdown
