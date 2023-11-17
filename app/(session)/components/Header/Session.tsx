import { actionRequestGet } from '@/utilities/actionRequest'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { SessionLogged } from '@/types'

async function getSession() {
  try {
    const data = await actionRequestGet<SessionLogged>('session', { auth: true })

    return data
  } catch (err) {
    return null
  }
}

export async function Session() {
  const session = await getSession()

  return session ? <UserLogged session={session} /> : <UserNotLogged />
}
