'use server'

import { User } from '@/models/User'
import { actionRequestGet, sendData } from '@/utilities/actionRequest'
import { z } from 'zod'

export async function updateUserImageProfile(formData: FormData) {
  const schema = z.object({
    image: z.string().min(1),
  })

  return sendData({
    url: 'user-profile',
    body: formData,
    schema,
    revalidateTagParams: ['user'],
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
    revalidateTagParams: ['user'],
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
    revalidateTagParams: ['user'],
  })
}

// GET
export async function getUser() {
  const data = await actionRequestGet<User>('user', {
    auth: true,
    next: {
      tags: ['user'],
    },
  })

  return data
}

export async function getGoogleData() {
  type Res = { isConnected: boolean; username: string | null }

  const data = await actionRequestGet<Res>('user-google-data', {
    auth: true,
    redirectIfUnauthorized: false,
    next: {
      tags: ['user-google'],
    },
    nullable: true,
  })
  return data
}
