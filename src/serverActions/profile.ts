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

  const res = await actionRequest('user-update', {
    method: 'POST',
    body: data,
  })

  if (res.ok) {
    revalidatePath('/')
  }

  return res
}

export async function updateUserImageProfile(formData: FormData) {
  const res = await actionRequest('user-profile', {
    method: 'POST',
    body: formData,
  })

  if (res.ok) {
    revalidatePath('/')
  }

  return res
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

  const res = await actionRequest<Res>('update-mobile', {
    method: 'POST',
    body: data,
  })

  return res
}

export async function verifyMobile({ mobile, code }: { mobile: string; code: string }) {
  const schema = z.object({
    code: z.string().length(6),
    mobile: z.string().length(9),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      code,
      mobile,
    })
  } catch (error) {
    return errorResponse
  }

  const res = await actionRequest('verify-mobile', {
    method: 'POST',
    body: data,
  })

  return res
}

export async function updateValue({ param, value }: { param: string; value: string }) {
  // const schema = z.object({
  //   name: z.string().min(1),
  // })

  // try {
  //   schema.parse({
  //     name,
  //   })
  // } catch (error) {
  //   return errorResponse
  // }

  const body = {
    param,
    value,
  }

  const res = await actionRequest('user-update', {
    method: 'POST',
    body,
  })

  if (res.ok) {
    revalidatePath('/')
  }

  return res
}