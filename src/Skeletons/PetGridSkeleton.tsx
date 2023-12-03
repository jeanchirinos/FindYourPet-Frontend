import { Skeleton } from '@nextui-org/react'

export function PetGridSkeleton() {
  return (
    <section className='templateColumns-[300px] grid gap-4'>
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton key={i} className='aspect-square rounded-xl bg-th-fg-2' />
      ))}
    </section>
  )
}
