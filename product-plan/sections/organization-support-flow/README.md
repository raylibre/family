# Organization Support Flow

## Overview

A floating partnership widget that lives on every page of the platform. NGOs, charities, and support organizations can click the button to open a modal, fill out a contact form, and express interest in partnering. The platform team follows up manually; the organization receives an email confirmation on submit.

## User Flows

1. Floating blue pill button is visible in the bottom-right corner of every page
2. Organization rep clicks the button → modal opens
3. Modal shows a brief partnership pitch
4. Rep fills out: organization name, contact person, email, support types (multi-select chips), free-text message
5. Rep clicks "Send inquiry" → success state shown
6. Modal displays thank-you + "team will be in touch" message
7. Email confirmation sent to the provided address

## Design Decisions

- **Floating button with pulse ring** — subtle `animate-ping` ring draws attention without being intrusive.
- **Tri-color accent strip** — blue → gold → coral gradient at the top of the modal mirrors the brand's three hero colors.
- **Multi-select support type chips** — toggle on/off with a checkmark indicator. Selected chips use Ukrainian blue fill.
- **Standalone (shell: false)** — purely a floating overlay; can be dropped onto any page regardless of shell context.

## Components

- `PartnershipWidget` — the complete floating button + modal + form + success state

## Callback Props

| Callback | Triggered When |
|----------|----------------|
| `onSubmit` | Organization submits the partnership form |
| `onLocaleChange` | Language toggle clicked |

## Integration

Drop `<PartnershipWidget>` anywhere in your app layout (e.g., in the root layout or shell) and it will float over all content:

```tsx
<PartnershipWidget
  supportTypes={supportTypes}
  content={widgetContent}
  locale="en"
  onSubmit={(inquiry) => sendPartnershipEmail(inquiry)}
/>
```
