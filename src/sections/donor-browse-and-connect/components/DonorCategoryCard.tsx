import type { DonorCategory, Locale } from '@/../product/sections/donor-browse-and-connect/types'

interface DonorCategoryCardProps {
  category: DonorCategory
  locale: Locale
  isSelected: boolean
  index: number
  perMonth: string
  onClick: () => void
}

interface Palette {
  solid: string
  faint: string
  textOnSolid: string
  textOnFaint: string
}

const PALETTES: Record<string, Palette> = {
  disability: {
    solid:      'oklch(0.42 0.175 260)',
    faint:      'oklch(0.96 0.022 258)',
    textOnSolid: 'white',
    textOnFaint: 'oklch(0.30 0.14 260)',
  },
  died: {
    solid:      'oklch(0.68 0.20 24)',
    faint:      'oklch(0.97 0.018 28)',
    textOnSolid: 'white',
    textOnFaint: 'oklch(0.42 0.18 24)',
  },
  missing: {
    solid:      'oklch(0.50 0.13 205)',
    faint:      'oklch(0.95 0.022 200)',
    textOnSolid: 'white',
    textOnFaint: 'oklch(0.32 0.11 200)',
  },
  active: {
    solid:      'oklch(0.83 0.18 88)',
    faint:      'oklch(0.97 0.025 85)',
    textOnSolid: 'oklch(0.18 0.055 261)',
    textOnFaint: 'oklch(0.45 0.14 88)',
  },
}

const FALLBACK: Palette = {
  solid: 'oklch(0.42 0.175 260)',
  faint: 'oklch(0.96 0.022 258)',
  textOnSolid: 'white',
  textOnFaint: 'oklch(0.30 0.14 260)',
}

const NAVY = 'oklch(0.18 0.055 261)'

export function DonorCategoryCard({
  category, locale, isSelected, index, perMonth, onClick,
}: DonorCategoryCardProps) {
  const p = PALETTES[category.id] ?? FALLBACK
  const n = String(index + 1).padStart(2, '0')

  return (
    <div className="flex flex-col gap-2.5" style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      {/* Monthly amount — above the card */}
      <div className="text-center">
        <span
          className="text-2xl md:text-3xl font-black"
          style={{ color: isSelected ? p.solid : NAVY }}
        >
          ~${category.monthlyAmount}
        </span>
        <span className="text-xs ml-1" style={{ color: 'oklch(0.55 0.07 258)' }}>
          {perMonth}
        </span>
      </div>

      {/* Pillar card */}
      <button
        onClick={onClick}
        className="relative w-full min-h-[190px] md:min-h-[230px] rounded-2xl flex flex-col p-5 text-left transition-all duration-200 focus-visible:outline-none"
        style={isSelected ? {
          backgroundColor: p.solid,
          boxShadow: `0 10px 30px -6px ${p.solid}70`,
          transform: 'translateY(-3px)',
        } : {
          backgroundColor: 'white',
          borderLeft: `4px solid ${p.solid}`,
          boxShadow: '0 1px 6px rgba(15,30,61,0.07)',
        }}
        onMouseEnter={e => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = p.faint
            e.currentTarget.style.boxShadow = `0 4px 20px -4px ${p.solid}35`
            e.currentTarget.style.transform = 'translateY(-1px)'
          }
        }}
        onMouseLeave={e => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'white'
            e.currentTarget.style.boxShadow = '0 1px 6px rgba(15,30,61,0.07)'
            e.currentTarget.style.transform = 'translateY(0)'
          }
        }}
      >
        {/* Big decorative number */}
        <span
          className="block text-5xl font-black leading-none select-none mb-auto pb-3"
          style={{
            color: isSelected
              ? (p.textOnSolid === 'white' ? 'rgba(255,255,255,0.15)' : 'rgba(15,30,61,0.10)')
              : `${p.solid}20`,
          }}
        >
          {n}
        </span>

        {/* Category title */}
        <p
          className="font-bold text-[13px] leading-snug mb-1.5"
          style={{ color: isSelected ? p.textOnSolid : NAVY }}
        >
          {category.title[locale]}
        </p>

        {/* Description */}
        <p
          className="text-[12px] leading-relaxed"
          style={{
            color: isSelected
              ? (p.textOnSolid === 'white' ? 'rgba(255,255,255,0.70)' : 'rgba(15,30,61,0.55)')
              : 'oklch(0.48 0.07 258)',
          }}
        >
          {category.description[locale]}
        </p>
      </button>
    </div>
  )
}
