'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { Category } from '@/models/Category'
import { BreedsData } from '@/models/Breed'
import { useState } from 'react'

type Props = {
  categories: Category[]
  breeds: BreedsData
  initialCategoryId?: string
  initialBreedId?: string
}

export function CategoriesClient(props: Props) {
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
        label='Raza'
        name='breed_id'
      />
    </>
  )
}
