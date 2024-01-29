import { Spinner } from '@nextui-org/react'

export function PetGridSkeleton() {
  return (
    <div className='h-96 flex-center'>
      <Spinner size='lg' />
    </div>
    // <section className='templateColumns-[200px] grid w-full auto-rows-min gap-4 lg:templateColumns-[250px]'>
    //   {Array.from({ length: 10 }).map((_, i) => (
    //     <Skeleton key={i} className='rounded-xl bg-th-fg-2'>
    //       <div className='aspect-square w-full' />
    //       <div className='h-[5.875rem] w-full' />
    //     </Skeleton>
    //   ))}
    // </section>
  )
}
