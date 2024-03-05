import { Suspense } from '@/components/other/CustomSuspense'
import { PetList } from './PetList'
import { TGetPetParams2 } from '@/controllers/Pet'
import { FilterStatus } from '../../(home)/FilterStatus'
import { FilterCategory } from '../../(home)/FilterCategory.tsx/FilterCategory'
import { FilterBreeds } from '../../(home)/FilterBreeds/FilterBreeds'
// import { FilterPlace } from '../../(home)/FilterPlace/FilterPlace'
import { Order } from '../../(home)/Order'
import { Spinner } from '@nextui-org/spinner'
import { PetVisibility } from '../../publicaciones/PetVisibility'

type Props = { searchParams: TGetPetParams2 }

export default function Page(props: Props) {
  const { searchParams } = props

  return (
    <main className='mx-auto flex h-full w-[1600px] max-w-full items-start gap-x-10 px-2'>
      <aside className='sticky top-header_sticky w-48 shrink-0 max-lg:hidden'>
        <section className='space-y-8 *:space-y-3'>
          <Suspense>
            <FilterStatus />
          </Suspense>
          <Suspense>
            <FilterCategory />
          </Suspense>
          {searchParams.category_id && (
            <Suspense>
              <FilterBreeds category_id={searchParams.category_id} />
            </Suspense>
          )}
        </section>
      </aside>
      <section className='flex h-full w-full flex-col gap-y-4'>
        <header className='flex justify-between'>
          <div className='flex gap-x-2'>
            <PetVisibility />
            {/* <Suspense>
              <FilterPlace />
            </Suspense> */}
          </div>
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
          <PetList searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  )
}
