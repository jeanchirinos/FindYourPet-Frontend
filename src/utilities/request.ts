export interface Config extends Omit<RequestInit, 'body'> {
  body?: object
  cookies: string
}

export type RequestParams = [url: string, config?: Config]
export type RequestParamsWithoutCookies = [url: string, config?: Omit<Config, 'cookies'>]

export const errorResponse = { status: 'error', msg: 'Hubo un error', data: null } as const

type DefaultSuccessResponse = { status: 'success'; msg: string }

type PossibleResponse<Response> =
  | (DefaultSuccessResponse & { data: Response })
  | { status: 'error'; msg: string; data: null }

export async function request<Response>(
  ...params: RequestParams
): Promise<PossibleResponse<Response>> {
  const [url, config = {} as Config] = params

  const { cookies } = config

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

  headers.Cookie = cookies

  try {
    const res = await fetch(backendApiUrl + url, {
      method: config.method,
      headers,
      body,
    })

    if (!res.ok) {
      const json = await res.json()
      const msg = JSON.stringify(json.msg)

      throw new Error(msg ?? res.statusText, {
        cause: {
          url: res.url,
          status: res.status,
          json: msg,
        },
      })
    }

    const responseData = (await res.json()) as DefaultSuccessResponse & Response

    const { status = 'success', msg = '' } = responseData

    return { msg, status, data: responseData }
  } catch (e) {
    if (e instanceof Error) {
      console.error(e)
      return { ...errorResponse, msg: e.message }
    }

    return { ...errorResponse }
  }
}
