import { request } from '@/utilities/requestServer'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import { HiOutlineDeviceMobile, HiOutlineMail } from 'react-icons/hi'

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
    const user = await request<User>(`user?username=${username}`)
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

  return (
    <div className='mx-auto w-[400px] max-w-full space-y-3'>
      <section className='relative mx-auto aspect-square w-[250px] max-w-full'>
        <Image
          className='rounded-full object-cover'
          src={user.image}
          width={300}
          height={300}
          alt='Perfil'
          loading='eager'
        />
      </section>
      <section className='flex flex-col gap-3'>
        <div>
          <div className='text-center'>
            <h1 className='text-2xl font-bold leading-none'>{user.name}</h1>
            <span>{user.username}</span>
          </div>
          <div className='flex items-center gap-1'>
            <HiOutlineMail />
            <span>Correo: {user.email}</span>
          </div>
          <div className='flex items-center gap-1'>
            <HiOutlineDeviceMobile />
            <span>Celular: {user.mobile}</span>
          </div>
        </div>
      </section>
    </div>
  )
}