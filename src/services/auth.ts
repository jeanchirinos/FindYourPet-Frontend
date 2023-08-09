import { SWRKey } from '@/enums'
import { useSendData } from '@/hooks/useSendData'
import { SessionLogged } from '@/types'

export function useRegister() {
  interface Args {
    email: string
    password: string
    passwordConfirm: string
  }

  interface Res extends SessionLogged {}

  return useSendData<Args, Res>('register', { key: SWRKey.SESSION })
}

export function useLogin() {
  interface Args {
    email: string
    password: string
  }

  interface Res extends SessionLogged {}

  return useSendData<Args, Res>('login', { key: SWRKey.SESSION })
}

export function useLogout() {
  return useSendData('logout', { key: SWRKey.SESSION })
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
