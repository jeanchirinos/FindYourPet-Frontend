'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { forgotPassword } from '@/controllers/Auth'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ButtonLink } from '@/components/ButtonLink'
import { Title } from '@/components/business/Title'

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  )
}

function Content() {
  const searchParams = useSearchParams()
  const initialEmail = searchParams.get('email') ?? undefined

  const { formAction, state } = useFormAction(forgotPassword, { showSuccessToast: false })

  // RENDER
  return (
    <main className='grow pb-[3.75rem] flex-center'>
      {state.ok ? (
        <div className='flex flex-col items-center gap-y-6 text-center'>
          <section className='space-y-1.5'>
            <p className='text-lg font-bold'>Correo enviado</p>
            <p className='text-foreground-600'>Revisa tu correo para restablecer tu contraseña</p>
          </section>

          <ButtonLink href='/' color='primary'>
            Ir a inicio
          </ButtonLink>
        </div>
      ) : (
        <div className='flex w-96 max-w-full flex-col gap-y-6'>
          <div>
            <Title showBack={false} className='mb-2 gap-x-2.5'>
              Recuperar contraseña
            </Title>
            <p className='text-foreground-600'>Ingresa el correo de la contraseña a recuperar</p>
          </div>
          <form action={formAction} className='flex flex-col gap-y-4'>
            <Input
              defaultValue={initialEmail}
              type='email'
              name='email'
              label='Correo'
              autoFocus
              required
              placeholder='example@gmail.com'
            />
            <footer className='flex gap-x-2.5 *:grow'>
              <SubmitButton>Enviar correo</SubmitButton>
            </footer>
          </form>
        </div>
      )}
    </main>
  )
}
