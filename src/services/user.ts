import { SWRKey } from '@/enums'
import { useSendData } from '@/hooks/useSendData'
import { fetcher } from '@/utilities'
import { User } from 'app/(session)/perfil/[id]/page'
import useSWR from 'swr'

const userKey = (id: number) => `user/${id}`

export function useUser({
  id,
  initialData,
}: {
  id: string | number | undefined
  initialData: User
}) {
  const { data = initialData, ...rest } = useSWR<User>(userKey(id))

  return {
    user: data,
    ...rest,
  }
}

export function useUpdateUser(id: number) {
  type Args = Partial<User>

  return useSendData<Args>('user-update', {
    key: userKey(id),
  })
}
