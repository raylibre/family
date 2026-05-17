import { useState } from 'react'
import type { DonorBrowseAndConnectProps } from '@/../product/sections/donor-browse-and-connect/types'
import { CategorySelectionView } from './CategorySelectionView'
import { FamilyListView } from './FamilyListView'

type View = 'categories' | 'families'

export function DonorBrowseAndConnect({
  categories,
  families,
  content,
  locale = 'en',
  onDonate,
}: DonorBrowseAndConnectProps) {
  const [view, setView] = useState<View>('categories')
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null)

  const pageContent = content[locale]

  const handleBrowse = () => {
    if (selectedCategoryId) setView('families')
  }

  const handleViewAll = () => {
    setSelectedCategoryId(null)
    setView('families')
  }

  return view === 'categories' ? (
    <CategorySelectionView
      categories={categories}
      locale={locale}
      content={pageContent}
      selectedCategoryId={selectedCategoryId}
      onSelectCategory={setSelectedCategoryId}
      onBrowse={handleBrowse}
      onViewAll={handleViewAll}
    />
  ) : (
    <FamilyListView
      families={families}
      categories={categories}
      locale={locale}
      content={pageContent}
      selectedCategoryId={selectedCategoryId}
      onChangeCategory={() => setView('categories')}
      onDonate={onDonate}
    />
  )
}
