'use server'
import { getData } from '@/utilities/actionRequest'
import { notFound } from 'next/navigation'

export async function verifyToken(token: string | undefined) {
  if (!token) notFound()

  try {
    await getData(`verify-token/${token}`, {
      cache: 'no-store',
    })
  } catch (err) {
    notFound()
  }
}
