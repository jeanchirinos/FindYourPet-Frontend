'use client'
import { NextUIProvider } from '@nextui-org/react'
import { Toaster } from 'react-hot-toast'

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      {props.children}
      <Toaster />
    </NextUIProvider>
  )
}
