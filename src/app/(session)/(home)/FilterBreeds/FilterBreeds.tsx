import { getBreeds } from '@/controllers/BreedController/getBreeds'
import { FilterBreedsClient } from './FilterBreedsClient'

export async function FilterBreeds(props: { category_id: string }) {
  const breedsData = await getBreeds()

  const breeds = breedsData[props.category_id]

  return <FilterBreedsClient breeds={breeds} />
}
