import {
  RequestParamsWithoutCookies,
  errorResponse,
  requestAll,
  requestNew,
} from '@/utilities/request'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { ZodRawShape, z } from 'zod'
import { getFormEntries } from './utilities'

export async function actionRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = { ...config, cookies: cookies().toString() }

  return requestNew<Response>(url, myConfig)
}

//

export interface Config extends Omit<RequestInit, 'body'> {
  body?: object
  auth?: boolean
}

export type RequestParams = [url: Parameters<typeof fetch>['0'], config?: Config]

export async function actionRequestGet<Response>(...params: RequestParams) {
  const [url, config = {}] = params

  const headers: HeadersInit = {}

  if (config.auth) {
    headers.Cookie = cookies().toString()
  }

  const myConfig = { ...config, headers: { ...config.headers, ...headers } }

  return requestAll<Response>(url, myConfig)
}

export async function actionRequestPost<Response>(...params: RequestParams) {
  const [url, config = {}] = params

  const headers: HeadersInit = {}

  if (config.auth) {
    headers.Cookie = cookies().toString()
  }

  const myConfig = {
    ...config,
    method: 'POST',
    headers: { ...config.headers, ...headers },
  }

  try {
    const res = await requestAll<Response>(url, myConfig)

    const {
      ok = true,
      msg = '',
      data,
    } = res as { ok: boolean; msg: string; data: Response | undefined }

    return { msg, ok, data }
  } catch (e) {
    if (e instanceof Error) {
      return { msg: e.message }
    }

    return { msg: 'Hubo un error en la petición' }
  }
}

// POST
type Params<Response> = {
  url: string
  body?: object
  schema?: z.ZodObject<ZodRawShape> | z.ZodEffects<any>
  revalidate?: boolean
  onSuccess?: (data: Response) => void
  auth?: boolean
}

export async function sendData<Response>(params: Params<Response>) {
  const { url, body, schema, onSuccess, revalidate = false, auth = true } = params

  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    try {
      schema.parse(dataToValidate)
    } catch (error) {
      return errorResponse
    }
  }

  const res = await actionRequestPost<Response>(url, {
    body,
    auth,
  })

  if (res.ok) {
    if (revalidate) {
      revalidatePath('/')
    }

    if (onSuccess) {
      onSuccess(res.data as Response)
    }
  }

  return res
}
