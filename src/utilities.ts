import { toast } from 'react-hot-toast'

interface Config extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST'
  body?: object
}

export async function request<Response>(
  url: string,
  options?: { config?: Config; cookies?: string },
): Promise<Response> {
  const { config = {}, cookies } = options ?? {}

  const headers: HeadersInit = {}
  let body = null

  if (config.body instanceof FormData) {
    body = config.body
  } else {
    headers['content-type'] = 'application/json'
    headers.accept = 'application/json'

    body = JSON.stringify(config.body)
  }

  let backendApi: string | undefined

  if (cookies) {
    headers.Cookie = cookies
    backendApi = process.env.NEXT_PUBLIC_BACKEND_API_SERVER
  } else {
    backendApi = process.env.NEXT_PUBLIC_BACKEND_API_CLIENT
  }

  const res = await fetch(backendApi + url, {
    method: config.method,
    credentials: 'include',
    headers,
    body,
  })

  const data = await res.json()

  if (!res.ok) {
    if (config.method === 'POST') {
      toast.error(data.msg)
    }

    if (typeof window !== 'undefined' && res.status === 401) {
      // removeAuthToken()
      localStorage.clear()
      window.location.replace('/')
    }

    throw new Error(`[${res.status} - ${res.statusText}] : ${data.msg}`)
  }

  return data as Response
}
