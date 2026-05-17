import { useState } from 'react'
import type { UVRInfo, Locale } from '@/../product/sections/family-registration-and-profiles/types'

interface UVRModalProps {
  isOpen: boolean
  uvrInfo: UVRInfo
  locale: Locale
  modalTitle: string
  selectedCategoryId: string | null
  onClose: () => void
  onSignIn?: (email: string, uvrCode: string, categoryId: string) => void
  onNavigateToUVR?: () => void
}

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const CORAL     = 'oklch(0.68 0.20 24)'
const NAVY      = 'oklch(0.18 0.055 261)'
const BORDER    = 'oklch(0.91 0.025 258)'

export function UVRModal({
  isOpen,
  uvrInfo,
  locale,
  modalTitle,
  selectedCategoryId,
  onClose,
  onSignIn,
  onNavigateToUVR,
}: UVRModalProps) {
  const [activeTab, setActiveTab] = useState<'register' | 'signin'>('register')
  const [email, setEmail] = useState('')
  const [uvrCode, setUvrCode] = useState('')
  const [showError, setShowError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !uvrCode || !selectedCategoryId) return
    setShowError(false)
    setIsSubmitting(true)
    // Simulate a brief loading state before calling onSignIn
    setTimeout(() => {
      setIsSubmitting(false)
      onSignIn?.(email, uvrCode, selectedCategoryId)
    }, 800)
  }

  function handleTabChange(tab: 'register' | 'signin') {
    setActiveTab(tab)
    setShowError(false)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ backgroundColor: 'rgba(15,30,61,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative bg-white w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '92vh', fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {/* ── Header ── */}
        <div
          className="flex items-center justify-between px-6 pt-6 pb-5"
          style={{ borderBottom: `1.5px solid ${BORDER}` }}
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: 'oklch(0.55 0.07 258)' }}>
              Family to Family
            </p>
            <h2 className="text-lg font-black" style={{ color: NAVY }}>
              {modalTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            style={{ backgroundColor: 'oklch(0.94 0.02 258)', color: 'oklch(0.48 0.07 258)' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.88 0.03 258)' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'oklch(0.94 0.02 258)' }}
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex px-6 pt-1" style={{ borderBottom: `1.5px solid ${BORDER}` }}>
          {(['register', 'signin'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className="pb-3 mr-7 text-sm font-bold border-b-2 transition-all"
              style={{
                borderColor: activeTab === tab ? BLUE : 'transparent',
                color: activeTab === tab ? BLUE : 'oklch(0.55 0.07 258)',
              }}
            >
              {tab === 'register' ? uvrInfo.registerTab[locale] : uvrInfo.signInTab[locale]}
            </button>
          ))}
        </div>

        {/* ── Tab content ── */}
        <div className="overflow-y-auto flex-1 px-6 py-6">

          {activeTab === 'register' ? (
            <div className="flex flex-col gap-5">
              {/* Steps explanation */}
              <div className="flex flex-col gap-4">
                {/* Step 1 */}
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: BLUE }}>
                    1
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>{uvrInfo.registerHeading[locale]}</p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      {uvrInfo.registerBody[locale]}
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: BLUE }}>
                    2
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>
                      {locale === 'uk'
                        ? 'Знайдіть ваш унікальний код у особистому кабінеті УВР'
                        : 'Find your unique code in your UVR personal cabinet'}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      {locale === 'uk'
                        ? 'Після реєстрації увійдіть в особистий кабінет — там буде ваш код'
                        : 'After registering, log in to your personal cabinet — your code will be there'}
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3 items-start">
                  <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-black text-white" style={{ backgroundColor: BLUE }}>
                    3
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: NAVY }}>
                      {locale === 'uk' ? 'Поверніться та увійдіть' : 'Come back and sign in'}
                    </p>
                    <p className="text-xs mt-1" style={{ color: 'oklch(0.48 0.07 258)' }}>
                      {locale === 'uk'
                        ? 'Використайте ваш email та отриманий код на вкладці «Увійти»'
                        : 'Use your email and the code on the Sign In tab'}
                    </p>
                  </div>
                </div>
              </div>

              {/* UVR CTA button */}
              <a
                href={uvrInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onNavigateToUVR}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: BLUE, boxShadow: `0 6px 22px -4px ${BLUE}55` }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = BLUE_DEEP }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = BLUE }}
              >
                {uvrInfo.registerCTA[locale]}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Switch to sign in */}
              <button
                onClick={() => handleTabChange('signin')}
                className="text-sm font-semibold text-center underline underline-offset-2 transition-colors"
                style={{ color: 'oklch(0.55 0.07 258)' }}
                onMouseEnter={e => { e.currentTarget.style.color = BLUE }}
                onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
              >
                {uvrInfo.signInTab[locale]} →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div>
                <p className="text-sm font-bold mb-0.5" style={{ color: NAVY }}>{uvrInfo.signInHeading[locale]}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'oklch(0.48 0.07 258)' }}>
                  {uvrInfo.signInBody[locale]}
                </p>
              </div>

              {/* Error message */}
              {showError && (
                <div
                  className="flex items-start gap-2.5 p-3.5 rounded-xl text-sm"
                  style={{ backgroundColor: 'oklch(0.97 0.018 28)', color: 'oklch(0.45 0.18 24)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  {uvrInfo.errorMessage[locale]}
                </div>
              )}

              {/* Email field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'oklch(0.55 0.07 258)' }}>
                  {uvrInfo.emailLabel[locale]}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    border: `1.5px solid ${BORDER}`,
                    color: NAVY,
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: 'white',
                  }}
                  placeholder="name@example.com"
                  onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                  onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                  required
                />
              </div>

              {/* UVR code field */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: 'oklch(0.55 0.07 258)' }}>
                  {uvrInfo.codeLabel[locale]}
                </label>
                <input
                  type="text"
                  value={uvrCode}
                  onChange={e => setUvrCode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl text-sm font-bold outline-none transition-all tracking-wider"
                  style={{
                    border: `1.5px solid ${BORDER}`,
                    color: NAVY,
                    fontFamily: "'DM Sans', sans-serif",
                    backgroundColor: 'white',
                  }}
                  placeholder="UVR-XXXX-XXXX"
                  onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                  onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                  required
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={!email || !uvrCode || isSubmitting}
                className="w-full py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: email && uvrCode && !isSubmitting ? CORAL : 'oklch(0.89 0.02 258)',
                  color: email && uvrCode && !isSubmitting ? 'white' : 'oklch(0.62 0.05 258)',
                  boxShadow: email && uvrCode && !isSubmitting ? `0 6px 22px -4px ${CORAL}50` : 'none',
                }}
                onMouseEnter={e => { if (email && uvrCode) e.currentTarget.style.backgroundColor = 'oklch(0.55 0.20 24)' }}
                onMouseLeave={e => { if (email && uvrCode) e.currentTarget.style.backgroundColor = CORAL }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                      <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    {locale === 'uk' ? 'Перевірка…' : 'Signing in…'}
                  </span>
                ) : uvrInfo.submitLabel[locale]}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
