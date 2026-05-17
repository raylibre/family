import type { DonorCategory, Locale, PageContent } from '@/../product/sections/donor-browse-and-connect/types'
import { DonorCategoryCard } from './DonorCategoryCard'

interface CategorySelectionViewProps {
  categories: DonorCategory[]
  locale: Locale
  content: PageContent
  selectedCategoryId: string | null
  onSelectCategory: (id: string) => void
  onBrowse: () => void
  onViewAll: () => void
}

const BLUE      = 'oklch(0.42 0.175 260)'
const BLUE_DEEP = 'oklch(0.30 0.14 260)'
const NAVY      = 'oklch(0.18 0.055 261)'

export function CategorySelectionView({
  categories,
  locale,
  content,
  selectedCategoryId,
  onSelectCategory,
  onBrowse,
  onViewAll,
}: CategorySelectionViewProps) {
  const hasSelection = selectedCategoryId !== null

  return (
    <div
      className="max-w-5xl mx-auto px-4 py-10 md:py-14 flex flex-col gap-10"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Page header */}
      <div className="text-center flex flex-col gap-2">
        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight"
          style={{ color: NAVY }}
        >
          {content.pageTitle}
        </h1>
        <p className="text-sm sm:text-base" style={{ color: 'oklch(0.48 0.07 258)' }}>
          {content.pageSubtitle}
        </p>
      </div>

      {/* Category pillars */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {categories.map((category, index) => (
          <DonorCategoryCard
            key={category.id}
            category={category}
            locale={locale}
            isSelected={selectedCategoryId === category.id}
            index={index}
            perMonth={content.perMonth}
            onClick={() => onSelectCategory(category.id)}
          />
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        {/* Primary CTA */}
        <button
          onClick={onBrowse}
          disabled={!hasSelection}
          className="px-10 py-4 rounded-full font-black text-base transition-all duration-200 disabled:cursor-not-allowed"
          style={{
            backgroundColor: hasSelection ? BLUE : 'oklch(0.89 0.02 258)',
            color: hasSelection ? 'white' : 'oklch(0.62 0.05 258)',
            boxShadow: hasSelection ? `0 8px 28px -4px ${BLUE}55` : 'none',
            minWidth: 240,
          }}
          onMouseEnter={e => {
            if (hasSelection) e.currentTarget.style.backgroundColor = BLUE_DEEP
          }}
          onMouseLeave={e => {
            if (hasSelection) e.currentTarget.style.backgroundColor = BLUE
          }}
        >
          {content.browseButton}
        </button>

        {/* View all link */}
        <button
          onClick={onViewAll}
          className="text-sm font-semibold transition-colors underline underline-offset-2"
          style={{ color: 'oklch(0.55 0.07 258)' }}
          onMouseEnter={e => { e.currentTarget.style.color = BLUE }}
          onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
        >
          {content.viewAllButton}
        </button>
      </div>
    </div>
  )
}
