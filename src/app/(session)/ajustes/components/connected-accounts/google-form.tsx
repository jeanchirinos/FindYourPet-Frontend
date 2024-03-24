'use client'

import { Button } from '@nextui-org/button'
import { useGoogle } from '@/hooks/useGoogle'
import { SubmitButton } from '@/components/SubmitButton'
import { disconnectGoogle } from '@/controllers/UserController/disconnectGoogle'
import { IconGoogle } from '@/icons'

type Props = { isConnected: boolean; username: string | null }

export function GoogleForm(props: Props) {
  const { isConnected, username } = props

  const { openGoogleWindow } = useGoogle()

  return (
    <form
      action={disconnectGoogle}
      className='flex items-center justify-between rounded-md border border-default-100 px-2.5 py-2'
    >
      <div className='flex items-center gap-x-2'>
        <IconGoogle size={24} />
        <div className='flex flex-col text-sm'>
          <p>Google</p>
          {isConnected && <p className='text-sm text-neutral-400'>{username}</p>}
        </div>
      </div>

      {isConnected ? (
        <SubmitButton size='sm' className='rounded-md bg-custom1 text-sm text-inherit'>
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
