'use server'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function forgotPassword(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
  })

  return sendData({
    url: 'forgot-password',
    schema,
    body: formData,
    auth: false,
  })
}
