'use client'

import { useRef, useState } from 'react'
import { Input } from '@/components/Input'
import { Button } from '@nextui-org/button'
import { SubmitButton } from '@/components/SubmitButton'
import { handleResponse } from '@/utilities/handleResponse'
import { register } from '@/controllers/AuthController/register'

export function Register() {
  // STATES
  const [currentEmail, setCurrentEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  // HOOKS
  const formRef = useRef<HTMLFormElement>(null)

  // FUNCTIONS
  function handleBack() {
    const notLoggedMenuTrigger = document.getElementById('not-logged-menu-trigger')
    notLoggedMenuTrigger?.click()
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

        <SubmitButton color='secondary'>Registrarse</SubmitButton>
      </form>

      {emailSent && (
        <div className='absolute inset-0 z-20 flex-col gap-y-4 bg-content1 text-center flex-center'>
          <div className='space-y-2'>
            <p>Se envió un correo de confirmación a :</p>
            <b>{currentEmail}</b>
          </div>
          <Button onPress={handleBack}>Cerrar</Button>
        </div>
      )}
    </>
  )
}
