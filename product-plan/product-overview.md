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
