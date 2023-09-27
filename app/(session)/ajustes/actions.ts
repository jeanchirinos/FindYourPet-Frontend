'use server'

import { DefaultSuccessResponse } from '@/hooks/useSendData'
import { request } from '@/utilities/requestServer'
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

  const data = schema.parse({
    name: formData.get('name'),
    username: formData.get('username'),
    mobile: formData.get('mobile'),
  })

  try {
    const response = await request<DefaultSuccessResponse>('user-update', {
      config: {
        method: 'POST',
        body: data,
      },
    })

    revalidatePath('/')
    return response
  } catch (e) {
    return { msg: 'Failed to update user' }
  }
}

export async function updateUserImage(prevState: any, formData: FormData) {
  try {
    const response = await request<DefaultSuccessResponse>('user-profile', {
      config: {
        method: 'POST',
        body: formData,
      },
    })

    revalidatePath('/')

    return response
  } catch (e) {
    return { msg: 'Failed to update user profile image' }
  }
}
