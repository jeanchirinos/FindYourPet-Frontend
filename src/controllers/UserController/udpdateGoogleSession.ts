'use server'
import { ROUTE } from '@/routes'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function udpdateGoogleSession(token: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  if (!headers().get('referer')?.includes(ROUTE.SETTINGS)) {
    cookies().set('jwt', token, { expires })
  }

  if (headers().get('referer')?.includes(ROUTE.HOME)) {
    redirect(ROUTE.PETS.INDEX)
  }
}
