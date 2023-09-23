import { cookies } from 'next/headers'
import { RequestParams, request as baseRequest } from './utilities'

export function request<Response>(...params: RequestParams) {
  const [url, options] = params

  const authToken = cookies().get('jwt')?.value

  return baseRequest<Response>(url, { ...options, token: authToken, cookies: cookies().toString() })
}
