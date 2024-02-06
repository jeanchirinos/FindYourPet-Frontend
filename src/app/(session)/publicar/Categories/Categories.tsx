import { getBreeds, getCategories } from '@/controllers/Pet'
import { CategoriesClient } from './CategoriesClient'

export async function Categories() {
  const categoriesData = getCategories()
  const breedsData = getBreeds()

  const [categories, breeds] = await Promise.all([categoriesData, breedsData])

  return <CategoriesClient categories={categories} breeds={breeds} />
}