import { Session } from '@/types'
import { request } from '@/utilities'
import { GetServerSidePropsContext } from 'next'

export async function getSession(context: GetServerSidePropsContext) {
  let session: Session

  try {
    session = await request<Session>('session', {
      cookies: context.req.headers.cookie,
    })
  } catch (e) {
    session = { auth: false }
  }

  return session
}
