import { Suspense } from '@/components/other/CustomSuspense'
import { GetPetsParams } from '@/controllers/PetController/getPets'
import { PetGrid } from './Pets/PetGrid'
import { FilterCategory } from './FilterCategory.tsx/FilterCategory'
import { Order } from './Order'
import { FilterPlace } from './FilterPlace/FilterPlace'
import { FilterBreeds } from './FilterBreeds/FilterBreeds'
import { FilterStatus } from './FilterStatus'
import { Spinner } from '@nextui-org/spinner'
import { PageSearchParamsProps2 } from '@/types'

type Props = PageSearchParamsProps2<GetPetsParams>

export default function Page(props: Props) {
  const { searchParams } = props
  const { category_id } = searchParams

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
          {category_id && (
            <Suspense>
              <FilterBreeds category_id={category_id} />
            </Suspense>
          )}
        </section>
      </aside>
      <section className='flex h-full w-full flex-col gap-y-4'>
        <header className='flex justify-between'>
          <Suspense>
            <FilterPlace />
          </Suspense>
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
          <PetGrid searchParams={searchParams} />
        </Suspense>
      </section>
    </main>
  )
}
