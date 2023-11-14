import { RequestParamsWithoutCookies, request } from './request'
import { getCookie } from 'typescript-cookie'

export async function clientRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = {
    ...config,
    cookies: `jwt=${getCookie('jwt')}`,
  }

  return request<Response>(url, myConfig)
}

// export async function clientRequestGetWithAuth<Response>(...params: Parameters<typeof fetch>) {
//   const [url, config = {}] = params

//   const myConfig = {
//     ...config,
//     headers: { ...config.headers, Cookie: `jwt=${getCookie('jwt')}` },
//   }

//   return requestAll<Response>(url, myConfig)
// }

// export async function actionRequestPostWithAuth<Response>(...params: Parameters<typeof fetch>) {
//   const [url, config = {}] = params
//   const myConfig = {
//     ...config,
//     method: 'POST',
//     headers: { ...config.headers, Cookie: `jwt=${getCookie('jwt')}` },
//   }

//   try {
//     const res = await requestAll<Response>(url, myConfig)

//     const {
//       ok = true,
//       msg = '',
//       data,
//     } = res as { ok: true; msg: string | undefined; data: Response }

//     const resData = data ?? (res as Response)

//     return { msg, ok, data: resData }
//   } catch (e) {
//     if (e instanceof Error) {
//       return { msg: e.message, ok: false, data: undefined }
//     }

//     return { msg: 'Hubo un error en la petición', ok: false, data: undefined }
//   }
// }
