import useSWRMutation from 'swr/mutation'
import { request } from '@/utilities'

export function useSendData<Args, Response = {}>(url: string, options?: { key: string }) {
  type SuccessResponse = Response & { status: 'ok'; msg: string }

  const { key = url } = options ?? {}

  async function fetcher(key: string, param: { arg: Args }) {
    const data = await request<SuccessResponse>(url, {
      config: {
        method: 'POST',
        body: param.arg ?? {},
      },
    })

    return data
  }

  return useSWRMutation<SuccessResponse, any, typeof key, Args>(key, fetcher)
}
