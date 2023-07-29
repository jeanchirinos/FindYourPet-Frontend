import { toast } from 'react-hot-toast'

interface Config extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST'
  body?: object
}

export async function request<Response>(
  url: string,
  config: Config = {},
  cookies?: string,
): Promise<Response> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }

  let backendApi: string | undefined

  if (cookies) {
    headers.Cookie = cookies
    backendApi = process.env.NEXT_PUBLIC_BACKEND_API_SERVER
  } else {
    backendApi = process.env.NEXT_PUBLIC_BACKEND_API_CLIENT
  }

  const res = await fetch(`${backendApi}${url}`, {
    method: config.method,
    credentials: 'include',
    headers,
    body: JSON.stringify(config.body),
  })

  const data = await res.json()

  if (!res.ok) {
    if (config.method === 'POST') {
      toast.error(data.message)
      throw new Error(`[${res.status} - ${res.statusText}] : ${data.message}`)
    }
  }

  return data as Response
}
