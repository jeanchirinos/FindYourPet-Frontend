'use client'
import { useSessionContext } from '@/context/SessionContext'
import { UserLogged } from './UserLogged'
import { UserNotLogged } from './UserNotLogged'
import { Session as SessionType } from '@/types'
// import { cookies } from 'next/headers'

export function Session(props: { session: SessionType }) {
  const { session } = useSessionContext()

  const mySession = session ?? props.session

  return mySession.auth ? <UserLogged session={mySession} /> : <UserNotLogged />
}
