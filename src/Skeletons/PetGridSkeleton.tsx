import { Skeleton } from '@nextui-org/react'

export function PetGridSkeleton() {
  return (
    <section className='templateColumns-[200px] grid auto-rows-min gap-4 lg:templateColumns-[250px]'>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className='rounded-xl bg-th-fg-2'>
          <div className='aspect-square w-full' />
          <div className='h-[5.875rem] w-full' />
        </Skeleton>
      ))}
    </section>
  )
}
