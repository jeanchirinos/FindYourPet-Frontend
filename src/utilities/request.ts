export interface Config extends Omit<RequestInit, 'body'> {
  body?: object
  cookies: string
}

//

// function hola2(...params: ParamsGetPost): ResponseGetPost {
//   const [url, config = {} as Config] = params

//   if (config.method === 'GET') {
//     return 4
//   }

//   return 'ádios'
// }

export type RequestParams = [url: string, config?: Config]
export type RequestParamsWithoutCookies = [url: string, config?: Omit<Config, 'cookies'>]

// export const errorResponse = { status: 'error', msg: 'Hubo un error', data: null } as const
export const errorResponse = { ok: false, msg: 'Hubo un error en la validación de datos' } as const

type DefaultSuccessResponse = { status: 'success'; msg: string }

type PossibleResponse<Response> =
  | (DefaultSuccessResponse & { data: Response })
  | { status: 'error'; msg: string; data: null }

// export async function requestOld<Response>(
//   ...params: RequestParams
// ): Promise<PossibleResponse<Response>> {
//   const [url, config = {} as Config] = params

//   const { cookies } = config

//   const headers: HeadersInit = {}
//   let body = null

//   if (config.body instanceof FormData) {
//     body = config.body
//   } else {
//     headers['content-type'] = 'application/json'
//     headers.accept = 'application/json'

//     body = JSON.stringify(config.body)
//   }

//   const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API

//   headers.Cookie = cookies

//   try {
//     const res = await fetch(backendApiUrl + url, {
//       method: config.method,
//       headers,
//       body,
//     })

//     if (!res.ok) {
//       const json = await res.json()
//       const msg = JSON.stringify(json.msg)

//       throw new Error(msg ?? res.statusText, {
//         cause: {
//           url: res.url,
//           status: res.status,
//           json: msg,
//         },
//       })
//     }

//     // if(config.method === 'POST'){

//       const resData = (await res.json()) as DefaultSuccessResponse & Response
//       // const resData = (await res.json()) as {ok: true, msg: string} & {data: Response}

//       const { status = 'success', msg = '' } = resData
//       // const { ok = true, msg = '' } = resData

//       return { msg, status, data: resData }
//     // }

//     // const resData = (await res.json()) as Response

//     // return resData

//   } catch (e) {
//     if (e instanceof Error) {
//       console.error(e)
//       return { ...errorResponse, msg: e.message }
//     }

//     return { ...errorResponse }
//   }
// }

type PossibleResponse2<Response> =
  | { ok: true; msg: string | undefined; data: Response }
  | { ok: false; msg: string }
// | { ok: false; msg: string; data: undefined }

export async function request<Response>(
  ...params: RequestParams
): Promise<PossibleResponse2<Response>> {
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

    const resData = (await res.json()) as { ok: true; msg: string | undefined; data: Response }

    const { ok = true, msg = '', data } = resData

    return { msg, ok, data: data ?? (resData as Response) }
  } catch (e) {
    if (e instanceof Error) {
      // return { msg: e.message, ok: false, data: undefined }
      return { msg: e.message, ok: false }
    }

    // return { msg: 'Hubo un error en la petición', ok: false, data: undefined }
    return { msg: 'Hubo un error en la petición', ok: false }
  }
}

// export interface Config1<T extends string> extends Omit<RequestInit, 'body'> {
//   body?: object
//   cookies: string
//   method: T
// }

// export type RequestParamsWithoutCookies = [url: string, config?: Omit<Config, 'cookies'>]

// type Paramss<T extends string> = [url: string, config?: Config1<T>]

// type RequestParams2 = Paramss<'GET'>
// type RequestParams3 = Paramss<'POST'>
// type ParamsGetPost = RequestParams2 | RequestParams3

// type PostResponse<T> = DefaultSuccessResponse & { data: T }
// type GetResponse<T> = T
// type ResponseGetPost<T> =
//   | GetResponse<T>
//   | PostResponse<T>
//   | { status: 'error'; msg: string; data: null }

// async function hola2<T>(...params: RequestParams2): Promise<GetResponse<T>>
// async function hola2<T>(...params: RequestParams3): Promise<PostResponse<T>>

// async function hola2<Response>(...params: ParamsGetPost): Promise<ResponseGetPost<Response>> {
//   const [url, config = {} as Config] = params

//   const { cookies } = config

//   const headers: HeadersInit = {}
//   let body = null

//   if (config.body instanceof FormData) {
//     body = config.body
//   } else {
//     headers['content-type'] = 'application/json'
//     headers.accept = 'application/json'

//     body = JSON.stringify(config.body)
//   }

//   const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API

//   headers.Cookie = cookies

//   try {
//     const res = await fetch(backendApiUrl + url, {
//       method: config.method,
//       headers,
//       body,
//     })

//     if (!res.ok) {
//       const json = await res.json()
//       const msg = JSON.stringify(json.msg)

//       throw new Error(msg ?? res.statusText, {
//         cause: {
//           url: res.url,
//           status: res.status,
//           json: msg,
//         },
//       })
//     }

//     if (config.method === 'POST') {
//       const resData = (await res.json()) as DefaultSuccessResponse & Response

//       const { status = 'success', msg = '' } = resData

//       return { msg, status, data: resData }
//     }

//     const resData = (await res.json()) as Response

//     return resData
//   } catch (e) {
//     if (e instanceof Error) {
//       console.error(e)
//       return { ...errorResponse, msg: e.message }
//     }

//     return { ...errorResponse }
//   }
// }
