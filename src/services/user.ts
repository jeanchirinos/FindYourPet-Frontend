import { SWRKey } from '@/enums'
import { useSendData } from '@/hooks/useSendData'
import { fetcher } from '@/utilities'
import { User } from 'app/(session)/perfil/[id]/page'
import useSWR from 'swr'

export function useUser({
  id,
  initialData,
}: {
  id: string | number | undefined
  initialData: User
}) {
  const { data = initialData, ...rest } = useSWR<User>(SWRKey.USER, () =>
    fetcher<User>(`user/${id}`),
  )

  return {
    user: data,
    ...rest,
  }
}

export function useUpdateUser() {
  type Args = Partial<User>

  return useSendData<Args>('user-update', {
    key: SWRKey.USER,
    // options: {
    //   revalidate: false,
    // },
  })
}
