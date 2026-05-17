import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { AppShell } from '../shell/components/AppShell'
import { DonorBrowseAndConnect } from '../sections/donor-browse-and-connect/components/DonorBrowseAndConnect'
import { useAuth } from '../hooks/useAuth'
import data from '@/../product/sections/donor-browse-and-connect/data.json'
import type { Locale } from '../shell/components/AppShell'
import type { Family } from '@/../product/sections/donor-browse-and-connect/types'

const BLUE = 'oklch(0.42 0.175 260)'

const NEED_OPTIONS = [
  { id: 'housing',    uk: 'Оренда житла',           en: 'Housing rent' },
  { id: 'groceries',  uk: 'Продукти харчування',    en: 'Groceries' },
  { id: 'medical',    uk: 'Медична допомога',       en: 'Medical care' },
  { id: 'school',     uk: 'Шкільне приладдя',       en: 'School supplies' },
  { id: 'clothing',   uk: 'Дитячий одяг',           en: "Children's clothing" },
  { id: 'psychology', uk: 'Психологічна підтримка', en: 'Psychological support' },
  { id: 'utilities',  uk: 'Комунальні послуги',     en: 'Utilities' },
  { id: 'rehab',      uk: 'Реабілітація / протез',  en: 'Rehabilitation / prosthetics' },
]

export function DonorBrowseRoute() {
  const navigate = useNavigate()
  const [locale, setLocale] = useState<Locale>('uk')
  const { user, signOut } = useAuth()
  const [families, setFamilies] = useState<Family[]>(data.families as Family[])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFamilies()
  }, [])

  async function loadFamilies() {
    setLoading(true)
    setError(null)
    try {
      const [profilesResult, donationsResult] = await Promise.all([
        supabase
          .from('family_profiles')
          .select('*')
          .eq('registration_status', 'approved')
          .eq('cv_submitted', true),
        supabase
          .from('donations')
          .select('family_id, amount')
          .eq('status', 'approved')
          .gte('created_at', startOfMonth()),
      ])

      if (profilesResult.error) throw profilesResult.error
      if (donationsResult.error) throw donationsResult.error

      const profiles = profilesResult.data ?? []
      const approvedDonations = donationsResult.data ?? []

      const fundedByFamily: Record<string, number> = {}
      for (const d of approvedDonations) {
        fundedByFamily[d.family_id] = (fundedByFamily[d.family_id] ?? 0) + d.amount
      }

      if (profiles.length === 0) {
        // No approved families yet — keep the sample data fallback
        setFamilies(data.families as Family[])
      } else {
        setFamilies(profiles.map(p => {
          const category = data.categories.find(c => c.id === p.category_id)
          const needs = (p.selected_needs ?? [])
            .map((id: string) => NEED_OPTIONS.find(n => n.id === id))
            .filter(Boolean)
            .map((n: typeof NEED_OPTIONS[0]) => ({ id: n.id, label: { uk: n.uk, en: n.en } }))
          if (p.custom_need) {
            needs.push({ id: 'custom', label: { uk: p.custom_need, en: p.custom_need } })
          }
          return {
            id: p.id,
            name: p.family_name ?? 'Родина',
            photo: p.photo_url ?? '',
            cardNumber: p.card_number ?? undefined,
            categoryId: p.category_id,
            monthlyTarget: category?.monthlyAmount ?? 300,
            currentlyFunded: fundedByFamily[p.id] ?? 0,
            story: { uk: p.story ?? '', en: p.story ?? '' },
            needs,
          }
        }))
      }
    } catch {
      setError('Не вдалося завантажити дані. Спробуйте ще раз.')
    } finally {
      setLoading(false)
    }
  }

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
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={loadFamilies} />
      ) : (
        <DonorBrowseAndConnect
          categories={data.categories}
          families={families}
          content={data.content}
          locale={locale}
          onDonate={handleDonate}
        />
      )}
    </AppShell>
  )
}

function startOfMonth(): string {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
}

function LoadingState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-32"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <div
        className="w-10 h-10 rounded-full border-4 animate-spin"
        style={{ borderColor: `${BLUE}30`, borderTopColor: BLUE }}
      />
      <p className="text-sm font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>
        Завантаження сімей…
      </p>
    </div>
  )
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-4 py-32 text-center px-4"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      <p className="text-sm font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>{message}</p>
      <button
        onClick={onRetry}
        className="px-6 py-2.5 rounded-full text-sm font-bold text-white transition-all"
        style={{ backgroundColor: BLUE }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.30 0.14 260)' }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE }}
      >
        Спробувати знову
      </button>
    </div>
  )
}

