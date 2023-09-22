import { Client } from './Client'
import { request } from '@/utilities'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
// import { ServerClient } from './ServerClient'
// import { Suspense } from 'react'

interface Props {
  params: { id: string }
}

export type User = {
  username: string
  name: string
  mobile: string
  email: string
  image: string
  isUser: boolean
}

async function getUser(id: string) {
  try {
    // await 5 seconds
    // await new Promise(resolve => setTimeout(resolve, 5000))

    const authCookie = cookies().get('jwt')?.value

    const user = await request<User>(`user/${id}`, { cookies: `jwt=${authCookie}` })

    return user
  } catch (err) {
    return notFound()
  }
}

export default async function Page(props: Props) {
  const { id } = props.params

  return (
    <Suspense>
      <Profile id={id} />
    </Suspense>
  )
}

async function Profile(props: { id: string }) {
  const { id } = props

  const user = await getUser(id)

  return <Client user={user} />
}
