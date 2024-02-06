import { UpdateForm } from './data-form/update-form'

import { Suspense } from '@/components/other/CustomSuspense'
import { getUser } from '@/controllers/User'
import { ConnectedAccounts } from './connected-accounts'

export default async function Page() {
  const user = await getUser()

  return (
    <main className='mx-auto w-[1600px] max-w-full px-2'>
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
