'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { resetPassword } from '@/controllers/Auth'
import { ButtonLink } from '@/components/ButtonLink'
import { Title } from '@/components/business/Title'
import { ROUTE } from '@/routes'

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

        <ButtonLink color='primary' replace href={ROUTE.PETS.INDEX}>
          Ir a inicio
        </ButtonLink>
      </div>
    )
  }

  return (
    <div className='flex w-96 max-w-full flex-col gap-y-6'>
      <div>
        <Title showBack={false} className='mb-2 gap-x-2.5'>
          Restablecer contraseña
        </Title>
        <p className='text-foreground-600'>Ingresa tu nueva contraseña</p>
      </div>
      <form action={formAction} className='flex flex-col gap-y-4 '>
        <Input
          required
          type='password'
          name='password'
          label='Contraseña'
          minLength={8}
          autoFocus
        />
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
    </div>
  )
}
