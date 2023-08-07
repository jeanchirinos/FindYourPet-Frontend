import { useResetPassword } from '@/services/auth'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function RecuperarApi(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const { token } = props.query

  const [passwords, setPasswords] = useState({
    password: '',
    passwordConfirm: '',
  })

  const { trigger, isMutating } = useResetPassword()

  const isDisabled = passwords.password !== passwords.passwordConfirm

  function resetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (isDisabled) return toast.error('Las contraseñas no coinciden')
    trigger({ ...passwords, token })
  }
  return (
    <>
      <h1>Recuperar</h1>
      <form onSubmit={resetPassword}>
        <input
          type='password'
          value={passwords.password}
          onChange={e => setPasswords({ ...passwords, password: e.target.value })}
          required
          minLength={8}
          autoFocus
        />
        <input
          type='password'
          value={passwords.passwordConfirm}
          onChange={e => setPasswords({ ...passwords, passwordConfirm: e.target.value })}
          required
          minLength={8}
        />
        <button disabled={isMutating} className='disabled:bg-rose-600'>
          Restablecer
        </button>
      </form>
    </>
  )
}

type Query = { token: string }

export const getServerSideProps: GetServerSideProps<{ query: Query }> = async context => {
  // if(!context.req.cookies.jwt_reset) return {redirect: {destination: '/'}}

  if (!context.req.cookies.jwt_reset)
    return {
      redirect: {
        destination: '/',
      },
      props: {
        query: { token: '' },
      },
    }

  return {
    props: {
      query: { token: context.req.cookies.jwt_reset } as Query,
    },
  }
}
