export type Locale = 'uk' | 'en';

export interface LocalizedString {
  uk: string;
  en: string;
}

export interface FamilyCategory {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
}

export interface UVRInfo {
  url: string;
  registerTab: LocalizedString;
  signInTab: LocalizedString;
  registerHeading: LocalizedString;
  registerBody: LocalizedString;
  registerCTA: LocalizedString;
  signInHeading: LocalizedString;
  signInBody: LocalizedString;
  emailLabel: LocalizedString;
  codeLabel: LocalizedString;
  submitLabel: LocalizedString;
  errorMessage: LocalizedString;
}

export interface PageContent {
  pageTitle: string;
  pageSubtitle: string;
  continueButton: string;
  languageToggle: string;
  modalTitle: string;
}

export interface Content {
  uk: PageContent;
  en: PageContent;
}

export interface FamilyDashboardSubmitData {
  familyName: string;
  story: string;
  memberName: string;
  memberRank: string;
  frontLineConfirmed: boolean;
  children: { id: string; age: string }[];
  selectedNeeds: string[];
  customNeed: string;
  categoryId: string;
  photoFile: File | null;
}

export interface FamilyRegistrationAndProfilesProps {
  categories: FamilyCategory[];
  uvrInfo: UVRInfo;
  content: Content;
  locale?: Locale;
  /** Called when the user successfully signs in with their UVR email and code */
  onSignIn?: (email: string, uvrCode: string, categoryId: string) => void;
  /** Called when the user clicks the link to go to the UVR website */
  onNavigateToUVR?: () => void;
  /** Called when the user toggles the language */
  onLocaleChange?: (locale: Locale) => void;
  /** Called when the family submits their CV from the dashboard */
  onSubmit?: (data: FamilyDashboardSubmitData) => void;
}
