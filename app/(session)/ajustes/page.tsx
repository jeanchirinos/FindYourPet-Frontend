import { User } from '../perfil/[id]/page'
import { UpdateForm } from './update-form'
import { redirect } from 'next/navigation'
import { requestAction } from '@/utilities/actionsRequest'

import { GoogleForm } from './google-form'
import { Suspense } from 'react'

async function getUser() {
  const response = await requestAction<User>('user')

  if (response.status === 'error') redirect('/')

  return response
}

export default async function Page() {
  const user = await getUser()

  return (
    <main className='mx-auto w-[1600px] max-w-full animate-fade px-6 py-12 animate-duration-200 '>
      <div className='flex w-[350px] max-w-full flex-col'>
        <h2 className='mb-4 text-2xl font-black'>Información personal</h2>
        <UpdateForm user={user} />
        <Suspense>
          <ConnectedAccounts />
        </Suspense>
      </div>
    </main>
  )
}

async function getGoogleData() {
  const response = await requestAction<{ isConnected: boolean; username: string | null }>(
    'user-google-data',
  )

  return response
}

async function ConnectedAccounts() {
  const googleData = await getGoogleData()

  if (googleData.status === 'error') return null

  return (
    <>
      <h2 className='mb-4 mt-6 text-2xl font-black'>Cuenta conectadas</h2>
      <GoogleForm {...googleData} />
    </>
  )
}
