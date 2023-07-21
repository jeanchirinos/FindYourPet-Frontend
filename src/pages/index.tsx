import { Inter } from 'next/font/google'
import { useRef, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [formState, setFormState] = useState<'login' | 'register'>('login')

  const emailRef = useRef<HTMLInputElement>(null)

  const isLogin = formState === 'login'

  function toggleFormState(state: 'login' | 'register') {
    console.log(state)
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

    // fetch('https://dolphin-app-wjuu7.ondigitalocean.app/api/login', {
    fetch(`http://localhost:8000/api/${formState}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    })
  }

  function handlePeity() {
    // fetch('https://dolphin-app-wjuu7.ondigitalocean.app/api/home', {
    fetch('http://localhost:8000/api/home', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  function handleLogout() {
    // fetch('https://dolphin-app-wjuu7.ondigitalocean.app/api/home', {
    fetch('http://localhost:8000/api/logout', {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  const openedWindow = useRef<null | Window>(null)

  function openGoogleWindow() {
    const url = new URL('http://localhost:8000/api/auth/google/redirect')
    //  url.searchParams.set('environment', process.env.NODE_ENV)

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
            'text-white rounded-md px-4 py-1 mx-auto mt-5 w-full'
          )}
        >
          {isLogin ? 'Ingresar' : 'Registrarse'}
        </button>
        <div className='flex gap-x-2 w-fit flex-col'>
          <fieldset>
            <label>
              <input
                type='radio'
                name='formState'
                value='login'
                checked={isLogin}
                onChange={() => {
                  toggleFormState('login')
                }}
              />
              <span>Login</span>
            </label>
            <label>
              <input
                type='radio'
                name='formState'
                value='register'
                checked={!isLogin}
                onChange={() => {
                  toggleFormState('register')
                }}
              />
              <span>Registro</span>
            </label>
          </fieldset>
          <button
            type='button'
            onClick={handleLogout}
            className='bg-red-400 text-white rounded-md w-fit px-4 py-1 mx-auto mt-5'
          >
            Logout
          </button>
        </div>
      </form>
      <div className='space-x-2'>
        <button
          className='mt-10 bg-orange-500 text-white rounded-md w-fit px-4 py-1 mx-auto'
          onClick={handlePeity}
        >
          Usar PEITY
        </button>
        <button
          className='bg-pink-500 text-white px-4 py-1 rounded-md text-black'
          onClick={openGoogleWindow}
        >
          Ingresar con Google
        </button>
      </div>
    </main>
  )
}
