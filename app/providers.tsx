'use client'
// import { swrFetcher } from '@/utilities/utilities'
import { NextUIProvider } from '@nextui-org/react'
// import { SWRConfig } from 'swr'
import { Toaster } from 'react-hot-toast'

export function Providers(props: React.PropsWithChildren) {
  return (
    // <SWRConfig
    //   value={{
    //     fetcher: swrFetcher,
    //     revalidateIfStale: false,
    //     revalidateOnFocus: false,
    //     revalidateOnReconnect: false,
    //     shouldRetryOnError: false,
    //   }}
    // >
    <NextUIProvider>
      {props.children}
      <Toaster />
    </NextUIProvider>
    // </SWRConfig>
  )
}
