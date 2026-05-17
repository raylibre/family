// =============================================================================
// UI Data Shapes — Combined Reference
//
// These types define the data that UI components expect to receive as props.
// They are a frontend contract, not a database schema. How you model, store,
// and fetch this data on the backend is your implementation decision.
// =============================================================================

// -----------------------------------------------------------------------------
// From: sections/landing-page
// -----------------------------------------------------------------------------

export type Locale = 'uk' | 'en'

export interface LocalizedString {
  uk: string
  en: string
}

export interface Hero {
  name: LocalizedString
  title: LocalizedString
  photo: string
}

export interface Partner {
  id: string
  name: LocalizedString
  logo: string
  url: string
}

// -----------------------------------------------------------------------------
// From: sections/family-registration-and-profiles
// -----------------------------------------------------------------------------

export interface FamilyCategory {
  id: string
  title: LocalizedString
  description: LocalizedString
}

export interface UVRInfo {
  url: string
  registerTab: LocalizedString
  signInTab: LocalizedString
  registerHeading: LocalizedString
  registerBody: LocalizedString
  registerCTA: LocalizedString
  signInHeading: LocalizedString
  signInBody: LocalizedString
  emailLabel: LocalizedString
  codeLabel: LocalizedString
  submitLabel: LocalizedString
  errorMessage: LocalizedString
}

// -----------------------------------------------------------------------------
// From: sections/donor-browse-and-connect
// -----------------------------------------------------------------------------

export interface DonorCategory {
  id: string
  monthlyAmount: number
  title: LocalizedString
  description: LocalizedString
}

export interface FamilyNeed {
  id: string
  label: LocalizedString
}

export interface Family {
  id: string
  name: string
  photo: string
  categoryId: string
  monthlyTarget: number
  currentlyFunded: number
  story: LocalizedString
  needs: FamilyNeed[]
}

// -----------------------------------------------------------------------------
// From: sections/admin-and-verification
// -----------------------------------------------------------------------------

export type FamilyStatus = 'pending' | 'approved' | 'rejected' | 'archived'
export type DonationStatus = 'pending' | 'approved' | 'cancelled'

export interface ChildEntry {
  id: string
  age: string
}

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin'
  avatarInitials: string
}

export interface DashboardStats {
  pendingFamiliesCount: number
  pendingDonationsCount: number
  totalActiveFamilies: number
  approvedDonationsThisMonth: number
}

export interface FamilyRecord {
  id: string
  familyName: string
  categoryId: string
  status: FamilyStatus
  submittedAt: string
  uvrCode: string
  userEmail: string
  photo: string
  story: string
  memberName: string
  memberRank: string
  frontLineConfirmed: boolean
  children: ChildEntry[]
  selectedNeeds: string[]
  customNeed: string
  monthlyTarget: number
  currentlyFunded: number
  rejectionNote: string | null
}

export interface DonationRecord {
  id: string
  familyId: string
  familyName: string
  donorName: string
  donorEmail: string
  amount: number
  currency: string
  status: DonationStatus
  submittedAt: string
  note: string
  proofScreenshot: string
}

// -----------------------------------------------------------------------------
// From: sections/organization-support-flow
// -----------------------------------------------------------------------------

export interface SupportType {
  id: string
  label: LocalizedString
}

export interface PartnershipInquiry {
  id: string
  orgName: string
  contactPerson: string
  email: string
  supportTypeIds: string[]
  message: string
  submittedAt: string
}
