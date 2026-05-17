import { useState, useEffect } from 'react'
import type { FamilyRegistrationAndProfilesProps, Locale } from '../types'
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
  onLocaleChange,
}: FamilyRegistrationAndProfilesProps) {
  const [locale, setLocale] = useState<Locale>(initialLocale)
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

  function toggleLocale() {
    const next: Locale = locale === 'uk' ? 'en' : 'uk'
    setLocale(next)
    onLocaleChange?.(next)
  }

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
      {/* Header */}
      <header
        className="sticky top-0 z-40 bg-white px-5 sm:px-10 h-[60px] flex items-center justify-between"
        style={{ borderBottom: `2.5px solid ${BLUE}` }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: BLUE }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M7.5 2C5.2 2 3 4 3 6.5C3 9.5 5.5 12 7.5 13.5C9.5 12 12 9.5 12 6.5C12 4 9.8 2 7.5 2Z" fill="white" />
            </svg>
          </div>
          <span className="text-sm font-black" style={{ color: NAVY }}>
            Family to Family
          </span>
        </div>

        <button
          onClick={toggleLocale}
          className="px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full border-2 transition-all duration-150"
          style={{ borderColor: BLUE, color: BLUE, backgroundColor: 'white' }}
          onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE; e.currentTarget.style.color = 'white' }}
          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = BLUE }}
        >
          {t.languageToggle}
        </button>
      </header>

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
