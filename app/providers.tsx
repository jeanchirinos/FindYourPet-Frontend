'use client'
import { fetcher } from '@/utilities/utilities'
import { NextUIProvider } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import { SWRConfig } from 'swr'

const Toaster = dynamic(
  async () => {
    const { Toaster: BaseToaster } = await import('react-hot-toast')
    return BaseToaster
  },
  {
    ssr: false,
  },
)

export function Providers(props: React.PropsWithChildren) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        shouldRetryOnError: false,
      }}
    >
      <NextUIProvider>
        {props.children}
        <Toaster />
      </NextUIProvider>
    </SWRConfig>
  )
}
