import { useState } from 'react'
import type { Family, DonorCategory, Locale, PageContent } from '../types'
import { DonationJar } from './DonationJar'
import { DonationModal } from './DonationModal'

const PALETTES: Record<string, { solid: string; faint: string; tagText: string; textOnSolid: string }> = {
  disability: { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.95 0.022 258)', tagText: 'oklch(0.30 0.14 260)', textOnSolid: 'white' },
  died:       { solid: 'oklch(0.68 0.20 24)',   faint: 'oklch(0.97 0.018 28)',  tagText: 'oklch(0.42 0.18 24)',  textOnSolid: 'white' },
  missing:    { solid: 'oklch(0.50 0.13 205)',  faint: 'oklch(0.95 0.022 200)', tagText: 'oklch(0.32 0.11 200)', textOnSolid: 'white' },
  active:     { solid: 'oklch(0.83 0.18 88)',   faint: 'oklch(0.97 0.025 85)',  tagText: 'oklch(0.45 0.14 88)',  textOnSolid: 'oklch(0.18 0.055 261)' },
}
const FALLBACK = { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.95 0.022 258)', tagText: 'oklch(0.30 0.14 260)', textOnSolid: 'white' }

const NAVY  = 'oklch(0.18 0.055 261)'
const CORAL = 'oklch(0.68 0.20 24)'

interface FamilyCardProps {
  family: Family
  categories: DonorCategory[]
  locale: Locale
  content: PageContent
  onDonate?: (familyId: string, amount: number) => void
}

export function FamilyCard({ family, categories, locale, content, onDonate }: FamilyCardProps) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [imgError, setImgError] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const p = PALETTES[family.categoryId] ?? FALLBACK
  const category = categories.find(c => c.id === family.categoryId)
  const remaining = Math.max(0, family.monthlyTarget - family.currentlyFunded)
  const fullyFunded = remaining === 0
  const pct = Math.min(100, Math.round((family.currentlyFunded / family.monthlyTarget) * 100))

  const categoryLabel = category
    ? category.title[locale].split(' ').slice(0, 4).join(' ') + (category.title[locale].split(' ').length > 4 ? '…' : '')
    : null

  function handleDonateClick() {
    if (selectedAmount) setShowModal(true)
  }

  function handleConfirm(familyId: string, amount: number, note?: string) {
    onDonate?.(familyId, amount)
    console.log('Donation submitted:', { familyId, amount, note })
  }

  return (
    <>
      <div
        className="bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-200"
        style={{ boxShadow: '0 2px 14px rgba(15,30,61,0.08)', fontFamily: "'DM Sans', system-ui, sans-serif" }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 12px 32px rgba(15,30,61,0.14)'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 2px 14px rgba(15,30,61,0.08)'
        }}
      >
        {/* ── Photo — bleeds to card edge ── */}
        <div className="relative h-48 flex-shrink-0 overflow-hidden">
          {imgError ? (
            <div
              className="w-full h-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${p.faint} 0%, white 100%)` }}
            >
              <span
                className="text-5xl font-black select-none"
                style={{ color: `${p.solid}25` }}
              >
                {family.name.slice(0, 2).toUpperCase()}
              </span>
            </div>
          ) : (
            <img
              src={family.photo}
              alt={family.name}
              className="w-full h-full object-cover"
              onError={() => setImgError(true)}
            />
          )}

          {/* Category badge — bottom-left overlay */}
          {categoryLabel && (
            <div
              className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold"
              style={{ backgroundColor: p.solid, color: p.textOnSolid }}
            >
              {categoryLabel}
            </div>
          )}

          {/* Funding progress bar — thin strip at very bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
          >
            <div
              className="h-full transition-all duration-700"
              style={{ width: `${pct}%`, backgroundColor: p.solid }}
            />
          </div>
        </div>

        {/* ── Card content ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Family name */}
          <h3 className="font-black text-base leading-snug" style={{ color: NAVY }}>
            {family.name}
          </h3>

          {/* Story */}
          <p className="text-sm leading-relaxed line-clamp-3" style={{ color: 'oklch(0.48 0.07 258)' }}>
            {family.story[locale]}
          </p>

          {/* Need tags */}
          {family.needs.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {family.needs.map(need => (
                <span
                  key={need.id}
                  className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                  style={{ backgroundColor: p.faint, color: p.tagText }}
                >
                  {need.label[locale]}
                </span>
              ))}
            </div>
          )}

          {/* Divider */}
          <div className="h-px my-0.5" style={{ backgroundColor: 'oklch(0.93 0.02 258)' }} />

          {/* ── Donation section ── */}
          <div className="flex flex-col items-center gap-3">
            {/* Jar + funded/target line */}
            <div className="flex flex-col items-center gap-1">
              <DonationJar
                pct={pct}
                label={`${pct}%`}
                sublabel={content.covered}
                width={62}
                height={90}
              />
              <p className="text-xs font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>
                ${family.currentlyFunded}
                <span style={{ color: 'oklch(0.72 0.04 258)' }}> / ${family.monthlyTarget}</span>
              </p>
            </div>

            {fullyFunded ? (
              <div
                className="w-full text-center py-2 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'oklch(0.93 0.10 155)', color: 'oklch(0.35 0.14 155)' }}
              >
                ✓ Fully covered this month
              </div>
            ) : (
              <>
                {/* Amount buttons */}
                <div className="flex gap-1.5 flex-wrap justify-center w-full">
                  {[10, 50].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setSelectedAmount(selectedAmount === amt ? null : amt)}
                      className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                      style={{
                        backgroundColor: selectedAmount === amt ? NAVY : 'oklch(0.93 0.02 258)',
                        color: selectedAmount === amt ? 'white' : 'oklch(0.35 0.07 258)',
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                  <button
                    onClick={() => setSelectedAmount(selectedAmount === remaining ? null : remaining)}
                    className="px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-150"
                    style={{
                      backgroundColor: selectedAmount === remaining ? p.solid : p.faint,
                      color: selectedAmount === remaining ? p.textOnSolid : p.tagText,
                    }}
                  >
                    {content.fillTheJar} (${remaining})
                  </button>
                </div>

                {/* Donate button */}
                <button
                  onClick={handleDonateClick}
                  disabled={!selectedAmount}
                  className="w-full py-3 rounded-full font-black text-sm transition-all duration-200 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: selectedAmount ? CORAL : 'oklch(0.89 0.02 258)',
                    color: selectedAmount ? 'white' : 'oklch(0.62 0.05 258)',
                    boxShadow: selectedAmount ? `0 4px 16px -2px ${CORAL}50` : 'none',
                  }}
                  onMouseEnter={e => { if (selectedAmount) e.currentTarget.style.backgroundColor = 'oklch(0.55 0.20 24)' }}
                  onMouseLeave={e => { if (selectedAmount) e.currentTarget.style.backgroundColor = CORAL }}
                >
                  {content.donateButton}{selectedAmount ? ` $${selectedAmount}` : ''}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Donation modal */}
      {showModal && selectedAmount && (
        <DonationModal
          family={family}
          amount={selectedAmount}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirm}
        />
      )}
    </>
  )
}
