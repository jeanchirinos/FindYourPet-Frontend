'use client'
import { Link } from '@/components/Link'
import { usePathname } from 'next/navigation'
import { forwardRef } from 'react'
import { cnx } from '@/lib/utils'

type Props = React.ComponentProps<typeof Link> & { pattern?: string }

export const HeaderLink = forwardRef<HTMLAnchorElement, Props>(function HeaderLink(props, ref) {
  const { pattern } = props

  const pathname = usePathname()

  const isActive = () => {
    if (pattern) {
      return pathname.match(pattern)
    }

    return pathname === props.href
  }

  return (
    <Link
      color='foreground'
      {...props}
      ref={ref}
      className={cnx(isActive() && 'text-primary', props.className)}
    />
  )
})
