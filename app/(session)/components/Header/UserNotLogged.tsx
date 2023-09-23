'use client'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useLogin, useRegister } from '@/services/auth'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/Popover'
import { Input } from 'app/components/Input'
import { Tabs, Tab } from '@nextui-org/react'
import { Button } from '@/components/Button'
import { SessionLogged } from '@/types'
import { setCookie } from 'typescript-cookie'
import { useRouter } from 'next/navigation'

enum EFormState {
  Login = 'login',
  Register = 'register',
}

// MAIN COMPONENT
export function UserNotLogged() {
  const [formState, setFormState] = useState(EFormState.Login)

  return (
    <>
      {/* <Popover placement='bottom-end'> */}

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
    </>
  )
}

// COMPONTENTS
function Google() {
  const router = useRouter()

  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<SessionLogged & { token: string }>) {
      // mutate(SWRKey.SESSION, e.data, {
      //   revalidate: false,
      // })

      //! LOCAL - PRODUCTION
      if (process.env.NODE_ENV === 'development') setCookie('jwt', e.data.token, { expires: 7 })

      openedWindow.current?.close()

      router.refresh()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // FUNCTIONS
  function openGoogleWindow() {
    // TODO: URL BASE ON ENVIRONMENT : DEVELOPMENT | PRODUCTION OR BASE ON URL PASSED
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_CLIENT}auth/google/redirect`)

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
  const initialForm = {
    email: '',
    password: '',
    passwordConfirm: '',
  }

  // STATES
  const [form, setForm] = useState(initialForm)
  const [emailSent, setEmailSent] = useState(false)

  // HOOKS
  const { trigger } = useRegister()

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (form.password !== form.passwordConfirm) return toast.error('Las contraseñas no coinciden')

    trigger(form, {
      revalidate: false,
    })

    setEmailSent(true)
    setForm(initialForm)
  }

  function handleBack() {
    setEmailSent(false)
  }

  // RENDER
  return (
    <>
      <form className='mt-4 flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit}>
        {/* <Input type='email' label='Correo' name='email' onChange={handleChange} autoFocus /> */}
        <Input
          type='email'
          label='Correo'
          name='email'
          onChange={handleChange}
          autoFocus
          value={form.email}
        />
        <Input
          type='password'
          label='Contraseña'
          name='password'
          value={form.password}
          onChange={handleChange}
          minLength={8}
        />
        <Input
          type='password'
          label='Confirmar contraseña'
          name='passwordConfirm'
          value={form.passwordConfirm}
          onChange={handleChange}
          minLength={8}
        />

        <Button
          className='mx-auto w-full rounded-md bg-purple-500 px-4 py-1 text-white'
          // isLoading={isMutating}
          type='submit'
        >
          {/* {isMutating ? 'Registrando' : 'Registrarse'} */}
          Registrarse
        </Button>
      </form>

      {emailSent && (
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-white'>
          <h1>Se enviará un correo de confirmación</h1>
          <Button onPress={handleBack}>Volver</Button>
        </div>
      )}
    </>
  )
}

function Login() {
  // STATES
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  // HOOKS
  const router = useRouter()
  const { trigger, isMutating } = useLogin()

  // FUNCTIONS
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    trigger(form, {
      revalidate: false,
      //! LOCAL - PRODUCTION
      onSuccess(data) {
        if (process.env.NODE_ENV === 'development') {
          setCookie('jwt', data.token, { expires: 7 })
        }
        router.refresh()
      },
    })
  }

  return (
    <>
      <form className='mt-4 flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit}>
        <Input type='email' label='Correo' name='email' onChange={handleChange} autoFocus />
        <Input
          type='password'
          label='Contraseña'
          name='password'
          onChange={handleChange}
          minLength={8}
        />

        <Link
          href={`/recuperar?email=${form.email}`}
          target='_blank'
          rel='noreferrer'
          className='mx-auto'
        >
          ¿Olvidaste tu contraseña?
        </Link>
        <Button
          className='mx-auto flex w-full gap-x-2 rounded-md bg-primary px-4 py-1 text-white'
          type='submit'
          safeIsLoading={isMutating}
        >
          Ingresar
        </Button>
      </form>
    </>
  )
}
