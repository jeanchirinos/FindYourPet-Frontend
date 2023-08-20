'use client'

import useSWR from 'swr'
import { request } from '@/utilities'

type Params = [
  url: string,
  options?: {
    /** When all elements from array are true, proceed with petition */
    waitFor?: (undefined | null | boolean)[]
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

  // const requestUrl = process.env.NEXT_PUBLIC_BACKEND_API_CLIENT + url
  const requestUrl = url

  async function fetcher() {
    const data = await request<Response>(requestUrl)
    return data
  }

  // RETURN
  return useSWR<Response>(keyFn(), fetcher, {
    revalidateOnMount: true,
  })
}
