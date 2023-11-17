import { BreedsData, PetPaginate } from '@/types'
import { actionRequestGet } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { notFound } from 'next/navigation'

export type TGetPetParams = {
  page?: string
  breed?: string
  order?: string
  status?: string
}

export async function getPets(params: TGetPetParams) {
  const { page = '1', order = 'desc', status = '0', breed } = params
  const limit = '2'

  const url = new URL(getApiUrl('pet'))

  url.pathname += `/${limit}`

  url.searchParams.set('page', page)
  url.searchParams.set('order', order)
  url.searchParams.set('status', status)
  breed && url.searchParams.set('breed', breed)

  const data = await actionRequestGet<PetPaginate>(url)

  const { current_page, data: pets } = data

  if (pets.length === 0 && current_page !== 1) {
    notFound()
  }

  return data
}

export async function getBreeds() {
  const data = await actionRequestGet<BreedsData>('breedList', { cache: 'force-cache' })

  return data
}
