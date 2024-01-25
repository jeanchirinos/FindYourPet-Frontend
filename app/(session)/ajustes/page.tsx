import { UpdateForm } from './update-form'

import { GoogleForm } from './google-form'
import { Suspense } from '@/components/other/CustomSuspense'
import { getGoogleData, getUser } from '@/controllers/User'

// MAIN COMPONENT
export default async function Page() {
  const user = await getUser()

  // console.log({ user })

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

// COMPONENTS
async function ConnectedAccounts() {
  const googleData = await getGoogleData()

  if (!googleData) return null

  return (
    <>
      <h2 className='mb-4 mt-6 text-2xl font-black'>Cuentas conectadas</h2>
      <GoogleForm {...googleData} />
    </>
  )
}
