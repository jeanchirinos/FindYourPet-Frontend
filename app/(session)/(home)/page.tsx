import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'
import { FilterStatus } from './FilterStatus'
import { PetGrid } from './Pets'
import { FilterCategory } from './FilterCategory'
import { FilterBreeds } from './FilterBreeds'
import { Order } from './Order'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { searchParams } = props
  const { status = '1', order = 'asc', ...restSearchParams } = searchParams

  return (
    <main className='mx-auto flex w-[1600px] max-w-full animate-fade gap-x-6 px-2 pb-2 animate-duration-200'>
      <aside className='max-h-[calc(100dvh-3rem-var(--header-height)-0.5rem)] overflow-y-auto pr-10 max-lg:hidden'>
        <div className='space-y-2'>
          <Order order={order} />
          <section className='space-y-8 *:space-y-3'>
            <Suspense>
              <FilterStatus status={status} />
            </Suspense>
            <Suspense>
              <FilterCategory category={searchParams.category_id} />
            </Suspense>
            {searchParams.category_id && (
              <Suspense>
                <FilterBreeds
                  category_id={searchParams.category_id}
                  breed_id={searchParams.breed_id}
                />
              </Suspense>
            )}
          </section>
        </div>
      </aside>
      <Suspense fallback={<PetGridSkeleton />} keyProp={JSON.stringify(searchParams)}>
        <PetGrid searchParams={{ ...restSearchParams, status, order }} />
      </Suspense>
    </main>
  )
}
