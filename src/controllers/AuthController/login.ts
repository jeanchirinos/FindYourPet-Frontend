'use server'

import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { isCurrentPath } from '@/utilities/serverUtilities'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createAuthToken } from './utils/createAuthToken'

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  type Response = { token: string }

  async function onSuccess(data: Response) {
    createAuthToken(data.token)

    const pathIsHome = await isCurrentPath(ROUTE.HOME)

    if (pathIsHome) {
      redirect(ROUTE.PETS.INDEX)
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
