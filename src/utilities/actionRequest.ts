import { cookies } from 'next/headers'
import { RequestParamsWithoutCookies, request } from './request'

export async function actionRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = {
    ...config,
    cookies: cookies().toString(),
  }

  return request<Response>(url, myConfig)
}
