'use server'

import { getData } from '@/utilities/actionRequest'
import { ERole } from './constants'

export type SessionLogged = {
  auth: true
  image: string
  role: ERole
  username: string
  email: string
  name: string | null
}

export async function getSession() {
  const data = await getData<SessionLogged>('session', {
    auth: true,
    redirectIfUnauthorized: false,
    nullable: true,
  })

  return data
}
