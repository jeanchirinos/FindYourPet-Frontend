'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = React.ComponentProps<typeof Link>

export const HeaderLink = forwardRef<HTMLAnchorElement, Props>(function HeaderLink(props, ref) {
  const pathname = usePathname()

  const isActive = () => {
    const { href } = props

    if (href === '/') return pathname === '/'
    return pathname.includes(href as string)
  }

  return (
    <Link {...props} ref={ref} className={twMerge(isActive() && 'text-primary', props.className)} />
  )
})
