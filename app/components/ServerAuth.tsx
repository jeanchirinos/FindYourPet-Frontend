// import { getSessionOld } from '@/services/session'
import { Session as SessionType } from '@/types'
import { cookies } from 'next/headers'

// export async function ServerAuth(props: { children: (session: SessionType) => JSX.Element }) {
//   const authCookie = cookies().get('jwt')?.value

//   let session: SessionType

//   if (authCookie) {
//     session = await getSession(authCookie)
//   } else {
//     session = { auth: false } as const
//   }

//   return props.children(session)
// }

export async function ServerAuth(props: { children: (session: SessionType) => JSX.Element }) {
  // const authCookie = cookies().get('jwt')?.value

  // let session: SessionType

  // if (authCookie) {
  //   session = await getSessionOld(authCookie)
  // } else {
  //   session = { auth: false } as const
  // }

  // return props.children(session)

  return props.children
}
