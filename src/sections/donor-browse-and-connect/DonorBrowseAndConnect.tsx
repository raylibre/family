import { useState } from 'react'
import data from '@/../product/sections/donor-browse-and-connect/data.json'
import { DonorBrowseAndConnect } from './components/DonorBrowseAndConnect'
import type { Locale } from '@/../product/sections/donor-browse-and-connect/types'

export default function DonorBrowseAndConnectPreview() {
  const [locale, setLocale] = useState<Locale>('en')

  return (
    <DonorBrowseAndConnect
      categories={data.categories}
      families={data.families}
      content={data.content}
      locale={locale}
      onDonate={(familyId, amount) => console.log('Donate', amount, 'to', familyId)}
      onLocaleChange={setLocale}
    />
  )
}
