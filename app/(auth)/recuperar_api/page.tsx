import { request } from '@/utilities/utilities'
import { Form } from './Form'
import { notFound } from 'next/navigation'

async function verifyToken(token: string | undefined) {
  if (!token) notFound()

  try {
    await request(`verify-token/${token}`)
  } catch (e) {
    notFound()
  }

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
