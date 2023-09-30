'use client'
import { Input } from 'app/components/Input'
import { resetPassword } from '@/serverActions/auth'
import { SubmitButton } from 'app/(session)/ajustes/update-form'
import { useActionToast } from '@/hooks/useActionToast'

export function Form(props: { token: string }) {
  const { formAction } = useActionToast(resetPassword)

  return (
    <form action={formAction} className='flex w-80 max-w-full flex-col gap-y-4 text-center'>
      <h2>Ingresa tu nueva contraseña</h2>
      <Input required type='password' name='password' label='Contraseña' minLength={8} autoFocus />
      <Input
        required
        type='password'
        name='passwordConfirm'
        label='Confirmar contraseña'
        minLength={8}
      />
      <input type='hidden' name='token' value={props.token} readOnly />
      <SubmitButton>Restablecer</SubmitButton>
    </form>
  )
}
