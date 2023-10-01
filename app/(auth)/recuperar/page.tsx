import { ForgotForm } from './Form'

export default function Page(props: { searchParams: null | { email: string } }) {
  const initialEmail = props.searchParams?.email ?? ''

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <ForgotForm initialEmail={initialEmail} />
    </div>
  )
}
