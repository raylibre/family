# Admin & Verification

## Overview

A password-protected admin portal inside the app shell. Admins log in, then review pending donations (approve or cancel). Approved donations count toward family jar totals; cancelled ones are discarded.

## User Flows

1. Admin sees login screen (email + password)
2. On success → donations review page
3. Admin sees filter tabs: All / Pending / Approved / Cancelled with counts
4. Each donation card shows: family name, donor name/email, amount, date, optional note, optional proof screenshot
5. Admin clicks proof thumbnail → lightbox opens full screenshot
6. Admin clicks **Approve** → donation counted toward family's jar total
7. Admin clicks **Cancel** → donation discarded, jar unaffected
8. Optimistic state update: action reflected immediately in UI

## Design Decisions

- **Login screen** — dark navy background with dot grid texture, white card with tri-color accent strip (blue → gold → coral).
- **Donation cards** — gold outline for pending, green for approved, coral for cancelled. Amount shown prominently on the left.
- **Lightbox** — full-screen proof screenshot viewer with blur backdrop.
- **Optimistic updates** — status changes applied locally immediately (no loading state between click and update).
- **Shell: true** — renders inside AppShell.

## Components

- `AdminPortal` — orchestrator (login → donations review)
- `AdminLogin` — login form
- `DonationsReview` — full donations review page with filters and action buttons

## Callback Props

| Callback | Triggered When |
|----------|----------------|
| `onLogin` | Admin submits login credentials |
| `onApproveDonation` | Admin clicks Approve on a donation |
| `onCancelDonation` | Admin clicks Cancel on a donation |
