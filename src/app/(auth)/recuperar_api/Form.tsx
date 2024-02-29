'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { resetPassword } from '@/controllers/Auth'
import { Button } from '@/components/Button'
import { Link } from '@/components/Link'

type Props = { token?: string }

export function Form(props: Props) {
  const { formAction, state } = useFormAction(resetPassword, { showSuccessToast: false })

  if (state.ok) {
    return (
      <div className='flex flex-col items-center gap-y-6 text-center'>
        <section className='space-y-1.5'>
          <p className='text-lg font-bold'>Contraseña restablecida</p>
          <p className='text-foreground-600'>Ya puedes iniciar sesión con tu nueva contraseña</p>
        </section>

        <Button as={Link} color='primary' replace href='/'>
          Ir a inicio
        </Button>
      </div>
    )
  }

  return (
    <form
      action={formAction}
      className='flex w-80 max-w-full flex-col items-center gap-y-4 text-center'
    >
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
