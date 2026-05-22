import type { Family, DonorCategory, Locale, PageContent } from '@/../product/sections/donor-browse-and-connect/types'
import { FamilyCard } from './FamilyCard'

const BLUE = 'oklch(0.42 0.175 260)'

const CATEGORY_COLORS: Record<string, { solid: string; faint: string; text: string }> = {
  disability: { solid: 'oklch(0.42 0.175 260)', faint: 'oklch(0.95 0.022 258)', text: 'oklch(0.30 0.14 260)' },
  died:       { solid: 'oklch(0.68 0.20 24)',   faint: 'oklch(0.97 0.018 28)',  text: 'oklch(0.42 0.18 24)' },
  missing:    { solid: 'oklch(0.50 0.13 205)',  faint: 'oklch(0.95 0.022 200)', text: 'oklch(0.32 0.11 200)' },
  prisoner:   { solid: 'oklch(0.50 0.15 65)',   faint: 'oklch(0.96 0.022 65)',  text: 'oklch(0.32 0.12 65)' },
  active:     { solid: 'oklch(0.83 0.18 88)',   faint: 'oklch(0.97 0.025 85)',  text: 'oklch(0.45 0.14 88)' },
}

interface FamilyListViewProps {
  families: Family[]
  categories: DonorCategory[]
  locale: Locale
  content: PageContent
  selectedCategoryId: string | null
  onChangeCategory: () => void
  onDonate?: (familyId: string, amount: number, note?: string) => void
}

export function FamilyListView({
  families,
  categories,
  locale,
  content,
  selectedCategoryId,
  onChangeCategory,
  onDonate,
}: FamilyListViewProps) {
  const filteredFamilies = selectedCategoryId
    ? families.filter(f => f.categoryId === selectedCategoryId)
    : families

  const selectedCategory = selectedCategoryId
    ? categories.find(c => c.id === selectedCategoryId)
    : null

  const filterLabel = selectedCategory
    ? selectedCategory.title[locale]
    : content.allFamilies

  const catPalette = selectedCategoryId
    ? (CATEGORY_COLORS[selectedCategoryId] ?? { solid: BLUE, faint: 'oklch(0.95 0.022 258)', text: 'oklch(0.30 0.14 260)' })
    : { solid: BLUE, faint: 'oklch(0.95 0.022 258)', text: 'oklch(0.30 0.14 260)' }

  return (
    <div
      className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6"
      style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
    >
      {/* Filter bar */}
      <div className="flex items-center gap-3 flex-wrap">
        <span
          className="px-3.5 py-1.5 rounded-full text-sm font-bold"
          style={{
            backgroundColor: catPalette.faint,
            color: catPalette.text,
            border: `1.5px solid ${catPalette.solid}25`,
          }}
        >
          {filterLabel}
        </span>
        <button
          onClick={onChangeCategory}
          className="text-sm font-semibold transition-colors"
          style={{ color: 'oklch(0.55 0.07 258)' }}
          onMouseEnter={e => { e.currentTarget.style.color = BLUE }}
          onMouseLeave={e => { e.currentTarget.style.color = 'oklch(0.55 0.07 258)' }}
        >
          {content.changeCategory}
        </button>
      </div>

      {/* Card grid or empty state */}
      {filteredFamilies.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-20">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
            style={{ backgroundColor: 'oklch(0.94 0.022 258)' }}
          >
            🏡
          </div>
          <p className="text-sm font-medium" style={{ color: 'oklch(0.55 0.07 258)' }}>
            No families in this category yet
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFamilies.map(family => (
            <FamilyCard
              key={family.id}
              family={family}
              categories={categories}
              locale={locale}
              content={content}
              onDonate={onDonate}
            />
          ))}
        </div>
      )}
    </div>
  )
}
