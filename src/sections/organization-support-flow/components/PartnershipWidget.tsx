import { useState } from 'react'
import type { OrganizationSupportFlowProps } from '@/../product/sections/organization-support-flow/types'

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const CORAL     = 'oklch(0.68 0.20 24)'
const CORAL_DEEP = 'oklch(0.55 0.20 24)'
const GOLD      = 'oklch(0.83 0.18 88)'
const NAVY      = 'oklch(0.18 0.055 261)'
const BORDER    = 'oklch(0.91 0.025 258)'
const MUTED     = 'oklch(0.55 0.07 258)'
const GREEN     = 'oklch(0.42 0.14 155)'
const GREEN_FAINT = 'oklch(0.93 0.08 155)'

export function PartnershipWidget({
  supportTypes,
  content,
  locale = 'uk',
  onSubmit,
}: OrganizationSupportFlowProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orgName, setOrgName] = useState('')
  const [contactPerson, setContactPerson] = useState('')
  const [email, setEmail] = useState('')
  const [selectedTypeIds, setSelectedTypeIds] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = content
  const l = locale

  function toggleType(id: string) {
    setSelectedTypeIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!orgName || !contactPerson || !email) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      onSubmit?.({ orgName, contactPerson, email, supportTypeIds: selectedTypeIds, message })
    }, 800)
  }

  function handleClose() {
    setIsOpen(false)
    setTimeout(() => {
      setIsSuccess(false)
      setOrgName('')
      setContactPerson('')
      setEmail('')
      setSelectedTypeIds([])
      setMessage('')
    }, 300)
  }

  const canSubmit = orgName.trim() && contactPerson.trim() && email.trim() && !isSubmitting

  return (
    <>
      {/* ── Floating button ── */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-full font-black text-sm text-white transition-all duration-200 hover:-translate-y-1 hover:scale-105"
        style={{
          backgroundColor: BLUE,
          boxShadow: `0 8px 28px -4px ${BLUE}60, 0 2px 8px rgba(15,30,61,0.2)`,
          fontFamily: "'DM Sans', system-ui, sans-serif",
        }}
        onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE_DEEP }}
        onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE }}
      >
        {/* Handshake icon */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M10.5 4.5H13.5L16.5 7.5L13.5 9H12L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 4.5H4.5L1.5 7.5L4.5 9H6L7.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 10.5L9 12L10.5 10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 13.5L9 16.5L12 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12V16.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        {t.buttonLabel[l]}

        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: BLUE }}
        />
      </button>

      {/* ── Modal backdrop ── */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          style={{ backgroundColor: 'rgba(15,30,61,0.60)', backdropFilter: 'blur(6px)' }}
          onClick={e => { if (e.target === e.currentTarget) handleClose() }}
        >
          <div
            className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden flex flex-col"
            style={{
              backgroundColor: 'white',
              maxHeight: '92vh',
              fontFamily: "'DM Sans', system-ui, sans-serif",
              boxShadow: '0 32px 80px rgba(15,30,61,0.25)',
            }}
          >
            {/* Top gradient accent */}
            <div
              className="h-1.5 flex-shrink-0"
              style={{ background: `linear-gradient(90deg, ${BLUE} 0%, ${GOLD} 50%, ${CORAL} 100%)` }}
            />

            {/* Header */}
            <div
              className="flex items-start justify-between px-6 pt-5 pb-4 flex-shrink-0"
              style={{ borderBottom: `1.5px solid ${BORDER}` }}
            >
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: MUTED }}>
                  Family to Family
                </p>
                <h2 className="text-lg font-black leading-snug" style={{ color: NAVY }}>
                  {isSuccess ? t.successHeadline[l] : t.modalHeadline[l]}
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-3 mt-0.5"
                style={{ backgroundColor: 'oklch(0.94 0.02 258)', color: MUTED }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'oklch(0.88 0.03 258)' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'oklch(0.94 0.02 258)' }}
                aria-label="Close"
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1l8 8M9 1L1 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto flex-1 px-6 py-6">

              {/* ── Success state ── */}
              {isSuccess ? (
                <div className="flex flex-col items-center text-center gap-5 py-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: GREEN_FAINT }}
                  >
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path d="M5 14l7 7 11-11" stroke={GREEN} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {t.successBody[l]}
                  </p>
                  <button
                    onClick={handleClose}
                    className="px-8 py-3 rounded-full font-black text-sm text-white transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: BLUE, boxShadow: `0 6px 20px -4px ${BLUE}50` }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = BLUE_DEEP }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = BLUE }}
                  >
                    {t.successClose[l]}
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Subheadline */}
                  <p className="text-sm leading-relaxed" style={{ color: MUTED }}>
                    {t.modalSubheadline[l]}
                  </p>

                  {/* Org name + Contact person (two columns on sm+) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                        {t.orgNameLabel[l]}
                      </label>
                      <input
                        type="text"
                        value={orgName}
                        onChange={e => setOrgName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                        onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                        placeholder={l === 'uk' ? 'Назва вашої організації' : 'Your organization name'}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                        {t.contactLabel[l]}
                      </label>
                      <input
                        type="text"
                        value={contactPerson}
                        onChange={e => setContactPerson(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                        style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                        onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                        onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                        placeholder={l === 'uk' ? 'Ім\'я та прізвище' : 'Full name'}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                      {t.emailLabel[l]}
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                      placeholder="contact@organization.org"
                      required
                    />
                  </div>

                  {/* Support types */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-2.5" style={{ color: MUTED }}>
                      {t.supportTypeLabel[l]}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {supportTypes.map(type => {
                        const selected = selectedTypeIds.includes(type.id)
                        return (
                          <button
                            key={type.id}
                            type="button"
                            onClick={() => toggleType(type.id)}
                            className="px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                            style={{
                              backgroundColor: selected ? BLUE : 'oklch(0.94 0.022 258)',
                              color: selected ? 'white' : MUTED,
                              boxShadow: selected ? `0 3px 10px -2px ${BLUE}40` : 'none',
                              transform: selected ? 'scale(1.05)' : 'scale(1)',
                            }}
                          >
                            {selected && (
                              <span className="mr-1">✓</span>
                            )}
                            {type.label[l]}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: MUTED }}>
                      {t.messageLabel[l]}
                      <span className="ml-1.5 normal-case font-normal" style={{ color: 'oklch(0.72 0.04 258)' }}>
                        ({l === 'uk' ? 'необов\'язково' : 'optional'})
                      </span>
                    </label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none transition-all"
                      style={{ border: `1.5px solid ${BORDER}`, color: NAVY, fontFamily: "'DM Sans', sans-serif", backgroundColor: 'white' }}
                      onFocus={e => { e.currentTarget.style.borderColor = BLUE; e.currentTarget.style.boxShadow = `0 0 0 3px ${BLUE}15` }}
                      onBlur={e => { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.boxShadow = 'none' }}
                      placeholder={t.messagePlaceholder[l]}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full py-4 rounded-full font-black text-base text-white transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: canSubmit ? CORAL : 'oklch(0.89 0.02 258)',
                      color: canSubmit ? 'white' : MUTED,
                      boxShadow: canSubmit ? `0 6px 22px -4px ${CORAL}50` : 'none',
                    }}
                    onMouseEnter={e => { if (canSubmit) e.currentTarget.style.backgroundColor = CORAL_DEEP }}
                    onMouseLeave={e => { if (canSubmit) e.currentTarget.style.backgroundColor = CORAL }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="2" strokeOpacity="0.3" />
                          <path d="M8 2a6 6 0 0 1 6 6" stroke="white" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        {l === 'uk' ? 'Надсилаємо…' : 'Sending…'}
                      </span>
                    ) : t.submitLabel[l]}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
