import type { FamilyCategory, Locale } from '@/../product/sections/family-registration-and-profiles/types'

interface CategoryCardProps {
  category: FamilyCategory
  locale: Locale
  isSelected: boolean
  index: number
  onClick: () => void
}

interface Palette {
  solid: string
  faint: string
  textOnSolid: string
  accent: string
}

const PALETTES: Record<string, Palette> = {
  disability: { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.96 0.022 258)', textOnSolid: 'white', accent: 'oklch(0.30 0.14 260)' },
  died:       { solid: 'oklch(0.68 0.20 24)',   faint: 'oklch(0.97 0.018 28)',  textOnSolid: 'white', accent: 'oklch(0.45 0.18 24)' },
  missing:    { solid: 'oklch(0.50 0.13 205)',  faint: 'oklch(0.95 0.022 200)', textOnSolid: 'white', accent: 'oklch(0.32 0.11 200)' },
  active:     { solid: 'oklch(0.83 0.18 88)',   faint: 'oklch(0.97 0.025 85)',  textOnSolid: 'oklch(0.18 0.055 261)', accent: 'oklch(0.45 0.14 88)' },
}
const FALLBACK: Palette = {
  solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.96 0.022 258)',
  textOnSolid: 'white', accent: 'oklch(0.30 0.14 260)',
}
const NAVY = 'oklch(0.18 0.055 261)'

export function CategoryCard({ category, locale, isSelected, index, onClick }: CategoryCardProps) {
  const p = PALETTES[category.id] ?? FALLBACK
  const n = String(index + 1).padStart(2, '0')

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-4 rounded-2xl text-left transition-all duration-200 focus-visible:outline-none p-5"
      style={isSelected ? {
        backgroundColor: p.faint,
        boxShadow: `0 0 0 2px ${p.solid}, 0 6px 24px -4px ${p.solid}35`,
        transform: 'translateX(2px)',
      } : {
        backgroundColor: 'white',
        borderLeft: `4px solid ${p.solid}`,
        boxShadow: '0 1px 6px rgba(15,30,61,0.07)',
      }}
      onMouseEnter={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = p.faint
          e.currentTarget.style.boxShadow = `0 4px 18px -4px ${p.solid}30`
        }
      }}
      onMouseLeave={e => {
        if (!isSelected) {
          e.currentTarget.style.backgroundColor = 'white'
          e.currentTarget.style.boxShadow = '0 1px 6px rgba(15,30,61,0.07)'
        }
      }}
    >
      {/* Category number badge */}
      <div
        className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black mt-0.5"
        style={{
          backgroundColor: isSelected ? p.solid : `${p.solid}18`,
          color: isSelected ? p.textOnSolid : p.solid,
        }}
      >
        {n}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="font-black text-sm leading-snug mb-1"
          style={{ color: isSelected ? p.accent : NAVY }}
        >
          {category.title[locale]}
        </p>
        <p className="text-[13px] leading-relaxed" style={{ color: 'oklch(0.48 0.07 258)' }}>
          {category.description[locale]}
        </p>
      </div>

      {/* Selection indicator */}
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1 transition-all duration-150"
        style={{
          borderColor: isSelected ? p.solid : 'oklch(0.83 0.03 258)',
          backgroundColor: isSelected ? p.solid : 'transparent',
        }}
      >
        {isSelected && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 2.5" stroke={p.textOnSolid} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
    </button>
  )
}
