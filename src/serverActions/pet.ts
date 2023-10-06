'use server'
import { errorResponse, requestAction } from '@/utilities/actionsRequest'
import { z } from 'zod'

export async function createPet(prevState: any, formData: FormData) {
  const schema = z.object({
    breed_id: z.string(),
    // breed_id: z.number(),
    image: z.any(),
    description: z.string(),
    estate: z.string(),
    city: z.string(),
    district: z.string(),
    location: z.string(),
    status: z.string(),
    // status: z.number(),
  })

  try {
    schema.parse({
      breed_id: formData.get('breed_id'),
      image: formData.get('image'),
      description: formData.get('description'),
      estate: formData.get('estate'),
      city: formData.get('city'),
      district: formData.get('district'),
      location: formData.get('location'),
      status: formData.get('status'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await requestAction('pet-store', {
    method: 'POST',
    body: formData,
  })

  return response
}
