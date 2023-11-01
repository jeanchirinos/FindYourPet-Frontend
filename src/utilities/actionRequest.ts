import { cookies } from 'next/headers'
import { RequestParamsWithoutCookies, request, errorResponse } from '@/utilities/request'

import { getFormEntries } from '@/utilities/utilities'
import { revalidatePath } from 'next/cache'
import { ZodRawShape, z } from 'zod'

export async function actionRequest<Response>(...params: RequestParamsWithoutCookies) {
  const [url, config = {}] = params

  const myConfig = { ...config, cookies: '' }

  if (config.cache !== 'force-cache') {
    myConfig.cookies = cookies().toString()
  }

  return request<Response>(url, myConfig)
}

// POST
export async function sendData<Response>(params: {
  schemaValidation: ZodRawShape
  data: object | FormData
  url: string
  revalidation?: boolean
}) {
  const { url, schemaValidation, data, revalidation = true } = params

  const schema = z.object(schemaValidation)

  const dataToSend = data instanceof FormData ? getFormEntries(data) : data

  try {
    schema.parse(dataToSend)
  } catch (error) {
    return errorResponse
  }

  const res = await actionRequest<Response>(url, {
    method: 'POST',
    body: data,
  })

  if (revalidation && res.ok) {
    revalidatePath('/')
  }

  return res
}
