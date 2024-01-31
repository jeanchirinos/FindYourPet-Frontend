import { getPlaces } from '@/controllers/Place'
import { FilterPlace } from './FilterPlace'

export async function FilterPlaceServer() {
  const { departamentos, distritos, provincias } = await getPlaces()

  return <FilterPlace departamentos={departamentos} provincias={provincias} distritos={distritos} />
}
