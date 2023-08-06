import { User } from '@/types'
import { request } from '@/utilities'
import { GetServerSidePropsContext } from 'next'

export async function getSession(context: GetServerSidePropsContext) {
  let session: User

  try {
    session = await request<User>('session', {
      cookies: context.req.headers.cookie,
    })
  } catch (e) {
    session = {
      auth: false,
      status: 'success',
    }
  }

  return session
}
