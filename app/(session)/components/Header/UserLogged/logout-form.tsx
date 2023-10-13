'use client'
import { useActionToast } from '@/hooks/useActionToast'
import { logout } from '@/serverActions/auth'
import { SubmitButton } from '@/components/SubmitButton'
// import { Cookies } from 'typescript-cookie'
// import { useRouter } from 'next/navigation'

export function LogoutForm() {
  // const router = useRouter()

  // const { formAction } = useActionToast(logout, {
  //   onSuccess() {
  //     Cookies.remove('jwt', { path: '/' })
  //     router.refresh()
  //   },
  //   showSuccessToast: false,
  // })
  const { formAction } = useActionToast(logout)

  return (
    <form action={formAction}>
      <SubmitButton className='w-full justify-start bg-transparent px-4 py-0 text-sm'>
        Cerrar sesión
      </SubmitButton>
    </form>
  )
}
