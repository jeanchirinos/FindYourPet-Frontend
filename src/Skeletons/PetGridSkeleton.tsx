import { Spinner } from '@nextui-org/react'

export function PetGridSkeleton() {
  return (
    <div className='h-96 flex-center'>
      <Spinner size='lg' />
    </div>
  )
}
