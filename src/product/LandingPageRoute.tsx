import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppShell } from '../shell/components/AppShell'
import { LandingPage } from '../sections/landing-page/components/LandingPage'
import { useAuth } from '../hooks/useAuth'
import data from '@/../product/sections/landing-page/data.json'
import type { Locale } from '../shell/components/AppShell'

export function LandingPageRoute() {
  const navigate = useNavigate()
  const [locale, setLocale] = useState<Locale>('uk')
  const { user, signOut } = useAuth()

  return (
    <AppShell
      locale={locale}
      onLocaleChange={setLocale}
      onNavigateHome={() => navigate('/')}
      user={user ?? undefined}
      onLogout={signOut}
    >
      <LandingPage
        hero={data.hero}
        partners={data.partners}
        content={data.content}
        locale={locale}
        onLocaleChange={setLocale}
        onDonorBrowse={() => navigate('/browse')}
        onFamilyRegister={() => navigate('/register')}
      />
    </AppShell>
  )
}
