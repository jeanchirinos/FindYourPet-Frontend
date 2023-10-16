'use server'

import { errorResponse, requestAction } from '@/utilities/actionsRequest'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    username: z.string().min(1),
    mobile: z.union([
      z
        .string()
        .length(9)
        .regex(/^9[0-9]{8}$/),
      z.literal(''),
    ]),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      name: formData.get('name'),
      username: formData.get('username'),
      mobile: formData.get('mobile'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await requestAction('user-update', {
    method: 'POST',
    body: data,
  })

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}

export async function updateUserImageProfile(formData: FormData) {
  const response = await requestAction('user-profile', {
    method: 'POST',
    body: formData,
  })

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}
