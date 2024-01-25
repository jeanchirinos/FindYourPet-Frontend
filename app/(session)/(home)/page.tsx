import { Suspense } from '@/components/other/CustomSuspense'
import { TGetPetParams } from '@/controllers/Pet'
import { PetGridSkeleton } from '@/Skeletons/PetGridSkeleton'
import { StatusFilterServer } from './StatusFilter'
import { PetGrid } from './Pets'

type Props = { searchParams: TGetPetParams }

export default function Page(props: Props) {
  const { status = '1', ...restSearchParams } = props.searchParams

  return (
    <main className='mx-auto flex w-[1600px] max-w-full animate-fade gap-x-6 px-2 pb-2 animate-duration-200'>
      <Suspense>
        <StatusFilterServer status={status} />
      </Suspense>
      <Suspense fallback={<PetGridSkeleton />} keyProp={status}>
        <PetGrid searchParams={{ ...restSearchParams, status }} />
      </Suspense>
    </main>
  )
}
