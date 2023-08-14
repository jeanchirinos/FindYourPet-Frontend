import { Input } from '@/components/Input'
import { useForgotPassword } from '@/services/auth'
import { Button } from '@nextui-org/react'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export default function Page(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  // STATES
  const [email, setEmail] = useState(props.email)

  // HOOKS
  const { trigger, isMutating } = useForgotPassword()

  // FUNCTIONS
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    trigger(
      { email },
      {
        onSuccess(data) {
          toast.success(data.msg)
        },
      },
    )
  }

  // RENDER
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <form onSubmit={handleSubmit} className='flex w-80 max-w-full flex-col gap-y-4 text-center'>
        <h2>Ingresa el correo a recuperar</h2>
        <Input
          type='email'
          label='Correo'
          onChange={e => setEmail(e.target.value)}
          autoFocus
          value={email}
          required
          placeholder='example@gmail.com'
        />
        <Button color='primary' isLoading={isMutating} type='submit' isDisabled={!email}>
          Enviar correo
        </Button>
      </form>
    </div>
  )
}

// SERVER SIDE PROPS
export const getServerSideProps: GetServerSideProps<{ email: string }> = async context => {
  const email = (context.query.email as string) ?? ''

  return {
    props: {
      email,
    },
  }
}
