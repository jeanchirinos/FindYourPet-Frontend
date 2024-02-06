import { PlaceClient } from './PlaceClient'
import { getPlaces } from '@/controllers/Place'

export async function Place() {
  const places = await getPlaces()

  return <PlaceClient places={places} />
}
