import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'
import { FilterStatus } from './FilterStatus'
import { PetGrid } from './Pets'
import { FilterCategory } from './FilterCategory'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { searchParams } = props
  const { status = '1', ...restSearchParams } = searchParams

  return (
    <main className='mx-auto flex w-[1600px] max-w-full animate-fade gap-x-6 px-2 pb-2 animate-duration-200'>
      <aside className='max-lg:hidden'>
        <section className='space-y-8 *:space-y-3'>
          <Suspense>
            <FilterStatus status={status} />
          </Suspense>
          <Suspense>
            <FilterCategory category={searchParams.category_id} />
          </Suspense>
        </section>
      </aside>
      <Suspense fallback={<PetGridSkeleton />} keyProp={JSON.stringify(searchParams)}>
        <PetGrid searchParams={{ ...restSearchParams, status }} />
      </Suspense>
    </main>
  )
}
