'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Open only if it was opened by the app
    if (!window.opener) return router.replace('/')

    window.opener.postMessage(Object.fromEntries(searchParams), window.location.origin)
  }, [router, searchParams])

  return <></>
}
