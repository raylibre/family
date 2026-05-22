import { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AppShell } from '../shell/components/AppShell'
import { FamilyProfilePage } from '../sections/donor-browse-and-connect/components/FamilyProfilePage'
import { useAuth } from '../hooks/useAuth'
import data from '@/../product/sections/donor-browse-and-connect/data.json'
import type { Locale } from '../shell/components/AppShell'
import type { Family, DonorCategory } from '@/../product/sections/donor-browse-and-connect/types'

export function FamilyProfileRoute() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [locale, setLocale] = useState<Locale>('uk')

  // Use family passed via navigation state if available, otherwise fall back to JSON
  const stateFamily = (location.state as { family?: Family })?.family
  const stateCategories = (location.state as { categories?: DonorCategory[] })?.categories

  const family: Family | undefined = stateFamily ?? (data.families as Family[]).find(f => f.id === id)
  const categories: DonorCategory[] = stateCategories ?? (data.categories as DonorCategory[])

  async function handleDonate(familyId: string, amount: number, note?: string) {
    await supabase.from('donations').insert({
      family_id: familyId,
      amount,
      note: note ?? null,
      status: 'pending',
      donor_email: user?.email ?? null,
    })
  }

  return (
    <AppShell
      locale={locale}
      onLocaleChange={setLocale}
      onNavigateHome={() => navigate('/')}
      onNavigateAdmin={() => navigate('/admin')}
      user={user ?? undefined}
      onLogout={signOut}
    >
      {!family ? (
        <NotFound onBack={() => navigate('/browse')} locale={locale} />
      ) : (
        <FamilyProfilePage
          family={family}
          categories={categories}
          locale={locale}
          onBack={() => navigate('/browse')}
          onDonate={handleDonate}
        />
      )}
    </AppShell>
  )
}

function NotFound({ onBack, locale }: { onBack: () => void; locale: Locale }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-32 text-center px-4"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <p className="text-sm font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>
        {locale === 'uk' ? "Сім'ю не знайдено." : 'Family not found.'}
      </p>
      <button
        onClick={onBack}
        className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all"
        style={{ backgroundColor: 'oklch(0.42 0.175 260)' }}
      >
        {locale === 'uk' ? '← Назад до сімей' : '← Back to families'}
      </button>
    </div>
  )
}
