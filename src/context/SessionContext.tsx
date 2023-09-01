'use client'
import { SWRKey } from '@/enums'
import { Session } from '@/types'
import { createContext, useContext, type PropsWithChildren, useEffect } from 'react'
import useSWR from 'swr'
import { getCookie } from 'typescript-cookie'
import { useRef } from 'react'

interface CtxProps {
  session: Session
}

const Context = createContext({} as CtxProps)

interface Props extends PropsWithChildren {
  session: Session
}

export function SessionContext(props: Props) {
  const { session, children } = props
  const { data = session, mutate } = useSWR(SWRKey.SESSION, {
    // fallbackData: session,
    // onSuccess() {
    //   console.log('success')
    // },
    // onError() {
    //   console.log('error')
    // },
  })

  // TODO: Remove this

  const flag = useRef(false)
  useEffect(() => {
    if (flag.current) return
    flag.current = true

    if (data.auth) return

    const cookieSession = getCookie('session')
    const session = JSON.parse(cookieSession ?? 'null') as Session | null

    if (session?.auth) {
      mutate(session, { revalidate: false })
    }
  }, [data, mutate])

  return <Context.Provider value={{ session: data }}>{children}</Context.Provider>
}

export const useSessionContext = () => useContext(Context)
