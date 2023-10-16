import { cookies } from 'next/headers'
import { DefaultSuccessResponse } from './utilities'

interface Config extends Omit<RequestInit, 'body'> {
  body?: object
}

export type RequestParams = [url: string, config?: Config]

export const errorResponse = { status: 'error', msg: 'Hubo un error' } as const

type PossibleResponse<Response> =
  | (DefaultSuccessResponse & Response)
  | { status: 'error'; msg: string }

export async function requestAction<Response>(
  ...params: RequestParams
): Promise<PossibleResponse<{ data: Response }>> {
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

  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API

  headers.Cookie = cookies().toString()

  try {
    const res = await fetch(backendApiUrl + url, {
      method: config.method,
      headers,
      body,
    })

    if (!res.ok) {
      const json = await res.json()
      const msg = JSON.stringify(json.msg)

      //@ts-ignore
      throw new Error(res.msg ?? res.statusText, {
        cause: {
          url: res.url,
          status: res.status,
          json: msg,
        },
      })
    }

    const data = await res.json()

    return { msg: '', status: 'success', data }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      return { ...errorResponse, msg: e.message }
    }

    return { ...errorResponse }
  }
}
