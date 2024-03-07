'use client'

import { Input } from '@/components/Input'
import { Link } from '@/components/Link'
import { SubmitButton } from '@/components/SubmitButton'
import { login } from '@/controllers/Auth'
import { useFormAction } from '@/hooks/useFormAction'
import { ROUTE } from '@/routes'
import { useState } from 'react'

export function Login() {
  const [currentEmail, setCurrentEmail] = useState('')

  const { formAction } = useFormAction(login, { showSuccessToast: false })

  // RENDER
  return (
    <form className='mt-4 flex max-w-xs flex-col gap-y-4' action={formAction}>
      <Input
        type='email'
        name='email'
        label='Correo'
        autoFocus
        onChange={e => setCurrentEmail(e.target.value)}
      />
      <Input type='password' name='password' label='Contraseña' minLength={8} />
      <Link href={ROUTE.AUTH.PASSWORD_FORGOT(currentEmail)} className='mx-auto'>
        ¿Olvidaste tu contraseña?
      </Link>
      <SubmitButton>Ingresar</SubmitButton>
    </form>
  )
}
