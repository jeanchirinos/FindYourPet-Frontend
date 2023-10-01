import { Form } from './Form'
import { notFound } from 'next/navigation'
import { requestAction } from '@/utilities/actionsRequest'

async function verifyToken(token: string | undefined) {
  if (!token) notFound()

  const response = await requestAction(`verify-token/${token}`)

  if (response.status === 'error') notFound()

  return token
}

interface Props {
  searchParams: { token: string }
}

export default async function Page(props: Props) {
  const { token } = props.searchParams

  // await verifyToken(token)

  // RENDER
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Form token={token} />
    </div>
  )
}
