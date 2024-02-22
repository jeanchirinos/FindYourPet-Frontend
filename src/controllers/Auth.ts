'use server'
import { SessionLogged } from '@/models/Auth'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { cookies, headers } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
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

export async function login(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  type Response = { token: string }

  function onSuccess(data: Response) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    cookies().set('jwt', data.token, { expires })

    if (headers().get('referer')?.includes('/inicio')) {
      redirect('/')
    }
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
    revalidateTagParams: ['user-google'],
  })
}

export async function verifyToken(token: string | undefined) {
  if (!token) notFound()

  try {
    await actionRequestGet(`verify-token/${token}`)
  } catch (err) {
    notFound()
  }
}

// GET
export async function getSession() {
  try {
    const data = await actionRequestGet<SessionLogged>('session', { auth: true })

    return data
  } catch (err) {
    return null
  }
}
