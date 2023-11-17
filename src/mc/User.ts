import { actionRequestGet } from '@/utilities/actionRequest'
import { notAuthorized } from '@/utilities/utilities'
import { notFound } from 'next/navigation'

export type User = {
  username: string
  name: string | null
  mobile: string | null
  email: string
  image: string
  isUser: boolean
}

export async function getUser() {
  try {
    const data = await actionRequestGet<User>('user', { auth: true })

    return data
  } catch (err) {
    return notAuthorized()
  }
}

export async function getUserProfile(username: string) {
  try {
    const data = await actionRequestGet<{ data: User }>(`user?username=${username}`)

    return data.data
  } catch (err) {
    notFound()
  }
}

export async function getGoogleData() {
  type Res = { isConnected: boolean; username: string | null }

  try {
    const data = await actionRequestGet<Res>('user-google-data', { auth: true })
    return data
  } catch (e) {
    return null
  }
}
