'use server'

import { User } from '@/models/User'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { notAuthorized } from '@/utilities/utilities'
import { notFound } from 'next/navigation'
import { z } from 'zod'

export async function updateUser(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string(),
    username: z.string().min(1),
  })

  return sendData({
    url: 'user-update',
    body: formData,
    schema,
    revalidate: true,
  })
}

export async function updateUserImageProfile(formData: FormData) {
  const schema = z.object({
    image: z.string().min(1),
  })

  return sendData({
    url: 'user-profile',
    body: formData,
    schema,
    revalidate: true,
  })
}

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
    revalidate: true,
  })
}

export async function verifyMobile(data: { mobile: string; code: string }) {
  const schema = z.object({
    code: z.string().length(6),
    mobile: z.string().length(9),
  })

  return sendData({
    url: 'verify-mobile',
    body: data,
    schema,
    revalidate: true,
  })
}

export async function updateInfo(data: { param: string; value: string }) {
  const schema = z.object({
    param: z.string().min(1),
    value: z.string().min(1),
  })

  return sendData({
    url: 'user-update',
    body: data,
    schema,
    revalidate: ['/ajustesa'],
  })
}

// GET

export async function getUser() {
  try {
    const data = await actionRequestGet<User>('user', { auth: true })

    return data
  } catch (err) {
    return notAuthorized()
  }
}

export async function getUserProfile(username: string) {
  try {
    const data = await actionRequestGet<{ data: User }>(`user?username=${username}`, {
      cache: 'no-store',
    })

    return data.data
  } catch (err) {
    notFound()
  }
}

export async function getGoogleData() {
  type Res = { isConnected: boolean; username: string | null }

  try {
    const data = await actionRequestGet<Res>('user-google-data', { auth: true })
    return data
  } catch (e) {
    return null
  }
}
