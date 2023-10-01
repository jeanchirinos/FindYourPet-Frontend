'use client'
import { Input } from '@/components/Input'
import { useActionToast } from '@/hooks/useActionToast'
import { forgotPassword } from '@/serverActions/auth'
import { SubmitButton } from '@/components/SubmitButton'

export function ForgotForm(props: { initialEmail: string }) {
  const { initialEmail } = props
  const { formAction } = useActionToast(forgotPassword)

  return (
    <form action={formAction} className='flex w-80 max-w-full flex-col gap-y-4 text-center'>
      <h2>Ingresa el correo a recuperar</h2>
      <Input
        defaultValue={initialEmail}
        type='email'
        name='email'
        label='Correo'
        autoFocus
        required
        placeholder='example@gmail.com'
      />
      <SubmitButton>Enviar correo</SubmitButton>
    </form>
  )
}
