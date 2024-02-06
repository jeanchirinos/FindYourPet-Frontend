'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twJoin } from 'tailwind-merge'

export function HeaderLink(props: React.ComponentProps<typeof Link>) {
  const pathname = usePathname()

  const isActive = () => {
    const { href } = props

    if (href === '/') return pathname === '/'
    return pathname.includes(href as string)
  }

  return (
    <Link
      {...props}
      className={twJoin(
        isActive() && 'text-primary',
        'transition-transform ease-linear hover:scale-105',
      )}
    >
      {props.children}
    </Link>
  )
}
