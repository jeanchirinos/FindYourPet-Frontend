'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/Button'
import { useGoogle } from '@/hooks/useGoogle'
import { SubmitButton } from '@/components/SubmitButton'
import { useActionToast } from '@/hooks/useActionToast'
import { disconnectGoogle } from '@/serverActions/auth'

export function GoogleForm(props: { isConnected: boolean; username: string | null }) {
  const { isConnected, username } = props

  const { openGoogleWindow } = useGoogle()

  const { formAction } = useActionToast(disconnectGoogle, { showSuccessToast: false })

  return (
    <form
      action={formAction}
      className='flex items-center justify-between rounded-md border border-neutral-200 px-2.5 py-2'
    >
      <div className='flex items-center gap-x-2'>
        <FcGoogle size={24} />
        <div className='flex flex-col text-sm'>
          <p>Google</p>
          {isConnected && <p className='text-sm text-neutral-500'>{username}</p>}
        </div>
      </div>

      {isConnected ? (
        <SubmitButton size='sm' className='rounded-md bg-zinc-100 text-sm'>
          Desconectar
        </SubmitButton>
      ) : (
        <Button
          onPress={openGoogleWindow}
          size='sm'
          className='rounded-md bg-blue-500 text-sm text-white'
        >
          Conectar
        </Button>
      )}
    </form>
  )
}
