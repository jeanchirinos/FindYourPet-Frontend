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

  const urlPath = /^http/.test(url) ? url : process.env.NEXT_PUBLIC_BACKEND_API + url

  cookies && (headers.Cookie = cookies)

  const res = await fetch(urlPath, {
    ...config,
    headers,
    body,
  })

  const json = await res.json()

  if (!res.ok) {
    const { statusText, url, status } = res
    const { msg, message } = json

    const messageToShow = msg || message ? JSON.stringify(msg ?? message) : statusText

    throw new Error(messageToShow, {
      cause: {
        url,
        status,
      },
    })
  }

  const {
    ok = true,
    msg = '',
    data,
  } = json as { ok: true; msg: string | undefined; data: Response }

  const resData = data ?? (json as Response)

  return { msg, ok, data: resData }
}

export const getApiUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error('No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API')
  }

  return baseUrl + url
}

export interface ConfigAll extends Omit<RequestInit, 'body'> {
  body?: object
}

export type RequestParamsAll = [url: Parameters<typeof fetch>['0'], config?: ConfigAll]
export async function requestAll<Response>(...params: RequestParamsAll) {
  const [url, config] = params

  const headers = new Headers(config?.headers)
  let body = null

  if (config?.body instanceof FormData) {
    body = config.body
  } else {
    headers.append('Content-Type', 'application/json')
    headers.append('accept', 'application/json')

    body = JSON.stringify(config?.body)
  }

  let urlPath = url

  if (typeof urlPath === 'string' && !urlPath.startsWith('http')) {
    urlPath = getApiUrl(urlPath)
  }

  const res = await fetch(urlPath, {
    ...config,
    headers,
    body,
  })

  const json = await res.json()

  if (!res.ok) {
    const { message, msg } = json
    const { statusText, url, status } = res

    throw new Error(message ?? msg ?? statusText, {
      cause: {
        url,
        status,
      },
    })
  }

  return json as Response
}
