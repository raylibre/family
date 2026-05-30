import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
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

const CARD_W = 272
const GAP    = 16

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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  function scrollToIndex(index: number) {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * (CARD_W + GAP), behavior: 'smooth' })
    setActiveIndex(index)
  }

  function handleScroll() {
    const el = scrollRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / (CARD_W + GAP))
    setActiveIndex(Math.max(0, Math.min(idx, categories.length - 1)))
  }

  const atStart = activeIndex === 0
  const atEnd   = activeIndex >= categories.length - 1

  const topRow    = categories.slice(0, 3)
  const bottomRow = categories.slice(3)

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

      {/* ── Desktop grid: 3 + 2 ── */}
      <div className="hidden md:grid grid-cols-6 gap-5">
        {/* Row 1 — 3 cards, each spans 2 of 6 columns */}
        {topRow.map((category, index) => (
          <div key={category.id} className="col-span-2">
            <DonorCategoryCard
              category={category}
              locale={locale}
              isSelected={selectedCategoryId === category.id}
              index={index}
              perMonth={content.perMonth}
              onClick={() => onSelectCategory(category.id)}
            />
          </div>
        ))}
        {/* Row 2 — spacer + 2 cards + spacer → centered */}
        <div className="col-span-1" />
        {bottomRow.map((category, index) => (
          <div key={category.id} className="col-span-2">
            <DonorCategoryCard
              category={category}
              locale={locale}
              isSelected={selectedCategoryId === category.id}
              index={topRow.length + index}
              perMonth={content.perMonth}
              onClick={() => onSelectCategory(category.id)}
            />
          </div>
        ))}
        <div className="col-span-1" />
      </div>

      {/* ── Mobile carousel ── */}
      <div className="md:hidden flex flex-col gap-4">
        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            disabled={atStart}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ backgroundColor: BLUE, color: 'white' }}
            onMouseEnter={e => { if (!atStart) e.currentTarget.style.backgroundColor = BLUE_DEEP }}
            onMouseLeave={e => { if (!atStart) e.currentTarget.style.backgroundColor = BLUE }}
          >
            <ChevronLeft size={20} />
          </button>

          {/* Scroll container */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto mx-6 pb-2 [&::-webkit-scrollbar]:hidden"
            style={{
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
            } as React.CSSProperties}
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="flex-shrink-0"
                style={{ width: CARD_W, scrollSnapAlign: 'start' } as React.CSSProperties}
              >
                <DonorCategoryCard
                  category={category}
                  locale={locale}
                  isSelected={selectedCategoryId === category.id}
                  index={index}
                  perMonth={content.perMonth}
                  onClick={() => onSelectCategory(category.id)}
                />
              </div>
            ))}
          </div>

          {/* Next arrow */}
          <button
            onClick={() => scrollToIndex(Math.min(categories.length - 1, activeIndex + 1))}
            disabled={atEnd}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-150 disabled:opacity-20 disabled:cursor-not-allowed"
            style={{ backgroundColor: BLUE, color: 'white' }}
            onMouseEnter={e => { if (!atEnd) e.currentTarget.style.backgroundColor = BLUE_DEEP }}
            onMouseLeave={e => { if (!atEnd) e.currentTarget.style.backgroundColor = BLUE }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2">
          {categories.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className="rounded-full transition-all duration-200"
              style={{
                width:           i === activeIndex ? 20 : 8,
                height:          8,
                backgroundColor: i === activeIndex ? BLUE : 'oklch(0.85 0.025 258)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onBrowse}
          disabled={!hasSelection}
          className="px-10 py-4 rounded-full font-black text-base transition-all duration-200 disabled:cursor-not-allowed"
          style={{
            backgroundColor: hasSelection ? BLUE : 'oklch(0.89 0.02 258)',
            color:            hasSelection ? 'white' : 'oklch(0.62 0.05 258)',
            boxShadow:        hasSelection ? `0 8px 28px -4px ${BLUE}55` : 'none',
            minWidth: 240,
          }}
          onMouseEnter={e => { if (hasSelection) e.currentTarget.style.backgroundColor = BLUE_DEEP }}
          onMouseLeave={e => { if (hasSelection) e.currentTarget.style.backgroundColor = BLUE }}
        >
          {content.browseButton}
        </button>

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
