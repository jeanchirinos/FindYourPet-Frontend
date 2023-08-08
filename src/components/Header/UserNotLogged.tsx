import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { mutate } from 'swr'
import { User } from '@/types'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useLogin, useRegister } from '@/services/auth'
import { Popover, PopoverButton, PopoverContent } from '../Popover'
import { Input } from '../Input/Input'

enum EFormState {
  Login = 'login',
  Register = 'register',
}

// MAIN COMPONENT
export function UserNotLogged() {
  const [formState, setFormState] = useState(EFormState.Login)

  const isLogin = formState === EFormState.Login

  return (
    <Popover>
      <PopoverButton className='rounded-lg bg-black px-5 py-1 text-white'>Ingresa</PopoverButton>
      <PopoverContent className='right-0 w-80 border border-neutral-200 bg-white px-5 py-3'>
        <Google />
        <section>
          <fieldset>
            <label>
              <input
                type='radio'
                checked={isLogin}
                onChange={() => {
                  setFormState(EFormState.Login)
                }}
              />
              <span>Login</span>
            </label>
            <label>
              <input
                type='radio'
                checked={!isLogin}
                onChange={() => {
                  setFormState(EFormState.Register)
                }}
              />
              <span>Registro</span>
            </label>
            {isLogin ? <Login /> : <Register />}
          </fieldset>
        </section>
      </PopoverContent>
    </Popover>
  )
}

// COMPONTENTS
function Google() {
  // EFFECT
  useEffect(() => {
    function handleMessage(e: MessageEvent<User>) {
      mutate('session', e.data, {
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
    <button
      onClick={openGoogleWindow}
      className='flex w-full items-center justify-center gap-x-1 rounded-md bg-white px-2 py-1 shadow-sm shadow-zinc-300'
    >
      <FcGoogle />
      <span>Continuar con Google</span>
    </button>
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

  // RENDER
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
        <Input
          type='password'
          label='Confirmar contraseña'
          name='passwordConfirm'
          onChange={handleChange}
          minLength={8}
        />

        <button
          className='mx-auto w-full rounded-md bg-primary px-4 py-1 text-white'
          disabled={isMutating}
        >
          {isMutating ? 'Registrando' : 'Registrarse'}
        </button>
      </form>

      {emailSent && (
        <div className='absolute inset-0 flex flex-col items-center justify-center bg-white'>
          <h1>Se envió el correo</h1>
          <button onClick={() => setEmailSent(false)}>Volver</button>
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
      <Input type='email' label='Correo' name='email' onChange={handleChange} autoFocus />
      <Input
        type='password'
        label='Contraseña'
        name='password'
        onChange={handleChange}
        minLength={8}
      />
      <button
        className='mx-auto w-full rounded-md bg-primary px-4 py-1 text-white'
        disabled={isMutating}
      >
        {isMutating ? 'Ingresando' : 'Ingresar'}
      </button>
      <Link href={`/recuperar?email=${form.email}`} target='_blank' rel='noreferrer'>
        ¿Olvidaste tu contraseña?
      </Link>
    </form>
  )
}
