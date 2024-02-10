'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/Button'
import { useGoogle } from '@/hooks/useGoogle'

export function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button
      onPress={openGoogleWindow}
      className='flex w-full items-center justify-center gap-x-1 rounded-md bg-content2 px-2 py-1 shadow-sm'
    >
      <FcGoogle />
      <span>Continuar con Google</span>
    </Button>
  )
}
