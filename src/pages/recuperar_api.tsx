import { Input } from '@/components/Input'
import { useResetPassword } from '@/services/auth'
import { Button } from '@nextui-org/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { token } = props

  // STATES
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState(password)

  // HOOOKS
  const { trigger, isMutating } = useResetPassword()

  // VALUES
  const isDisabled = password !== passwordConfirm

  // FUNCTIONS
  function resetPassword(e: React.FormEvent) {
    e.preventDefault()
    if (isDisabled) return toast.error('Las contraseñas no coinciden')
    trigger({ password, passwordConfirm, token })
  }

  // RENDER
  return (
    <>
      <div className='flex min-h-screen items-center justify-center'>
        <form
          onSubmit={resetPassword}
          className='flex w-80 max-w-full flex-col gap-y-4 text-center'
        >
          <h2>Ingresa tu nueva contraseña</h2>

          <Input
            label='Contraseña'
            type='password'
            name='password'
            minLength={8}
            onChange={e => setPassword(e.target.value)}
            autoFocus
          />
          <Input
            label='Confirmar contraseña'
            name='passwordConfirm'
            type='password'
            minLength={8}
            onChange={e => setPasswordConfirm(e.target.value)}
          />

          <Button color='primary' isLoading={isMutating} isDisabled={isDisabled} type='submit'>
            Restablecer
          </Button>
        </form>
      </div>
    </>
  )
}

// SERVER SIDE PROPS
export const getServerSideProps: GetServerSideProps<{ token: string }> = async context => {
  const token = context.query.token as undefined | string

  if (!token) return { notFound: true }

  return {
    props: {
      token,
    },
  }
}
