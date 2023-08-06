import { Popover, Transition } from '@headlessui/react'
import Link from 'next/link'
// import { request } from '@/utilities'
import Image from 'next/image'
import { Fragment, useEffect, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'
// import useSWRMutation from 'swr/mutation'
import { mutate } from 'swr'
import { EFormState } from '@/enums'
import { User, UserLogged } from '@/types'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'
import { useLogin, useLogout, useRegister } from '@/services/auth'

// MAIN COMPONENT
export function Header(props: { session: User }) {
  const { session } = props

  return (
    <header className='mx-auto flex w-[1600px] max-w-full justify-between px-1.5'>
      <h2>Logo</h2>
      {session.auth ? <UserMenu session={session} /> : <NotUserMenu />}
    </header>
  )
}

// COMPONENTS
function UserMenu(props: { session: UserLogged }) {
  // SWR
  const logoutActions = useLogout()

  function handleLogout() {
    logoutActions.trigger(
      {},
      {
        revalidate: false,
        populateCache: true,
      },
    )
  }

  // RENDER
  return (
    <Popover className='relative'>
      <Popover.Button>
        <Image
          src={props.session.image}
          alt='Perfil'
          width={32}
          height={32}
          className='rounded-full'
          loading='eager'
        />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute right-0 z-10 mt-2 flex flex-col rounded-md '>
          <Link href='#' className='px-4 py-1'>
            Perfil
          </Link>
          <button
            className='w-max px-4 py-1'
            onClick={handleLogout}
            disabled={logoutActions.isMutating}
          >
            {logoutActions.isMutating ? 'Cerrando Sesión' : 'Cerrar sesión'}
          </button>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

function NotUserMenu() {
  return (
    <Popover className='relative'>
      <Popover.Button className='rounded-lg bg-black px-5 py-1 text-white'>Ingresa</Popover.Button>
      <Transition
        as={Fragment}
        enter='transition ease-out duration-200'
        enterFrom='opacity-0 translate-y-1'
        enterTo='opacity-100 translate-y-0'
        leave='transition ease-in duration-150'
        leaveFrom='opacity-100 translate-y-0'
        leaveTo='opacity-0 translate-y-1'
      >
        <Popover.Panel className='absolute right-0 z-10 mt-2 w-80 rounded-md border border-neutral-200 bg-white px-5 py-3'>
          <NotUserMenuContent />
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}

function NotUserMenuContent() {
  // STATES
  const [formState, setFormState] = useState(EFormState.Login)

  const [form, setForm] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const [emailSent, setEmailSent] = useState(false)

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

  // SWR

  const { trigger: triggerLogin, isMutating: isMutatingLogin } = useLogin()
  const { trigger: triggerRegister, isMutating: isMutatingRegister } = useRegister()

  const isMutating = isMutatingLogin || isMutatingRegister

  // const registerLoginActions = useSWRMutation(
  //   'session',
  //   () =>
  //     request<User>(formState, {
  //       config: {
  //         method: 'POST',
  //         body:
  //           formState === EFormState.Login ? { email: form.email, password: form.password } : form,
  //       },
  //     }),
  //   {
  //     revalidate: false,
  //     populateCache: true,
  //     onSuccess() {
  //       if (formState === EFormState.Register) {
  //         setEmailSent(true)
  //       }
  //     },
  //   },
  // )

  // VALUES

  const emailRef = useRef<HTMLInputElement>(null)
  const isLogin = formState === EFormState.Login
  const openedWindow = useRef<null | Window>(null)

  const buttonState = () => {
    if (isMutating) {
      // return isLogin ? 'Ingresando' : 'Enviando'
      return 'Enviando'
    }

    // return isLogin ? 'Ingresar' : 'Registrarse'
    return isLogin ? 'Ingresar' : 'Registrarse'
  }

  // FUNCTIONS
  function toggleFormState(state: EFormState) {
    emailRef.current?.focus()
    setFormState(state)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (isLogin) {
      handleLoginSubmit()
    } else {
      if (form.password !== form.passwordConfirm) return toast.error('Las contraseñas no coinciden')
      handleRegisterSubmit()
    }

    // registerLoginActions.trigger()
  }

  function handleLoginSubmit() {
    triggerLogin(
      { email: form.email, password: form.password },
      {
        revalidate: false,
        populateCache: true,
      },
    )
  }

  function handleRegisterSubmit() {
    triggerRegister(form, {
      revalidate: false,
      populateCache: true,
      onSuccess() {
        setEmailSent(true)
      },
    })
  }

  function openGoogleWindow() {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_CLIENT}auth/google/redirect`)
    openedWindow.current = window.open(url, '_blank', 'width=400,height=700')
  }

  // RENDER
  return emailSent ? (
    <div>
      <h1>Se envió el correo</h1>

      <button onClick={() => setEmailSent(false)}>Volver</button>
    </div>
  ) : (
    <div>
      <button
        onClick={openGoogleWindow}
        className='flex w-full items-center justify-center gap-x-1 rounded-md bg-white px-2 py-1 shadow-sm shadow-zinc-300'
      >
        <FcGoogle />
        <span>Continuar con Google</span>
      </button>
      <section>
        <fieldset>
          <label>
            <input
              type='radio'
              checked={isLogin}
              onChange={() => {
                toggleFormState(EFormState.Login)
              }}
            />
            <span>Login</span>
          </label>
          <label>
            <input
              type='radio'
              checked={!isLogin}
              onChange={() => {
                toggleFormState(EFormState.Register)
              }}
            />
            <span>Registro</span>
          </label>
        </fieldset>
      </section>
      <form className='mt-4 flex max-w-xs flex-col gap-y-4' onSubmit={handleSubmit}>
        <div className='relative'>
          <input
            className='peer w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-gray-600 focus:outline-none'
            placeholder=''
            ref={emailRef}
            required
            type='email'
            value={form.email}
            name='email'
            onChange={handleChange}
          />

          <label
            htmlFor='email'
            className='absolute left-2 top-4 -translate-y-6 bg-white px-1.5 text-xs text-gray-600 transition-all'
          >
            Correo
          </label>
        </div>

        <div className='relative'>
          <input
            className='peer w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-gray-600 focus:outline-none'
            placeholder=''
            ref={emailRef}
            required
            onChange={handleChange}
            type='password'
            value={form.password}
            name='password'
            minLength={8}
          />

          <label
            htmlFor='email'
            className='absolute left-2 top-4 -translate-y-6 bg-white px-1.5 text-xs text-gray-600 transition-all'
          >
            Contraseña
          </label>
        </div>

        {!isLogin && (
          <label className='relative'>
            <input
              className='peer w-full border-2 border-gray-300 text-gray-900 placeholder-transparent focus:border-gray-600 focus:outline-none'
              placeholder=''
              ref={emailRef}
              required
              onChange={handleChange}
              type='password'
              value={form.passwordConfirm}
              name='passwordConfirm'
              minLength={8}
            />

            <span className='absolute left-2 top-4 -translate-y-6 bg-white px-1.5 text-xs text-gray-600 transition-all'>
              Confirmar contraseña
            </span>
          </label>
        )}

        <button
          className={twJoin(
            isLogin ? 'bg-primary' : 'bg-purple-500',
            'mx-auto w-full rounded-md px-4 py-1 text-white',
          )}
          disabled={isMutating}
        >
          {buttonState()}
        </button>
      </form>
      {formState === EFormState.Login && (
        <Link href='/recuperar' target='_blank'>
          ¿Olvidaste tu contraseña?
        </Link>
      )}
    </div>
  )
}
