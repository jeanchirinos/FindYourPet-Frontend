import { Session } from '@/types'
import { request } from '@/utilities/requestServer'
import { request as requestClient } from '@/utilities/utilities'

export async function getSession(token?: string, cookies?: string) {
  let session

  const myRequest = token ? requestClient : request

  const options = token ? { token, cookies } : undefined

  try {
    session = await myRequest<Session>('session', {
      ...options,
      config: {
        cache: 'no-cache',
      },
    })
  } catch (e) {
    session = { auth: false } as const
  }

  return session
}
