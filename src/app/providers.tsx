'use client'
import { NextUIProvider } from '@nextui-org/react'
import { AppProgressBar } from 'next-nprogress-bar'
import { Suspense } from 'react'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/other/CustomToaster'

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      <ThemeProvider attribute='class'>
        {props.children}
        <Suspense>
          <AppProgressBar
            height='1.5px'
            color='hsl(var(--nextui-primary))'
            options={{ showSpinner: false }}
            shallowRouting
          />
        </Suspense>
        <Toaster />
      </ThemeProvider>
    </NextUIProvider>
  )
}
