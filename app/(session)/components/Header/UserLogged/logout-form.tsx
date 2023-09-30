'use client'
import { useActionToast } from '@/hooks/useActionToast'
import { logout } from '@/serverActions/auth'
import { SubmitButton } from 'app/(session)/ajustes/update-form'

export function LogoutForm() {
  const { formAction } = useActionToast(logout)

  return (
    <form action={formAction}>
      <SubmitButton className='w-full justify-start bg-transparent px-4 py-0 text-sm'>
        Cerrar sesión
      </SubmitButton>
    </form>
  )
}
