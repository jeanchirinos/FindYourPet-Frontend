import { Input } from '@/components/Input/Input'
import { useForgotPassword } from '@/services/auth'
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
    <div className='space-y-8'>
      <h2>Ingresa el correo a recuperar</h2>

      <form onSubmit={handleSubmit} className='max-w-xl'>
        <Input
          type='email'
          label='Correo'
          onChange={e => setEmail(e.target.value)}
          autoFocus
          value={email}
        />
        <button disabled={isMutating}>{isMutating ? 'Enviando...' : 'Enviar'}</button>
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
