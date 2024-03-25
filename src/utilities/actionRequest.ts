'use server'

import { requestAll } from '@/utilities/request'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { ZodError, ZodRawShape, z } from 'zod'
import { getFormEntries, redirectAfterUnauthorized } from './utilities'

// Types
interface BaseConfig extends Omit<RequestInit, 'body'> {
  body?: object
  auth?: boolean
  redirectIfUnauthorized?: boolean // if auth is true this will have effect
  authIsOptional?: boolean
}

interface NotNullableConfig extends BaseConfig {
  nullable?: false
}

interface NullableConfig extends BaseConfig {
  nullable: true
}

type RequestParamsNotNullable = [url: Parameters<typeof fetch>['0'], config?: NotNullableConfig]
type RequestParamsNullable = [url: Parameters<typeof fetch>['0'], config?: NullableConfig]

export async function getData<Response>(...params: RequestParamsNotNullable): Promise<Response>
export async function getData<Response>(...params: RequestParamsNullable): Promise<Response | null>

//
export async function getData<Response>(
  ...params: RequestParamsNotNullable | RequestParamsNullable
) {
  const [url, config = {}] = params

  const { redirectIfUnauthorized = true, nullable, authIsOptional } = config

  const headers: HeadersInit = {}

  if (config.auth ?? authIsOptional) {
    const jwt = cookies().get('jwt')

    try {
      if (!jwt && !authIsOptional) {
        throw new Error('Sin token')
      }
    } catch (e) {
      if (redirectIfUnauthorized) {
        return redirectAfterUnauthorized()
      }

      if (nullable) return null

      throw new Error('Error desconocido en obtención de token')
    }

    headers.Cookie = cookies().toString()
  }

  const myConfig = {
    ...config,
    redirectIfUnauthorized,
    headers: { ...config.headers, ...headers },
  }

  if (nullable) {
    return requestAll<Response>(url, { ...myConfig, nullable })
  } else {
    return requestAll<Response>(url, { ...myConfig, nullable })
  }
}

export async function actionRequestPost<Response>(...params: RequestParamsNotNullable) {
  const [url, config = {}] = params

  const { auth = true } = config

  const headers: HeadersInit = {}

  if (auth) {
    const jwt = cookies().get('jwt')

    if (!jwt) {
      throw new Error('Sin token')
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
  onSuccess?: (data: Response) => Promise<void> | void
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
        const message = `${error.issues[0].path[0]} : ${error.issues[0].message}`

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
      await onSuccess(res.data)
    }
  }

  return res
}
