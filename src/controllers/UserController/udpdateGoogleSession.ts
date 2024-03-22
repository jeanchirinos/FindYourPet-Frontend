'use server'
import { ROUTE } from '@/routes'
import { isCurrentPath } from '@/utilities/serverUtilities'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function udpdateGoogleSession(token: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  const pathIsSettings = await isCurrentPath(ROUTE.SETTINGS)
  const pathIsHome = await isCurrentPath(ROUTE.HOME)

  if (!pathIsSettings) {
    cookies().set('jwt', token, { expires })
  }

  if (pathIsHome) {
    redirect(ROUTE.PETS.INDEX)
  }
}
