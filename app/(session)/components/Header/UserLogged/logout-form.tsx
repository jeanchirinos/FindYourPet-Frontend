'use client'

import { Button } from '@/components/Button'
import {
  //@ts-ignore
  experimental_useFormState as useFormState,
  experimental_useFormStatus as useFormStatus,
} from 'react-dom'
import { logout } from './actions'

export function LogoutForm() {
  const [, formAction] = useFormState(logout)

  return (
    <>
      <form action={formAction}>
        <SubmitButton />
      </form>
    </>
  )
}

function SubmitButton(props: React.ComponentProps<typeof Button>) {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      aria-disabled={pending}
      disabled={pending}
      isLoading={pending}
      className='w-full justify-start bg-transparent px-4 py-0 text-sm'
      {...props}
    >
      Cerrar sesión
    </Button>
  )
}
