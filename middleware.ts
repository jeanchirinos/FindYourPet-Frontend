import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/services/session'
import { Session } from '@/types'
import { ERole } from '@/enums'

export async function middleware(request: NextRequest) {
  // Routes that doesn't require session
  if (
    request.nextUrl.pathname.startsWith('/recuperar') ||
    request.nextUrl.pathname.startsWith('/recuperar_api') ||
    request.nextUrl.pathname.startsWith('/social_auth')
  ) {
    return NextResponse.next()
  }

  // Routes that require can require session
  // const authCookie = request.cookies.get('jwt')

  // let session: Session = { auth: false }
  // let session2: Session = { auth: false }

  // console.log('--- START 1 - Logs ---')

  // console.log([
  //   { cookiesGetJwt: request.cookies.get('jwt')?.value },
  //   { headersGetCookie: request.headers.get('cookie') },
  // ])

  // console.log('--- END 1 - Logs ---')

  // if (authCookie) {
  //   session = await getSession(request.headers.get('cookie')!)
  //   session2 = await getSession(request.cookies.get('jwt')?.value!)
  // }

  const response = NextResponse.next()
  // response.cookies.set('session', JSON.stringify(session))

  if (request.nextUrl.pathname.startsWith('/administrar')) {
    const authCookie = request.cookies.get('jwt')?.value

    const redirection = NextResponse.redirect(new URL('', request.nextUrl.origin))

    if (!authCookie) return redirection

    const session = await getSession(authCookie ?? '')

    if (!session.auth || session.role !== ERole.ADMIN) {
      return NextResponse.redirect(new URL('', request.nextUrl.origin))
    }
  }

  // console.log('--- START 2 - Logs ---')

  // console.log([
  //   { cookiesGetJwt: request.cookies.get('jwt')?.value },
  //   { headersGetCookie: request.headers.get('cookie') },
  //   { session },
  //   { session2 },
  // ])

  // console.log('--- END 2 - Logs ---')

  return response
}

// export const config = {
//   matcher: '/administrar/:path*',
// }

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
