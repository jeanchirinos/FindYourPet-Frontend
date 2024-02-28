import { verifyToken } from '@/controllers/Auth'
import { Form } from './Form'
import { PageProps } from '@/types'

type Props = PageProps<{}, 'token'>

export default async function Page(props: Props) {
  const { token } = props.searchParams

  await verifyToken(token)

  // RENDER
  return (
    <div className='min-h-dvh px-2 flex-center'>
      <Form token={token} />
    </div>
  )
}
