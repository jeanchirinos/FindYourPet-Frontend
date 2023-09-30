'use client'

import useSWRMutation, { SWRMutationConfiguration } from 'swr/mutation'
import { DefaultSuccessResponse, request } from '@/utilities/utilities'

type Params<Data, Args> = [
  url: string,
  options?: {
    key: string
    options?: SWRMutationConfiguration<Data, any, string, Args>
  },
]

export function useSendData<Args, Response = object>(
  ...params: Params<Response & DefaultSuccessResponse, Args>
) {
  type SuccessResponse = Response & DefaultSuccessResponse

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
