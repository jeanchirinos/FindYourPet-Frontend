'use server'
import { SessionLogged } from '@/models/Auth'
import { getData } from '@/utilities/actionRequest'

export async function getSession() {
  const data = await getData<SessionLogged>('session', {
    auth: true,
    redirectIfUnauthorized: false,
    nullable: true,
  })

  return data
}
