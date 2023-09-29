'use server'
import { DefaultSuccessResponse } from '@/hooks/useSendData'
import { requestAction } from '@/utilities/actionsRequest'
// import { request } from '@/utilities/requestServer'
import { cookies } from 'next/headers'
import { z } from 'zod'

// export function useForgotPassword() {
//   interface Args {
//     email: string
//   }

//   return useSendData<Args>('forgot-password')
// }

export async function forgotPassword(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email(),
  })

  const data = schema.parse({
    email: formData.get('email'),
  })

  // try {
  const response = await requestAction<DefaultSuccessResponse>('forgot-password', {
    method: 'POST',
    body: data,
  })

  console.log({ response })

  cookies().delete('jwt')
  // } catch (e) {
  //   return errorMessage()
  // }
}

const errorMessage = (msg = 'Hubo un error') => {
  const response = { status: 'error', msg } as const

  return response
}
