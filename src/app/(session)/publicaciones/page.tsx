import { Suspense } from '@/components/other/CustomSuspense'
import { Spinner } from '@nextui-org/spinner'
import { Metadata } from 'next'
import { PostsList } from './components/PostList'
import { PetVisibility } from '@/components/business/PetVisibility'
import { PageSearchParamsProps2 } from '@/types'
import { GetUserPetsParams } from '@/controllers/PetController/getUserPets'

type Props = PageSearchParamsProps2<GetUserPetsParams>

export const metadata: Metadata = {
  title: 'Mis publicaciones',
}

export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex w-[1600px] max-w-full flex-col gap-y-8 px-2'>
      <h1 className='text-xl font-black'>Mis publicaciones</h1>
      <PetVisibility />

      <Suspense
        fallback={
          <div className='h-96 flex-center'>
            <Spinner size='lg' />
          </div>
        }
        keyProp={JSON.stringify(searchParams)}
      >
        <PostsList searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
