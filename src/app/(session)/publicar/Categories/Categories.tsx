import { getCategories } from '@/controllers/CategoryController/getCategories'
import { getBreeds } from '@/controllers/BreedController/getBreeds'
import { CategoriesClient } from './CategoriesClient'

export async function Categories(props: { initialCategoryId?: string; initialBreedId?: string }) {
  const categoriesData = getCategories()
  const breedsData = getBreeds()

  const [categories, breeds] = await Promise.all([categoriesData, breedsData])

  return <CategoriesClient categories={categories} breeds={breeds} {...props} />
}
