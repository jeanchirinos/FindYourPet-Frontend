'use client'

import { IconBack } from '@/icons'
import { ROUTE } from '@/routes'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { cnx } from '@/lib/utils'

type Props = React.ComponentProps<'div'> & { showBack?: boolean }

export function Title(props: Props) {
  const { showBack = true, ...restProps } = props

  const { back, push } = useRouter()

  function handleBack() {
    const hasNavigatedThroughPagesBefore = window.history.length > 2

    if (hasNavigatedThroughPagesBefore) {
      back()
    } else {
      push(ROUTE.PETS.INDEX)
    }
  }

  return (
    <div {...restProps} className={cnx('mb-8 flex items-center gap-x-4', props.className)}>
      {showBack && (
        <Button isIconOnly onClick={handleBack} size='sm' variant='faded' radius='full'>
          <IconBack />
        </Button>
      )}

      <h2 className='text-center text-lg font-semibold'>{props.children}</h2>
    </div>
  )
}
