import { Suspense } from '@/components/other/CustomSuspense'
import { GetPetsParams } from '@/controllers/PetController/getPets'
import { PetGrid } from './components/PetGrid'
import { FilterCategory } from './components/FilterCategory/FilterCategory'
import { Order } from '@/components/business/Order'
import { FilterPlace } from './components/FilterPlace/FilterPlace'
import { FilterBreeds } from './components/FilterBreeds/FilterBreeds'
import { FilterStatus } from './components/FilterStatus'
import { Spinner } from '@nextui-org/spinner'
import { PageSearchParamsProps2 } from '@/types'
import { FilterToggle } from './components/FilterToggle'

type Props = PageSearchParamsProps2<GetPetsParams>

export default function Page(props: Props) {
  const { searchParams } = props
  const { category_id } = searchParams

  return (
    <main className='relative mx-auto flex h-full w-[1600px] max-w-full items-start gap-x-10 px-2'>
      <aside
        id='pet-filter'
        className='sticky top-20 z-20 w-48 shrink-0 bg-background transition-transform max-md:absolute max-md:left-0 max-md:w-full max-md:-translate-x-full max-md:px-4 max-md:pb-4 md:top-header_sticky'
      >
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
        <header className='flex justify-between gap-x-4 '>
          <FilterToggle />
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
