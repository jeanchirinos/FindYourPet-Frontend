import { getSession } from '@/controllers/Auth'
import { UserLogged } from './UserLogged/UserLogged'
import { UserNotLogged } from './UserNotLogged'

export async function Session() {
  const session = await getSession()

  return session ? <UserLogged session={session} /> : <UserNotLogged />
}
