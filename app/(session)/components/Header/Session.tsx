import { requestAction } from '@/utilities/actionsRequest'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { SessionLogged } from '@/types'
import { cookies } from 'next/headers'

async function getSession() {
  const jwt = cookies().get('jwt')
  if (!jwt) return { auth: false } as const

  const response = await requestAction<SessionLogged>('session')
  if (response.status === 'error') return { auth: false } as const

  return response.data
}

export async function Session() {
  const session = await getSession()

  return session.auth ? <UserLogged session={session} /> : <UserNotLogged />
}
