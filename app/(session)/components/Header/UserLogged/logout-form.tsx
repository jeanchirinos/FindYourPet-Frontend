'use client'
import { useFormAction } from '@/hooks/useFormAction'
import { logout } from '@/serverActions/auth'
import { SubmitButton } from '@/components/SubmitButton'

export function LogoutForm() {
  const { formAction } = useFormAction(logout)

  return (
    <form action={formAction}>
      <SubmitButton className='w-full justify-start bg-transparent px-4 py-0 text-sm'>
        Cerrar sesión
      </SubmitButton>
    </form>
  )
}
