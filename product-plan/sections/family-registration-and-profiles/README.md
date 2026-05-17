# Family Registration & Profiles

## Overview

The entry point for families seeking help. Users select their family situation, authenticate via UVR code + email, then create and submit a Family CV — a public profile with their story, photo, children's ages, and specific needs. The CV goes to admin review before appearing on the public family list.

## User Flows

1. User selects one of four category cards (disability / died / missing / active service)
2. User clicks "Continue" → UVR modal opens with two tabs
3. **Register tab** — instructions to register at uvr.org.ua and get their unique code from the personal cabinet
4. **Sign In tab** — email + UVR code form; on success → family dashboard
5. **Family dashboard** — fills out CV form (family name, photo, story, service member, children, needs)
6. User sees live preview of how their card will look on the donor browse page
7. User submits → CV stored as "pending admin review"
8. After approval, profile is visible on the public donor browse page

## Design Decisions

- **Single-column category cards** — full-width horizontal cards with a number badge, title, and radio indicator. Each card uses the category's brand color (blue/coral/teal/gold).
- **UVR modal** — backdrop blur, two tabs, 3-step numbered instructions in blue circles, coral submit button.
- **Live preview panel** — sticky right column on desktop shows the card exactly as donors will see it.
- **Standalone (no shell)** — same minimal header as the landing page.

## Components

- `FamilyRegistrationAndProfiles` — main orchestrator (category selection + modal + dashboard)
- `CategoryCard` — individual category selection card
- `UVRModal` — two-tab modal (register/sign-in)
- `FamilyDashboard` — Family CV form with live preview

## Callback Props

| Callback | Triggered When |
|----------|----------------|
| `onSignIn` | User signs in with email + UVR code |
| `onNavigateToUVR` | User clicks the link to uvr.org.ua |
| `onLocaleChange` | User toggles language |
| `onSubmit` (FamilyDashboard) | User submits their Family CV |
