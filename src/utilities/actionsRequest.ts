import { DefaultSuccessResponse } from '@/hooks/useSendData'
import { cookies } from 'next/headers'

interface Config extends Omit<RequestInit, 'body'> {
  body?: object
}

export type RequestParams = [url: string, config?: Config]

export const errorResponse = { status: 'error', msg: 'Hubo un error' } as const

export async function requestAction<Response>(
  ...params: RequestParams
): Promise<(DefaultSuccessResponse & Response) | typeof errorResponse> {
  const [url, config = {}] = params

  const headers: HeadersInit = {}
  let body = null

  if (config.body instanceof FormData) {
    body = config.body
  } else {
    headers['content-type'] = 'application/json'
    headers.accept = 'application/json'

    body = JSON.stringify(config.body)
  }

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_SERVER!

  headers.Cookie = cookies().toString()

  try {
    const res = await fetch(backendApiUrl + url, {
      method: config.method,
      credentials: 'include',
      headers,
      body,
    })

    if (!res.ok) throw new Error('Error en la petición')

    const data = await res.json()

    return { msg: 'Petición correcta', status: 'success', ...data } as DefaultSuccessResponse &
      Response
  } catch (e) {
    return { status: 'error', msg: 'Hubo un error' }
  }
}
