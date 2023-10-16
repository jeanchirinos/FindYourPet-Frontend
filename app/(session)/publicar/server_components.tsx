import { Category } from '@/types'
import { actionRequest } from '@/utilities/actionRequest'
import { PetInfo, StatusInfo } from './client_components'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const response = await actionRequest<Response>('pet-status')

  if (response.status === 'error') return []

  return response.data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const response = await actionRequest<Category[]>('category')

  if (response.status === 'error') return []

  return response.data
}

export async function Categories() {
  const categories = await getCategories()

  return <PetInfo categories={categories} />
}
