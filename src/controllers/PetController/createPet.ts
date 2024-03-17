'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'
import { ACCEPTED_IMAGE_TYPES, MAX_PET_IMAGE_SIZE } from './constants'

export async function createPet(prevState: any, data: FormData) {
  const schema = z.object({
    breed_id: z.string(),
    image: z
      .any()
      .refine(
        file => file.size <= MAX_PET_IMAGE_SIZE && file.size > 0,
        `El peso de la imagen debe ser mayor a 0MB y menor a 1MB.`,
      )
      .refine(
        file => ACCEPTED_IMAGE_TYPES.includes(file.type),
        'Solo se permiten .jpg, .jpeg, .png and .webp',
      ),
    description: z.string().optional(),
    estate: z.string(),
    city: z.string(),
    district: z.string(),
    location: z.string().optional(),
    status: z.string(),
  })

  return sendData({
    url: 'pet-store',
    schema,
    body: data,
    revalidateTagParams: ['pets-list'],
  })
}
