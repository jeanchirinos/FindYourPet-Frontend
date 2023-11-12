import { RequestParamsWithoutCookies, errorResponse, requestNew } from '@/utilities/request'

import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { ZodRawShape, z } from 'zod'
import { getFormEntries } from './utilities'

export async function actionRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = { ...config, cookies: cookies().toString() }

  return requestNew<Response>(url, myConfig)
}

// POST
type Params<Response> = {
  url: string
  data?: object | FormData
  schema?: z.ZodObject<ZodRawShape> | z.ZodEffects<any>
  revalidate?: boolean
  onSuccess?: (data: Response) => void
}

export async function sendData<Response>(params: Params<Response>) {
  const { url, revalidate = false, data, schema, onSuccess } = params

  if (data && schema) {
    const dataToValidate = data instanceof FormData ? getFormEntries(data) : data

    try {
      schema.parse(dataToValidate)
    } catch (error) {
      return errorResponse
    }
  }

  const res = await actionRequest<Response>(url, {
    method: 'POST',
    body: data,
  })

  if (revalidate && res.ok) {
    revalidatePath('/')
  }

  if (onSuccess && res.ok) {
    onSuccess(res.data)
  }

  return res
}
