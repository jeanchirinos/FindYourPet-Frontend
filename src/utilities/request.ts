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

  headers.append('API_KEY', getApiKey())

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

  try {
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
  } catch (e) {
    if (res.status === 401) {
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
  const envName = 'NEXT_PUBLIC_BACKEND_API'

  const baseUrl = process.env[envName]

  if (!baseUrl) {
    throw new Error(`No se ha definido la variable de entorno ${envName}`)
  }

  return new URL(url, baseUrl)
}

export function getApiKey() {
  const envName = 'API_KEY'

  const apiKey = process.env[envName]

  if (!apiKey) {
    throw new Error(`No se ha definido la variable de entorno ${envName}`)
  }

  return apiKey
}
