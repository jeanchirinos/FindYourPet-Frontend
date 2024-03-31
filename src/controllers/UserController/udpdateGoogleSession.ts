'use server'
import { ROUTE } from '@/routes'
import { isCurrentPath } from '@/utilities/serverUtilities'
import { redirect } from 'next/navigation'
import { createAuthToken } from '../AuthController/utils/createAuthToken'

export async function udpdateGoogleSession(token: string) {
  const pathIsSettings = await isCurrentPath(ROUTE.SETTINGS)
  const pathIsHome = await isCurrentPath(ROUTE.HOME)

  if (!pathIsSettings) {
    createAuthToken(token)
  }

  if (pathIsHome) {
    redirect(ROUTE.PETS.INDEX)
  }
}
