'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/components/Button'
import { twJoin } from 'tailwind-merge'
import { useGoogle } from '@/hooks/useGoogle'

export function GoogleForm(props: { isConnected: boolean; username: string | null }) {
  const { isConnected, username } = props

  const { openGoogleWindow } = useGoogle()

  return (
    <div className='flex items-center justify-between rounded-md border border-neutral-200 px-2.5 py-2'>
      <div className='flex items-center gap-x-2'>
        <FcGoogle size={24} />
        <div className='flex flex-col text-sm'>
          {isConnected && <p className='text-sm text-neutral-500'>{username}</p>}
          <p>Google</p>
        </div>
      </div>
      <Button
        onPress={openGoogleWindow}
        size='sm'
        className={twJoin(
          'rounded-md  text-sm ',
          isConnected ? 'bg-zinc-100' : 'bg-blue-500 text-white',
        )}
      >
        {isConnected ? 'Desconectar' : 'Conectar'}
      </Button>
    </div>
  )
}
