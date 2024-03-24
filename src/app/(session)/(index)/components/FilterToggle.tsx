'use client'

import { IconFilter } from '@/icons'
import { Button } from '@nextui-org/button'

export function FilterToggle() {
  function handleCllick() {
    const filter = document.getElementById('pet-filter')
    filter?.classList.toggle('max-md:-translate-x-full')
  }

  return (
    <Button
      size='sm'
      startContent={<IconFilter className='shrink-0' />}
      className='md:hidden'
      onClick={handleCllick}
    >
      Filtros
    </Button>
  )
}
