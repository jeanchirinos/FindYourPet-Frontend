'use server'
import { actionRequest } from '@/utilities/actionRequest'
import { errorResponse } from '@/utilities/request'
import { z } from 'zod'

export async function createPet(prevState: any, formData: FormData) {
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
    return errorResponse
  }

  const res = await actionRequest('pet-store', {
    method: 'POST',
    body: formData,
  })

  return res
}
