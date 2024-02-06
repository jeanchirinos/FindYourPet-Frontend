import { getPlaces } from '@/controllers/Place'
import { FilterPlace } from './FilterPlace'

export async function FilterPlaceServer() {
  const places = await getPlaces()

  return (
    <>
      <FilterPlace places={places} />
    </>
  )
}
