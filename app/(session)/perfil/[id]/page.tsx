import { request } from '@/utilities/requestServer'
import { Client } from './Client'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export type User = {
  username: string
  name: string
  mobile: string
  email: string
  image: string
  isUser: boolean
}

async function getUser(username: string) {
  try {
    const user = await request<User>(`user/${username}`)

    return user
  } catch (err) {
    return notFound()
  }
}

export default async function Page(props: { params: { id: string } }) {
  const { id: username } = props.params

  return (
    <Suspense>
      <Profile username={username} />
    </Suspense>
  )
}

async function Profile(props: { username: string }) {
  const { username } = props

  const user = await getUser(username)

  return <Client user={user} />
}
