'use client'

import { usePathname } from 'next/navigation'
import { ButtonLink } from '@/components/ButtonLink'

export function PublishButton() {
  const pathname = usePathname()

  if (pathname?.includes('publicar')) return <></>

  return (
    <ButtonLink href='/publicar' size='sm' color='primary' className='bg-main-gradient'>
      Publicar
    </ButtonLink>
  )
}
