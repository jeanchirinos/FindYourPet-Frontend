'use server'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function resetPassword(prevState: any, formData: FormData) {
  const schema = z
    .object({
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
      token: z.string().min(1),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirm'],
    })

  return sendData({
    url: 'reset-password',
    schema,
    body: formData,
    auth: false,
  })
}
