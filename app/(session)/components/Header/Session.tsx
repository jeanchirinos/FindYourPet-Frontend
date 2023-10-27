import { actionRequest } from '@/utilities/actionRequest'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { SessionLogged } from '@/types'
import { cookies } from 'next/headers'

async function getSession() {
  const jwt = cookies().get('jwt')
  if (!jwt) return { auth: false } as const

  const res = await actionRequest<SessionLogged>('session')

  if (!res.ok) return { auth: false } as const

  return res.data
}

export async function Session() {
  const session = await getSession()

  return session.auth ? <UserLogged session={session} /> : <UserNotLogged />
}
