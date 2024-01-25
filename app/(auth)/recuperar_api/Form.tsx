'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import Link from 'next/link'
import { resetPassword } from '@/controllers/Auth'

export function Form(props: { token?: string }) {
  const { formAction, state } = useFormAction(resetPassword, { showSuccessToast: false })

  if (state.ok) {
    return (
      <div className='flex flex-col gap-y-2 text-center'>
        <p>Contraseña restablecida</p>
        <p className='text-balance text-xs'>Ya puedes iniciar sesión con tu nueva contraseña</p>

        <Link replace href='/' className='mt-2 rounded-md bg-primary py-1.5 text-white'>
          Ir a inicio
        </Link>
      </div>
    )
  }

  return (
    <form action={formAction} className='flex w-80 max-w-full flex-col gap-y-4 text-center'>
      <h2>Ingresa una nueva contraseña</h2>

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
