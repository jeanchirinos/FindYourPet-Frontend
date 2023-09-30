import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
// import { getSessionMiddleware } from '@/services/session'
// import { ERole } from '@/enums'
// import {request as requestApi} from '@/utilities/utilities'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const redirection = NextResponse.redirect(new URL('', request.nextUrl.origin))

  const token = request.cookies.get('jwt')?.value
  if (!token) return redirection
  // const cookies = request.cookies.toString()

  // const session = await requestApi('session', {
  //   token,
  //   cookies,
  // })

  // if (!session.auth || session.role !== ERole.ADMIN) {
  //   return redirection
  // }

  return response
}

export const config = {
  matcher: ['/crud/:path*'],
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }
