// import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { SessionLogged } from '@/types'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useLogin, useRegister } from '@/services/auth'
import { Popover, PopoverButton, PopoverContent } from '../Popover'
import { Input } from '@/components/Input/Input'
import { SWRKey } from '@/enums'
import { Tabs, Tab, Button, Link } from '@nextui-org/react'

enum EFormState {
  Login = 'login',
  Register = 'register',
}

// MAIN COMPONENT
export function UserNotLogged() {
  const [formState, setFormState] = useState(EFormState.Login)

  return (
    <Popover>
      <PopoverButton className='rounded-lg bg-black px-5 py-1 text-white'>Ingresa</PopoverButton>
      <PopoverContent className='right-0 flex w-80 flex-col gap-y-2 border border-neutral-200 bg-white px-5 py-3'>
        <Google />
        <div className='max-w-sm'>
          <Tabs
            fullWidth
            selectedKey={formState}
            onSelectionChange={setFormState as any}
            // classNames={{
            //   panel: 'max-w-sm',
            // }}
          >
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
  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<SessionLogged>) {
      mutate(SWRKey.SESSION, e.data, {
        revalidate: false,
      })

      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  // FUNCTIONS
  function openGoogleWindow() {
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
  const { trigger, isMutating } = useRegister()

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
      onSuccess() {
        setEmailSent(true)
        setForm(initialForm)
      },
      revalidate: false,
      populateCache: true,
    })
  }

  function handleBack() {
    setEmailSent(false)
    setForm(initialForm)
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
          classNames={{
            inputWrapper:
              // 'group-data-[focus-visible=true]:ring-1 group-data-[focus-visible=true]:ring-[#cacaca]',
              'group-data-[focus-visible=true]:ring-transparent',
          }}
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
          isLoading={isMutating}
          type='submit'
        >
          {/* {isMutating ? 'Registrando' : 'Registrarse'} */}
          Registrarse
        </Button>
      </form>

      {emailSent && (
        <div className='absolute inset-0 z-10 flex flex-col items-center justify-center bg-white'>
          <h1>Se envió el correo</h1>
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
      populateCache: true,
    })
  }

  return (
    <form className='mt-4 flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit}>
      <Input
        type='email'
        label='Correo'
        name='email'
        onChange={handleChange}
        autoFocus
        classNames={{
          inputWrapper:
            // 'group-data-[focus-visible=true]:ring-1 group-data-[focus-visible=true]:ring-[#cacaca]',
            'group-data-[focus-visible=true]:ring-transparent',
        }}
      />
      <Input
        type='password'
        label='Contraseña'
        name='password'
        onChange={handleChange}
        minLength={8}
      />
      <Button
        className='mx-auto flex w-full gap-x-2 rounded-md bg-primary px-4 py-1 text-white'
        type='submit'
        // disabled={isMutating}
        isLoading={isMutating}
      >
        {/* {isMutating ? 'Ingresando' : 'Ingresar'} */}
        Ingresar
      </Button>
      <Link
        href={`/recuperar?email=${form.email}`}
        target='_blank'
        rel='noreferrer'
        className='mx-auto'
      >
        ¿Olvidaste tu contraseña?
      </Link>
    </form>
  )
}
