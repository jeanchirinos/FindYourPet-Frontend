import { verifyToken } from '@/controllers/AuthController/verifyToken'
import { Form } from './components/Form'
import { PageProps } from '@/types'

type Props = PageProps<{}, 'token'>

export default async function Page(props: Props) {
  const { token } = props.searchParams

  await verifyToken(token)

  // RENDER
  return (
    <main className='grow pb-[3.75rem] flex-center'>
      <Form token={token} />
    </main>
  )
}
