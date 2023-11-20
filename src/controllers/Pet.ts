import { BreedsData, Category, PetPaginate } from '@/models/Pet'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { notFound } from 'next/navigation'
import { z } from 'zod'

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

export async function getStatusList() {
  type Response = { id: number; value: string }[]

  const data = await actionRequestGet<Response>('pet-status', { cache: 'force-cache' })

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
      .instanceof(File)
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
  })

  return sendData({
    url: 'pet-store',
    schema,
    body: data,
    revalidate: true,
    auth: false,
  })
}
