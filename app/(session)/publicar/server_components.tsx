import { Category } from '@/types'
import { actionRequest } from '@/utilities/actionRequest'
import { PetInfo, StatusInfo } from './client_components'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const res = await actionRequest<Response>('pet-status')

  if (!res.ok) return []

  return res.data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const res = await actionRequest<Category[]>('category')

  if (!res.ok) return []

  return res.data
}

export async function Categories() {
  const categories = await getCategories()

  return <PetInfo categories={categories} />
}
