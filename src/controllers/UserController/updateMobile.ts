'use server'

import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function updateMobile(data: { mobile: string }) {
  const schema = z.object({
    mobile: z.union([
      z
        .string()
        .length(9)
        .regex(/^9[0-9]{8}$/),
      z.literal(''),
    ]),
  })

  type Res = { seconds: number }

  return sendData<Res>({
    url: 'update-mobile',
    body: data,
    schema,
    revalidateTagParams: ['user'],
  })
}
