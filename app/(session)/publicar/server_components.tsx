import { Category } from '@/types'
import { PetInfo, PlaceInfo, StatusInfo } from './client_components'
import { request, requestNew } from '@/utilities/request'
import { getDepartamentos, getDistritos, getProvincias } from '@/mc/Place'

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

  return <PetInfo categories={categories} />
}

export async function Place() {
  const departamentos = await getDepartamentos()
  const provincias = await getProvincias()
  const distritos = await getDistritos()

  const data = { departamentos, provincias, distritos }

  return <PlaceInfo {...data} />
}
