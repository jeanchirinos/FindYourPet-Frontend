'use client'
import { Input } from 'app/components/Input'
import { useResetPassword } from '@/services/auth'
import { Button } from '@nextui-org/react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function Form(props: { token: string }) {
  // STATES
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(password)

  // HOOOKS
  const { trigger, isMutating } = useResetPassword()

  // VALUES
  const isDisabled = password !== passwordConfirm

  // FUNCTIONS
  function resetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (isDisabled) return toast.error('Las contraseñas no coinciden')
    trigger({ password, passwordConfirm, token: props.token })
  }

  return (
    <>
      <form onSubmit={resetPassword} className='flex w-80 max-w-full flex-col gap-y-4 text-center'>
        <h2>Ingresa tu nueva contraseña</h2>

        <Input
          label='Contraseña'
          type='password'
          name='password'
          minLength={8}
          onChange={e => setPassword(e.target.value)}
          autoFocus
        />
        <Input
          label='Confirmar contraseña'
          name='passwordConfirm'
          type='password'
          minLength={8}
          onChange={e => setPasswordConfirm(e.target.value)}
        />

        <Button color='primary' isLoading={isMutating} isDisabled={isDisabled} type='submit'>
          Restablecer
        </Button>
      </form>
    </>
  )
}
