'use server'
import { sendData } from '@/utilities/actionRequest'
import { cookies } from 'next/headers'
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

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  type Response = { token: string }

  function onSuccess(data: Response) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    cookies().set('jwt', data.token, { expires })
  }

  return sendData({
    url: 'login',
    schema,
    body: formData,
    onSuccess,
    auth: false,
  })
}

export async function logout() {
  sendData({
    url: 'logout',
  })

  cookies().delete('jwt')
}

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

export async function disconnectGoogle() {
  return sendData({
    url: 'user-google-disconnect',
    revalidate: true,
  })
}
