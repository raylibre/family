# UI Data Shapes

These types define the shape of data that UI components expect to receive as props. They are the **frontend contract** — what components need to render correctly.

How you model, store, and fetch this data on the backend is entirely your decision. You may combine, split, or extend these types to fit your architecture.

## Entities

- **Hero** — The featured person shown in the landing page hero (Mykhailo Prisiazhniuk). Has a photo URL and bilingual name/title. *(landing-page)*
- **Partner** — An organizational partner shown in the hero (Children's charity, UVR, Family to Family). Has a logo URL and website link. *(landing-page)*
- **FamilyCategory** — One of four family situation types (disability / died / missing / active). Used as the registration entry point. *(family-registration-and-profiles)*
- **UVRInfo** — All copy and config for the UVR authentication modal (URLs, labels, instructions). *(family-registration-and-profiles)*
- **DonorCategory** — Same four categories but from the donor perspective, with monthly support amounts. *(donor-browse-and-connect)*
- **Family** — A registered family with photo, story, needs, and donation jar data. Core entity of the platform. *(donor-browse-and-connect)*
- **FamilyNeed** — A specific item of support (housing, food, medical, etc.) declared by a family. *(donor-browse-and-connect)*
- **AdminUser** — A platform administrator with credentials and role. *(admin-and-verification)*
- **FamilyRecord** — Extended family type used in admin review, includes status, UVR code, rejection note. *(admin-and-verification)*
- **DonationRecord** — A donation submission awaiting admin approval. Includes donor info, amount, proof screenshot. *(admin-and-verification)*
- **DashboardStats** — Aggregate counts for the admin dashboard summary cards. *(admin-and-verification)*
- **SupportType** — A predefined category of in-kind support an NGO can offer (food, clothing, etc.). *(organization-support-flow)*
- **PartnershipInquiry** — A contact form submission from an NGO expressing interest in partnering. *(organization-support-flow)*

## Per-Section Types

Full interface definitions in each section:

- `sections/landing-page/types.ts`
- `sections/family-registration-and-profiles/types.ts`
- `sections/donor-browse-and-connect/types.ts`
- `sections/admin-and-verification/types.ts`
- `sections/organization-support-flow/types.ts`

## Combined Reference

See `overview.ts` for all data entity types in one file.
