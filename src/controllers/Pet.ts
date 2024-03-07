'use server'

import { BreedsData, Category, Pet, StatusList } from '@/models/Pet'
import { Paginate } from '@/models/Post'
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
  estate: string
  city: string
  district: string
}>

export async function getPets(params: TGetPetParams) {
  const { page, order, status, category_id, breed_id, estate, city, district } = params
  const limit = '15'

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

  estate && url.searchParams.set('estate', estate)
  city && url.searchParams.set('city', city)
  district && url.searchParams.set('district', district)

  const data = await actionRequestGet<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['pet', 'pets-list'],
    },
  })

  const { current_page, data: pets } = data

  if (pets.length === 0 && current_page !== 1) {
    notFound()
  }

  return data
}

export async function getPetById(id: string) {
  const data = await actionRequestGet<{ pet: Pet; morePets: Pet[] }>(`pet-find/${id}`, {
    cache: 'no-store',
    auth: true,
    authIsOptional: true,
  })

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

  // if image or description was updated
  // data.set('published', '0')

  const schema = z.object({
    breed_id: z.string(),
    // id: z.string(),
    // image: z.optional(
    //   z
    //     .any()
    //     .refine(
    //       file => file.size <= MAX_FILE_SIZE && file.size > 0,
    //       `El peso de la imagen debe ser mayor a 0MB y menor a 1MB.`,
    //     )
    //     .refine(
    //       file => ACCEPTED_IMAGE_TYPES.includes(file.type),
    //       'Solo se permiten .jpg, .jpeg, .png and .webp',
    //     ),
    // ),
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

export type TGetPetParams2 = Partial<{
  page: string
  status: string
  category_id: string
  breed_id: string | string[]
  order: string
  estate: string
  city: string
  district: string
  published: string
}>

export async function getAllPetsAdmin(params: TGetPetParams2) {
  const { page, order, status, category_id, breed_id, estate, city, district, published } = params
  const limit = '15'

  const url = getApiUrl('admin-pets')

  url.pathname += `/${limit}`

  page && url.searchParams.set('page', page)

  category_id && url.searchParams.set('category_id', category_id)
  published && url.searchParams.set('published', published)

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

  estate && url.searchParams.set('estate', estate)
  city && url.searchParams.set('city', city)
  district && url.searchParams.set('district', district)

  const data = await actionRequestGet<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['admin-pets', 'pets-list'],
    },
    auth: true,
  })

  const { current_page, data: pets } = data

  if (pets.length === 0 && current_page !== 1) {
    notFound()
  }

  return data
}

export async function getUserPosts(params: TGetPetParams2) {
  const { page, published } = params
  const limit = '5'

  const url = getApiUrl('pet-user')
  url.pathname += `/${limit}`

  page && url.searchParams.set('page', page)
  published && url.searchParams.set('published', published)

  const data = await actionRequestGet<Paginate<Pet>>(url, {
    cache: 'no-store',
    next: {
      tags: ['user-posts', 'pets-list'],
    },
    auth: true,
  })

  const { current_page, data: posts } = data

  if (posts.length === 0 && current_page !== 1) {
    notFound()
  }

  return data
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
