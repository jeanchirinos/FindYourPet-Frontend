'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      {props.children}
      <Suspense>
        <AppProgressBar
          height='1.5px'
          color='#FF813F'
          options={{ showSpinner: false }}
          shallowRouting
        />
      </Suspense>
      <Toaster />
    </NextUIProvider>
  )
}
