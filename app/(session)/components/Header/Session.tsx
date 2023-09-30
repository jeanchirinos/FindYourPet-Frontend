import { requestAction } from '@/utilities/actionsRequest'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { SessionLogged } from '@/types'

async function getSession() {
  const response = await requestAction<SessionLogged>('session')

  if (response.status === 'error') return { auth: false } as const

  return response
}

export async function Session() {
  const session = await getSession()

  return session.auth ? <UserLogged session={session} /> : <UserNotLogged />
}
