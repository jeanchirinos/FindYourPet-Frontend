'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Input } from 'app/components/Input'
import { Tabs, Tab } from '@nextui-org/react'
import { Button } from '@/components/Button'
import { setCookie } from 'typescript-cookie'
import { useRouter } from 'next/navigation'
import { login, register } from '@/serverActions/auth'
import { SubmitButton } from '@/components/SubmitButton'
import { manageReponse } from '@/utilities/testing'

enum EFormState {
  Login = 'login',
  Register = 'register',
}

// MAIN COMPONENT
export function UserNotLogged() {
  const [formState, setFormState] = useState(EFormState.Login)

  return (
    <Popover>
      <PopoverTrigger className='px-5 py-1'>Ingresa</PopoverTrigger>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 border border-neutral-200 bg-white px-5 py-3'>
        <div className='max-w-sm'>
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
  const router = useRouter()

  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<{ token?: string }>) {
      const { token } = e.data

      if (token) {
        setCookie('jwt', token, { expires: 7, path: '/' })
        router.refresh()
      }

      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [router])

  // FUNCTIONS
  function openGoogleWindow() {
    // TODO: URL BASE ON ENVIRONMENT : DEVELOPMENT | PRODUCTION OR BASE ON URL PASSED
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API}auth/google/redirect`)

    openedWindow.current = window.open(url, '_blank', 'width=400,height=700')
  }

  // VALUES
  const openedWindow = useRef<null | Window>(null)

  return (
    <Button
      onPress={openGoogleWindow}
      className='flex w-full items-center justify-center gap-x-1 rounded-md bg-white px-2 py-1 shadow-sm shadow-zinc-300'
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
    const response = await register(formData)

    manageReponse(response, {
      onSuccess() {
        setEmailSent(true)
        formRef?.current?.reset()
      },
      showSuccessToast: false,
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

  // FUNCTIONS
  async function formAction(formData: FormData) {
    const response = await login(formData)

    manageReponse(response, {
      showSuccessToast: false,
    })
  }

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
