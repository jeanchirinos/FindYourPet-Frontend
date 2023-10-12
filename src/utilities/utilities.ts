import { toast } from 'react-hot-toast'
import { getCookie, getCookies } from 'typescript-cookie'

interface Config extends Omit<RequestInit, 'body'> {
  method?: 'GET' | 'POST'
  body?: object
}

export type RequestParams = [
  url: string,
  options?: { config?: Config; token?: string; cookies?: string },
]

export async function request<Response>(...params: RequestParams): Promise<Response> {
  const [url, options] = params
  const { config = {}, token, cookies } = options ?? {}

  const headers: HeadersInit = {}
  let body = null

  if (config.body instanceof FormData) {
    body = config.body
  } else {
    headers['content-type'] = 'application/json'
    headers.accept = 'application/json'

    body = JSON.stringify(config.body)
  }

  const backendApi = process.env.NEXT_PUBLIC_BACKEND_API

  // //! LOCAL TO PRODUCTION - DIFFERENT DOMAINS
  // // if (process.env.NODE_ENV === 'development') {
  //   let authToken
  //   // const isClient = typeof window !== 'undefined'

  //   if (token) {
  //     authToken = token
  //   } else if (isClient) {
  //     authToken = getCookie('jwt')
  //   }

  //   if (authToken) {
  //     headers.authorization = `Bearer ${authToken}`
  //   }

  // // }
  // //!

  // if (cookies) headers.Cookie = getCookies()

  headers.Cookie = cookies ?? `jwt=${getCookie('jwt')}`

  const res = await fetch(backendApi + url, {
    method: config.method,
    headers,
    body,
  })

  const data = await res.json()

  if (!res.ok) {
    if (config.method === 'POST') {
      toast.error(data.msg)
    }

    // if (typeof window !== 'undefined' && res.status === 401) {
    //   // removeAuthToken()
    //   // localStorage.clear()
    //   // window.location.replace('/')
    // }

    throw new Error(`[${res.status} - ${res.statusText}] : ${data.msg}`)
  }

  return data as Response
}

export async function fetcher<Response>(url: string) {
  const data = await request(url)

  return data as Response
}

export async function waitFor(seconds: number) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000))
}

export type DefaultSuccessResponse = { status: 'success'; msg: string }
