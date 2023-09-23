import { Session } from '@/types'
import { request } from '@/utilities/requestServer'
import { request as requestClient } from '@/utilities/utilities'

export async function getSession(token?: string) {
  let session

  const myRequest = token ? requestClient : request

  const options = token ? { token } : undefined

  try {
    session = await myRequest<Session>('session', options)
  } catch (e) {
    session = { auth: false } as const
  }

  return session
}
