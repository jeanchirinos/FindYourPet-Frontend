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
    const url = getApiUrl('auth/google/redirect')
    url.searchParams.set('url', window.location.href + 'social_auth')

    function popupWindow(url: string | URL, w: number, h: number) {
      if (!window.top) return

      const { screenX, screenY, outerWidth, outerHeight } = window.top

      const y = outerHeight / 2 + screenY - h / 2
      const x = outerWidth / 2 + screenX - w / 2

      openedWindow.current = window.open(
        url,
        '_blank',
        `width=${w}, height=${h}, top=${y}, left=${x}`,
      )
    }

    const width = 450
    const height = 550

    popupWindow(url, width, height)
  }

  // VALUES
  const openedWindow = useRef<null | Window>(null)

  return { openGoogleWindow }
}
