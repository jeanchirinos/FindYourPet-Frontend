'use server'

import { headers } from 'next/headers'

export async function isCurrentPath(path: string) {
  return headers().get('referer')?.includes(path)
}
