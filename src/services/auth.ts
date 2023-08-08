import { useSendData } from '@/hooks/useSendData'
import { UserLogged } from '@/types'

export function useRegister() {
  interface Args {
    email: string
    password: string
    passwordConfirm: string
  }

  interface Res extends UserLogged {}

  return useSendData<Args, Res>('register', { key: 'session' })
}

export function useLogin() {
  interface Args {
    email: string
    password: string
  }

  interface Res extends UserLogged {}

  return useSendData<Args, Res>('login', { key: 'session' })
}

export function useLogout() {
  return useSendData('logout', { key: 'session' })
}

export function useForgotPassword() {
  interface Args {
    email: string
  }

  return useSendData<Args>('forgot-password')
}

export function useResetPassword() {
  interface Args {
    password: string
    passwordConfirm: string
    token: string
  }

  return useSendData<Args>('reset-password')
}
