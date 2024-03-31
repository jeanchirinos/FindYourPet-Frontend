import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const cookie = searchParams.get('cookie')
  const token = searchParams.get('token')

  // const expires = new Date()
  // expires.setDate(expires.getDate() + 7)

  // cookies().set('jwt', token as string, { expires })

  // redirect(ROUTE.PETS.INDEX)
  return Response.json({
    cookie,
    token,
    searchParams: searchParams.toString(),
  })
}
