'use server'

import { DefaultSuccessResponse } from '@/hooks/useSendData'
import { request } from '@/utilities/requestServer'
import { cookies } from 'next/headers'

export async function logout() {
  try {
    await request<DefaultSuccessResponse>('logout', {
      config: {
        method: 'POST',
      },
    })

    cookies().delete('jwt')
  } catch (e) {
    return { msg: 'Failed to logout' }
  }
}
