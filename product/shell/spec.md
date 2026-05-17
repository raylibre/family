# Application Shell Specification

## Overview
A minimal sticky header that wraps all in-app sections (Family Registration & Profiles, Donor Browse & Connect, Organization Support Flow, Admin & Verification). The shell stays out of the way — no sidebar, no section navigation — letting each section's own UI lead the experience.

## Navigation Structure
Sections are accessed through in-app flows, not a top nav menu. The header provides only global utilities.

## Header Contents (left → right)
- **Logo** — "Family to Family" wordmark, links back to the landing page
- **Language toggle** — UA / EN switcher
- **User menu** — Avatar with initials, opens a dropdown

## User Menu (role-aware)
- **All users:** User name + email, divider, Logout
- **Admin users only:** "Admin Panel" link visible in the dropdown

## Layout Pattern
Minimal sticky header (height ~60px) with full-width content area below. No sidebar.

## Responsive Behavior
- **Desktop:** Logo left, language toggle + user menu right, comfortable padding
- **Tablet:** Same layout, slightly reduced padding
- **Mobile:** Logo left, user menu right only (language toggle moves into user menu dropdown)

## Design Notes
- Colors: Ukrainian blue (primary), sunflower gold (secondary), warm coral (accent) — see `product/design-approach.md`
- Font: DM Sans throughout (headings bold, body regular)
- Header background: white with a 2px Ukrainian blue bottom border (not gray)
- Logo mark: heart/family icon in Ukrainian blue
- Language toggle: pill shape, Ukrainian blue border and text
- User avatar: Ukrainian blue background with white initials when no photo is set
