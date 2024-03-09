'use server'
import { sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function register(formData: FormData) {
  const schema = z
    .object({
      email: z.string().email(),
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirm'],
    })

  return sendData({
    url: 'register',
    schema,
    body: formData,
    auth: false,
  })
}
