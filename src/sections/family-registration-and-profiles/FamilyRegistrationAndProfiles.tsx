import data from '@/../product/sections/family-registration-and-profiles/data.json'
import { FamilyRegistrationAndProfiles } from './components/FamilyRegistrationAndProfiles'

export default function FamilyRegistrationAndProfilesPreview() {
  return (
    <FamilyRegistrationAndProfiles
      categories={data.categories}
      uvrInfo={data.uvrInfo}
      content={data.content}
      locale="uk"
      onSignIn={(email, code, categoryId) =>
        console.log('Sign in:', { email, code, categoryId })
      }
      onNavigateToUVR={() => console.log('Navigate to UVR:', data.uvrInfo.url)}
      onLocaleChange={(locale) => console.log('Locale:', locale)}
    />
  )
}
