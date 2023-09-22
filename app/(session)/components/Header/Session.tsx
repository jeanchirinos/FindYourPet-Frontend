// 'use client'
// import { useSessionContext } from '@/context/SessionContext'
// import { UserLogged } from './UserLogged'
// import { UserNotLogged } from './UserNotLogged'
// import { Session as SessionType } from '@/types'

// export function Session(props: { session: SessionType }) {
//   const { mySession } = useSessionContext(props.session)

//   return mySession.auth ? <UserLogged session={mySession} /> : <UserNotLogged />
// }

import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { getSession } from '@/services/session'

export async function Session() {
  const session = await getSession()

  return session.auth ? <UserLogged session={session} /> : <UserNotLogged />
}
