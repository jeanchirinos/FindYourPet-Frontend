import useSWRMutation from 'swr/mutation'
import { request } from '@/utilities'

type Params = [
  url: string,
  options?: {
    key: string
  },
]

export function useSendData<Args, Response = {}>(...params: Params) {
  type SuccessResponse = Response & { status: 'ok'; msg: string }

  const [url, options] = params
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
