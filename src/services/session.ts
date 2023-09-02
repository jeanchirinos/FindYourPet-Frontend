import { Session } from '@/types'
import { request } from '@/utilities'
import { GetServerSidePropsContext } from 'next'

export async function getSession(context: GetServerSidePropsContext | string) {
  let session: Session

  try {
    session = await request<Session>('session', {
      // cookies: typeof context === 'string' ? context : context.req.headers.cookie,
      cookies: typeof context === 'string' ? `jwt=${context}` : context.req.headers.cookie,
    })
  } catch (e) {
    session = { auth: false }
  }

  return session
}
