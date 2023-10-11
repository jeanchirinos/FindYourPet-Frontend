'use client'

import useSWR from 'swr'
import { request } from '@/utilities/utilities'

export type SWRWaitFor = (undefined | null | boolean)[]

export type Params = [
  url: string,
  options?: {
    /** When all elements from array are true, proceed with petition */
    waitFor?: SWRWaitFor
    key?: string
  },
]

export function useGetData<Response>(...params: Params) {
  const [url, options] = params

  const { waitFor, key = url } = options ?? {}

  // FUNCTIONS
  const keyFn = () => {
    const notReadyToFetch = waitFor?.some(item => item === undefined || item === null || !item)

    if (notReadyToFetch) return null

    return key
  }

  const requestUrl = url

  async function fetcher() {
    const data = await request<Response>(requestUrl)
    return data
  }

  // RETURN
  return useSWR<Response>(keyFn(), fetcher, {
    // revalidateOnMount: true,
  })
}
