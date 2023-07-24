import { request } from '@/utilities'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

enum FormState {
  Login = 'login',
  Register = 'register',
}

export default function Home(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { user } = props

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [userSession, setUserSession] = useState(user)

  const [formState, setFormState] = useState(FormState.Login)

  const emailRef = useRef<HTMLInputElement>(null)

  const isLogin = formState === FormState.Login

  function toggleFormState(state: FormState) {
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

    request(formState, {
      method: 'POST',
      body: {
        email: form.email,
        password: form.password,
      },
    })
  }

  function handlePeity() {
    request('home')
  }

  function handleLogout() {
    request('logout', {
      method: 'POST',
    })
  }

  const openedWindow = useRef<null | Window>(null)

  useEffect(() => {
    function handleMessage(e: MessageEvent<User>) {
      setUserSession(e.data)
      // setUserImage(openedWindow.current?.opener?.location.search.split('=')[1] || user.image)
      openedWindow.current?.close()
    }

    window.addEventListener('message', handleMessage)

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  function openGoogleWindow() {
    const url = new URL(`${process.env.NEXT_PUBLIC_BACKEND_API_CLIENT}auth/google/redirect`)
    openedWindow.current = window.open(url, '_blank', 'width=400,height=700')
  }

  return (
    <main className={twJoin(inter.className, 'px-1.5')}>
      <form className='flex flex-col max-w-xs' onSubmit={handleSubmit}>
        <label>Correo</label>
        <input
          ref={emailRef}
          required
          type='email'
          value={form.email}
          name='email'
          onChange={handleChange}
        />
        <label>Contraseña</label>
        <input
          required
          type='password'
          value={form.password}
          name='password'
          onChange={handleChange}
        />
        {/* <label>Confirmar contraseña</label>
        <input
          type='password'
          value={form.confirmPassword}
          name='confirmPassword'
          onChange={handleChange}
        /> */}
        <button
          className={twJoin(
            isLogin ? 'bg-primary' : 'bg-purple-500',
            'text-white rounded-md [animation-name]:bg-primary px-4 py-1 mx-auto mt-5 w-full'
          )}
        >
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
        <div className='flex gap-x-2 w-fit flex-col'>
          <fieldset>
            <label>
              <input
                type='radio'
                checked={isLogin}
                onChange={() => {
                  toggleFormState(FormState.Login)
                }}
              />
              <span>Login</span>
            </label>
            <label>
              <input
                type='radio'
                checked={!isLogin}
                onChange={() => {
                  toggleFormState(FormState.Register)
                }}
              />
              <span>Registro</span>
            </label>
          </fieldset>

          {userSession.auth && (
            <button
              type='button'
              onClick={handleLogout}
              className='bg-red-400 text-white rounded-md w-fit px-4 py-1 mx-auto mt-5'
            >
              Logout
            </button>
          )}
        </div>
      </form>
      <div className='space-x-2'>
        <button
          className='mt-10 bg-orange-500 text-white rounded-md w-fit px-4 py-1 mx-auto'
          onClick={handlePeity}
        >
          Usar PEITY
        </button>
        <button className='bg-pink-500 text-white px-4 py-1 rounded-md' onClick={openGoogleWindow}>
          Ingresar con Google
        </button>
      </div>
      {userSession.auth ? (
        <div>
          <Image src={userSession.image} alt='Foto de perfil' width={48} height={48} />
          <p>Usuario logueado</p>
        </div>
      ) : (
        <p>Not logged</p>
      )}
    </main>
  )
}

export type User =
  | {
      auth: true
      image: string
    }
  | {
      auth: false
      image: null
    }

export const getServerSideProps: GetServerSideProps<{ user: User }> = async context => {
  let user: User = {
    auth: false,
    image: null,
  }

  try {
    user = await request<User>('session', {}, context.req.cookies.jwt)
    // console.log({ user })
  } catch (e) {
    console.error(e)
  }

  return {
    props: {
      user,
    },
  }
}
