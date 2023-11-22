'use client'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Input } from 'app/components/Input'
import { Tabs, Tab } from '@nextui-org/react'
import { Button } from '@/components/Button'
import { SubmitButton } from '@/components/SubmitButton'
import { handleResponse } from '@/utilities/handleResponse'
import { useGoogle } from '@/hooks/useGoogle'
import { useFormAction } from '@/hooks/useFormAction'
import { login, register } from '@/controllers/Auth'

// MAIN COMPONENT
export function UserNotLogged() {
  enum EFormState {
    Login = 'login',
    Register = 'register',
  }

  const [formState, setFormState] = useState(EFormState.Login)

  return (
    <Popover>
      <PopoverTrigger className='px-5 py-1'>Ingresa</PopoverTrigger>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 border border-th-fg-1 bg-th-fg-1 px-5 py-3'>
        <div className='max-w-sm space-y-2'>
          <Google />
          <Tabs fullWidth selectedKey={formState} onSelectionChange={setFormState as any}>
            <Tab key={EFormState.Login} title='Login'>
              <Login />
            </Tab>
            <Tab key={EFormState.Register} title='Registro'>
              <Register />
            </Tab>
          </Tabs>
        </div>
      </PopoverContent>
    </Popover>
  )
}

// COMPONTENTS
function Google() {
  const { openGoogleWindow } = useGoogle()

  return (
    <Button
      onPress={openGoogleWindow}
      className='flex w-full items-center justify-center gap-x-1 rounded-md bg-foreground-100 px-2 py-1 shadow-sm'
    >
      <FcGoogle />
      <span>Continuar con Google</span>
    </Button>
  )
}

function Register() {
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

function Login() {
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
