import { Suspense } from '@/components/other/CustomSuspense'
import { PetList } from './components/PetList'
import { GetPetsAdminParams } from '@/controllers/PetController/getPetsAdmin'
import { Spinner } from '@nextui-org/spinner'
import { PetVisibility } from '@/components/business/PetVisibility'
import { PageSearchParamsProps2 } from '@/types'

type Props = PageSearchParamsProps2<GetPetsAdminParams>

export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex w-[1600px] max-w-full flex-col gap-y-8 px-2'>
      <h1 className='text-xl font-black'>Administrar publicaciones</h1>

      <PetVisibility />

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
