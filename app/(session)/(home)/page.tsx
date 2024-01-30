import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'
import { FilterStatus } from './FilterStatus'
import { PetGrid } from './Pets'
import { FilterCategory } from './FilterCategory'
// import { FilterBreeds } from './FilterBreeds/FilterBreeds'
import { Order } from './Order'
import { FilterPlace } from './FilterPlace/FilterPlace'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { searchParams } = props
  const { status = '1', order = 'asc', ...restSearchParams } = searchParams

  return (
    <main className='mx-auto flex w-[1600px] max-w-full animate-fade gap-x-6 px-2 pb-2 animate-duration-200'>
      <aside className='max-h-[calc(100dvh-3rem-var(--header-height)-0.5rem)] w-60 shrink-0 overflow-y-auto pr-10 max-lg:hidden'>
        <section className='space-y-8 *:space-y-3'>
          <Suspense keyProp={'status' + JSON.stringify(searchParams)}>
            <FilterStatus status={status} />
          </Suspense>
          <Suspense fallback='LOADING'>
            <FilterCategory category={searchParams.category_id} />
          </Suspense>
          {/* {searchParams.category_id && (
            <Suspense>
              <FilterBreeds category_id={searchParams.category_id} />
            </Suspense>
          )} */}
        </section>
      </aside>
      <section className='flex w-full flex-col gap-y-5'>
        <header className='flex justify-between'>
          <Suspense keyProp={JSON.stringify(searchParams)}>
            <FilterPlace />
          </Suspense>
          <Order order={order} />
        </header>
        <Suspense fallback={<PetGridSkeleton />} keyProp={JSON.stringify(searchParams)}>
          <PetGrid searchParams={{ ...restSearchParams, status, order }} />
        </Suspense>
      </section>
    </main>
  )
}
