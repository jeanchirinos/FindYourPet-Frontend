import { useForgotPassword } from '@/services/auth'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

export default function Recuperar() {
  const params = useSearchParams()

  const [email, setEmail] = useState(params.get('email') ?? '')

  const { trigger, isMutating } = useForgotPassword()

  useEffect(() => {
    setEmail(params.get('email') ?? '')
  }, [params])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    trigger(
      {
        email,
      },
      {
        onSuccess(data) {
          toast.success(data.msg)
        },
      },
    )
  }

  return (
    <>
      <h2>Ingresa el correo a recuperar</h2>
      <form onSubmit={handleSubmit}>
        <input type='email' value={email} onChange={e => setEmail(e.target.value)} required />
        <button disabled={isMutating}>{isMutating ? 'Enviando...' : 'Enviar'}</button>
      </form>
    </>
  )
}
