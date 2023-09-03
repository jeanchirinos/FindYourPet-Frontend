'use client'
import { SWRKey } from '@/enums'
import { Session } from '@/types'
import { createContext, useContext } from 'react'
import useSWR from 'swr'

interface CtxProps {
  session: Session | null
}

const Context = createContext({} as CtxProps)

export function SessionContext(props: React.PropsWithChildren) {
  const { data = null } = useSWR(SWRKey.SESSION, {})

  return <Context.Provider value={{ session: data }}>{props.children}</Context.Provider>
}

export const useSessionContextBase = () => useContext(Context)

export function useSessionContext(props: Session) {
  const { session } = useSessionContextBase()
  const mySession = session ?? props
  return { mySession }
}
