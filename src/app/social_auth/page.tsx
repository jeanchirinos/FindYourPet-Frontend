import { AuthSuccess } from './auth-success'
import { AlreadyLinked } from './already-linked'

type Props = {
  searchParams: { status: 'success'; token: string } | { status: 'error' }
}

export default function Page(props: Props) {
  const { searchParams } = props
  const { status } = searchParams

  return (
    <main className='min-h-dvh flex-col gap-y-6 px-2 text-center flex-center'>
      {status === 'success' ? <AuthSuccess token={searchParams.token} /> : <AlreadyLinked />}
    </main>
  )
}
