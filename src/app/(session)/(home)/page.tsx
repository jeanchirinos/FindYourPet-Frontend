import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'
import { PetGrid } from './Pets/PetGrid'
import { FilterCategory } from './FilterCategory/FilterCategory'
import { Order } from './Order'
import { FilterPlace } from './FilterPlace/FilterPlace'
import { FilterBreeds } from './FilterBreeds/FilterBreeds'
import { FilterStatus } from './FilterStatus/FilterStatus'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { searchParams } = props
  const { status = '1', order = 'desc', ...restSearchParams } = searchParams

  return (
    <main className='mx-auto flex h-full w-[1600px] max-w-full animate-fade items-start gap-x-10 px-2 animate-duration-200'>
      <aside className='sticky top-[calc(var(--header-height)+1.25rem)] w-40 shrink-0 max-lg:hidden'>
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
        <Suspense fallback={<PetGridSkeleton />} keyProp={JSON.stringify(searchParams)}>
          <PetGrid searchParams={{ ...restSearchParams, status, order }} />
        </Suspense>
      </section>
    </main>
  )
}
