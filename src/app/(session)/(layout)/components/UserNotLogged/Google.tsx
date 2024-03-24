'use client'

import { Button } from '@nextui-org/button'
import { useGoogle } from '@/hooks/useGoogle'
import { IconGoogle } from '@/icons'

export function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button fullWidth onPress={openGoogleWindow} startContent={<IconGoogle />}>
      Continuar con Google
    </Button>
  )
}
