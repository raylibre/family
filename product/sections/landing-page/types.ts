export type Locale = 'uk' | 'en';

export interface LocalizedString {
  uk: string;
  en: string;
}

export interface Hero {
  name: LocalizedString;
  title: LocalizedString;
  subtitle?: LocalizedString;
  photo: string;
}

export interface Partner {
  id: string;
  name: LocalizedString;
  logo: string;
  url: string;
}

export interface LocaleContent {
  missionLine1: string;
  missionLine2: string;
  ctaFamily: string;
  ctaDonor: string;
  languageToggle: string;
}

export interface Content {
  uk: LocaleContent;
  en: LocaleContent;
}

export interface LandingPageProps {
  hero: Hero;
  partners: Partner[];
  content: Content;
  locale?: Locale;
  /** Called when the user clicks "We Need Help" — navigate to family registration */
  onFamilyRegister?: () => void;
  /** Called when the user clicks "I Want to Help" — navigate to donor browse */
  onDonorBrowse?: () => void;
  /** Called when the user toggles the language switcher */
  onLocaleChange?: (locale: Locale) => void;
}
