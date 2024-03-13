import { notAuthorized } from './utilities'

export interface BaseConfig extends Omit<RequestInit, 'body'> {
  body?: object
  redirectIfUnauthorized?: boolean
}

interface NotNullableConfig extends BaseConfig {
  nullable?: false
}

interface NullableConfig extends BaseConfig {
  nullable?: true
}

type RequestParamsNotNullable = [url: Parameters<typeof fetch>['0'], config?: NotNullableConfig]

type RequestParamsNullable = [url: Parameters<typeof fetch>['0'], config?: NullableConfig]

export async function requestAll<Response>(...params: RequestParamsNotNullable): Promise<Response>

export async function requestAll<Response>(
  ...params: RequestParamsNullable
): Promise<Response | null>

//
export async function requestAll<Response>(
  ...params: RequestParamsNotNullable | RequestParamsNullable
) {
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

  headers.append('app-api-key', getApiKey())

  let urlPath = url

  if (typeof urlPath === 'string' && !urlPath.startsWith('http')) {
    urlPath = getApiUrl(urlPath)
  }

  const res = await fetch(urlPath, {
    ...config,
    headers,
    body,
  })

  let json

  try {
    if (!res.ok && (res.status === 404 || res.status === 500)) {
      throw new Error(`${res.status} : ${res.statusText}`, {
        cause: {
          url,
          status: res.status,
        },
      })
    }

    json = await res.json()

    if (!res.ok) {
      const { message, msg } = json
      const { statusText, url, status } = res

      throw new Error(message ?? JSON.stringify(msg) ?? statusText, {
        cause: {
          url,
          status,
        },
      })
    }
  } catch (e) {
    if (res.status === 401 || res.status === 403) {
      if (config?.redirectIfUnauthorized) {
        return notAuthorized()
      }
    }

    if (config?.nullable) return null

    const error = e instanceof Error ? e : new Error('Error desconocido en la petición al servidor')

    throw error
  }

  return json as Response
}

export function getApiUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error(`No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API`)
  }

  return new URL(url, baseUrl)
}

export function getApiKey() {
  const apiKey = process.env.API_KEY

  if (!apiKey) {
    throw new Error(`No se ha definido la variable de entorno API_KEY`)
  }

  return apiKey
}
