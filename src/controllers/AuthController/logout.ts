'use server'
import { sendData } from '@/utilities/actionRequest'
import { cookies } from 'next/headers'

export async function logout() {
  sendData({
    url: 'logout',
  })

  cookies().delete('jwt')
}
