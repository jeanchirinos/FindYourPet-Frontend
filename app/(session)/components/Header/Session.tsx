'use client'
import { useSessionContext } from '@/context/SessionContext'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { Session as SessionType } from '@/types'

export function Session(props: { session: SessionType }) {
  const { mySession } = useSessionContext(props.session)

  return mySession.auth ? <UserLogged session={mySession} /> : <UserNotLogged />
}
