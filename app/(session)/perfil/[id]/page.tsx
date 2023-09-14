import { Client } from './Client'
import { request } from '@/utilities'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'

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
    const authCookie = cookies().get('jwt')?.value

    const response = await request<User>(`user/${id}`, { cookies: `jwt=${authCookie}` })
    const user = await response

    return user
  } catch (err) {
    // console.log(err)
    // return 404 response

    return notFound()
  }
}

export default async function Page(props: Props) {
  const { id } = props.params

  const user = await getUser(id)

  return <Client user={user} />
}
