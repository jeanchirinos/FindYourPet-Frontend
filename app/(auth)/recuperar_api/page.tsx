import { verifyToken } from '@/controllers/Auth'
import { Form } from './Form'

type Props = {
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
