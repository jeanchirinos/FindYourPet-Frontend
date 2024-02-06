'use client'

import Link from 'next/link'
import { Input } from '@/components/Input'
import { SubmitButton } from '@/components/SubmitButton'
import { useFormAction } from '@/hooks/useFormAction'
import { login } from '@/controllers/Auth'
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
      <Link
        href={`/recuperar?email=${currentEmail}`}
        target='_blank'
        rel='noreferrer'
        className='mx-auto'
      >
        ¿Olvidaste tu contraseña?
      </Link>
      <SubmitButton>Ingresar</SubmitButton>
    </form>
  )
}
