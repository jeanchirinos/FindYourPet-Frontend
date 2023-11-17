import { User } from '../perfil/[id]/page'
import { UpdateForm } from './update-form'
import { actionRequestGet } from '@/utilities/actionRequest'

import { GoogleForm } from './google-form'
import { Suspense } from 'react'
import { notAuthorized } from '@/utilities/utilities'

async function getUser() {
  try {
    const data = await actionRequestGet<User>('user', { auth: true })

    return data
  } catch (err) {
    return notAuthorized()
  }
}

export default async function Page() {
  const user = await getUser()

  return (
    <main className='mx-auto w-[1600px] max-w-full animate-fade px-6 py-12 animate-duration-200'>
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
  type Res = { isConnected: boolean; username: string | null }

  try {
    const data = await actionRequestGet<Res>('user-google-data', { auth: true })
    return data
  } catch (e) {
    return null
  }
}

async function ConnectedAccounts() {
  const googleData = await getGoogleData()

  if (!googleData) return null

  return (
    <>
      <h2 className='mb-4 mt-6 text-2xl font-black'>Cuenta conectadas</h2>
      <GoogleForm {...googleData} />
    </>
  )
}
