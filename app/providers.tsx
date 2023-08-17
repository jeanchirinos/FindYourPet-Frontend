'use client'
import { NextUIProvider } from '@nextui-org/react'

export function Providers(props: React.PropsWithChildren) {
  return <NextUIProvider>{props.children}</NextUIProvider>
}
