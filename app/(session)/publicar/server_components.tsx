import { Category } from '@/types'
import { PetInfo, PlaceInfo, StatusInfo } from './client_components'
import { request, requestNew } from '@/utilities/request'
import { getPlaces } from '@/mc/Place'
import { getBreeds } from '@/mc/Pet'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const res = await requestNew<Response>('pet-status', { cache: 'force-cache' })

  return res.data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const res = await request<Category[]>('category', { cache: 'force-cache' })

  return res.ok ? res.data : []
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
