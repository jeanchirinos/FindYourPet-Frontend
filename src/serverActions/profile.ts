'use server'

import { actionRequest } from '@/utilities/actionRequest'
import { errorResponse } from '@/utilities/request'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    username: z.string().min(1),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      name: formData.get('name'),
      username: formData.get('username'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('user-update', {
    method: 'POST',
    body: data,
  })

  if (response.ok) {
    revalidatePath('/')
  }

  return response
}

export async function updateUserImageProfile(formData: FormData) {
  const response = await actionRequest('user-profile', {
    method: 'POST',
    body: formData,
  })

  if (response.ok) {
    revalidatePath('/')
  }

  return response
}

export async function updateMobile({ mobile }: { mobile: string }) {
  const schema = z.object({
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
      mobile,
    })
  } catch (error) {
    return errorResponse
  }

  type Res = { seconds: number }

  const response = await actionRequest<Res>('update-mobile', {
    method: 'POST',
    body: data,
  })

  return response
}

export async function verifyMobile({ code }: { code: string }) {
  const schema = z.object({
    code: z.string().length(6),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      code,
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('verify-mobile', {
    method: 'POST',
    body: data,
  })

  return response
}
