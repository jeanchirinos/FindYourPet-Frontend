import { Inter } from 'next/font/google'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [form, setForm] = useState({
    name: '',
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

    if (form.password !== form.confirmPassword) return alert('Las contraseñas no coinciden')

    fetch('https://dolphin-app-wjuu7.ondigitalocean.app/api/login', {
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

  return (
    <main className='px-1.5'>
      <form className='flex flex-col' onSubmit={handleSubmit}>
        <label>Nombre (opcional)</label>
        <input type='text' value={form.name} name='name' onChange={handleChange} />
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
        <label>Confirmar contraseña</label>
        <input
          required
          type='password'
          value={form.confirmPassword}
          name='confirmPassword'
          onChange={handleChange}
        />

        <button className='bg-primary text-white rounded-md w-fit px-4 py-1 mx-auto mt-5'>
          Registrarse
        </button>
      </form>
    </main>
  )
}
