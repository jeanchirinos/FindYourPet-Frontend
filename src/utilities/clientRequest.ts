import { RequestParamsWithoutCookies, request } from './request'
import { getCookie } from 'typescript-cookie'

export async function clientRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = {
    ...config,
    cookies: `jwt=${getCookie('jwt')}`,
  }

  return request<Response>(url, myConfig)
}
