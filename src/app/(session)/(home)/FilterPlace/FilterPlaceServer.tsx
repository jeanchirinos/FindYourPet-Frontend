import { getPlaces } from '@/controllers/Place'
import { FilterPlace } from './FilterPlace'
import { Suspense } from '@/components/other/CustomSuspense'

export async function FilterPlaceServer() {
  const places = await getPlaces()

  return (
    <Suspense fallback='LOADING'>
      <FilterPlace places={places} />
    </Suspense>
  )
}
