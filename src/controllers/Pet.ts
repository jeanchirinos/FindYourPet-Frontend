'use server'

import { BreedsData, Category, Pet, StatusList } from '@/models/Pet'
import { Paginate } from '@/models/Post'
import { SearchParamsProps } from '@/types'
import { getData, sendData } from '@/utilities/actionRequest'
import { getApiUrl } from '@/utilities/request'
import { z } from 'zod'
import { DEFAULT_PET_PUBLISHED, DEFAULT_PET_STATUS } from './defaultValues'

export type GetPetsParams = SearchParamsProps<
  'page' | 'status' | 'category_id' | 'breed_id' | 'order' | 'estate' | 'city' | 'district'
>

export async function getPets(params: GetPetsParams) {
  const { status = DEFAULT_PET_STATUS } = params
  const limit = '15'

  const searchParams = new URLSearchParams({ ...params, status }).toString()

  const url = getApiUrl(`pet/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['pet', 'pets-list'],
    },
  })

  return data
}

export async function getPetById(id: string) {
  const data = await getData<{ pet: Pet; morePets: Pet[] }>(`pet-find/${id}`, {
    cache: 'no-store',
  })

  return data
}

export async function getPetByIdEdit(id: string) {
  const data = await getData<Pet>(`pet-edit/${id}`, {
    cache: 'no-store',
    auth: true,
  })

  return data
}

export type GetPetsAdminParams = SearchParamsProps<'page' | 'published'>

export async function getAllPetsAdmin(params: GetPetsAdminParams) {
  const { published = DEFAULT_PET_PUBLISHED } = params
  const limit = '15'

  const searchParams = new URLSearchParams({ ...params, published }).toString()

  const url = getApiUrl(`admin-pets/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['admin-pets', 'pets-list'],
    },
    auth: true,
  })

  return data
}

export type GetUserPostsParams = SearchParamsProps<'page' | 'published'>

export async function getUserPosts(params: GetUserPostsParams) {
  const { published = DEFAULT_PET_PUBLISHED } = params
  const limit = '12'

  const searchParams = new URLSearchParams({ ...params, published }).toString()

  const url = getApiUrl(`pet-user/${limit}`)
  url.search = searchParams

  const data = await getData<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['user-posts', 'pets-list'],
    },
    auth: true,
  })

  return data
}

// CACHE
export async function getStatusList() {
  const data = await getData<StatusList>('pet-status', { cache: 'force-cache' })

  return data
}

export async function getCategories() {
  const data = await getData<Category[]>('category', { cache: 'force-cache' })

  return data
}

export async function getBreeds() {
  const data = await getData<BreedsData>('breedList', { cache: 'force-cache' })

  return data
}

// POST
const MAX_FILE_SIZE = 1048576
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function createPet(prevState: any, data: FormData) {
  data.append('location', '')
  data.append('plan', '1')

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
    revalidateTagParams: ['pets-list'],
  })
}

export async function updatePet(prevState: any, data: FormData) {
  const imageFile = data.get('image') as File

  if (imageFile.size === 0) {
    data.delete('image')
  }

  const schema = z.object({
    breed_id: z.string(),
    image: z.optional(
      z
        .any()
        .refine(
          file => file.size <= MAX_FILE_SIZE && file.size > 0,
          `El peso de la imagen debe ser mayor a 0MB y menor a 1MB.`,
        )
        .refine(
          file => ACCEPTED_IMAGE_TYPES.includes(file.type),
          'Solo se permiten .jpg, .jpeg, .png and .webp',
        ),
    ),
    description: z.string(),
    estate: z.string(),
    city: z.string(),
    district: z.string(),
    // location: z.string(),
    status: z.string(),
    // plan: z.string(),
  })

  return sendData({
    url: `pet-update/${data.get('id')}`,
    schema,
    body: data,
    revalidateTagParams: ['post'],
  })
}

export async function updatePetVisibility(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
  })

  return sendData({
    url: `admin-pet-public/${formData.get('id')}`,
    schema,
    body: formData,
    revalidateTagParams: ['pets-list'],
  })
}
