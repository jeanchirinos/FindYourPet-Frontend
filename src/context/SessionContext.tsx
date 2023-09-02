'use client'
import { SWRKey } from '@/enums'
import { Session } from '@/types'
import { createContext, useContext, type PropsWithChildren, useEffect } from 'react'
import useSWR from 'swr'
import { getCookie } from 'typescript-cookie'
import { useRef } from 'react'

interface CtxProps {
  session: Session | null
}

const Context = createContext({} as CtxProps)

interface Props extends PropsWithChildren {
  session: Session
}

// export function SessionContext(props: Props) {
export function SessionContext(props: React.PropsWithChildren) {
  // const { session, children } = props
  const { data = null, mutate } = useSWR(SWRKey.SESSION, {
    // fallbackData: session,
    // onSuccess() {
    //   console.log('success')
    // },
    // onError() {
    //   console.log('error')
    // },
  })

  // TODO: Remove this
  // const flag = useRef(false)
  // useEffect(() => {
  //   if (flag.current) return
  //   flag.current = true

  //   if (data.auth) return

  //   const cookieSession = getCookie('session')
  //   const session = JSON.parse(cookieSession ?? 'null') as Session | null

  //   if (session?.auth) {
  //     mutate(session, { revalidate: false })
  //   }
  // }, [data, mutate])
  //

  // console.log({ data, session })

  return <Context.Provider value={{ session: data }}>{props.children}</Context.Provider>
}

export const useSessionContext = () => useContext(Context)
