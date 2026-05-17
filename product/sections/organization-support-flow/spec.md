# Organization Support Flow Specification

## Overview
A floating partnership widget that appears on every page of the platform. NGOs, charities, and support organizations can click it to open a modal form and express interest in partnering with Family to Family. After submission, the organization sees a success message and receives an email confirmation; the platform team follows up manually to arrange the partnership.

## User Flows
- A floating button is fixed to the bottom-right corner of every page
- User (organization representative) clicks the button to open a partnership modal
- Modal shows a brief pitch about partnering with the platform
- User fills out: organization name, contact person name, email address, type of support they can offer (selected from predefined options), and a free-text message
- User submits the form
- Modal shows a success state with a thank-you message and note that the team will be in touch
- An automated email confirmation is sent to the provided email address

## UI Requirements
- Floating button fixed to bottom-right corner, visible on all pages (z-index above content)
- Button should be visually distinct but not intrusive — a small pill with an icon and short label
- Modal opens on click: centered overlay with backdrop blur
- Modal contains: headline pitch, partnership form, submit button
- Form fields: organization name, contact person, email, support type (checkbox or tag selection from predefined list), free-text message
- Predefined support types: Food & groceries, Clothing, Medical care, School supplies, Psychological support, Financial support, Other
- After submit: replace form with success state (checkmark, thank-you message, close button)
- Mobile-friendly modal (full-screen on small screens)
- Standalone component — not tied to the app shell

## Configuration
- shell: false
