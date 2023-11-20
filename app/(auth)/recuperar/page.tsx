import { ForgotForm } from './Form'

type Props = { searchParams: null | { email: string } }

export default function Page(props: Props) {
  const initialEmail = props.searchParams?.email ?? ''

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <ForgotForm initialEmail={initialEmail} />
    </div>
  )
}
