'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar } from 'next-nprogress-bar'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/other/CustomToaster'

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class'>
        {props.children}
        <AppProgressBar
          height='1.5px'
          color='hsl(var(--nextui-primary))'
          options={{ showSpinner: false }}
          shallowRouting
        />
        <Toaster />
      </ThemeProvider>
    </NextUIProvider>
  )
}
