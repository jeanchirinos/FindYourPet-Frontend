'use client'
import { SessionLogged } from '@/types'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Page(props: { searchParams: SessionLogged }) {
  const { searchParams } = props
  const router = useRouter()

  useEffect(() => {
    // Open only if it was opened by the app
    if (!window.opener) return router.replace('/')

    window.opener.postMessage(JSON.stringify(searchParams), window.location.origin)
  }, [router, searchParams])

  return <></>
}
