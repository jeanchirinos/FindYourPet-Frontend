'use server'

import { ROUTE } from '@/routes'
import { sendData } from '@/utilities/actionRequest'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

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

    if (headers().get('referer')?.includes(ROUTE.HOME)) {
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
