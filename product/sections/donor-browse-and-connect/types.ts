export type Locale = 'uk' | 'en';

export interface LocalizedString {
  uk: string;
  en: string;
}

export interface DonorCategory {
  id: string;
  monthlyAmount: number;
  title: LocalizedString;
  description: LocalizedString;
}

export interface FamilyNeed {
  id: string;
  label: LocalizedString;
}

export interface Family {
  id: string;
  name: string;
  photo: string;
  photos?: string[];
  childName?: string;
  childAge?: number;
  cardNumber?: string;
  categoryId: string;
  monthlyTarget: number;
  currentlyFunded: number;
  story: LocalizedString;
  needs: FamilyNeed[];
  whatsapp?: string;
  signal?: string;
  viber?: string;
}

export interface PageContent {
  pageTitle: string;
  pageSubtitle: string;
  perMonth: string;
  browseButton: string;
  viewAllButton: string;
  changeCategory: string;
  allFamilies: string;
  covered: string;
  fillTheJar: string;
  donateButton: string;
  languageToggle: string;
}

export interface Content {
  uk: PageContent;
  en: PageContent;
}

export interface DonorBrowseAndConnectProps {
  categories: DonorCategory[];
  families: Family[];
  content: Content;
  locale?: Locale;
  /** Called when donor confirms a donation */
  onDonate?: (familyId: string, amount: number, note?: string) => void;
  /** Called when the language toggle is clicked */
  onLocaleChange?: (locale: Locale) => void;
}
