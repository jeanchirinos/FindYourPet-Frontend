'use client'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import Link from 'next/link'
import { useFormAction } from '@/hooks/useFormAction'
import { forgotPassword } from '@/controllers/Auth'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/Button'

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
    <div className='min-h-screen text-center flex-center'>
      {state.ok ? (
        <div className='flex flex-col items-center gap-y-6'>
          <section className='space-y-1.5'>
            <p className='text-lg font-bold'>Correo enviado</p>
            <p className='text-foreground-600'>Revisa tu correo para restablecer tu contraseña</p>
          </section>

          <Button as={Link} replace href='/' color='primary'>
            Ir a inicio
          </Button>
        </div>
      ) : (
        <form action={formAction} className='flex w-80 max-w-full flex-col gap-y-4'>
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
      )}
    </div>
  )
}
