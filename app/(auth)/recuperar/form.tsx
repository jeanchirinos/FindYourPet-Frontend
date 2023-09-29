'use client'
import { Input } from '@/components/Input'
import { forgotPassword } from '@/serverActions/auth'
import { SubmitButton } from 'app/(session)/ajustes/update-form'
//@ts-ignore
import { experimental_useFormState as useFormState } from 'react-dom'

export function ForgotForm(props: { initialEmail: string }) {
  const { initialEmail } = props

  const [, formAction] = useFormState(forgotPassword)

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
