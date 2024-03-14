'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function updateInfo(data: { param: string; value: string }) {
  const schema = z.object({
    param: z.string().min(1),
    value: z.string(),
  })

  return sendData({
    url: 'user-update',
    body: data,
    schema,
    revalidateTagParams: ['user'],
  })
}
