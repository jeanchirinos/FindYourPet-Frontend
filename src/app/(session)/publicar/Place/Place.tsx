import { PlaceClient } from './PlaceClient'
import { getPlaces } from '@/controllers/Place'

export async function Place(props: {
  initialData?: {
    estate: string
    city: string
    district: string
  }
}) {
  const places = await getPlaces()

  return <PlaceClient places={places} initialData={props.initialData} />
}
