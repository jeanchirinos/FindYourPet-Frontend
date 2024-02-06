'use client'

import { SelectNative } from '@/components/Select/SelectNative'
import { BreedsData, Category } from '@/models/Pet'
import { useState } from 'react'

export function CategoriesClient(props: { categories: Category[]; breeds: BreedsData }) {
  const { categories, breeds } = props

  // STATES
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(24)

  // RENDER
  return (
    <>
      <SelectNative
        options={categories}
        stateNumber={{ selected: selectedCategory, onSelectChange: setSelectedCategory }}
        label='Especie'
      />
      <SelectNative
        options={selectedCategory ? breeds[selectedCategory] : undefined}
        name='breed_id'
        label='Raza'
      />
    </>
  )
}
