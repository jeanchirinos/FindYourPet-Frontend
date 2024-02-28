'use server'

import { requestAll } from '@/utilities/request'

import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { ZodError, ZodRawShape, z } from 'zod'
import { getFormEntries } from './utilities'

interface Config extends Omit<RequestInit, 'body'> {
  body?: object
  auth?: boolean
}

export type RequestParams = [url: Parameters<typeof fetch>['0'], config?: Config]

export async function actionRequestGet<Response>(...params: RequestParams) {
  const [url, config = {}] = params

  const headers: HeadersInit = {}

  if (config.auth) {
    const jwt = cookies().get('jwt')

    if (!jwt) {
      throw new Error('No hay jwt')
    }

    headers.Cookie = cookies().toString()
  }

  const myConfig = { ...config, headers: { ...config.headers, ...headers } }

  if (process.env.NODE_ENV === 'development') {
    // config.cache = 'force-cache'
  }

  return requestAll<Response>(url, myConfig)
}

export async function actionRequestPost<Response>(...params: RequestParams) {
  const [url, config = {}] = params

  const { auth = true } = config

  const headers: HeadersInit = {}

  if (auth) {
    const jwt = cookies().get('jwt')

    if (!jwt) {
      throw new Error('No hay jwt')
    }

    headers.Cookie = cookies().toString()
  }

  const myConfig = {
    ...config,
    method: 'POST',
    headers: { ...config.headers, ...headers },
  }

  try {
    const res = await requestAll<Response>(url, myConfig)

    const { ok = true, msg = '', data } = res as { ok: true; msg: string; data: Response }

    return { msg, ok, data: data ?? res }
  } catch (e) {
    if (e instanceof Error) {
      return { ok: false, msg: e.message, data: undefined } as const
    }

    return { ok: false, msg: 'Hubo un error en la petición', data: undefined } as const
  }
}

// POST
type Params<Response> = {
  url: string
  body?: object
  schema?: z.ZodObject<ZodRawShape> | z.ZodEffects<any>
  revalidateTagParams?: Parameters<typeof revalidateTag>
  revalidatePathParams?: Parameters<typeof revalidatePath>
  onSuccess?: (data: Response) => void
  auth?: boolean
}

export async function sendData<Response>(params: Params<Response>) {
  const { url, body, schema, onSuccess, revalidatePathParams, revalidateTagParams, auth } = params

  if (body && schema) {
    const dataToValidate = body instanceof FormData ? getFormEntries(body) : body

    try {
      schema.parse(dataToValidate)
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0].message

        return { ok: false, msg: message, data: undefined } as const
      }

      return { ok: false, msg: 'Error en la validación de datos', data: undefined } as const
    }
  }

  const res = await actionRequestPost<Response>(url, {
    body,
    auth,
  })

  if (res.ok) {
    if (revalidatePathParams) {
      revalidatePath(...revalidatePathParams)
    }

    if (revalidateTagParams) {
      revalidateTag(...revalidateTagParams)
    }

    if (onSuccess) {
      onSuccess(res.data)
    }
  }

  return res
}
