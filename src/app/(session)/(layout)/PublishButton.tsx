'use client'

import { Button } from '@nextui-org/button'
import { Link } from '@/components/Link'
import { usePathname } from 'next/navigation'

export function PublishButton() {
  const pathname = usePathname()

  if (pathname?.includes('publicar')) return <></>

  return (
    <Button as={Link} href='/publicar' size='sm' color='primary' className='bg-main-gradient'>
      Publicar
    </Button>
  )
}
