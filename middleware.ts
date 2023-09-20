import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession } from '@/services/session'
import { ERole } from '@/enums'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const redirection = NextResponse.redirect(new URL('', request.nextUrl.origin))

  const authCookie = request.cookies.get('jwt')?.value
  if (!authCookie) return redirection

  const session = await getSession(authCookie)

  if (!session.auth || session.role !== ERole.ADMIN) {
    return redirection
  }

  return response
}

export const config = {
  matcher: ['/crud/:path*'],
}
