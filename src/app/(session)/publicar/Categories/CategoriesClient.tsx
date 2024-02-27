'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { BreedsData, Category } from '@/models/Pet'
import { useState } from 'react'

export function CategoriesClient(props: {
  categories: Category[]
  breeds: BreedsData
  initialCategoryId?: number
  initialBreedId?: string | number
}) {
  const { categories, breeds, initialCategoryId = 24, initialBreedId } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(initialCategoryId)

  // RENDER
  return (
    <>
      <SelectNative
        options={categories}
        stateNumber={{ selected: selectedCategory, onSelectChange: setSelectedCategory }}
        label='Especie'
        name='category_id'
      />
      <SelectNative
        options={selectedCategory ? breeds[selectedCategory] : undefined}
        defaultValue={initialBreedId}
        name='breed_id'
        label='Raza'
      />
    </>
  )
}
