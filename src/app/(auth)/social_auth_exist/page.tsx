'use client'

import { Button } from '@/components/Button'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    // Open only if it was opened by the app
    if (!window.opener) return router.replace('/')
  }, [router])

  function handleBack() {
    window.opener.postMessage({}, window.location.origin)
  }

  return (
    <main className='min-h-screen flex-col gap-y-6 px-2 text-center flex-center'>
      <section className='space-y-1.5'>
        <p className='text-lg font-bold'>El correo ya se encuentra vinculado</p>
        <p className='text-foreground-600'>
          Inicie sesión y agregue su correo como método de inicio de sesión{' '}
        </p>
      </section>
      <Button color='primary' onClick={handleBack}>
        Entendido
      </Button>
    </main>
  )
}
