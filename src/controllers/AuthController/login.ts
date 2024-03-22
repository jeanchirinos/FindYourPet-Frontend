'use server'

import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { isCurrentPath } from '@/utilities/serverUtilities'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function login(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  type Response = { token: string }

  async function onSuccess(data: Response) {
    const expires = new Date()
    expires.setDate(expires.getDate() + 7)

    cookies().set('jwt', data.token, { expires })

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
