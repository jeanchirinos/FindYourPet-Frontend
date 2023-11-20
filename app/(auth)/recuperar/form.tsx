'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { useFormAction } from '@/hooks/useFormAction'
import { forgotPassword } from '@/controllers/Auth'

export function ForgotForm(props: { initialEmail: string }) {
  const { initialEmail } = props
  const { formAction, state } = useFormAction(forgotPassword, { showSuccessToast: false })

  if (state.ok)
    return (
      <div className='flex flex-col gap-y-2 text-center'>
        <p>Correo enviado</p>
        <p className='text-xs text-balance'>Revisa tu correo para restablecer tu contraseña</p>

        <Link replace href='/' className='mt-2 rounded-md bg-primary py-1.5 text-white'>
          Ir a inicio
        </Link>
      </div>
    )

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
