'use client'

import { udpdateGoogleSession } from '@/controllers/UserController/udpdateGoogleSession'
import { getApiUrl } from '@/utilities/request'
import { useEffect, useRef } from 'react'

export function useGoogle() {
  // EFFECT
  useEffect(() => {
    async function handleMessageFromAuthPage(e: MessageEvent<{ token: string }>) {
      console.log('MESSAGE')
      // await udpdateGoogleSession(e.data.token)
      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessageFromAuthPage)

    return () => window.removeEventListener('message', handleMessageFromAuthPage)
  }, [])

  // FUNCTIONS
  function openGoogleWindow() {
    const url = getApiUrl('auth/google/redirect')

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
