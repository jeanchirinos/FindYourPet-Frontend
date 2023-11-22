'use client'
import { useFormAction } from '@/hooks/useFormAction'
import { SubmitButton } from '@/components/SubmitButton'
import { logout } from '@/controllers/Auth'

export function LogoutForm() {
  const { formAction } = useFormAction(logout)

  return (
    <form action={formAction}>
      <SubmitButton className='w-full justify-start bg-transparent px-4 py-0 text-sm text-th-txt-1'>
        Cerrar sesión
      </SubmitButton>
    </form>
  )
}
