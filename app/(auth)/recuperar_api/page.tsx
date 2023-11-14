import { Form } from './Form'
import { notFound } from 'next/navigation'
import { actionRequest, actionRequestGet } from '@/utilities/actionRequest'

async function verifyToken(token: string | undefined) {
  if (!token) notFound()

  // const res = await actionRequest(`verify-token/${token}`)
  await actionRequestGet(`verify-token/${token}`)

  // if (!res.ok) notFound()

  return token
}

interface Props {
  searchParams: { token: string }
}

export default async function Page(props: Props) {
  const { token } = props.searchParams

  await verifyToken(token)

  // RENDER
  return (
    <div className='flex min-h-screen items-center justify-center'>
      <Form token={token} />
    </div>
  )
}
