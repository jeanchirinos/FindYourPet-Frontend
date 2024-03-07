'use client'

import { usePathname } from 'next/navigation'
import { ButtonLink } from '@/components/ButtonLink'
import { ROUTE } from '@/routes'

export function PublishButton() {
  const pathname = usePathname()

  if (pathname?.includes(ROUTE.PUBLISH)) return <></>

  return (
    <ButtonLink href={ROUTE.PUBLISH} size='sm' color='primary' className='bg-main-gradient'>
      Publicar
    </ButtonLink>
  )
}
