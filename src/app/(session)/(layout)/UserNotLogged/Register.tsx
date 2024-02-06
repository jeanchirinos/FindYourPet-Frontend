'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@/components/Button'
import { SubmitButton } from '@/components/SubmitButton'
import { handleResponse } from '@/utilities/handleResponse'
import { register } from '@/controllers/Auth'

export function Register() {
  // STATES
  const [currentEmail, setCurrentEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  // HOOKS
  const formRef = useRef<HTMLFormElement>(null)

  // FUNCTIONS
  function handleBack() {
    setEmailSent(false)
  }

  async function formAction(formData: FormData) {
    const res = await register(formData)

    handleResponse(res, {
      onSuccess() {
        setEmailSent(true)
        formRef?.current?.reset()
      },
    })
  }

  // RENDER
  return (
    <>
      <form ref={formRef} className='mt-4 flex max-w-xs flex-col gap-y-4' action={formAction}>
        <Input
          type='email'
          name='email'
          label='Correo'
          autoFocus
          onChange={e => setCurrentEmail(e.target.value)}
        />
        <Input type='password' name='password' label='Contraseña' minLength={8} />
        <Input type='password' name='passwordConfirm' label='Confirmar contraseña' minLength={8} />

        <SubmitButton className='bg-purple-500 text-white'>Registrarse</SubmitButton>
      </form>

      {emailSent && (
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-white'>
          <p>Se envió un correo de confirmación a :</p>
          <b>{currentEmail}</b>
          <Button onPress={handleBack}>Volver</Button>
        </div>
      )}
    </>
  )
}
