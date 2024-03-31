import { ROUTE } from '@/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const { token } = Object.fromEntries(searchParams)

  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  cookies().set('jwt', token, { expires })

  redirect(ROUTE.PETS.INDEX)
}
