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

export interface Category {
  id: string
  label: { uk: string; en: string }
}

export interface AdminAndVerificationProps {
  adminUser: AdminUser
  dashboardStats: DashboardStats
  families: FamilyRecord[]
  donations: DonationRecord[]
  categories: Category[]

  /** Admin successfully logs in */
  onLogin?: (email: string, password: string) => void

  /** Admin approves a pending family CV — makes it publicly visible */
  onApproveFamily?: (familyId: string) => void

  /** Admin rejects a family CV with an optional note */
  onRejectFamily?: (familyId: string, note?: string) => void

  /** Admin archives a family (soft delete — hidden but recoverable) */
  onArchiveFamily?: (familyId: string) => void

  /** Admin permanently deletes a family record — irreversible */
  onDeleteFamily?: (familyId: string) => void

  /** Admin approves a donation — jar total is updated */
  onApproveDonation?: (donationId: string) => void

  /** Admin cancels a donation — jar is unaffected */
  onCancelDonation?: (donationId: string) => void
}
