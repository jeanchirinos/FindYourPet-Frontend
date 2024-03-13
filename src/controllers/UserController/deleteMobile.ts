'use server'
import { sendData } from '@/utilities/actionRequest'

export async function deleteMobile() {
  return sendData({
    url: 'delete-mobile',
    revalidateTagParams: ['user'],
  })
}
