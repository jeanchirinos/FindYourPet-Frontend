import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGrid } from './Pets/PetGrid'
import { FilterCategory } from './FilterCategory'
import { Order } from './Order'
import { FilterPlace } from './FilterPlace/FilterPlace'
import { FilterBreeds } from './FilterBreeds/FilterBreeds'
import { FilterStatus } from './FilterStatus'
import { Spinner } from '@nextui-org/react'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { searchParams } = props
  const { status = '1', order = 'desc', ...restSearchParams } = searchParams

  return (
    <main className='mx-auto flex h-full w-[1600px] max-w-full items-start gap-x-10 px-2'>
      <aside className='top-header_sticky sticky w-48 shrink-0 max-lg:hidden'>
        <section className='space-y-8 *:space-y-3'>
          <Suspense>
            <FilterStatus status={status} />
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
          <Suspense>
            <FilterPlace />
          </Suspense>
          <Order order={order} />
        </header>
        <Suspense
          fallback={
            <div className='h-96 flex-center'>
              <Spinner size='lg' />
            </div>
          }
          keyProp={JSON.stringify(searchParams)}
        >
          <PetGrid searchParams={{ ...restSearchParams, status, order }} />
        </Suspense>
      </section>
    </main>
  )
}
