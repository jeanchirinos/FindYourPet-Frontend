'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function verifyMobile(data: { mobile: string; code: string }) {
  const schema = z.object({
    code: z.string().length(6),
    mobile: z.string().length(9),
  })

  return sendData({
    url: 'verify-mobile',
    body: data,
    schema,
    revalidateTagParams: ['user'],
  })
}
