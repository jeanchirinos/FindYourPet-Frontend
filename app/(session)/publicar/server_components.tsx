import { Category } from '@/types'
import { PetInfo, StatusInfo } from './client_components'
import { request } from '@/utilities/request'

// Status
async function getStatusList() {
  type Response = { id: number; value: string }[]

  const res = await request<Response>('pet-status')

  if (!res.ok) return []

  return res.data
}

export async function Status() {
  const statusList = await getStatusList()

  return <StatusInfo statusList={statusList} />
}

// Categories
async function getCategories() {
  const res = await request<Category[]>('category')

  return res.ok ? res.data : []
}

export async function Categories() {
  const categories = await getCategories()

  return <PetInfo categories={categories} />
}
