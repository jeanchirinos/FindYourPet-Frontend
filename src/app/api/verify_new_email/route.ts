import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('cookie')

  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  cookies().set('jwt', token as string, { expires })

  redirect(ROUTE.PETS.INDEX)
}
