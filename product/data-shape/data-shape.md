# Data Shape

## Entities

### Family
A registered family of a Ukrainian military soldier. Includes their story, a photo, the number and ages of children, their specific needs/wishlist, and a bank account for direct donations.

### FamilyNeed
A specific item or category of need declared by a family — used to categorize families on the donor browse page.

### Donor
An individual or organization that browses the platform and sends support directly to a family. May be a private person, a physical location, or a registered organization.

### Donation
A record of a donor expressing intent or completing a direct bank transfer to a specific family. The platform does not process the payment — this is a log of the connection.

### Organization
A partner NGO, charity, or support group (such as the children's charity or Ukrainian Military Movement) that coordinates custom in-kind support for families through the platform.

### Admin
A platform administrator who reviews family registrations, approves profiles, and manages the integrity of the public listing.

## Relationships

- Family has many FamilyNeeds
- Donor makes many Donations
- Donation connects one Donor to one Family
- Organization supports many Families (via custom arrangements)
- Admin approves and manages many Families
