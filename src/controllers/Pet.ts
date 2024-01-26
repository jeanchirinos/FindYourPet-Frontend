'use server'

import { BreedsData, Category, PetPaginate, StatusList } from '@/models/Pet'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export type TGetPetParams = Partial<{
  page: string
  status: string
  category_id: string
  breed_id: string | string[]
  order: string
}>

export async function getPets(params: TGetPetParams) {
  const { page, order, status, category_id, breed_id } = params
  const limit = '10'

  const url = getApiUrl('pet')

  url.pathname += `/${limit}`

  page && url.searchParams.set('page', page)

  category_id && url.searchParams.set('category_id', category_id)

  if (breed_id) {
    if (Array.isArray(breed_id)) {
      const breeds = breed_id.join(',')
      url.searchParams.set('breed_id', breeds)
    } else {
      url.searchParams.set('breed_id', breed_id)
    }
  }

  status && url.searchParams.set('status', status)
  order && url.searchParams.set('order', order)

  const data = await actionRequestGet<PetPaginate>(url, {
    cache: 'no-store',
  })

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

export async function getStatusList() {
  const data = await actionRequestGet<StatusList>('pet-status', { cache: 'force-cache' })

  return data
}

export async function getCategories() {
  const data = await actionRequestGet<Category[]>('category', { cache: 'force-cache' })

  return data
}

// POST
const MAX_FILE_SIZE = 1048576
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function createPet(prevState: any, data: FormData) {
  const schema = z.object({
    breed_id: z.string(),
    image: z
      .any()
      .refine(
        file => file.size <= MAX_FILE_SIZE && file.size > 0,
        `El peso de la imagen debe ser mayor a 0MB y menor a 1MB.`,
      )
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Solo se permiten .jpg, .jpeg, .png and .webp',
      ),
    description: z.string(),
    estate: z.string(),
    city: z.string(),
    district: z.string(),
    location: z.string(),
    status: z.string(),
    plan: z.string(),
  })

  return sendData({
    url: 'pet-store',
    schema,
    body: data,
    revalidate: true,
    auth: false,
  })
}
