'use server'

import { errorResponse, requestAction } from '@/utilities/actionsRequest'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    username: z.string().nonempty(),
    mobile: z.union([
      z
        .string()
        .length(9)
        .regex(/^9[0-9]{8}$/),
      z.literal(''),
    ]),
  })

  try {
    const data = schema.parse({
      name: formData.get('name'),
      username: formData.get('username'),
      mobile: formData.get('mobile'),
    })

    const response = await requestAction('user-update', {
      method: 'POST',
      body: data,
    })

    if (response.status === 'success') {
      revalidatePath('/')
    }

    return response
  } catch (error) {
    // if (error instanceof ZodError) {
    //   console.log({ error: error.formErrors.fieldErrors })
    // }

    return { errorResponse }
  }
}

export async function updateUserImageProfile(prevState: any, formData: FormData) {
  const response = await requestAction('user-profile', {
    method: 'POST',
    body: formData,
  })

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}
