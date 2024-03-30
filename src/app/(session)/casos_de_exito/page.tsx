import { Suspense } from '@/components/other/CustomSuspense'
import { PetList } from './components/PetList'
import { Spinner } from '@nextui-org/spinner'
import { PageSearchParamsProps2 } from '@/types'
import { GetPetsWithSuccessStoriesParams } from '@/controllers/PetController/getPetsWithSuccessStories'

type Props = PageSearchParamsProps2<GetPetsWithSuccessStoriesParams>

export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex w-[1600px] max-w-full flex-col gap-y-8 px-2'>
      <h1 className='text-xl font-black'>Casos de éxito</h1>

      {/* <PetVisibility /> */}

      <Suspense
        fallback={
          <div className='h-96 flex-center'>
            <Spinner size='lg' />
          </div>
        }
        keyProp={JSON.stringify(searchParams)}
      >
        <PetList searchParams={searchParams} />
      </Suspense>
    </main>
  )
}
