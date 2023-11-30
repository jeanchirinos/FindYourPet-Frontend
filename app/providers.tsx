'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar } from 'next-nprogress-bar'
import { Toaster } from 'react-hot-toast'

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      {props.children}
      <AppProgressBar
        height='1.5px'
        color='#FF813F'
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Toaster />
    </NextUIProvider>
  )
}
