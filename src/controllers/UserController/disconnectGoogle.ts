'use server'
import { sendData } from '@/utilities/actionRequest'

export async function disconnectGoogle() {
  return sendData({
    url: 'user-google-disconnect',
    revalidateTagParams: ['user-google'],
  })
}
