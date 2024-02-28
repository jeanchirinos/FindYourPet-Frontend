'use client'

import { updateGoogle } from '@/controllers/Auth'
import { getApiUrl } from '@/utilities/request'
import { useEffect, useRef } from 'react'

export function useGoogle() {
  // EFFECT
  useEffect(() => {
    async function handleMessage(e: MessageEvent<{ token: string }>) {
      const { token } = e.data

      await updateGoogle({ token })
      openedWindow.current?.close()
      close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // FUNCTIONS
  function openGoogleWindow() {
    const url = getApiUrl('auth/google/redirect')

    // TODO: Check this
    url.searchParams.set('url', window.location.href + 'social_auth')
    url.searchParams.set('environment', process.env.NODE_ENV)

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
