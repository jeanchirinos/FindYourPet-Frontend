'use client'
import { NextUIProvider } from '@nextui-org/react'
import dynamic from 'next/dynamic'

const Toaster = dynamic(() => import('react-hot-toast').then(module => module.Toaster), {
  ssr: false,
})

// const Toaster = dynamic(
//   async () => {
//     const { Toaster: BaseToaster } = await import('react-hot-toast')
//     return BaseToaster
//   },
//   {
//     ssr: false,
//   }
// )

export function Providers(props: React.PropsWithChildren) {
  return (
    <NextUIProvider>
      {props.children}
      <Toaster />
    </NextUIProvider>
  )
}
