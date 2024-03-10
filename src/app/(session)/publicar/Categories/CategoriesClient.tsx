'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { Category } from '@/models/Category'
import { BreedsData } from '@/models/Breed'
import { useState } from 'react'

export function CategoriesClient(props: {
  categories: Category[]
  breeds: BreedsData
  initialCategoryId?: string
  initialBreedId?: string
}) {
  const { categories, breeds, initialCategoryId = '24', initialBreedId } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(initialCategoryId)

  // RENDER
  return (
    <>
      <SelectNative
        options={categories}
        state={{ selected: selectedCategory, onSelectChange: setSelectedCategory }}
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
