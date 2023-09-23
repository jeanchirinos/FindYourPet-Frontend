import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { getSession } from '@/services/session'

export async function Session() {
  const session = await getSession()

  return session.auth ? <UserLogged session={session} /> : <UserNotLogged />
}
