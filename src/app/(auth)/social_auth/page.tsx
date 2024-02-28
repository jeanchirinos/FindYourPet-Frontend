'use client'
import { updateGoogle } from '@/controllers/Auth'
import { Spinner } from '@nextui-org/spinner'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Open only if it was opened by the app
    if (!window.opener) return router.replace('/')

    async function closeWindow() {
      await updateGoogle({ token: searchParams.get('token') })
      close()
    }

    closeWindow()

    // window.opener.postMessage(Object.fromEntries(searchParams), window.location.origin)
  }, [router, searchParams])

  return (
    <main className='h-screen flex-col gap-y-6 text-xl flex-center'>
      <Spinner size='lg' color='current' />
      <p>Autorizando</p>
    </main>
  )
}
