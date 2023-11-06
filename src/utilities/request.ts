export interface Config extends Omit<RequestInit, 'body' | 'headers'> {
  body?: object
  cookies?: string
}

export type RequestParams = [url: string, config?: Config]
export type RequestParamsWithoutCookies = [url: string, config?: Omit<Config, 'cookies'>]

export const errorResponse = {
  ok: false,
  msg: 'Hubo un error en la validación de datos',
  data: undefined,
} as const

type PossibleResponse<Response> =
  | { ok: true; msg: string | undefined; data: Response }
  | { ok: false; msg: string; data: undefined }

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

  if (cookies) {
    headers.Cookie = cookies
  }

  try {
    const res = await fetch(backendApiUrl + url, {
      ...config,
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

    const resData = (await res.json()) as { ok: true; msg: string | undefined; data: Response }

    const { ok = true, msg = '', data } = resData

    return { msg, ok, data: data ?? (resData as Response) }
  } catch (e) {
    if (e instanceof Error) {
      return { msg: e.message, ok: false, data: undefined }
    }

    return { msg: 'Hubo un error en la petición', ok: false, data: undefined }
  }
}

export async function requestNew<Response>(
  ...params: RequestParams
): Promise<{ ok: true; msg: string | undefined; data: Response }> {
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

  let urlPath = url

  if (!/^http/.test(url)) {
    urlPath = process.env.NEXT_PUBLIC_BACKEND_API + url
  }

  if (cookies) {
    headers.Cookie = cookies
  }

  const res = await fetch(urlPath, {
    ...config,
    headers,
    body,
  })

  if (!res.ok) {
    const json = await res.json()
    const msg = JSON.stringify(json.msg ?? json.message)

    throw new Error(msg ?? res.statusText, {
      cause: {
        url: res.url,
        status: res.status,
      },
    })
  }

  const resData = (await res.json()) as { ok: true; msg: string | undefined; data: Response }

  const { ok = true, msg = '', data } = resData

  return { msg, ok, data: data ?? (resData as Response) }
}
