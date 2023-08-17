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

  const authCookie = request.cookies.get('jwt')

  let session: Session = { auth: false }

  if (authCookie) {
    session = await getSession(request.headers.get('cookie')!)
  }

  const response = NextResponse.next()
  response.cookies.set('session', JSON.stringify(session))

  if (
    request.nextUrl.pathname.startsWith('/administrar') &&
    (!session.auth || session.role !== ERole.ADMIN)
  ) {
    return Response.redirect(new URL('/', request.nextUrl))
  }

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
