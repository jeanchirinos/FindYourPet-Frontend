import useSWR from 'swr'
import { request } from '@/utilities'

export type UseGetDataOptions = {
  /** When all elements from array are true, proceed with petition */
  waitFor?: unknown[]
  key?: string
}

export function useGetData<Response>(url: string, options?: UseGetDataOptions) {
  const { waitFor, key = url } = options ?? {}

  // FUNCTIONS
  const keyFn = () => {
    const notReadyToFetch = waitFor?.some(
      item => item === undefined || item === null || item === false,
    )

    if (notReadyToFetch) return null

    return key
  }

  const requestUrl = process.env.NEXT_PUBLIC_BACKEND_API_CLIENT + url

  async function fetcher() {
    const data = await request<Response>(requestUrl)
    return data
  }

  // RETURN
  return useSWR<Response>(keyFn(), fetcher, {
    revalidateOnMount: true,
  })
}
