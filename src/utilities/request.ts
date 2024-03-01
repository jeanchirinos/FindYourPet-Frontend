import { notAuthorized } from './utilities'

export interface Config extends Omit<RequestInit, 'body'> {
  body?: object
  redirectIfUnauthorized?: boolean
}

export type RequestParamsAll = [url: Parameters<typeof fetch>['0'], config?: Config]

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
  } catch {
    if (res.status === 401) {
      if (config?.redirectIfUnauthorized) {
        return notAuthorized()
      }
    }

    throw new Error('Error desconocido luego de la respuesta del servidor')
  }

  return json as Response
}

export function getApiUrl(url: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API

  if (!baseUrl) {
    throw new Error('No se ha definido la variable de entorno NEXT_PUBLIC_BACKEND_API')
  }

  return new URL(url, baseUrl)
}
