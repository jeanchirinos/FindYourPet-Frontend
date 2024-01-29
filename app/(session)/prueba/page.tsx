import { Suspense } from '@/components/other/CustomSuspense'
import { FilterPlaceServer } from '../(home)/FilterPlace/FilterPlaceServer'

export default function Prueba() {
  return (
    <Suspense>
      <FilterPlaceServer />
    </Suspense>
  )
}
