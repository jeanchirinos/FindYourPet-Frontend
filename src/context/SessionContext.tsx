'use client'
import { SWRKey } from '@/enums'
import { Session } from '@/types'
import { createContext, useContext, type PropsWithChildren } from 'react'
import useSWR from 'swr'

interface CtxProps {
  session: Session
}

const Context = createContext({} as CtxProps)

interface Props extends PropsWithChildren {
  session: Session
}

export function SessionContext(props: Props) {
  const { session, children } = props
  // const { data = session } = useSWR(SWRKey.SESSION)

  const data = {
    status: 'success',
    auth: true,
    image: 'http://127.0.0.1:8000/users/2/profile.webp',
    role: 'admin',
  }

  return <Context.Provider value={{ session: data }}>{children}</Context.Provider>
}

export const useSessionContext = () => useContext(Context)
