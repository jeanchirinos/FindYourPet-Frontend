import { PetInfo, PlaceInfo, StatusInfo } from './client_components'
import { getPlaces } from '@/controllers/Place'
import { getBreeds, getCategories, getStatusList } from '@/controllers/Pet'

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

export async function Categories() {
  const categories = await getCategories()
  const breedsData = await getBreeds()

  return <PetInfo categories={categories} breedsData={breedsData} />
}

export async function Place() {
  const places = await getPlaces()

  return <PlaceInfo places={places} />
}
