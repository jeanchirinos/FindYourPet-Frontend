import { Suspense } from '@/components/other/CustomSuspense'
import Image from 'next/image'
import { HiOutlineDeviceMobile, HiOutlineMail } from 'react-icons/hi'
import { getUserProfile } from '@/controllers/User'
import { PageProps } from '@/types'

type Props = PageProps<'username'>

export default function Page(props: Props) {
  return (
    <Suspense>
      <Profile username={props.params.username} />
    </Suspense>
  )
}

async function Profile(props: { username: string }) {
  const { username } = props

  const user = await getUserProfile(username)

  return (
    <div className='mx-auto w-[400px] max-w-full space-y-3 px-2'>
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
      <section className='space-y-5'>
        <div className='flex flex-col gap-y-1.5 text-center'>
          <h2 className='text-2xl font-bold leading-none'>{user.name}</h2>
          <span>{user.username}</span>
        </div>
        <div className='space-y-1.5'>
          <div className='flex items-center gap-x-1.5'>
            <HiOutlineMail />
            <span>Correo : {user.email}</span>
          </div>
          {user.mobile && (
            <div className='flex items-center gap-1'>
              <HiOutlineDeviceMobile />
              <span>Celular : {user.mobile}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
