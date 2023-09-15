import { SWRKey } from '@/enums'
import { useSendData } from '@/hooks/useSendData'
import { fetcher } from '@/utilities'
import { User } from 'app/(session)/perfil/[id]/page'
import useSWR from 'swr'

const userKey = (username: string) => `user/${username}`

export function useUser({
  id,
  initialData,
}: {
  id: string
  initialData: User
}) {
  const { data = initialData, ...rest } = useSWR<User>(userKey(id))

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
