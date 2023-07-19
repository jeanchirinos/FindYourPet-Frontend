import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    // fetch('https://dolphin-app-wjuu7.ondigitalocean.app/api/login', {
    fetch('http://localhost:8000/api/login', {
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
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
  }

  return (
    <main className='px-1.5'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label>Correo</label>
        <input required type='email' value={form.email} name='email' onChange={handleChange} />
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

        <div className='flex gap-x-2 w-fit'>
          <button className='bg-primary text-white rounded-md w-fit px-4 py-1 mx-auto mt-5'>
            Login
          </button>
          <button
            type='button'
            onClick={handleLogout}
            className='bg-red-500 text-white rounded-md w-fit px-4 py-1 mx-auto mt-5'
          >
            Logout
          </button>
        </div>
      </form>
      <button
        className='mt-10 bg-green-500 text-white rounded-md w-fit px-4 py-1 mx-auto'
        onClick={handlePeity}
      >
        Usar PEITY
      </button>
    </main>
  )
}
