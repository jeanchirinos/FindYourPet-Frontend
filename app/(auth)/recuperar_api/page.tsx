import { verifyToken } from '@/controllers/Auth'
import { Form } from './Form'
import { PageProps } from '@/types'

type Props = PageProps<{}, { token: string }>

export default async function Page(props: Props) {
  const { token } = props.searchParams

  await verifyToken(token)

  // RENDER
  return (
    <div className='flex-center min-h-screen'>
      <Form token={token} />
    </div>
  )
}
