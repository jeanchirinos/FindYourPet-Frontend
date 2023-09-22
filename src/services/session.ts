'use server'
import { Session } from '@/types'
import { request } from '@/utilities'
// import { GetServerSidePropsContext } from 'next'
import { cookies } from 'next/headers'

// export async function getSessionOld(context: GetServerSidePropsContext | string) {
//   let session: Session

//   try {
//     session = await request<Session>('session', {
//       // cookies: typeof context === 'string' ? context : context.req.headers.cookie,
//       cookies: typeof context === 'string' ? `jwt=${context}` : context.req.headers.cookie,
//     })
//   } catch (e) {
//     session = { auth: false }
//   }

//   return session
// }

export async function getSession(token?: string) {
  let session

  let authToken = token

  if (!authToken) {
    authToken = cookies().get('jwt')?.value
  }

  try {
    session = await request<Session>('session', {
      cookies: `jwt=${authToken}`,
    })
  } catch (e) {
    session = { auth: false } as const
  }

  return session
}
