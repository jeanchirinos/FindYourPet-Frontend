'use server'
import { errorResponse, requestAction } from '@/utilities/actionsRequest'
import { z } from 'zod'

export async function createPet(formData: FormData) {
  const schema = z.object({
    breed_id: z.string(),
    image: z.any(),
    description: z.string(),
    estate: z.string(),
    city: z.string(),
    district: z.string(),
    location: z.string(),
    status: z.string(),
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
    console.log({ error })
    return errorResponse
  }

  const response = await requestAction('pet-store', {
    method: 'POST',
    body: formData,
  })

  return response
}
