import { useSendData } from '@/hooks/useSendData'
import { User } from 'app/(session)/perfil/[id]/page'
import useSWR from 'swr'

const userKey = (username: string) => `user/${username}`

type UseUser = { username: string; initialData: User }

export function useUser(params: UseUser) {
  const { username, initialData } = params

  const { data = initialData, ...rest } = useSWR<User>(userKey(username))

  return {
    user: data,
    ...rest,
  }
}

export function useUpdateUser(username: string) {
  type Args = Partial<User>

  return useSendData<Args>('user-update', {
    key: userKey(username),
  })
}

export function useUpdateImage(username: string) {
  return useSendData<FormData>('user-profile', {
    key: userKey(username),
  })
}