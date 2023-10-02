'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
// import { setCookie } from 'typescript-cookie'

export function useGoogle() {
  const router = useRouter()

  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<{ token?: string }>) {
      const { token } = e.data

      router.refresh()

      if (token) {
        // if it comes from home page
        // if (process.env.NODE_ENV === 'development') setCookie('jwt', token, { expires: 7 })
      }

      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [router])

  // FUNCTIONS
  function openGoogleWindow() {
    // TODO: URL BASE ON ENVIRONMENT : DEVELOPMENT | PRODUCTION OR BASE ON URL PASSED
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_CLIENT}auth/google/redirect`)

    openedWindow.current = window.open(url, '_blank', 'width=400,height=700')
  }

  // VALUES
  const openedWindow = useRef<null | Window>(null)

  return { openGoogleWindow }
}
