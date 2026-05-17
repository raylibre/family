export type Locale = 'uk' | 'en'

export interface LocalizedString {
  uk: string
  en: string
}

export interface SupportType {
  id: string
  label: LocalizedString
}

export interface WidgetContent {
  buttonLabel: LocalizedString
  modalHeadline: LocalizedString
  modalSubheadline: LocalizedString
  orgNameLabel: LocalizedString
  contactLabel: LocalizedString
  emailLabel: LocalizedString
  supportTypeLabel: LocalizedString
  messageLabel: LocalizedString
  messagePlaceholder: LocalizedString
  submitLabel: LocalizedString
  successHeadline: LocalizedString
  successBody: LocalizedString
  successClose: LocalizedString
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

export interface OrganizationSupportFlowProps {
  supportTypes: SupportType[]
  content: WidgetContent
  locale?: Locale

  /** Called when the organization submits the partnership form */
  onSubmit?: (inquiry: Omit<PartnershipInquiry, 'id' | 'submittedAt'>) => void

  /** Called when the locale toggle is clicked */
  onLocaleChange?: (locale: Locale) => void
}
