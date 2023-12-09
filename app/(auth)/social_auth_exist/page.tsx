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
    <main className='flex-center min-h-screen'>
      <p className='text-balance'>El correo ya se encuentra vinculado</p>
      <p className='text-xs'> Inicie sesión y agregue su correo como método de inicio de sesión </p>
      <Button className='mt-5' onClick={handleBack}>
        Entendido
      </Button>
    </main>
  )
}
