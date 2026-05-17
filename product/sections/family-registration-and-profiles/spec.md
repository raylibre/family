# Family Registration & Profiles Specification

## Overview
The entry point for families seeking help — reached by clicking "I Need Help" on the landing page. Users first select their family situation, then authenticate using a UVR code from their personal UVR cabinet plus their email. After sign-in they land on their family dashboard, where they create and submit a Family CV — a public profile with their story, photo, children's ages, and specific needs — which goes to admin review before appearing in the public family list.

## User Flows
- User arrives from the landing page ("I Need Help" button)
- User sees four vertically stacked category cards, each describing a distinct family situation
- User clicks a category card — it becomes highlighted; the "Continue" button at the bottom activates
- User clicks "Continue" — a modal popup opens with two tabs
- **Tab 1 — Register at UVR:** Explanatory text about why UVR registration is required, instructions to log in to their personal cabinet at uvr.org.ua and copy their unique UVR code from there, plus a prominent link/button to uvr.org.ua
- **Tab 2 — Sign In:** Email field + UVR code field (obtained from personal UVR cabinet) + submit button; inline error if credentials fail
- On successful sign-in, the user is navigated to their family dashboard
- **Family dashboard — Create Family CV:**
  - User fills in the Family CV form: family name, photo upload, short story, service member details (name, rank, front-line service confirmation), children's ages, specific needs (selectable categories + free text)
  - User previews how their profile will appear on the public family list
  - User submits the CV — it is stored in the database with status "pending admin review"
  - A confirmation message is shown: "Your profile has been submitted and will appear in the family list once reviewed by our team"
- After approval, the family's profile is visible on the public donor browse page
- User can return to the dashboard to edit their CV (edits re-trigger admin review)

## UI Requirements
- Standalone full-page layout (no app shell) with the same minimal header as the landing page (logo + language toggle)
- Four category cards stacked vertically, each full-width or near full-width
- Each card shows a title and a short supporting description of the situation
- Selected card is visually highlighted (teal accent, elevated style)
- "Continue" button below the cards — disabled (grayed out) until a category is selected, active once one is chosen
- Modal popup with two clearly labeled tabs: "Register at UVR" and "Sign In"
- Register tab: step-by-step instructions explaining UVR registration is required, with emphasis on finding the unique code in the personal UVR cabinet + link to uvr.org.ua
- Sign-in tab: email input, UVR code input, submit button; inline error state if credentials fail
- Page and popup are fully bilingual (UA / EN)
- Mobile responsive: cards stack naturally, popup is full-screen on mobile
- **Family dashboard (post sign-in):**
  - Clean form with labeled sections: Family Info, Service Member Info, Children, Needs
  - Photo upload with preview
  - Needs selection: checkboxes for predefined categories + optional free-text field
  - Live preview panel showing how the card will look on the donor browse page
  - Submit button with clear pending-review status after submission
  - Edit mode available after submission; edited CVs revert to pending status

## Configuration
- shell: false
