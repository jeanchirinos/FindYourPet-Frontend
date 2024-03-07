'use client'

import { IconBack } from '@/icons'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'

export function Title(props: React.PropsWithChildren) {
  const { back, push } = useRouter()

  function handleBack() {
    if (window.history.length > 2) {
      back()
    } else {
      push('/')
    }
  }

  return (
    <div className='mb-8 flex items-center gap-x-4'>
      <Button isIconOnly onClick={handleBack} size='sm' variant='faded' radius='full'>
        <IconBack />
      </Button>

      <h2 className='text-center text-lg font-semibold'>{props.children}</h2>
    </div>
  )
}
