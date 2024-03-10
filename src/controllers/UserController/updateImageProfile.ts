'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function updateImageProfile(formData: FormData) {
  const schema = z.object({
    image: z.string().min(1),
  })

  return sendData({
    url: 'user-profile',
    body: formData,
    schema,
    revalidateTagParams: ['user'],
  })
}
