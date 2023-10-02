'use client'
import { useActionToast } from '@/hooks/useActionToast'
import { logout } from '@/serverActions/auth'
import { SubmitButton } from '@/components/SubmitButton'
import { Cookies } from 'typescript-cookie'

export function LogoutForm() {
  const { formAction } = useActionToast(logout, {
    onSuccess() {
      Cookies.remove('jwt')
    },
    showSuccessToast: false,
  })

  return (
    <form action={formAction}>
      <SubmitButton className='w-full justify-start bg-transparent px-4 py-0 text-sm'>
        Cerrar sesión
      </SubmitButton>
    </form>
  )
}
