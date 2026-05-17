import data from '@/../product/sections/landing-page/data.json'
import { LandingPage } from './components/LandingPage'

export default function LandingPagePreview() {
  return (
    <LandingPage
      hero={data.hero}
      partners={data.partners}
      content={data.content}
      locale="uk"
      onFamilyRegister={() => console.log('Navigate to family registration')}
      onDonorBrowse={() => console.log('Navigate to donor browse')}
      onLocaleChange={(locale) => console.log('Locale changed to:', locale)}
    />
  )
}
