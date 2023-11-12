'use server'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export async function createPet(prevState: any, data: FormData) {
  const schema = z.object({
    breed_id: z.string(),
    image: z
      .instanceof(File)
      .refine(
        file => file.size <= MAX_FILE_SIZE && file.size > 0,
        `El peso de la imagen debe ser mayor a 0MB y menor a 5MB.`,
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
    data,
    revalidate: true,
  })
}
