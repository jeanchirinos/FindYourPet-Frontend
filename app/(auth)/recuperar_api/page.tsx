import { Form } from './Form'
import { actionRequestGet } from '@/utilities/actionRequest'
import { notAuthorized } from '@/utilities/utilities'

async function verifyToken(token: string | undefined) {
  if (!token) return null

  try {
    await actionRequestGet(`verify-token/${token}`)
  } catch (err) {
    notAuthorized()
  }
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
