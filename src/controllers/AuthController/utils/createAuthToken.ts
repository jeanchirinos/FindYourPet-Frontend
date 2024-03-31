import { cookies } from 'next/headers'

export async function createAuthToken(token: string) {
  const expires = new Date()
  expires.setDate(expires.getDate() + 7)

  cookies().set('jwt', token, { expires })
}
