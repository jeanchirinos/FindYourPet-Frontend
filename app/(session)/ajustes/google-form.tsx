'use client'

import { Button } from '@/components/Button'
import { useGoogle } from '@/hooks/useGoogle'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { disconnectGoogle } from '@/controllers/Auth'
import { IconGoogle } from '@/icons'

type Props = { isConnected: boolean; username: string | null }

export function GoogleForm(props: Props) {
  const { isConnected, username } = props

  const { openGoogleWindow } = useGoogle({ loggedIn: true })
  const { formAction } = useFormAction(disconnectGoogle, { showSuccessToast: false })

  return (
    <form
      action={formAction}
      className='flex items-center justify-between rounded-md border border-th-fg-2 px-2.5 py-2'
    >
      <div className='flex items-center gap-x-2'>
        <IconGoogle size={24} />
        <div className='flex flex-col text-sm'>
          <p>Google</p>
          {isConnected && <p className='text-sm text-neutral-400'>{username}</p>}
        </div>
      </div>

      {isConnected ? (
        <SubmitButton size='sm' className='rounded-md bg-th-fg-2 text-sm text-th-txt-1'>
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
