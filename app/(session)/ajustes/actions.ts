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

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}

export async function updateUserImageProfile(formData: FormData) {
  const response = await actionRequest('user-profile', {
    method: 'POST',
    body: formData,
  })

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}

export async function updateMobile(formData: FormData) {
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
      mobile: formData.get('mobile'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('update-mobile', {
    method: 'POST',
    body: data,
  })

  return response
}

// export async function verifyMobile(formData: FormData) {
//   const schema = z.object({
//     mobile: z.union([
//       z
//         .string()
//         .length(9)
//         .regex(/^9[0-9]{8}$/),
//       z.literal(''),
//     ]),
//   })

//   let data: z.infer<typeof schema>

//   try {
//     data = schema.parse({
//       mobile: formData.get('mobile'),
//     })
//   } catch (error) {
//     return errorResponse
//   }

//   const response = await actionRequest('user-update-mobile', {
//     method: 'POST',
//     body: data,
//   })

//   return response
// }
