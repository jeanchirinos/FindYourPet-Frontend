'use server'
import { errorResponse, requestAction } from '@/utilities/actionsRequest'
import { z } from 'zod'

export async function createPet(prevState: any, formData: FormData) {
  const schema = z.object({
    breed_id: z.number(),
    // image: z.string(),
    description: z.string(),
    city: z.string(),
    district: z.string(),
    location: z.string(),
    status: z.number(),
  })

  try {
    schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
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
