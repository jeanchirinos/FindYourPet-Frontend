'use client'

import { Button } from '@/components/Button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function PublishButton() {
  const pathname = usePathname()

  if (pathname?.includes('publicar')) return <></>

  return (
    <Button as={Link} href='/publicar' size='sm' className='bg-primary leading-none text-white'>
      Publicar
    </Button>
  )
}
