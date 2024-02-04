import { getCategories } from '@/controllers/Pet'
import { FilterCategoryClient } from './FilterCategoryClient'

export async function FilterCategory() {
  const categoriesList = await getCategories()

  return (
    <section>
      <p className='font-semibold text-foreground-900'>Especie</p>

      <FilterCategoryClient categoryList={categoriesList} />
    </section>
  )
}
