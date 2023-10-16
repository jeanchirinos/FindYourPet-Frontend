'use server'
import { actionRequest } from '@/utilities/actionRequest'
import { errorResponse } from '@/utilities/request'
import { revalidatePath } from 'next/cache'
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

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('register', {
    method: 'POST',
    body: data,
  })

  return response
}

export async function login(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest<{ token: string }>('login', {
    method: 'POST',
    body: data,
  })

  if (response.status === 'success') {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    cookies().set('jwt', response.data.token, { expires })
  }

  return response
}

export async function logout() {
  await actionRequest('logout', {
    method: 'POST',
  })

  cookies().delete('jwt')
}

export async function forgotPassword(formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
  })

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      email: formData.get('email'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('forgot-password', {
    method: 'POST',
    body: data,
  })

  return response
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

  let data: z.infer<typeof schema>

  try {
    data = schema.parse({
      password: formData.get('password'),
      passwordConfirm: formData.get('passwordConfirm'),
      token: formData.get('token'),
    })
  } catch (error) {
    return errorResponse
  }

  const response = await actionRequest('reset-password', {
    method: 'POST',
    body: data,
  })

  return response
}

export async function disconnectGoogle() {
  const response = await actionRequest('user-google-disconnect', {
    method: 'POST',
  })

  if (response.status === 'success') {
    revalidatePath('/')
  }

  return response
}
