import { useState, useEffect } from 'react'
import type { FamilyRegistrationAndProfilesProps, Locale } from '@/../product/sections/family-registration-and-profiles/types'
import { CategoryCard } from './CategoryCard'
import { UVRModal } from './UVRModal'
import { FamilyDashboard } from './FamilyDashboard'

const BLUE  = 'oklch(0.42 0.175 260)'
const CORAL = 'oklch(0.68 0.20 24)'
const NAVY  = 'oklch(0.18 0.055 261)'
const CREAM = 'oklch(0.985 0.012 75)'

export function FamilyRegistrationAndProfiles({
  categories,
  uvrInfo,
  content,
  locale: initialLocale = 'uk',
  onSignIn,
  onNavigateToUVR,
  onLocaleChange: _onLocaleChange,
  onSubmit,
}: FamilyRegistrationAndProfilesProps) {
  const [locale, _setLocale] = useState<Locale>(initialLocale)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [view, setView] = useState<'categories' | 'dashboard'>('categories')
  const [signedInEmail, setSignedInEmail] = useState<string>('')

  const t = content[locale]

  useEffect(() => {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap'
    document.head.appendChild(link)
    return () => { document.head.removeChild(link) }
  }, [])

  function handleSignIn(email: string, uvrCode: string, categoryId: string) {
    setSignedInEmail(email)
    setIsModalOpen(false)
    setView('dashboard')
    onSignIn?.(email, uvrCode, categoryId)
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: CREAM, fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Category selection view */}
      {view === 'categories' && (
        <div className="max-w-2xl mx-auto px-5 sm:px-10 pt-12 pb-16">

          {/* Page heading */}
          <div className="mb-10">
            <p className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: BLUE }}>
              Family to Family
            </p>
            <h1 className="text-2xl sm:text-[28px] font-black leading-tight" style={{ color: NAVY }}>
              {t.pageTitle}
            </h1>
            <p className="mt-2.5 text-[15px] leading-relaxed" style={{ color: 'oklch(0.48 0.07 258)' }}>
              {t.pageSubtitle}
            </p>
          </div>

          {/* Single-column category cards */}
          <div className="flex flex-col gap-3">
            {categories.map((cat, index) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                locale={locale}
                isSelected={selectedId === cat.id}
                index={index}
                onClick={() => setSelectedId(cat.id)}
              />
            ))}
          </div>

          {/* Continue button */}
          <div className="mt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={!selectedId}
              className="px-10 py-4 rounded-full font-black text-base transition-all duration-200 disabled:cursor-not-allowed hover:-translate-y-0.5"
              style={{
                backgroundColor: selectedId ? CORAL : 'oklch(0.89 0.02 258)',
                color: selectedId ? 'white' : 'oklch(0.62 0.05 258)',
                boxShadow: selectedId ? `0 6px 22px -4px ${CORAL}50` : 'none',
              }}
              onMouseEnter={e => { if (selectedId) e.currentTarget.style.backgroundColor = 'oklch(0.55 0.20 24)' }}
              onMouseLeave={e => { if (selectedId) e.currentTarget.style.backgroundColor = CORAL }}
            >
              {t.continueButton}
            </button>
          </div>
        </div>
      )}

      {/* Dashboard view — shown after successful sign-in */}
      {view === 'dashboard' && selectedId && (
        <FamilyDashboard
          categories={categories}
          selectedCategoryId={selectedId}
          locale={locale}
          userEmail={signedInEmail}
          onSubmit={onSubmit}
        />
      )}

      {/* UVR Modal */}
      <UVRModal
        isOpen={isModalOpen}
        uvrInfo={uvrInfo}
        locale={locale}
        modalTitle={t.modalTitle}
        selectedCategoryId={selectedId}
        onClose={() => setIsModalOpen(false)}
        onSignIn={handleSignIn}
        onNavigateToUVR={onNavigateToUVR}
      />
    </div>
  )
}
