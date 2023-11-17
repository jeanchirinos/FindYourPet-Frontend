import { Category } from '@/types'
import { PetInfo, PlaceInfo, StatusInfo } from './client_components'
import { getPlaces } from '@/mc/Place'
import { getBreeds } from '@/mc/Pet'
import { actionRequestGet } from '@/utilities/actionRequest'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const data = await actionRequestGet<Response>('pet-status', { cache: 'force-cache' })

  return data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const data = await actionRequestGet<Category[]>('category', { cache: 'force-cache' })

  return data
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
