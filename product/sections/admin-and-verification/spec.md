# Admin & Verification Specification

## Overview
A password-protected admin portal inside the app shell for platform administrators. Admins log in with admin credentials, land on a summary dashboard with key metrics, then navigate to separate pages to review pending family CVs and pending donations. They can also manage the full family listing — archiving or permanently deleting entries.

## User Flows

### Login
- Admin navigates to the admin section
- Sees a login form (email + password)
- On success, lands on the admin dashboard

### Dashboard
- Summary cards at the top: pending family CVs count, pending donations count, total active (approved) families, total approved donations this month
- Two action buttons / links: "Review Families" and "Review Donations"

### Family CV Review (separate page)
- Admin sees a list of all families with status filter: pending / approved / rejected
- Each row shows: family name, category, submission date, current status
- Admin clicks a family to open full CV preview (exactly how it looks on the donor browse page: photo, story, service member info, children, needs)
- Admin approves → family becomes publicly visible on the donor browse page
- Admin rejects → family is hidden; admin can optionally add a rejection note
- Approved families can be archived (hidden from public, data kept, recoverable) or permanently deleted (with a confirmation step)

### Donation Review (separate page)
- Admin sees a list of pending donations: family name, donor name/email, amount (USD), submission date, optional note
- Admin can view the proof screenshot uploaded by the donor (if any)
- Admin approves → donation counted toward the family's jar total
- Admin cancels → donation discarded, jar unaffected

### Listings Management (within Family CV Review page)
- Filter families by status (pending / approved / rejected / archived)
- Search by family name
- Quick-action buttons per row: Approve, Reject, Archive, Delete
- Delete requires a confirmation dialog

## UI Requirements
- Admin login screen with email + password fields
- Dashboard summary cards (4 metrics) with navigation to review pages
- Families page: filterable status tabs + sortable list + expandable CV preview panel
- Donations page: list with proof screenshot preview, approve/cancel actions
- Confirmation modal before permanent deletion
- Status badges: Pending (gold), Approved (green), Rejected (red/coral), Archived (grey)
- Desktop-first layout but usable on tablet

## Configuration
- shell: true
