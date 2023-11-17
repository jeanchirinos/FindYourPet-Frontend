'use client'

import { getApiUrl } from '@/utilities/request'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { setCookie } from 'typescript-cookie'

export function useGoogle(params?: { loggedIn: boolean }) {
  const { loggedIn = false } = params ?? {}

  const router = useRouter()

  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<{ token: string }>) {
      const { token } = e.data

      if (!loggedIn) {
        setCookie('jwt', token, { expires: 7, path: '/' })
      }

      router.refresh()
      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [router, loggedIn])

  // FUNCTIONS
  function openGoogleWindow() {
    // TODO: URL BASE ON ENVIRONMENT : DEVELOPMENT | PRODUCTION OR BASE ON URL PASSED
    const url = new URL(getApiUrl('auth/google/redirect'))

    openedWindow.current = window.open(url, '_blank', 'width=400,height=700')
  }

  // VALUES
  const openedWindow = useRef<null | Window>(null)

  return { openGoogleWindow }
}
