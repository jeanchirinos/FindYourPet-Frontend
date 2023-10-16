import { Category } from '@/types'
import { requestAction } from '@/utilities/actionsRequest'
import { PetInfo, StatusInfo } from './client_components'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const response = await requestAction<Response>('pet-status')

  if (response.status === 'error') return []

  return response.data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const response = await requestAction<Category[]>('category')

  if (response.status === 'error') return []

  return response.data
}

export async function Categories() {
  const categories = await getCategories()

  return <PetInfo categories={categories} />
}
