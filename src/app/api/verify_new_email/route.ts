import { createAuthToken } from '@/controllers/AuthController/utils/createAuthToken'
import { ROUTE } from '@/routes'
import { redirect } from 'next/navigation'
import { type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')

  if (token) {
    createAuthToken(token)
  }

  redirect(ROUTE.PETS.INDEX)
}
