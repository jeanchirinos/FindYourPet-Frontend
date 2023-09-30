import { User } from '../perfil/[id]/page'
import { UpdateForm } from './update-form'
import { redirect } from 'next/navigation'
import { requestAction } from '@/utilities/actionsRequest'

async function getUser() {
  const response = await requestAction<User>('user')

  if (response.status === 'error') redirect('/')

  return response
}

export default async function Page() {
  const user = await getUser()

  return (
    <main className='mx-auto w-[1600px] max-w-full px-6 py-12'>
      <h2 className='mb-4 text-2xl font-black'>Información personal</h2>
      <UpdateForm user={user} />
    </main>
  )
}
