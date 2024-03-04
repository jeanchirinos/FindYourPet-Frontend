import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Post'
import { Spinner } from '@nextui-org/spinner'
import { Metadata } from 'next'
import { Order } from '../(home)/Order'
import { PostsList } from './Posts/PostList'
import { PetVisibility } from './PetVisibility'

type Props = { searchParams: TGetPetParams }

export const metadata: Metadata = {
  title: 'Mis publicaciones',
}

export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex w-[1600px] max-w-full flex-col gap-y-8 px-2'>
      <header className='flex justify-between'>
        <PetVisibility />
        <Order />
      </header>

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
