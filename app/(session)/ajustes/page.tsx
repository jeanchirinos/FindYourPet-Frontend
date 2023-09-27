import { request } from '@/utilities/requestServer'
import { User } from '../perfil/[id]/page'
import { UpdateForm } from './update-form'

async function getUser(username?: string) {
  const user = await request<User>(`user`)
  return user
}

export default async function Page() {
  const user = await getUser()

  return (
    <>
      <main className='mx-auto w-[1600px] max-w-full px-6 py-12'>
        <h2 className='mb-4 text-2xl font-black'>Información personal</h2>

        <UpdateForm user={user} />
      </main>
    </>
  )
}
